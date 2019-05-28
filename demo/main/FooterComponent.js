/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Platform, DeviceEventEmitter, NativeEventEmitter, View, Text} from 'react-native';
import {FooterComponentStyle} from './FooterComponentStyle';
import {GetSocial} from 'getsocial-react-native-sdk';
import {pluginVersion} from 'getsocial-react-native-sdk/package.json';

type Props = {}
type State = {
  sdkVersion: string,
  pluginVersion: string
}

export default class FooterComponent extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      sdkVersion: 'N/A',
      pluginVersion: pluginVersion,
    };
    GetSocial.whenInitialized(() => {
      GetSocial.getSdkVersion().then((version) => {
        this.setState({sdkVersion: version});
      });
    });
  }

  render() {
    return (
      <View style={FooterComponentStyle.footerComponent}>
        <Text style={FooterComponentStyle.footerText}>GetSocial SDK: {this.state.sdkVersion}, React SDK: {this.state.pluginVersion}</Text>
      </View>
    );
  }
}
