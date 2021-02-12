/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import {GetSocial, GetSocialUI, Action} from 'getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import {View, Alert} from 'react-native';
import ChatMessagesListView from './../communities/ChatMessagesList';

const globalActionProcessor = async (actionToProcess: Action) => {
    if (actionToProcess.type == 'open_profile') {
        Alert.alert('Open profile', actionToProcess.toJSON());
    } else if (actionToProcess.type == 'open_invites' || actionToProcess.type == 'open_activity' || actionToProcess.type == 'open_url') {
        GetSocial.handleAction(actionToProcess);
    } else if (actionToProcess.type == 'open_chat') {
        GetSocialUI.closeView();
        ChatMessagesListView.stringChatId = actionToProcess.data['$chat_id'];
        global.navigationRef.current._navigation.navigate('ChatMessagesView');
    } else {
        Alert.alert('Unknown action', actionToProcess.toJSON());
    }
};

export {globalActionProcessor};

