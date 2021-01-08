/* eslint-disable require-jsdoc */
// @flow

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
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
import PromoCodesMenu from './promocodes/PromoCodesMenu';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import {LoadingIndicator} from './common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {UserDetailsView} from './main/UserDetailsView.js';
import TagsListView from './communities/TagsList.js';
import TopicsListView from './communities/TopicsList.js';
import TopicsMenu from './communities/TopicsMenu.js';
import UsersListView from './communities/UsersList.js';
import FollowersListView from './communities/FollowersList.js';
import FollowingsListView from './communities/FollowingsList.js';
import ActivitiesMenu from './communities/ActivitiesMenu.js';

// eslint-disable-next-line no-unused-vars
import {View, Alert} from 'react-native';
import {Notifications, Invites, ReferralData, Notification, NotificationContext} from 'getsocial-react-native-sdk';
import FollowersList from './communities/FollowersList';
import CreateActivityPost from './communities/CreateActivityPost';
import UpdateActivityPost from './communities/UpdateActivityPost';
import SetReferrer from './invites/SetReferrer';
import CreatePromoCode from './promocodes/CreatePromoCode';
import ClaimPromoCode from './promocodes/ClaimPromoCode';
import PromoCodeInfo from './promocodes/PromoCodeInfo';
import AddIdentity from './usermanagement/AddIdentity';
import {globalActionProcessor} from './common/CommonMethods.js';

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
  PromoCodesMenu: {screen: PromoCodesMenu},
  TagsList: {screen: TagsListView},
  TopicsList: {screen: TopicsListView},
  UsersList: {screen: UsersListView},
  FollowersList: {screen: FollowersListView},
  FollowingsList: {screen: FollowingsListView},
  ActivitiesMenu: {screen: ActivitiesMenu},
  CreateActivityPost: {screen: CreateActivityPost},
  UpdateActivityPost: {screen: UpdateActivityPost},
  CreatePromoCode: {screen: CreatePromoCode},
  ClaimPromoCode: {screen: ClaimPromoCode},
  SetReferrer: {screen: SetReferrer},
  PromoCodeInfo: {screen: PromoCodeInfo},
  AddIdentity: {screen: AddIdentity},
  TopicsMenu: {screen: TopicsMenu}
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
    // // Listen for events to set the proper information
    Notifications.setOnNotificationReceivedListener((notification) => {
      if (notification.action !== undefined && notification.action != null) {
        globalActionProcessor(notification.action);
      } else {
        Alert.alert('Notification received', notification.toJSON());
      }
    });
    Notifications.setOnNotificationClickedListener((notification, context) => {
      if (notification.action !== undefined && notification.action != null) {
        globalActionProcessor(notification.action);
      } else {
        Alert.alert('Notification clicked', notification.toJSON());
      }
    });
    Invites.setOnReferralDataReceivedListener((referralData) => {
      InvitesMenu.storedReferralData = referralData;
      Alert.alert('Referral data', JSON.stringify(referralData));
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
