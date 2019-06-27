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
import React from 'react';
// eslint-disable-next-line no-unused-vars
import {LoadingIndicator} from './common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {View} from 'react-native';

const MainNavigator = createStackNavigator({
  MainMenu: {screen: MainMenu},
  SettingsMenu: {screen: SettingsMenu},
  ChangeLanguageMenu: {screen: ChangeLanguageMenu},
  UICustomizationMenu: {screen: UICustomizationMenu},
  SendCustomInvite: {screen: SendCustomInvite},
  InvitesMenu: {screen: InvitesMenu},
  UMMenu: {screen: UserManagementMenu},
  FriendsMenu: {screen: FriendsMenu},
  SuggestedFriends: {screen: SuggestedFriends},
  SendInviteWOUI: {screen: SendInviteWOUI},
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
  }

  render() {
    return <View style={{flex: 1}}>
      <AppContainer/>
      <LoadingIndicator ref={global.loadingIndicatorRef}/>
    </View>;
  }
};
