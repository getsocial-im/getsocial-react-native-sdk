// @flow

import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainMenu from './main/MainMenu';
import ChangeLanguageMenu from './settings/ChangeLanguageMenu';
import InvitesMenu from './invites/InvitesMenu';
import UICustomizationMenu from './uicustomization/UICustomizationMenu';
import SettingsMenu from './settings/SettingsMenu';
import SendCustomInvite from './invites/SendCustomInvite';

const MainNavigator = createStackNavigator({
  MainMenu: {screen: MainMenu},
  SettingsMenu: {screen: SettingsMenu},
  ChangeLanguageMenu: {screen: ChangeLanguageMenu},
  UICustomizationMenu: {screen: UICustomizationMenu},
  SendCustomInvite: {screen: SendCustomInvite},
  InvitesMenu: {screen: InvitesMenu},
},
{
  initialRouteName: 'MainMenu',
});

const App = createAppContainer(MainNavigator);

export {App};


