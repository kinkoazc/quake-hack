import React from 'react';
import {createDrawerNavigator} from 'react-navigation';

import Main from './Main';
import Favorites from './Favorites';

const RootStack = createDrawerNavigator(
    {
        Main: Main,
        Favorites: Favorites,
    },
    {
        initialRouteName: 'Favorites',
        headerMode: 'none'
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack/>;
    }
}
