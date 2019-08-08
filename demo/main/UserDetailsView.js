/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Platform, DeviceEventEmitter, NativeEventEmitter, Modal, View, Text, FlatList, ScrollView, TextInput, Button} from 'react-native';
// eslint-disable-next-line no-unused-vars
import {CheckBox} from 'react-native-elements';
// eslint-disable-next-line no-unused-vars
import {UserDetailsViewStyle} from './UserDetailsViewStyle.js';
import {GetSocialUser} from 'getsocial-react-native-sdk';

type Props = {}
type State = {
  visible: boolean,
  userId: string,
  displayName: string,
  avatarUrl: ?string,
  publicProperties: string,
  privateProperties: string,
  authIdentities: string,
}

const showUserDetailsView = () => {
  global.userDetailsViewRef.current.setState({visible: true});
  global.userDetailsViewRef.current.updateUserDetails();
};

class UserDetailsView extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      userId: '',
      displayName: '',
      avatarUrl: undefined,
      publicProperties: '',
      privateProperties: '',
      authIdentities: '',
    };
  }

  updateUserDetails() {
    GetSocialUser.getUserId().then((userId) => {
      this.setState({userId: userId});
    });
    GetSocialUser.getDisplayName().then((displayName) => {
      this.setState({displayName: displayName});
    });
    GetSocialUser.getAvatarUrl().then((avatarUrl) => {
      if (avatarUrl != '') {
        this.setState({avatarUrl: avatarUrl});
      } else {
        this.setState({avatarUrl: undefined});
      }
    });
    GetSocialUser.isAnonymous().then((isAnonymous) => {
      if (isAnonymous) {
        this.setState({authIdentities: 'Anonymous'});
      } else {
        GetSocialUser.getAuthIdentities().then((authIdentities: Map<string, string>) => {
          this.setState({authIdentities: JSON.stringify(authIdentities)});
        });
      }
    });
    GetSocialUser.allPublicProperties().then((publicProperties) => {
      this.setState({publicProperties: JSON.stringify(publicProperties)});
    });
    GetSocialUser.allPrivateProperties().then((privateProperties) => {
      this.setState({privateProperties: JSON.stringify(privateProperties)});
    });
  }

  closeView = async () => {
    this.setState({visible: false});
  }

  render() {
    return (
      <Modal animationType="slide"
        transparent={false}
        visible={this.state.visible}
        onRequestClose={() => {}}>
        <ScrollView style={{flex: 1, padding: 10}}>
          <Button title={'Close'} onPress={() => this.closeView()}/>
          <View style={UserDetailsViewStyle.formEntryRow}>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text style={UserDetailsViewStyle.formEntryTitle} >Display name:</Text>
            </View>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text accessibilityLabel='Display name'>{this.state.displayName}</Text>
            </View>
          </View>
          <View style={UserDetailsViewStyle.formEntryRow}>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text style={UserDetailsViewStyle.formEntryTitle} >User Id:</Text>
            </View>
            <View style={UserDetailsViewStyle.formEntryInputContainer}>
              <TextInput accessibilityLabel='User Id' style={UserDetailsViewStyle.formEntryInput} value={this.state.userId}/>
            </View>
          </View>
          <View style={UserDetailsViewStyle.formEntryRow}>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text style={UserDetailsViewStyle.formEntryTitle} >Avatar Url:</Text>
            </View>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text accessibilityLabel='Avatar Url'>{this.state.privateProperties}</Text>
            </View>
          </View>
          <View style={UserDetailsViewStyle.formEntryRow}>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text style={UserDetailsViewStyle.formEntryTitle} >Auth identities: </Text>
            </View>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text accessibilityLabel='Auth identities'>{this.state.authIdentities}</Text>
            </View>
          </View>
          <View style={UserDetailsViewStyle.formEntryRow}>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text style={UserDetailsViewStyle.formEntryTitle} >Public properties:</Text>
            </View>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text accessibilityLabel='Public properties'>{this.state.publicProperties}</Text>
            </View>
          </View>
          <View style={UserDetailsViewStyle.formEntryRow}>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text style={UserDetailsViewStyle.formEntryTitle} >Private properties:</Text>
            </View>
            <View style={UserDetailsViewStyle.formEntryTitleContainer}>
              <Text accessibilityLabel='Private properties'>{this.state.privateProperties}</Text>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

export {UserDetailsView, showUserDetailsView};
