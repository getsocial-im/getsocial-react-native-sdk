// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {FlatList, Text, View, TouchableWithoutFeedback} from 'react-native';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class SettingsMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Settings'};

    constructor(props: any) {
      super(props);

      const languageMenu = new MenuItem();
      languageMenu.key = 'change-language';
      languageMenu.title = 'Change language';
      languageMenu.navigateTo = 'ChangeLanguageMenu';

      const settingsMenu = [languageMenu];

      this.state = {
        menu: settingsMenu,
      };
    }

    menuItemSelected(menuItem : MenuItem) {
      if (menuItem.navigateTo != null) {
        this.props.navigation.navigate(menuItem.navigateTo);
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
