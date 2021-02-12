// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, View, TouchableWithoutFeedback} from 'react-native';
import {GetSocial} from './../getsocial-react-native-sdk';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class ChangeLanguageMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Change language'};

    changeLanguage = async (newLanguage: string) => {
        GetSocial.setLanguage(newLanguage).then(() => {
            Alert.alert('Language', 'Language has been changed to \'' + newLanguage + '\'');
        }, (error) => {
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        const changeToEnglish = new MenuItem();
        changeToEnglish.key = 'en';
        changeToEnglish.title = 'English';
        changeToEnglish.action = () => this.changeLanguage('en');

        const changeToGerman = new MenuItem();
        changeToGerman.key = 'de';
        changeToGerman.title = 'German';
        changeToGerman.action = () => this.changeLanguage('de');

        const changeToUkraine = new MenuItem();
        changeToUkraine.key = 'uk';
        changeToUkraine.title = 'Ukrainian';
        changeToUkraine.action = () => this.changeLanguage('uk');

        const mainMenu = [changeToEnglish, changeToGerman, changeToUkraine];

        this.state = {
            menu: mainMenu,
        };
    }

    menuItemSelected(menuItem : MenuItem) {
        if (menuItem.navigateTo != null) {
            this.props.navigation.navigate(menuItem.navigateTo);
        }
        if (menuItem.action != null) {
            menuItem.action();
        }
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                {/* menu starts */}
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.menu}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback onPress={ () => this.menuItemSelected(item)}>
                                <View style={MenuStyle.listitem}>
                                    <Text style={MenuStyle.menuitem}>{item.title}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item) => item.key}
                    />
                </View>
                {/* menu ends */}
            </View>
        );
    }
}

