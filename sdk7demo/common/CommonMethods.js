/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import {GetSocial, GetSocialUI, Action} from 'getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import {View, Alert} from 'react-native';
import ChatMessagesListView from './../communities/ChatMessagesList';

const globalActionProcessor = async (actionToProcess: Action) => {
    if (actionToProcess.type == 'open_profile') {
        Alert.alert('Open profile', JSON.stringify(actionToProcess));
    } else if (actionToProcess.type == 'open_invites' ||
            actionToProcess.type == 'open_activity' ||
            actionToProcess.type == 'open_url' ||
            actionToProcess.type == 'add_friend' ||
            actionToProcess.type == 'claim_promo_code' ||
            actionToProcess.type == 'add_group_member') {
        Alert.alert('Success', 'Action ' + actionToProcess.type + ' handled in native SDK');
        GetSocial.handleAction(actionToProcess);
    } else if (actionToProcess.type == 'open_chat') {
        GetSocialUI.closeView();
        ChatMessagesListView.stringChatId = actionToProcess.data['$chat_id'];
        global.navigationRef.current._navigation.navigate('ChatMessagesView');
    } else {
        Alert.alert('Unknown action', JSON.stringify(actionToProcess));
    }
};

export {globalActionProcessor};

