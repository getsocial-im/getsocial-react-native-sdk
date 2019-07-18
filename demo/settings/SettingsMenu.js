// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {FlatList, Text, View, TouchableWithoutFeedback} from 'react-native';
// eslint-disable-next-line no-unused-vars
import {CheckBox} from 'react-native-elements';
import {GetSocialUser} from 'getsocial-react-native-sdk';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[],
    isNotificationsEnabled: boolean,
}

export default class SettingsMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Settings'};

    constructor(props: any) {
      super(props);

      const languageMenu = new MenuItem();
      languageMenu.key = 'change-language';
      languageMenu.title = 'Change language';
      languageMenu.navigateTo = 'ChangeLanguageMenu';

      const notificationStatus = new MenuItem();
      notificationStatus.key = 'change-notification-status';
      notificationStatus.title = 'Push Notifications status';
      notificationStatus.showStatus = true;

      const settingsMenu = [languageMenu, notificationStatus];

      this.state = {
        menu: settingsMenu,
        isNotificationsEnabled: false,
      };
    }

    componentDidMount() {
      GetSocialUser.isPushNotificationsEnabled().then((isEnabled) => {
        this.setState({isNotificationsEnabled: isEnabled});
      });
    }

    menuItemSelected(menuItem : MenuItem) {
      if (menuItem.navigateTo != null) {
        this.props.navigation.navigate(menuItem.navigateTo);
      }
    }

    changeNotificationStatus = async () => {
      if (this.state.isNotificationsEnabled) {
        GetSocialUser.disablePushNotifications().then((result) => {
          this.setState({isNotificationsEnabled: false});
        });
      } else {
        GetSocialUser.enablePushNotifications().then((result) => {
          this.setState({isNotificationsEnabled: true});
        });
      }
    }

    getNotificationStatusCheckbox(menuItem: MenuItem) {
      if (menuItem.showStatus == true) {
        return <CheckBox center checked={this.state.isNotificationsEnabled} onPress={() => this.changeNotificationStatus()}/>;
      }
      return null;
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
                  <View style={MenuStyle.listitemWithCheckbox}>
                    <Text style={MenuStyle.menuitem}>{item.title}</Text>
                    {this.getNotificationStatusCheckbox(item)}
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
