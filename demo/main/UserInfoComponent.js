// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {NativeModules, Text, View, Image, DeviceEventEmitter, NativeEventEmitter, Platform} from 'react-native';
import {UserInfoComponentStyle} from './UserInfoComponentStyle';
import {GetSocial, GetSocialUser} from 'getsocial-react-native-sdk';

type Props = {}
type State = {
  userName : string,
  sdkState : string
}
export default class UserInfoComponent extends Component<Props, State> {
  updateUserInfo() {
    GetSocialUser.getDisplayName().then((displayName) => {
      this.setState({userName: displayName});
    });
  }
  constructor(props: any) {
    super(props);
    this.state = {
      userName: 'Anonymous',
      sdkState: 'Offline',
    };
    // Listen for events to set the proper information
    GetSocialUser.onUserChanged(() => {
      this.updateUserInfo();
    });

    GetSocial.whenInitialized(() => {
      this.setState({sdkState: 'Online'});
      this.updateUserInfo();
    });
  }

  render() {
    return (
      <View style={UserInfoComponentStyle.userInfoComponent}>
        <View style={{flex: 0, width: 40, height: 40, backgroundColor: 'skyblue'}}>
          <Image source={require('./../img/avatar_default.png')} style={UserInfoComponentStyle.userAvatar}/>
        </View>
        <View style={UserInfoComponentStyle.userDetailsContainer}>
          <Text style={UserInfoComponentStyle.username}>{this.state.userName}</Text>
          <Text style={UserInfoComponentStyle.userinfo}>{this.state.sdkState}</Text>
        </View>
      </View>
    );
  }
}
