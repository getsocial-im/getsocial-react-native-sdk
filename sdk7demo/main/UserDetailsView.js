/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Modal, View, Text, FlatList, ScrollView, TextInput, Button} from 'react-native';
// eslint-disable-next-line no-unused-vars
import {CheckBox} from 'react-native-elements';
// eslint-disable-next-line no-unused-vars
import {UserDetailsViewStyle} from './UserDetailsViewStyle.js';
import {GetSocial} from 'getsocial-react-native-sdk';

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
            banInfo: '',
        };
    }

    updateUserDetails() {
        GetSocial.getCurrentUser().then((currentUser) => {
            this.setState({userId: currentUser.id});
            this.setState({displayName: currentUser.displayName});
            if (currentUser.avatarUrl != '') {
                this.setState({avatarUrl: currentUser.avatarUrl});
            } else {
                this.setState({avatarUrl: undefined});
            }
            if (currentUser.isAnonymous()) {
                this.setState({authIdentities: 'Anonymous'});
            } else {
                this.setState({authIdentities: JSON.stringify(currentUser.identities)});
            }
            this.setState({publicProperties: JSON.stringify(currentUser.publicProperties)});
            this.setState({privateProperties: JSON.stringify(currentUser.privateProperties)});
            currentUser.isBanned()
                .then((isBanned) => {
                    console.log ({ isBanned });
                    if (isBanned) {
                        currentUser.getBanInfo()
                            .then((banInfo) => {
                                this.setState({
                                    banInfo: JSON.stringify(banInfo)
                                });
                            })
                            .catch(console.error);
                    } else {
                        this.setState({banInfo: 'Not banned'});
                    }
                })
                .catch(console.error);
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
                          <Text accessibilityLabel='Avatar Url'>{this.state.avatarUrl}</Text>
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
                  <View style={UserDetailsViewStyle.formEntryRow}>
                      <View style={UserDetailsViewStyle.formEntryTitleContainer}>
                          <Text style={UserDetailsViewStyle.formEntryTitle} >Ban Info:</Text>
                      </View>
                      <View style={UserDetailsViewStyle.formEntryTitleContainer}>
                          <Text accessibilityLabel='Private properties'>{this.state.banInfo}</Text>
                      </View>
                  </View>
                  <Button title={'Close'} onPress={() => this.closeView()}/>
              </ScrollView>
          </Modal>
      );
  }
}

export {UserDetailsView, showUserDetailsView};
