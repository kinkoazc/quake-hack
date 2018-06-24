import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
// import {PermissionsAndroid} from 'react-native';
// import Menu, {MenuContext, MenuOptions, MenuOption, MenuTrigger} from 'react-native-menu';
import {Button, Icon} from 'native-base';
// import { SideBar } from './Sidebar.js';

export default class Main extends React.Component {
// {/*<View style={styles.container}>*/}
// {/*<Text>Open up App.js to start working on your app!</Text>*/}
// {/*<Text>Changes you make will automatically reload.</Text>*/}
// {/*<Text>Shake your phone to open the developer menu.</Text>*/}
// {/*</View>*/}

    static navigationOptions = {
        headerTitle: 'Main',
    };

    constructor(props) {
        super(props);
        // this.requestCameraPermission();
    }
    //
    // requestCameraPermission() {
    //     try {
    //         const granted = PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
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

    closeDrawer = () => {
        // this.drawer._root.close()
        this.props.navigation.closeDrawer();
    };

    openDrawer = () => {
        // this.drawer._root.open()
        this.props.navigation.openDrawer();
    };

    render() {
        return (
            <View style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
                marginTop: StatusBar.currentHeight,
                backgroundColor: 'white'
            }}>
                <Button onPress={() => this.openDrawer()} style={{top: 0}}>
                    <Icon name="reorder" style={{fontSize: 40}}/>
                </Button>
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
