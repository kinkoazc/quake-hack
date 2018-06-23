import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
const Contacts = require('react-native-contacts');
import { PermissionsAndroid } from 'react-native';

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

    constructor() {
        super();

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

        // this.Contacts = Contacts;
        // console.log(typeof this.Contacts);

        this.Contacts.getAll((err, contacts) => {
            if (err) throw err;

            // contacts returned
            console.log(contacts);
        })
    }

    render() {
        return (
                <View style={{
                    flex: 1,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    marginTop: StatusBar.currentHeight,
                    backgroundColor: 'red'
                }}>
                    <Text>Demo</Text>
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
