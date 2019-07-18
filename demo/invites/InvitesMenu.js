/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, View, FlatList, TouchableWithoutFeedback, Text} from 'react-native';
import {GetSocial, GetSocialUI} from 'getsocial-react-native-sdk';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class InvitesMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Invites'};

    openInvitesUI = async () => {
      GetSocialUI.createInvitesView().show();
    }

    checkReferralData = async () => {
      showLoading();
      GetSocial.getReferralData().then((referralData) => {
        hideLoading();
        if (referralData == null) {
          Alert.alert('Referral data', 'No referral data.');
        } else {
          Alert.alert('Referral data', JSON.stringify(referralData));
        }
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    clearReferralData = async () => {
      showLoading();
      GetSocial.clearReferralData().then(() => {
        hideLoading();
        Alert.alert('Referral data', 'Referral data was cleared.');
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    checkReferredUsers = async () => {
      showLoading();
      GetSocial.getReferredUsers().then((referredUsers) => {
        hideLoading();
        if (referredUsers.length > 0) {
          Alert.alert('Referred Users', JSON.stringify(referredUsers));
        } else {
          Alert.alert('Referred Users', 'No referred users.');
        }
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    createInviteUrl = async () => {
      showLoading();
      GetSocial.createInviteLink().then((inviteUrl) => {
        hideLoading();
        Alert.alert('Invite URL', inviteUrl);
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    constructor(props: any) {
      super(props);

      const openInvitesUI = new MenuItem();
      openInvitesUI.key = 'send-basic-invite';
      openInvitesUI.title = 'Open Smart Invites UI';
      openInvitesUI.action = () => this.openInvitesUI();

      const sendCustomInvite = new MenuItem();
      sendCustomInvite.key = 'send-custom-invite';
      sendCustomInvite.title = 'Send Customized Smart Invite';
      sendCustomInvite.navigateTo = 'SendCustomInvite';

      const createInviteUrl = new MenuItem();
      createInviteUrl.key = 'create-invite-url';
      createInviteUrl.title = 'Create Invite Link';
      createInviteUrl.action = () => this.createInviteUrl();

      const checkReferralData = new MenuItem();
      checkReferralData.key = 'check-referral-data';
      checkReferralData.title = 'Check Referral Data';
      checkReferralData.action = () => this.checkReferralData();

      const clearReferralData = new MenuItem();
      clearReferralData.key = 'clear-referral-data';
      clearReferralData.title = 'Clear Referral Data';
      clearReferralData.action = () => this.clearReferralData();

      const checkReferredUsers = new MenuItem();
      checkReferredUsers.key = 'check-referred-users';
      checkReferredUsers.title = 'Check Referred Users';
      checkReferredUsers.action = () => this.checkReferredUsers();

      const sendInviteWithoutUI = new MenuItem();
      sendInviteWithoutUI.key = 'send-invite-wo-ui';
      sendInviteWithoutUI.title = 'Send Invite Without UI';
      sendInviteWithoutUI.navigateTo = 'SendInviteWOUI';

      const mainMenu = [openInvitesUI, sendCustomInvite,
        createInviteUrl, checkReferralData, clearReferralData, checkReferredUsers, sendInviteWithoutUI];

      this.state = {
        menu: mainMenu,
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

