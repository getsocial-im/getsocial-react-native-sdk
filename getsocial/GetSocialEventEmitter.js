/* eslint-disable max-len */
// @flow
import {NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter} from 'react-native';

const {RNGetSocial} = NativeModules;

/**
 * Event emitter to subscribe GetSocial related events.</br>
 * Available events:</br>
 * 1. whenInitialized: invoked when SDK finished initialization.</br>
 * 2. onUserChanged: invoked when any property of current user changed.</br>
 * 3. onGlobalError(error): invoked when an unhandled error happened.</br>
 */
export const GetSocialEventEmitter = Platform.select({
  android: DeviceEventEmitter,
  ios: new NativeEventEmitter(RNGetSocial),
});
