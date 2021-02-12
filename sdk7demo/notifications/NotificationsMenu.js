// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {FlatList, Alert, Text, View, TouchableWithoutFeedback} from 'react-native';
import NotificationCenterView from '../getsocial-react-native-sdk/models/notifications/NotificationCenterView';
import NotificationsQuery from '../getsocial-react-native-sdk/models/notifications/NotificationsQuery';
import GetSocialUI from '../getsocial-react-native-sdk/GetSocialUI.js';
import {globalActionProcessor} from './../common/CommonMethods.js';
import {Notifications} from 'getsocial-react-native-sdk';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class NotificationsMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Notifications'};

    showNotificationCenterUI = async () => {
        const query = NotificationsQuery.withAllStatus();
        const notificationCenterView = NotificationCenterView.create(query);
        notificationCenterView.onNotificationClickListener = (notification, context) => {
            GetSocialUI.closeView();
            this.changeNotificationStatus(notification.id, 'read');
            globalActionProcessor(notification.action);
        };
        // notificationCenterView.setActionButtonClickListener((actionButton, notification) => {
        //   Alert.alert('Status',
        //       'Action button [' + actionButton.actionId + '] for notification [' + notification.id + '] clicked'
        //   );
        // });
        notificationCenterView.show();
    }

    changeNotificationStatus = async (notificationId: string, newStatus: string) => {
        Notifications.setStatus(newStatus, [notificationId]).then(() => {
            // nothing to do here
        }, (error) => {
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        const notificationsList = new MenuItem();
        notificationsList.key = 'notifications-list';
        notificationsList.title = 'Notifications List';
        notificationsList.navigateTo = 'NotificationsList';

        const sendNotification = new MenuItem();
        sendNotification.key = 'send-notification';
        sendNotification.title = 'Send Notification';
        sendNotification.navigateTo = 'SendNotification';

        const notificationCenterUI = new MenuItem();
        notificationCenterUI.key = 'notification-ui';
        notificationCenterUI.title = 'Notification Center UI';
        notificationCenterUI.action = () => this.showNotificationCenterUI();

        const notificationsMenu = [notificationsList, sendNotification, notificationCenterUI];

        this.state = {
            menu: notificationsMenu,
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
