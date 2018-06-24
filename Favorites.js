import React from 'react';
import {StatusBar, StyleSheet, Text, View, Alert, Platform} from 'react-native';
import {Container, Header, Item, Input, Icon, Button, Content, ListItem, CheckBox, Body, Spinner} from 'native-base';
// const Contacts = require('react-native-contacts');
import {Contacts, Permissions, SecureStore, Location, Constants} from 'expo';
import startWebSocket from './WebSockets';
// import SendSMS from 'react-native-sms';
import Communications from 'react-native-communications';
// import { PermissionsAndroid } from 'react-native';

// import Menu, {MenuContext, MenuOptions, MenuOption, MenuTrigger} from 'react-native-menu';
// import { Drawer, Button, Icon } from 'native-base';
// import { SideBar } from './Sidebar.js';

export default class Favorites extends React.Component {
// {/*<View style={styles.container}>*/}
// {/*<Text>Open up App.js to start working on your app!</Text>*/}
// {/*<Text>Changes you make will automatically reload.</Text>*/}
// {/*<Text>Shake your phone to open the developer menu.</Text>*/}
// {/*</View>*/}

    // closeDrawer = () => {
    //     this.drawer._root.close()
    // };
    //
    // openDrawer = () => {
    //     this.drawer._root.open()
    // };

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

        // async function requestCameraPermission() {
        //     try {
        //         const granted = await PermissionsAndroid.request(
        //             PermissionsAndroid.PERMISSIONS.CAMERA,
        //             {
        //                 'title': 'Cool Photo App Camera Permission',
        //                 'message': 'Cool Photo App needs access to your camera ' +
        //                 'so you can take awesome pictures.'
        //             }
        //         );
        //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //             console.log("You can use the camera")
        //         } else {
        //             console.log("Camera permission denied")
        //         }
        //     } catch (err) {
        //         console.warn(err)
        //     }
        // }
        //
        // this.Contacts = Contacts;
        // console.log(typeof this.Contacts);
        //
        // Contacts.getAll((err, contacts) => {
        //     if (err) throw err;
        //
        //     // contacts returned
        //     console.log(contacts);
        // })

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
                // pageOffset: 0,
            });

            // if (contacts.total > 0) {
            //     Alert.alert(
            //         'Your first contact is...',
            //         `Name: ${contacts.data[0].name}` +
            //         `Phone numbers: ${JSON.stringify(contacts.data[0].phoneNumbers)}` +
            //         `Emails: ${JSON.stringify(contacts.data[0].emails)}`
            //     );
            // }

            // SendSMS.send({
            //     body: 'The default body of the SMS!',
            //     recipients: ['0123456789', '9876543210'],
            //     successTypes: ['sent', 'queued']
            // }, (completed, cancelled, error) => {
            //     console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
            // });

            // Communications.text('0742113127;0735610324', 'https://www.google.com/maps/search/?api=1&query=36.26577,-92.54324');
        }

        // async function secureStoreAsync() {
        //     // Ask for permission to query contacts.
        //     // const permission = await Permissions.askAsync(Expo.Permissions.SE);
        //     //
        //     // if (permission.status !== 'granted') {
        //     //     // Permission was denied...
        //     //     return;
        //     // }
        //
        //     await SecureStore.setItemAsync('data', '23456');
        //
        //     return await SecureStore.getItemAsync('data');
        //
        //     // if (contacts.total > 0) {
        //     //     Alert.alert(
        //     //         'Your first contact is...',
        //     //         `Name: ${contacts.data[0].name}` +
        //     //         `Phone numbers: ${JSON.stringify(contacts.data[0].phoneNumbers)}` +
        //     //         `Emails: ${JSON.stringify(contacts.data[0].emails)}`
        //     //     );
        //     // }
        //
        //     // SendSMS.send({
        //     //     body: 'The default body of the SMS!',
        //     //     recipients: ['0123456789', '9876543210'],
        //     //     successTypes: ['sent', 'queued']
        //     // }, (completed, cancelled, error) => {
        //     //     console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        //     // });
        //
        //     // Communications.text('0742113127;0735610324', 'https://www.google.com/maps/search/?api=1&query=36.26577,-92.54324');
        // }

        showContactsAsync()
            .then(contacts => {
                // Alert.alert('', JSON.stringify(Object.keys(contacts.data[0]), null, 2));
                // Alert.alert('', JSON.stringify(Object.keys(contacts.data[0].phoneNumbers[0]), null, 2));
                // Alert.alert('', contacts.data[0].name);
                // Alert.alert('', contacts.data[0].firstName);
                // Alert.alert('', contacts.data[0].lastName);
                // Alert.alert('', contacts.data[0].phoneNumbers[0].primary + '');
                // Alert.alert('', contacts.data[0].phoneNumbers[0].id);
                // Alert.alert('', contacts.data[0].phoneNumbers[0].label);
                // Alert.alert('', contacts.data[0].phoneNumbers[0].number);

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
                        // Alert.alert('', contactIds + '');

                        mobileContacts.forEach(contact => {
                            if (contactIds.indexOf(contact.id) > -1) {
                                contact.checked = true;
                            }
                        });

                        // Alert.alert('', mobileContacts.length + '');

                        this.setState({
                            contacts: mobileContacts,
                            originalContacts: mobileContacts
                        }, () => this.sendSMSMessage());
                    });

                // secureStoreAsync()
                //     .then(data => Alert.alert('', data));
            });

        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this.getLocationAsync()
                .then(() => {
                    // Alert.alert('', JSON.stringify(this.state.location, null, 2));
                });
        }
    }

    async sendSMSMessage() {
        // this.getStoredContactIdsAsync()
        //     .then(contactIds => {
        //
        //     });

        // Alert.alert('', JSON.stringify(this.state.originalContacts.filter(contact => contact.checked)[0].phoneNumbers[0]));
        // Alert.alert('', Object.keys(this.state.originalContacts.filter(contact => contact.checked)[0].phoneNumbers[0]) + '');
        // Alert.alert('', this.state.originalContacts.filter(contact => contact.checked)[0].phoneNumbers.length + '');

        const phoneNoToSendToStr = this.state.originalContacts
            .filter(contact => contact.checked)
            .reduce((phoneStrArr, contact) => [...phoneStrArr, ...contact.phoneNumbers], [])
            .join(';');
        // Alert.alert('', phoneNoToSendToArr.join(';'));

        if (!phoneNoToSendToStr) {
            Alert.alert('Error', 'No sender selected.');
            return;
        }

        this.getLocationAsync()
            .then(() => {
                // Alert.alert('', JSON.stringify(this.state.location, null, 2));

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
                // this.sendSMSMessage();
                return Alert.alert(
                    'Alerta',
                    'WebSockets(mesaj): ' + result,
                );
                // console.log(arguments);
                // if (result === 'OK') {
                //     this.setState({receiptProducts: []})
                // }
                // break;
            }
            case 'error': {
                // console.log(arguments);
                if (this.state.ws.readyState !== this.state.ws.OPEN) {
                    this.setState({webSocketsOpen: false});
                }
                return Alert.alert(
                    'Alerta',
                    'WebSockets(eroare): ' + result,
                );
            }
            case 'close': {
                // console.log(arguments);
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
        // getStoredContactIdsAsync()
        //     .then(contactIds => {
        //         mobileContacts.forEach(contact => {
        //             if (contactIds.indexOf(contact.id) > -1) {
        //                 contact.checked = true;
        //             }
        //         });
        //
        //         this.setState({
        //             contacts: mobileContacts,
        //             originalContacts: mobileContacts
        //         });
        //     });

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
                // justifyContent: 'center',
                // alignItems: 'center',
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

// const TopNavigation = () => (
//     <View style={{padding: 10, flexDirection: 'row', backgroundColor: 'orange'}}>
//         <StatusBar
//             backgroundColor="blue"
//             barStyle="light-content"
//         />
//         <View style={{flex: 1}}><Text>quake-hack</Text></View>
//         <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
//             <MenuTrigger style={{width: 30, height: 30, backgroundColor: 'green'}}>
//                 <Text style={{fontSize: 20, textAlign: 'center'}}>&#8942;</Text>
//             </MenuTrigger>
//             <MenuOptions>
//                 <MenuOption value={1}>
//                     <Text>One</Text>
//                 </MenuOption>
//                 <MenuOption value={2}>
//                     <Text>Two</Text>
//                 </MenuOption>
//             </MenuOptions>
//         </Menu>
//     </View>
// );
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
