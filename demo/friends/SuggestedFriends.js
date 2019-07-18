// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
import {FriendsMenuStyle} from './FriendsMenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {GetSocialUser, SuggestedFriend} from 'getsocial-react-native-sdk';

type Props = { navigation: Function }
type State = {
    suggestedFriends: [SuggestedFriend]
}

export default class SuggestedFriends extends Component<Props, State> {
    static navigationOptions = {title: 'Suggested Friends'};

    loadSuggestedFriends = async () => {
      showLoading();
      GetSocialUser.getSuggestedFriends(0, 20).then((suggestedFriendsList: [SuggestedFriend]) => {
        hideLoading();
        Alert.alert('Result', 'Number of suggested friends: ' + suggestedFriendsList.length);
        this.setState({suggestedFriends: suggestedFriendsList});
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    addFriend = async (suggestedFriendGUID: string) => {
      showLoading();
      GetSocialUser.addFriend(suggestedFriendGUID).then((friendsNumber) => {
        hideLoading();
        Alert.alert('Friend Added', 'Number of friends: ' + friendsNumber);
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    constructor(props: any) {
      super(props);

      // $FlowFixMe
      const emptySuggestedFriends: [SuggestedFriend]= [];
      this.state = {
        suggestedFriends: emptySuggestedFriends,
      };
    }

    componentDidMount() {
      this.loadSuggestedFriends();
    }

    render() {
      return (
        <View style={MenuStyle.container}>
          {/* menu starts */}
          <View style={MenuStyle.menuContainer}>
            <FlatList style={{flex: 1}}
              data={this.state.suggestedFriends}
              renderItem={({item}) => (
                <TouchableWithoutFeedback>
                  <View style={MenuStyle.listitem}>
                    <Text style={MenuStyle.menuitem}>{item.displayName}</Text>
                    <View style={FriendsMenuStyle.removeButtonContainer}>
                      <Button title='Add' onPress={ () => {
                        this.addFriend(item.userId);
                      }}/>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.userId}
            />
          </View>
          {/* menu ends */}
        </View>
      );
    }
}

