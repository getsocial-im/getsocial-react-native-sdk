// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, UsersQuery, User, PagingQuery, UserId, UserIdList, FollowQuery, ActivitiesQuery, ActivitiesView} from './../getsocial-react-native-sdk';
import ActionSheet from 'react-native-actionsheet';
import FollowersQuery from '../getsocial-react-native-sdk/models/communities/FollowersQuery';
import FollowersListView from './FollowersList';
import FollowingsListView from './FollowingsList';
import SearchBar from 'react-native-search-bar';

type Props = { navigation: Function }
type State = {
    users: [User],
    selectedUser: ?User,
    friendsStatus: ?Map<string, boolean>,
    followStatus: ?Map<string, boolean>,
    searchText: string,
}

export default class UsersListView extends Component<Props, State> {
    static navigationOptions = {title: 'Users'};

    updateSearchText = async (text: String) => {
      this.setState({searchText: text})
    }

    generateOptions() : [string] {
      var options = [];
      options.push('Details');
      const areFriends = this.state.selectedUser != undefined && this.state.friendsStatus != undefined && this.state.friendsStatus[this.state.selectedUser.userId] === true;
      options.push(areFriends ? 'Remove friend': 'Add friend');
      const isFollowed = this.state.followStatus != undefined && this.state.selectedUser != undefined && this.state.followStatus[this.state.selectedUser.userId] === true;
      options.push(isFollowed ? 'Unfollow': 'Follow');
      options.push('Show Followers');
      options.push('Show Followings');
      options.push('User\'s Posts');
      options.push('User\'s Feed');
      options.push('Cancel');
      return options;
    }

    showDetails = async() => {
      Alert.alert('Details', JSON.stringify(this.state.selectedUser));
    }

    showFollowers = async() => {
      const query = FollowersQuery.ofUser(UserId.create(this.state.selectedUser.userId));
      FollowersListView.query = query;
      this.props.navigation.navigate('FollowersList');      
    }

    showFollowings = async() => {
      const query = UsersQuery.followedBy(UserId.create(this.state.selectedUser.userId));
      FollowingsListView.query = query;
      this.props.navigation.navigate('FollowingsList');      
    }

    showPosts = async() => {
      const query = ActivitiesQuery.everywhere();
      query.byUser(UserId.create(this.state.selectedUser.userId));
      ActivitiesView.create(query).show();
    }

    showFeed = async() => {
      const query = ActivitiesQuery.feedOf(UserId.create(this.state.selectedUser.userId));
      query.byUser(UserId.create(this.state.selectedUser.userId));
      ActivitiesView.create(query).show();
    }

    loadFollowStatus = async() => {
      if (this.state.users.length == 0) {
        return
      }
      var userIds = [];
      this.state.users.forEach ((element) => {
        userIds.push(element.userId);
      });
      showLoading();
      const query = FollowQuery.users(UserIdList.create(userIds));
      Communities.isFollowing(UserId.currentUser(), query).then((result) => {
        hideLoading();
        this.setState({followStatus: result});
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error.message);
      });
    }

    loadFriendsStatus = async() => {
      if (this.state.users.length == 0) {
        return
      }
      var userIds = [];
      this.state.users.forEach ((element) => {
        userIds.push(element.userId);
      });
      showLoading();
      Communities.areFriends(UserIdList.create(userIds)).then((result) => {
        hideLoading();
        this.setState({friendsStatus: result}, () => {
          this.loadFollowStatus();          
        });
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error.message);
      });
    }

    loadUsers = async () => {
      showLoading();
      const query = UsersQuery.find(this.state.searchText);
      Communities.getUsers(new PagingQuery(query)).then((result) => {
        hideLoading();
        this.setState({users: result.entries}, () => {
          this.loadFriendsStatus();
        });
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error.message);
      });
    }

    constructor(props: any) {
      super(props);

      // $FlowFixMe
      const emptyUsers: [User]= [];
      this.state = {
        users: emptyUsers,
        selectedUser: undefined,
        friendsStatus: undefined,
        searchText: null
      };
    }

    componentDidMount() {
    }

    updateFriendStatus = async() => {
      showLoading();
      const areFriends = this.state.selectedUser != undefined && this.state.friendsStatus != undefined && this.state.friendsStatus[this.state.selectedUser.userId] === true;
      if (areFriends) {
        Communities.removeFriends(UserIdList.create([this.state.selectedUser.userId])).then(
          (result) => {
            hideLoading();
            Alert.alert('Friend removed', 'You have now ' + result + ' friends');
            var mp = this.state.friendsStatus;
            mp[this.state.selectedUser.userId] = false;
            var fp = this.state.followStatus;
            fp[this.state.selectedUser.userId] = false;
            this.setState({friendsStatus: mp, followStatus: fp});
          }, 
          (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
      } else {
        Communities.addFriends(UserIdList.create([this.state.selectedUser.userId])).then(
          (result) => {
            hideLoading();
            Alert.alert('Friend added', 'You have now ' + result + ' friends');
            var mp = this.state.friendsStatus;
            mp[this.state.selectedUser.userId] = true;
            var fp = this.state.followStatus;
            fp[this.state.selectedUser.userId] = true;
            this.setState({friendsStatus: mp, followStatus: fp});
          }, 
          (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
      }
    }

    updateFollowStatus = async() => {
      showLoading();
      const isFollowed = this.state.followStatus != undefined && this.state.selectedUser != undefined && this.state.followStatus[this.state.selectedUser.userId] === true;
      const query = FollowQuery.users(UserIdList.create([this.state.selectedUser.userId]));
      if (isFollowed) {
        Communities.unfollow(query).then(
          (result) => {
            hideLoading();
            Alert.alert('Unfollowed', 'You are following now ' + result + ' users');
            var mp = this.state.followStatus;
            mp[this.state.selectedUser.userId] = false;
            this.setState({followStatus: mp});
          }, 
          (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
          }); 
      } else {
        Communities.follow(query).then(
          (result) => {
            hideLoading();
            Alert.alert('Followed', 'You are following now ' + result + ' users');
            var mp = this.state.followStatus;
            mp[this.state.selectedUser.userId] = true;
            this.setState({followStatus: mp});
          }, 
          (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
          }); 
      }
    }

    handleActionSheetSelection = async (selectedIndex: number) => {
      if (selectedIndex == this.generateOptions().length - 1) {
        return;
      }
      switch(selectedIndex) {
        case 0:
          this.showDetails();
          break;
        case 1:
          this.updateFriendStatus();
          break;
        case 2:
          this.updateFollowStatus();
          break;
        case 3:
          this.showFollowers();
          break;
        case 4:
          this.showFollowings();
          break;
        case 5:
          this.showPosts();
          break;
        case 6:
          this.showFeed();
          break;
        }
    }

    showActionSheet = (user: User) => {
      this.setState({selectedUser: user}, () => {
        this.ActionSheet.show();
      });
    }

    render() {
      return (
      <View style={MenuStyle.container}>
        <SearchBar
          ref='usersearch'
          textColor='black'
          autoCapitalize='none'
          onChangeText= { (text) => this.updateSearchText(text) }
          placeholder="Search"
          onCancelButtonPress= { () => this.updateSearchText(null).then(() => this.loadUsers()) }
          onSearchButtonPress={ () => this.loadUsers() }
        />
          <View style={MenuStyle.menuContainer}>
            <FlatList style={{flex: 1}}
              data={this.state.users}
              renderItem={({item}) => (
                <TouchableWithoutFeedback>
                  <View style={MenuStyle.listitem}>
                    <Text style={MenuStyle.menuitem}>{item.displayName}</Text>
                    <View style={MenuStyle.rowEndContainer}>
                      <Button title='Actions' onPress={ () => {
                        this.showActionSheet(item);
                      }}/>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.userId}
            />
          </View>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'Available actions'}
            options={this.generateOptions()}
            cancelButtonIndex={this.generateOptions().length - 1}
            onPress={(index) => { this.handleActionSheetSelection(index) }}
          />
        </View>
      );
    }
}

