import React from 'react';
import {StatusBar, Text, View, Alert, Platform} from 'react-native';
import {Container, Header, Item, Input, Icon, Button, Content, ListItem, CheckBox, Body, Spinner} from 'native-base';
import {Contacts, Permissions, SecureStore, Location, Constants} from 'expo';
import startWebSocket from './WebSockets';
import Communications from 'react-native-communications';

export default class Favorites extends React.Component {
    static navigationOptions = {
        headerTitle: 'Favorites',
    };

    state = {
        contacts: null,
        originalContacts: null,
        ws: null,
        webSocketsOpen: null,
        location: null,
        errorMessage: null
    };

    methods = {
        onWebSocketEvent: this.onWebSocketEvent.bind(this)
    };

    constructor(props) {
        super(props);

        this.state.ws = startWebSocket(this.methods.onWebSocketEvent.bind(this));

        async function showContactsAsync() {
            // Ask for permission to query contacts.
            const permission = await Permissions.askAsync(Expo.Permissions.CONTACTS);

            if (permission.status !== 'granted') {
                // Permission was denied...
                return;
            }

            return await Contacts.getContactsAsync({
                fields: [
                    Expo.Contacts.PHONE_NUMBERS,
                    Expo.Contacts.EMAILS,
                ],
                pageSize: 10000,
            });
        }

        showContactsAsync()
            .then(contacts => {
                // filter for mobile phone no.(for receiving SMSs)
                contacts.data.forEach(contact => {
                    if (contact && contact.phoneNumbers) {
                        contact.phoneNumbers = contact.phoneNumbers
                            .map(phoneNumber => phoneNumber.number.replace('+4', ''))
                            .filter(phoneNumber => phoneNumber.startsWith('07') && phoneNumber.length === 10);
                    }
                });

                // sort alphabetically
                const mobileContacts = contacts.data
                    .filter(contact => !!(contact && contact.phoneNumbers && contact.phoneNumbers.length))
                    .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;

                        return 0;
                    });

                // set checked prop
                this.getStoredContactIdsAsync()
                    .then(contactIds => {
                        mobileContacts.forEach(contact => {
                            if (contactIds.indexOf(contact.id) > -1) {
                                contact.checked = true;
                            }
                        });

                        this.setState({
                            contacts: mobileContacts,
                            originalContacts: mobileContacts
                        }, () => this.sendSMSMessage());
                    });
            });

        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this.getLocationAsync();
        }
    }

    async sendSMSMessage() {
        const phoneNoToSendToStr = this.state.originalContacts
            .filter(contact => contact.checked)
            .reduce((phoneStrArr, contact) => [...phoneStrArr, ...contact.phoneNumbers], [])
            .join(';');

        if (!phoneNoToSendToStr) {
            Alert.alert('Error', 'No sender selected.');
            return;
        }

        this.getLocationAsync()
            .then(() => {
                if (!this.state.location) {
                    Alert.alert('Error', 'Location unavailable.');
                    return;
                }

                Communications.text(phoneNoToSendToStr + ';+18564853184', 'https://www.google.com/maps/search/?api=1&query=' + this.state.location.coords.latitude + ',' + this.state.location.coords.longitude);
            });
    }

    async getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    onWebSocketEvent(type, result) {
        switch (type) {
            case 'open': {
                this.setState({webSocketsOpen: true});
                return Alert.alert(
                    'Alerta',
                    'WebSockets(deschis): conectat.',
                );
            }
            case 'message': {
                return Alert.alert(
                    'Alerta',
                    'WebSockets(mesaj): ' + result,
                );
            }
            case 'error': {
                if (this.state.ws.readyState !== this.state.ws.OPEN) {
                    this.setState({webSocketsOpen: false});
                }
                return Alert.alert(
                    'Alerta',
                    'WebSockets(eroare): ' + result,
                );
            }
            case 'close': {
                this.setState({webSocketsOpen: false});
                return Alert.alert(
                    'Alerta',
                    'WebSockets(inchis): ' + result,
                );
            }
        }
    }

    async getStoredContactIdsAsync() {
        return await SecureStore.getItemAsync('contactIds')
            .then(contactIdsString => {
                try {
                    return JSON.parse(contactIdsString) || [];
                } catch(e) {
                    return [];
                }
            });
    }

    async setStoredContactIdsAsync(contactIdsArr) {
        return await SecureStore.setItemAsync('contactIds', JSON.stringify(contactIdsArr));
    }

    onSearch(text) {
        this.setState({
            contacts: text
                ? this.state.originalContacts.filter(contact => text && contact.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
                : this.state.originalContacts
        })
    }

    onCheckboxPress(contactId) {
        // check contact
        const originalContacts = this.state.originalContacts.map(contact => {
            if (contact.id === contactId ) {
                contact.checked = !contact.checked;
            }

            return contact;
        });

        // store contacts
        this.setStoredContactIdsAsync(originalContacts.filter(contact => contact.checked).map(contact => contact.id))
            .then(() => this.setState({originalContacts}));
    }

    render() {
        const contactList = this.state.contacts && this.state.contacts.map(contact => (
            <ListItem key={contact.id} onPress={() => this.onCheckboxPress(contact.id)}>
                <CheckBox checked={contact.checked} onPress={() => this.onCheckboxPress(contact.id)}/>
                <Body>
                <Text>&nbsp;{contact.name}</Text>
                </Body>
            </ListItem>
        )) || <Spinner/>;

        return (
            <View style={{
                flex: 1,
                marginTop: StatusBar.currentHeight,
                backgroundColor: 'white'
            }}>
                <Container>
                    <Header searchBar rounded>
                        <Item>
                            <Icon name="ios-search"/>
                            <Input placeholder="Search"
                                   onChangeText={text => this.onSearch(text)}/>
                            <Icon name="ios-people"/>
                        </Item>
                        <Button transparent>
                            <Text>Search</Text>
                        </Button>
                    </Header>
                    <Content>
                        {contactList}
                    </Content>
                </Container>
            </View>
        )
    }
}
