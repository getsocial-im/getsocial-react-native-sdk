// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, GetSocial, UsersQuery, User, PagingQuery, UserId, UserIdList, FollowQuery, ActivitiesQuery, ActivitiesView} from './../getsocial-react-native-sdk';
import FollowersQuery from '../getsocial-react-native-sdk/models/communities/FollowersQuery';
import FollowersListView from './FollowersList';
import FollowingsListView from './FollowingsList';
import ChatMessagesListView from './ChatMessagesList';
import SearchBar from 'react-native-search-bar';
import ActionSheet from 'react-native-actionsheet';

type Props = { navigation: Function }
type State = {
    currentUserId: string,
    users: [User],
    selectedUser: ?User,
    friendsStatus: ?Map<string, boolean>,
    followStatus: ?Map<string, boolean>,
    searchText: string,
}

export default class UsersListView extends Component<Props, State> {
    static navigationOptions = {title: 'Users'};

    updateSearchText = async (text: String) => {
        return this.setState({searchText: text});
    }

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        if (this.state.currentUserId != undefined && this.state.selectedUser != undefined && this.state.currentUserId != this.state.selectedUser.userId) {
            const areFriends = this.state.selectedUser != undefined && this.state.friendsStatus != undefined && this.state.friendsStatus[this.state.selectedUser.userId] === true;
            options.push(areFriends ? 'Remove friend': 'Add friend');
            const isFollowed = this.state.followStatus != undefined && this.state.selectedUser != undefined && this.state.followStatus[this.state.selectedUser.userId] === true;
            options.push(isFollowed ? 'Unfollow': 'Follow');
        }
        options.push('Show Followers');
        options.push('Show Followings');
        options.push('User\'s Posts');
        options.push('User\'s Feed');
        options.push('User\'s Mentions');
        if (this.state.currentUserId != undefined && this.state.selectedUser != undefined && this.state.currentUserId != this.state.selectedUser.userId) {
            options.push('Open Chat');
        }
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        Alert.alert('Details', JSON.stringify(this.state.selectedUser));
    }

    showFollowers = async () => {
        const query = FollowersQuery.ofUser(UserId.create(this.state.selectedUser.userId));
        FollowersListView.query = query;
        this.props.navigation.navigate('FollowersList');
    }

    showFollowings = async () => {
        const query = UsersQuery.followedBy(UserId.create(this.state.selectedUser.userId));
        FollowingsListView.query = query;
        this.props.navigation.navigate('FollowingsList');
    }

    showPosts = async () => {
        const query = ActivitiesQuery.everywhere();
        query.byUser(UserId.create(this.state.selectedUser.userId));
        ActivitiesView.create(query).show();
    }

    showFeed = async () => {
        const query = ActivitiesQuery.feedOf(UserId.create(this.state.selectedUser.userId));
        ActivitiesView.create(query).show();
    }

    showMentions = async () => {
        const userId = UserId.create(this.state.selectedUser.userId);
        const query = ActivitiesQuery.everywhere().withMentions([userId]);
        ActivitiesView.create(query).show();
    }

    openChat = async () => {
        const userId = UserId.create(this.state.selectedUser.userId);
        ChatMessagesListView.userId = userId;
        this.props.navigation.navigate('ChatMessagesView');
    }

    loadFollowStatus = async () => {
        if (this.state.users.length == 0) {
            return;
        }
        const userIds = [];
        this.state.users.forEach((element) => {
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

    loadFriendsStatus = async () => {
        if (this.state.users.length == 0) {
            return;
        }
        const userIds = [];
        this.state.users.forEach((element) => {
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
        if (!global.loadingIndicatorRef.current.state.visible) {
            showLoading();
            const query = this.state.searchText
                ? UsersQuery.find(this.state.searchText)
                : UsersQuery.suggested();
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
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyUsers: [User]= [];
        this.state = {
            users: emptyUsers,
            selectedUser: undefined,
            friendsStatus: undefined,
            searchText: null,
        };
    }

    componentDidMount() {
        GetSocial.getCurrentUser().then((user) => {
            this.setState({
                currentUserId: user.id,
            });
            this.loadUsers();
        });
    }

    updateFriendStatus = async () => {
        showLoading();
        const areFriends = this.state.selectedUser != undefined && this.state.friendsStatus != undefined && this.state.friendsStatus[this.state.selectedUser.userId] === true;
        if (areFriends) {
            Communities.removeFriends(UserIdList.create([this.state.selectedUser.userId])).then(
                (result) => {
                    hideLoading();
                    Alert.alert('Friend removed', 'You have now ' + result + ' friends');
                    const mp = this.state.friendsStatus;
                    mp[this.state.selectedUser.userId] = false;
                    const fp = this.state.followStatus;
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
                    const mp = this.state.friendsStatus;
                    mp[this.state.selectedUser.userId] = true;
                    const fp = this.state.followStatus;
                    fp[this.state.selectedUser.userId] = true;
                    this.setState({friendsStatus: mp, followStatus: fp});
                },
                (error) => {
                    hideLoading();
                    Alert.alert('Error', error.message);
                });
        }
    }

    updateFollowStatus = async () => {
        showLoading();
        const isFollowed = this.state.followStatus != undefined && this.state.selectedUser != undefined && this.state.followStatus[this.state.selectedUser.userId] === true;
        const query = FollowQuery.users(UserIdList.create([this.state.selectedUser.userId]));
        if (isFollowed) {
            Communities.unfollow(query).then(
                (result) => {
                    hideLoading();
                    Alert.alert('Unfollowed', 'You are following now ' + result + ' users');
                    const mp = this.state.followStatus;
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
                    const mp = this.state.followStatus;
                    mp[this.state.selectedUser.userId] = true;
                    this.setState({followStatus: mp});
                },
                (error) => {
                    hideLoading();
                    Alert.alert('Error', error.message);
                });
        }
    }

    handleActionSheetSelection = async (selected: string, selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
        console.log(selected);
        switch (selected) {
        case 'Details':
            this.showDetails();
            break;
        case 'Add friend':
            this.updateFriendStatus();
            break;
        case 'Remove friend':
            this.updateFriendStatus();
            break;
        case 'Follow':
            this.updateFollowStatus();
            break;
        case 'Unfollow':
            this.updateFollowStatus();
            break;
        case 'Show Followers':
            this.showFollowers();
            break;
        case 'Show Followings':
            this.showFollowings();
            break;
        case 'User\'s Posts':
            this.showPosts();
            break;
        case 'User\'s Feed':
            this.showFeed();
            break;
        case 'User\'s Mentions':
            this.showMentions();
            break;
        case 'Open Chat':
            this.openChat();
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
                    onCancelButtonPress= { () => this.updateSearchText(null) }
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
                    ref={(o) => this.ActionSheet = o}
                    title={'Available actions'}
                    options={this.generateOptions()}
                    cancelButtonIndex={this.generateOptions().length - 1}
                    onPress={(index) => {
                        this.handleActionSheetSelection(this.generateOptions()[index], index);
                    }}
                />
            </View>
        );
    }
}

