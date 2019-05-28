// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import UserInfoComponent from './UserInfoComponent';
// eslint-disable-next-line no-unused-vars
import FooterComponent from './FooterComponent';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {View, FlatList, TouchableWithoutFeedback, Text} from 'react-native';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class MainMenu extends Component<Props, State> {
    static navigationOptions = {title: '', header: null};

    constructor(props: any) {
      super(props);

      const invitesMenu = new MenuItem();
      invitesMenu.key = 'invites';
      invitesMenu.title = 'Smart Invites';
      invitesMenu.navigateTo = 'InvitesMenu';

      const uiConfigMenu = new MenuItem();
      uiConfigMenu.key = 'ui-config';
      uiConfigMenu.title = 'UI Customization';
      uiConfigMenu.navigateTo = 'UICustomizationMenu';

      const settingsMenu = new MenuItem();
      settingsMenu.key = 'settings';
      settingsMenu.title = 'Settings';
      settingsMenu.navigateTo = 'SettingsMenu';

      const mainMenu = [invitesMenu, uiConfigMenu, settingsMenu];

      this.state = {
        menu: mainMenu,
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
          {/* user info starts */}
          <UserInfoComponent/>
          {/* user info ends */}

          {/* main menu starts */}
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
          {/* main menu ends */}

          {/* footer starts */}
          <FooterComponent/>
          {/* footer ends */}
        </View>
      );
    }
}


