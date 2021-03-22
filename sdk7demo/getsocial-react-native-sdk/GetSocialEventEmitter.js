/* eslint-disable max-len */
// @flow

import {DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform} from 'react-native';
const {RNGetSocial} = NativeModules;

export const GetSocialEventEmitter = Platform.select({
    android: DeviceEventEmitter,
    ios: new NativeEventEmitter(RNGetSocial),
});
