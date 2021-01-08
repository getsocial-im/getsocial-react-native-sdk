/* eslint-disable require-jsdoc */
// @flow

import {GetSocial, Action} from 'getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import {View, Alert} from 'react-native';

const globalActionProcessor = async (actionToProcess: Action) => {
  if (actionToProcess.type == 'open_profile') {
    Alert.alert('Open profile', actionToProcess.toJSON());
  } else if (actionToProcess.type == 'open_invites' || actionToProcess.type == 'open_activity' || actionToProcess.type == 'open_url') {
    GetSocial.handleAction(actionToProcess);
  } else {
    Alert.alert('Unknown action', actionToProcess.toJSON());
  }
};

export {globalActionProcessor};

