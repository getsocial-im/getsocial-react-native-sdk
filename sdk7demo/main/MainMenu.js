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
    static navigationOptions = {title: '', headerShown: false};

    constructor(props: any) {
        super(props);

        const userManagementMenu = new MenuItem();
        userManagementMenu.key = 'user-management';
        userManagementMenu.title = 'User Management';
        userManagementMenu.navigateTo = 'UMMenu';

        const friendsMenu = new MenuItem();
        friendsMenu.key = 'friends';
        friendsMenu.title = 'Friends';
        friendsMenu.navigateTo = 'FriendsMenu';

        const invitesMenu = new MenuItem();
        invitesMenu.key = 'invites';
        invitesMenu.title = 'Smart Invites';
        invitesMenu.navigateTo = 'InvitesMenu';

        const activitiesMenu = new MenuItem();
        activitiesMenu.key = 'activities';
        activitiesMenu.title = 'Activities';
        activitiesMenu.navigateTo = 'ActivitiesMenu';

        const tagsMenu = new MenuItem();
        tagsMenu.key = 'tags';
        tagsMenu.title = 'Tags';
        tagsMenu.navigateTo = 'TagsList';

        const topicsMenu = new MenuItem();
        topicsMenu.key = 'topicsmenu';
        topicsMenu.title = 'Topics';
        topicsMenu.navigateTo = 'TopicsMenu';

        const groupsMenu = new MenuItem();
        groupsMenu.key = 'groupsmenu';
        groupsMenu.title = 'Groups';
        groupsMenu.navigateTo = 'GroupsMenu';

        const chatsListMenu = new MenuItem();
        chatsListMenu.key = 'chatslist';
        chatsListMenu.title = 'Chats';
        chatsListMenu.navigateTo = 'ChatsList';

        const usersMenu = new MenuItem();
        usersMenu.key = 'users';
        usersMenu.title = 'Users';
        usersMenu.navigateTo = 'UsersList';

        const notificationsMenu = new MenuItem();
        notificationsMenu.key = 'notifications';
        notificationsMenu.title = 'Notifications';
        notificationsMenu.navigateTo = 'NotificationsMenu';

        const promoCodesMenu = new MenuItem();
        promoCodesMenu.key = 'promo-codes';
        promoCodesMenu.title = 'Promo codes';
        promoCodesMenu.navigateTo = 'PromoCodesMenu';

        const eventTrackingMenu = new MenuItem();
        eventTrackingMenu.key = 'event-tracking';
        eventTrackingMenu.title = 'Event tracking';
        eventTrackingMenu.navigateTo = 'EventTrackingMenu';

        const uiConfigMenu = new MenuItem();
        uiConfigMenu.key = 'ui-config';
        uiConfigMenu.title = 'UI Customization';
        uiConfigMenu.navigateTo = 'UICustomizationMenu';

        const settingsMenu = new MenuItem();
        settingsMenu.key = 'settings';
        settingsMenu.title = 'Settings';
        settingsMenu.navigateTo = 'SettingsMenu';

        const mainMenu = [userManagementMenu,
            friendsMenu,
            invitesMenu,
            activitiesMenu,
            tagsMenu,
            topicsMenu,
            groupsMenu,
            chatsListMenu,
            usersMenu,
            notificationsMenu,
            promoCodesMenu,
            eventTrackingMenu,
            uiConfigMenu,
            settingsMenu];

        this.state = {
            menu: mainMenu,
        };
        global.userInfoComponentRef = React.createRef();
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
                <UserInfoComponent ref={global.userInfoComponentRef}/>
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


