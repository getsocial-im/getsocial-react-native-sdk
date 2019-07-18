/* eslint-disable require-jsdoc */
// @flow

import {GetSocial, Action} from 'getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import {View, Alert} from 'react-native';

const globalActionProcessor = async (actionToProcess: Action) => {
  if (actionToProcess.type == 'open_profile') {
    Alert.alert('Open profile', JSON.stringify(actionToProcess));
  } else if (actionToProcess.type == 'custom') {
    Alert.alert('Executing Custom Action', JSON.stringify(actionToProcess));
  } else {
    Alert.alert('Calling default action', JSON.stringify(actionToProcess));
    GetSocial.processAction(actionToProcess);
  }
};

export {globalActionProcessor};

