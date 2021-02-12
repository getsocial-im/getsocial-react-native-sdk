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
import {Invites, InvitesView, ReferralUsersQuery, PagingQuery, PagingResult, ReferralUser} from './../getsocial-react-native-sdk';
import ReferralData from '../getsocial-react-native-sdk/models/invites/ReferralData';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class InvitesMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Invites'};
    static storedReferralData: ReferralData;

    openInvitesUI = async () => {
        new InvitesView().show();
    }

    checkReferredUsers = async () => {
        showLoading();
        const query = ReferralUsersQuery.allUsers();
        Invites.getReferredUsers(new PagingQuery(query)).then((result: PagingResult<ReferralUser>) => {
            hideLoading();
            if (result.entries.length > 0) {
                Alert.alert('Referred Users', JSON.stringify(result.entries));
            } else {
                Alert.alert('Referred Users', 'No referred users.');
            }
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    checkReferrerUsers = async () => {
        showLoading();
        const query = ReferralUsersQuery.allUsers();
        Invites.getReferrerUsers(new PagingQuery(query)).then((result: PagingResult<ReferralUser>) => {
            hideLoading();
            if (result.entries.length > 0) {
                Alert.alert('Referrer Users', JSON.stringify(result.entries));
            } else {
                Alert.alert('Referrer Users', 'No referrer users.');
            }
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    showReferralData = async () => {
        if (InvitesMenu.storedReferralData != null) {
            Alert.alert('Referral Data', JSON.stringify(InvitesMenu.storedReferralData));
        } else {
            Alert.alert('Referral Data', 'No referral data');
        }
    }

    createInviteUrl = async () => {
        showLoading();
        Invites.createURL(null).then((inviteUrl) => {
            hideLoading();
            Alert.alert('URL', inviteUrl + '\n \n \n');
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
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
        checkReferralData.action = () => this.showReferralData();

        const checkReferredUsers = new MenuItem();
        checkReferredUsers.key = 'check-referred-users';
        checkReferredUsers.title = 'Check Referred Users';
        checkReferredUsers.action = () => this.checkReferredUsers();

        const checkReferrerUsers = new MenuItem();
        checkReferrerUsers.key = 'check-referrer-users';
        checkReferrerUsers.title = 'Check Referrer Users';
        checkReferrerUsers.action = () => this.checkReferrerUsers();

        const sendInviteWithoutUI = new MenuItem();
        sendInviteWithoutUI.key = 'send-invite-wo-ui';
        sendInviteWithoutUI.title = 'Send Invite Without UI';
        sendInviteWithoutUI.navigateTo = 'SendInviteWOUI';

        const setReferrerUser = new MenuItem();
        setReferrerUser.key = 'set-referrer-user';
        setReferrerUser.title = 'Set Referrer';
        setReferrerUser.navigateTo = 'SetReferrer';

        const mainMenu = [openInvitesUI, sendCustomInvite,
            createInviteUrl, sendInviteWithoutUI, checkReferralData, checkReferredUsers, checkReferrerUsers, setReferrerUser];

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

