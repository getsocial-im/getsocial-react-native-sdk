// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, Modal, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {ActionButton, Notification, NotificationsQuery, GetSocialUser} from 'getsocial-react-native-sdk';
import {NotificationsListStyle} from './NotificationsListStyle.js';
// eslint-disable-next-line no-unused-vars
import {FilterNotificationsView, showFilterView} from './FilterNotificationsView.js';
import {globalActionProcessor} from './../common/CommonMethods.js';
import moment from 'moment';

type Props = { navigation: Function }
type State = {
    notifications: [Notification],
    filterSettingsVisible: boolean,
    query: NotificationsQuery,
}

export default class NotificationsList extends Component<Props, State> {
    static navigationOptions = ({navigation}: Props) => {
      return {
        headerTitle: 'Received notifications',
        headerRight: (
          <Button
            onPress={navigation.getParam('showFilterSettings')}
            title="Filter"
          />
        ),
      };
    };

    showFilterSettings = async () => {
      showFilterView((filterParams) => {
        if (filterParams != null) {
          const statusFilter = filterParams['STATUS_FILTER'];
          const actionFilter = filterParams['ACTIONID_FILTER'];
          const typeFilter = filterParams['TYPE_FILTER'];
          let query = null;
          if (statusFilter.length == 0) {
            query = NotificationsQuery.withAllStatus();
          } else {
            query = NotificationsQuery.withStatus(statusFilter);
          }
          query = query.withActions(actionFilter).ofTypes(typeFilter);
          this.setState({query: query}, () => {
            this.loadNotifications();
          });
        }
      });
    }

    loadNotifications = async () => {
      showLoading();
      GetSocialUser.getNotifications(this.state.query).then((notifications) => {
        hideLoading();
        this.setState({notifications: notifications});
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    updateNotificationStatus = async (index: number, newStatus: string) => {
      this.setState((prevState) => {
        const copiedData = prevState.notifications;
        copiedData[index].status = newStatus;
        return {notifications: copiedData};
      });
    }

    changeNotificationStatus = async (index: number, notificationId: string, newStatus: string) => {
      showLoading();
      GetSocialUser.setNotificationsStatus([notificationId], newStatus).then(() => {
        hideLoading();
        this.updateNotificationStatus(index, newStatus);
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }


    constructor(props: any) {
      super(props);

      // $FlowFixMe
      const emptyNotifications: [Notification]= [];
      this.state = {
        notifications: emptyNotifications,
        filterSettingsVisible: false,
        query: NotificationsQuery.withAllStatus(),
      };
      global.filterViewRef = React.createRef();
    }

    componentDidMount() {
      this.loadNotifications();
      this.props.navigation.setParams({showFilterSettings: this.showFilterSettings});
    }

    drawNotificationImage(imageUrl: ?string) {
      if (imageUrl == undefined) {
        return null;
      }
      return <Image source={{uri: imageUrl}} style={{height: 100, width: 200}}/>;
    }

    processAction = async (index: number, notification: Notification, selectedActionButton: ActionButton) => {
      let newStatus = 'read';
      if (selectedActionButton.actionId == 'consume') {
        newStatus = 'consumed';
      } else if (selectedActionButton.actionId == 'ignore') {
        newStatus = 'ignored';
      }
      globalActionProcessor(notification.action);
      this.changeNotificationStatus(index, notification.id, newStatus);
    }

    drawActionButtons(index: number, notification: Notification) {
      const buttons = [];
      notification.actionButtons.forEach((actionButton, buttonIndex) => {
        buttons.push(<Button key={'BTN' + buttonIndex} title={actionButton.title} onPress={() => this.processAction(index, notification, actionButton)}/>);
      });
      return buttons;
    }

    render() {
      return (
        <View style={MenuStyle.container}>
          <FilterNotificationsView ref={global.filterViewRef}/>
          {/* menu starts */}
          <View style={MenuStyle.menuContainer}>
            <FlatList style={{flex: 1}}
              data={this.state.notifications}
              renderItem={({index, item}) => (
                <TouchableWithoutFeedback onPress={ () => {
                  this.changeNotificationStatus(index, item.id, 'read');
                }}>
                  <View style={[NotificationsListStyle.notificationListItem && item.status == 'unread' ? NotificationsListStyle.statusUnread : NotificationsListStyle.statusRead]}>
                    <Text style={MenuStyle.menuitem}>Created at: {moment(new Date(item.createdAt * 1000)).format('DD/MM/YYYY hh:mm')}</Text>
                    <Text style={MenuStyle.menuitem}>Title: {item.title}</Text>
                    <Text style={MenuStyle.menuitem}>Text: {item.text}</Text>
                    <Text style={MenuStyle.menuitem}>Status: {item.status}</Text>
                    <Text style={MenuStyle.menuitem}>Type: {item.type}</Text>
                    {this.drawNotificationImage(item.imageUrl)}
                    {this.drawActionButtons(index, item)}
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          {/* menu ends */}
        </View>
      );
    }
}

