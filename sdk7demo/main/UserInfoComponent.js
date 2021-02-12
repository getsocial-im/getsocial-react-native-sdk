// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {NativeModules, Text, TouchableWithoutFeedback, View, Image, Alert} from 'react-native';
import {UserInfoComponentStyle} from './UserInfoComponentStyle';
import {GetSocial} from 'getsocial-react-native-sdk';
import {showUserDetailsView} from './UserDetailsView.js';

type Props = {}
type State = {
  userDisplayName : string,
  userAvatarUrl : ?string,
  userIdentities : string,
}

export default class UserInfoComponent extends Component<Props, State> {
    updateUserInfo() {
        GetSocial.getCurrentUser().then((currentUser) => {
            this.setState({userDisplayName: currentUser.displayName});
            if (currentUser.avatarUrl !== '') {
                this.setState({userAvatarUrl: currentUser.avatarUrl});
            } else {
                this.setState({userAvatarUrl: undefined});
            }
            if (currentUser.isAnonymous()) {
                this.setState({userIdentities: 'Anonymous'});
            } else {
                this.setState({userIdentities: JSON.stringify(currentUser.identities)});
            }
        });
    }
    constructor(props: any) {
        super(props);
        this.state = {
            userDisplayName: 'N/A',
            userAvatarUrl: undefined,
            userIdentities: 'Offline',
        };
    }

    componentDidMount() {
    // Listen for events to set the proper information
        GetSocial.addOnCurrentUserChangedListener((newUser) => {
            this.updateUserInfo();
        });

        GetSocial.addOnInitializedListener(() => {
            this.updateUserInfo();
        });
    }

  showUserDetails = async () => {
      showUserDetailsView();
  }

  render() {
      let userImage;
      if (this.state.userAvatarUrl == undefined) {
          userImage = <Image source={require('./../img/avatar_default.png')} style={UserInfoComponentStyle.userAvatar}/>;
      } else {
          userImage = <Image source={{uri: this.state.userAvatarUrl}} style={UserInfoComponentStyle.userAvatar}/>;
      }
      return (
          <TouchableWithoutFeedback onPress={() => this.showUserDetails()}>
              <View style={UserInfoComponentStyle.userInfoComponent}>
                  <View style={{flex: 0, width: 40, height: 40, backgroundColor: 'skyblue'}}>
                      {userImage}
                  </View>
                  <View style={UserInfoComponentStyle.userDetailsContainer}>
                      <Text style={UserInfoComponentStyle.username}>{this.state.userDisplayName}</Text>
                      <Text style={UserInfoComponentStyle.userinfo}>{this.state.userIdentities}</Text>
                  </View>
              </View>
          </TouchableWithoutFeedback>
      );
  }
}
