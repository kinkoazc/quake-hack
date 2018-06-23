import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Menu, {MenuContext, MenuOptions, MenuOption, MenuTrigger} from 'react-native-menu';

export default class App extends React.Component {
// {/*<View style={styles.container}>*/}
// {/*<Text>Open up App.js to start working on your app!</Text>*/}
// {/*<Text>Changes you make will automatically reload.</Text>*/}
// {/*<Text>Shake your phone to open the developer menu.</Text>*/}
// {/*</View>*/}

    render() {
        return (
            <MenuContext style={{paddingTop: StatusBar.currentHeight != null ? StatusBar.currentHeight : 31, backgroundColor: 'rgba(52, 52, 52, 0.8)git ' }}>
                <TopNavigation/>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}><Text>Hello!</Text></View>
            </MenuContext>
        );
    }
}

const TopNavigation = () => (
    <View style={{padding: 10, flexDirection: 'row', backgroundColor: 'orange'}}>
        <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
        />
        <View style={{flex: 1}}><Text>quake-hack</Text></View>
        <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
            <MenuTrigger style={{width: 30, height: 30, backgroundColor: 'green'}}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption value={1}>
                    <Text>One</Text>
                </MenuOption>
                <MenuOption value={2}>
                    <Text>Two</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    </View>
);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
