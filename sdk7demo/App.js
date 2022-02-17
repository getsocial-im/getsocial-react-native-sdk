/* eslint-disable max-len */
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
import CreateGroupView from './communities/CreateGroup.js';
import UpdateGroupView from './communities/UpdateGroup.js';
import AddGroupMemberView from './communities/AddGroupMember.js';
import GroupsListView from './communities/GroupsList.js';
import GroupMembersListView from './communities/GroupMembersList.js';
import TopicsMenu from './communities/TopicsMenu.js';
import GroupsMenu from './communities/GroupsMenu.js';
import UsersListView from './communities/UsersList.js';
import ChatsListView from './communities/ChatsList.js';
import ChatMessagesListView from './communities/ChatMessagesList.js';
import FollowersListView from './communities/FollowersList.js';
import FollowingsListView from './communities/FollowingsList.js';
import ActivitiesMenu from './communities/ActivitiesMenu.js';
import PollsListView from './communities/PollsList.js';
import VotesListView from './communities/VotesList.js';
import VoteView from './communities/Vote.js';
import CreatePollView from './communities/CreatePoll.js';
import LabelsListView from './communities/LabelsList.js';
import LabelsMenu from './communities/LabelsMenu';
import TagsMenu from './communities/TagsMenu';

// eslint-disable-next-line no-unused-vars
import {View, Alert} from 'react-native';
import {Notifications, Invites} from 'getsocial-react-native-sdk';
import CreateActivityPost from './communities/CreateActivityPost';
import UpdateActivityPost from './communities/UpdateActivityPost';
import SetReferrer from './invites/SetReferrer';
import CreatePromoCode from './promocodes/CreatePromoCode';
import ClaimPromoCode from './promocodes/ClaimPromoCode';
import PromoCodeInfo from './promocodes/PromoCodeInfo';
import AddCustomIdentity from './usermanagement/AddCustomIdentity';
import AddTrustedIdentity from './usermanagement/AddTrustedIdentity';
import InitWithCustomIdentity from './usermanagement/InitWithCustomIdentity';
import InitWithTrustedIdentity from './usermanagement/InitWithTrustedIdentity';
import RemoveTrustedIdentity from './usermanagement/RemoveTrustedIdentity';
import ActivitiesListView from './communities/ActivitiesList';
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
    LabelsList: {screen: LabelsListView},
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
    AddCustomIdentity: {screen: AddCustomIdentity},
    AddTrustedIdentity: {screen: AddTrustedIdentity},
    InitWithTrustedIdentity: {screen: InitWithTrustedIdentity},
    InitWithCustomIdentity: {screen: InitWithCustomIdentity},
    RemoveTrustedIdentity: {screen: RemoveTrustedIdentity},
    TopicsMenu: {screen: TopicsMenu},
    LabelsMenu: {screen: LabelsMenu},
    TagsMenu: {screen: TagsMenu},
    GroupsMenu: {screen: GroupsMenu},
    GroupsList: {screen: GroupsListView},
    GroupMembersList: {screen: GroupMembersListView},
    ChatsList: {screen: ChatsListView},
    ChatMessagesView: {screen: ChatMessagesListView},
    CreateGroup: {screen: CreateGroupView},
    UpdateGroup: {screen: UpdateGroupView},
    AddGroupMember: {screen: AddGroupMemberView},
    VotesList: {screen: VotesListView},
    PollsList: {screen: PollsListView},
    Vote: {screen: VoteView},
    CreatePoll: {screen: CreatePollView},
    ActivitiesList: {screen: ActivitiesListView},
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
        global.navigationRef = React.createRef();
        global.loadingIndicatorRef = React.createRef();
        global.userDetailsViewRef = React.createRef();
    }

    componentDidMount() {
    // // Listen for events to set the proper information
        Notifications.setOnNotificationReceivedListener((notification) => {
            Notifications.setStatus('read', [notification.id]);
            if (notification.action !== undefined && notification.action != null) {
                globalActionProcessor(notification.action);
            } else {
                Alert.alert('Notification received', notification.toJSON());
            }
        });
        Notifications.setOnNotificationClickedListener((notification, context) => {
            Notifications.setStatus('read', [notification.id]);
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
            <AppContainer ref={global.navigationRef}/>
            <UserDetailsView ref={global.userDetailsViewRef}/>
            <LoadingIndicator ref={global.loadingIndicatorRef}/>
        </View>;
    }
}
