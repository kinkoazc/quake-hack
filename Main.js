import React from 'react';
import {StatusBar, View} from 'react-native';
import {Button, Icon} from 'native-base';

export default class Main extends React.Component {
    static navigationOptions = {
        headerTitle: 'Main',
    };

    constructor(props) {
        super(props);
    }

    closeDrawer = () => {
        this.props.navigation.closeDrawer();
    };

    openDrawer = () => {
        this.props.navigation.openDrawer();
    };

    render() {
        return (
            <View style={{
                flex: 1,
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
