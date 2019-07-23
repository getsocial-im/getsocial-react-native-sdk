/* eslint-disable require-jsdoc */
// @flow

import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainMenu from './main/MainMenu';
import ChangeLanguageMenu from './settings/ChangeLanguageMenu';
import InvitesMenu from './invites/InvitesMenu';
import UICustomizationMenu from './uicustomization/UICustomizationMenu';
import SettingsMenu from './settings/SettingsMenu';
import SendCustomInvite from './invites/SendCustomInvite';
import SendInviteWOUI from './invites/SendInviteWOUI';
import UserManagementMenu from './usermanagement/UserManagementMenu';
import FriendsMenu from './friends/FriendsMenu';
import SuggestedFriends from './friends/SuggestedFriends';
import NotificationsMenu from './notifications/NotificationsMenu';
import SendNotification from './notifications/SendNotification';
import NotificationsList from './notifications/NotificationsList';
import EventTrackingMenu from './eventtracking/EventTrackingMenu';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import {LoadingIndicator} from './common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {UserDetailsView} from './main/UserDetailsView.js';

// eslint-disable-next-line no-unused-vars
import {View, Alert} from 'react-native';
import {GetSocial} from 'getsocial-react-native-sdk';

const MainNavigator = createStackNavigator({
  MainMenu: {screen: MainMenu},
  SettingsMenu: {screen: SettingsMenu},
  ChangeLanguageMenu: {screen: ChangeLanguageMenu},
  UICustomizationMenu: {screen: UICustomizationMenu},
  SendCustomInvite: {screen: SendCustomInvite},
  InvitesMenu: {screen: InvitesMenu},
  NotificationsMenu: {screen: NotificationsMenu},
  SendNotification: {screen: SendNotification},
  UMMenu: {screen: UserManagementMenu},
  FriendsMenu: {screen: FriendsMenu},
  SuggestedFriends: {screen: SuggestedFriends},
  SendInviteWOUI: {screen: SendInviteWOUI},
  NotificationsList: {screen: NotificationsList},
  EventTrackingMenu: {screen: EventTrackingMenu},
},
{
  initialRouteName: 'MainMenu',
});

// eslint-disable-next-line no-unused-vars
const AppContainer = createAppContainer(MainNavigator);

type Props = { }
type State = { }

export default class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    global.loadingIndicatorRef = React.createRef();
    global.userDetailsViewRef = React.createRef();
  }

  componentDidMount() {
    // Listen for events to set the proper information
    GetSocial.onNotificationReceived((notification, wasClicked) => {
      Alert.alert('Notification received', JSON.stringify(notification));
    });
  }

  render() {
    return <View style={{flex: 1}}>
      <AppContainer/>
      <UserDetailsView ref={global.userDetailsViewRef}/>
      <LoadingIndicator ref={global.loadingIndicatorRef}/>
    </View>;
  }
};
