// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {GetSocial, InviteChannel} from 'getsocial-react-native-sdk';

type Props = { navigation: Function }
type State = {
    inviteChannels: [InviteChannel]
}

export default class SendInviteWOUI extends Component<Props, State> {
    static navigationOptions = {title: 'Select Invite Channel'};

    loadAvailableChannels = async () => {
      showLoading();
      GetSocial.getInviteChannels().then((inviteChannels) => {
        hideLoading();
        this.setState({inviteChannels: inviteChannels});
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    sendInvite = async (channelId: string) => {
      showLoading();
      GetSocial.sendInvite(channelId, null, null, () => {
        hideLoading();
        Alert.alert('Success', 'Invite was sent');
      }, () => {
        hideLoading();
        Alert.alert('Cancel', 'Invite sending was canceled');
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error);
      });
    }

    constructor(props: any) {
      super(props);

      // $FlowFixMe
      const emptyInviteChannels: [InviteChannel]= [];
      this.state = {
        inviteChannels: emptyInviteChannels,
      };
    }

    componentDidMount() {
      this.loadAvailableChannels();
    }

    render() {
      return (
        <View style={MenuStyle.container}>
          {/* menu starts */}
          <View style={MenuStyle.menuContainer}>
            <FlatList style={{flex: 1}}
              data={this.state.inviteChannels}
              renderItem={({item}) => (
                <TouchableWithoutFeedback onPress={ () => this.sendInvite(item.channelId)}>
                  <View style={MenuStyle.listitem}>
                    <Text style={MenuStyle.menuitem}>{item.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.channelId}
            />
          </View>
          {/* menu ends */}
        </View>
      );
    }
}

