// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback} from 'react-native';
import {Communities, FollowersQuery, User, PagingQuery, FollowQuery, ActivitiesView, ActivitiesQuery, UserId, UserIdList} from './../getsocial-react-native-sdk';
import GetSocial from '../getsocial-react-native-sdk/GetSocial';
import SearchBar from 'react-native-search-bar';
import ActionSheet from 'react-native-actionsheet';

type Props = { navigation: Function }
type State = {
    currentUserId: string,
    users: [User],
    selectedUser: ?User,
    friendsStatus: Map<string, boolean>,
    followStatus: Map<string, boolean>,
}

export default class FollowersListView extends Component<Props, State> {
    static navigationOptions = {title: 'Followers'};
    static query: FollowersQuery;

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        options.push('User\'s Posts');
        options.push('User\'s Feed');
        if (this.state.selectedUser != undefined && this.state.currentUserId != undefined && this.state.currentUserId != this.state.selectedUser.userId) {
            const areFriends = this.state.selectedUser != undefined && this.state.friendsStatus != undefined && this.state.friendsStatus[this.state.selectedUser.userId] === true;
            options.push(areFriends ? 'Remove friend': 'Add friend');
            const isFollowed = this.state.followStatus != undefined && this.state.selectedUser != undefined && this.state.followStatus[this.state.selectedUser.userId] === true;
            options.push(isFollowed ? 'Unfollow': 'Follow');
        }
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        Alert.alert('Details', JSON.stringify(this.state.selectedUser));
    }

    loadFollowers = async () => {
        showLoading();
        Communities.getFollowers(new PagingQuery(FollowersListView.query)).then((result) => {
            hideLoading();
            this.setState({users: result.entries}, () => {
                this.loadFriendsStatus();
            });
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    showPosts = async () => {
        const query = ActivitiesQuery.everywhere();
        query.byUser(UserId.create(this.state.selectedUser.userId));
        ActivitiesView.create(query).show();
    }

    showFeed = async () => {
        const query = ActivitiesQuery.feedOf(UserId.create(this.state.selectedUser.userId));
        query.byUser(UserId.create(this.state.selectedUser.userId));
        ActivitiesView.create(query).show();
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyUsers: [User]= [];
        this.state = {
            currentUserId: undefined,
            users: emptyUsers,
            selectedUser: undefined,
            friendsStatus: new Map(),
            followStatus: new Map(),
        };
    }

    loadCurrentUser() {
        GetSocial.getCurrentUser().then((currentUser) => {
            this.setState({currentUserId: currentUser.id}, this.loadFollowers);
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    updateFriendStatus = async () => {
        showLoading();
        const areFriends = this.state.selectedUser != undefined && this.state.friendsStatus != undefined && this.state.friendsStatus[this.state.selectedUser.userId] === true;
        if (areFriends) {
            Communities.removeFriends(UserIdList.create([this.state.selectedUser.userId])).then(
                (result) => {
                    hideLoading();
                    Alert.alert('Friend removed', 'You have now ' + result + ' friends');
                    this.loadFriendsStatus();
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
                    this.loadFriendsStatus();
                },
                (error) => {
                    hideLoading();
                    Alert.alert('Error', error.message);
                });
        }
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

    updateFollowStatus = async () => {
        showLoading();
        const isFollowed = this.state.followStatus != undefined && this.state.selectedUser != undefined && this.state.followStatus[this.state.selectedUser.userId] === true;
        const query = FollowQuery.users(UserIdList.create([this.state.selectedUser.userId]));
        if (isFollowed) {
            Communities.unfollow(query).then(
                (result) => {
                    hideLoading();
                    Alert.alert('Unfollowed', 'You are following now ' + result + ' users');
                    this.loadFriendsStatus();
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
                    this.loadFriendsStatus();
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
        switch (selectedIndex) {
        case 0:
            this.showDetails();
            break;
        case 1:
            this.showPosts();
            break;
        case 2:
            this.showFeed();
            break;
        case 3:
            this.updateFriendStatus();
            break;
        case 4:
            this.updateFollowStatus();
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
                        this.handleActionSheetSelection(index);
                    }}
                />
            </View>
        );
    }
}

