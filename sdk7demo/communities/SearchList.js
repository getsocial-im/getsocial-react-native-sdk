// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, Button, View, TouchableWithoutFeedback, Picker} from 'react-native';
import {Communities, UsersQuery, User, PagingQuery, UserId, UserIdList, FollowQuery, ActivitiesQuery, ActivitiesView} from './../getsocial-react-native-sdk';
import FollowersQuery from '../getsocial-react-native-sdk/models/communities/FollowersQuery';
import FollowersListView from './FollowersList';
import FollowingsListView from './FollowingsList';
import ChatMessagesListView from './ChatMessagesList';
import SearchBar from 'react-native-search-bar';
import ActionSheet from 'react-native-actionsheet';
import CheckBox from '@react-native-community/checkbox';
import SearchQuery from '../getsocial-react-native-sdk/models/communities/SearchQuery';
import CommunitiesEntityType from '../getsocial-react-native-sdk/models/communities/CommunitiesEntityType';
import SearchResult from '../getsocial-react-native-sdk/models/communities/SearchResult';
import CommunitiesAction from '../getsocial-react-native-sdk/models/communities/CommunitiesAction';
import CommunitiesSettings from '../getsocial-react-native-sdk/models/communities/CommunitiesSettings';
import ActivitiesListView from './ActivitiesList';
import PollsListView from './PollsList';
import PollStatus from '../getsocial-react-native-sdk/models/communities/PollStatus';
import CreateActivityPost from './CreateActivityPost';
import PostActivityTarget from '../getsocial-react-native-sdk/models/communities/PostActivityTarget';
import CreatePollView from './CreatePoll';

type Props = { navigation: Function }
type State = {
    results: SearchResult,
    entities: [Object],
    searchText: string,
    labels: [string],
    properties: Map<string, string>,
    selectedItem: Object
}

export default class SearchListView extends Component<Props, State> {
    static navigationOptions = {title: 'Search'};

    updateEntities = async (index: number) => {
        this.setState((prevState) => {
            const entities = [...prevState.entities];
            entities[index].checked = !entities[index].checked;
            return { entities };
        });
    }

    updateSearchText = async (text: String) => {
        return this.setState({searchText: text});
    }

    updateLabels = async (text: String) => {
        return this.setState({
            labels: text
                ? text.split(',').map((label) => label.trim())
                : []
        });
    }

    updateProps = async (text: String) => {
        let properties = {};

        if (text) {
            text.split(',').forEach((prop) => {
                prop = prop.split('=');
                if (prop.length === 2 && prop[0] && prop[1]) {
                    properties[prop[0].trim()] = prop[1].trim();
                }
            });
        }

        return this.setState({ properties });
    }

    generateOptions() : [string] {
        const item = this.state.selectedItem;
        const entity = this.state.selectedEntity;
        const options = ['Details'];
        let isFollowed = false;

        if (!item || !entity) {
            return options;
        }

        switch (entity) {
            case 'Topic':
            case 'Group':
                options.push('Show Feed');
                options.push('Activities');
                options.push('Activities with Polls');
                options.push('Announcements with Polls');
                isFollowed = this.state.followMap[entity] &&
                    this.state.followMap[entity][item.id] === true;
                options.push(isFollowed === true ? 'Unfollow' : 'Follow');
                options.push('Show Followers');
                if (item.settings) {
                    const settings = new CommunitiesSettings(item.settings);
                    if (settings.isActionAllowed(CommunitiesAction.Post)) {
                        options.push('Post');
                        options.push('Create Poll');
                    }
                }
                break;
            case 'Group':
                const membership = item.membership;
                const role = membership && membership.role;
                const status = membership && membership.status;
                if (status == MemberStatus.Member) {
                    if (role) {
                        options.push('Show Members');
                    }
                    if (role == Role.Admin || role == Role.Owner) {
                        options.push('Add member');
                        options.push('Edit');
                        options.push('Delete');
                    }
                } else if (status == MemberStatus.InvitationPending) {
                    options.push('Approve invitation');
                }
                if (!membership) {
                    options.push('Join');
                } else {
                    isFollowed = item.isFollowedByMe === true ||
                        (this.state.followMap[entity] &&
                            this.state.followMap[entity][item.id] === true);
                    options.push(isFollowed === true ? 'Unfollow' : 'Follow');
                    if (role != Role.Owner) {
                        options.push('Leave');
                    }
                }
                break;
            case 'Activity':
                const myReactions = item.myReactions;
                options.push(myReactions && myReactions.includes('like')
                    ? 'Unlike'
                    : 'Like'
                );
                options.push(myReactions && myReactions.includes('test')
                    ? 'Remove "test" reaction'
                    : 'React with "test"'
                );
                options.push(item.isBookmarked
                    ? 'Remove Bookmark'
                    : 'Bookmark'
                );
                break;
            case 'User':
                const areFriends = this.state
                    .friendsStatus[item.userId] === true;
                isFollowed = this.state.followMap[entity] &&
                    this.state.followMap[entity][item.userId] === true;
                options.push('Show Followers');
                options.push('Show Followings');
                options.push('User\'s Posts');
                options.push('User\'s Feed');
                options.push('User\'s Mentions');
                options.push(areFriends ? 'Remove friend': 'Add friend');
                options.push(isFollowed ? 'Unfollow': 'Follow');
                options.push('Open Chat');
                break;
            case 'Tag':
            case 'Label':
                isFollowed = item.isFollowedByMe ||
                    (this.state.followMap[entity] &&
                        this.state.followMap[entity][item.name]);
                options.push('Show Feed');
                options.push(isFollowed ? 'Unfollow' : 'Follow');
                options.push('Show Followers');
                break;
        }

        options.push('Cancel');

        return options;
    }

    showDetails = async () => {
        Alert.alert('Details', JSON.stringify(this.state.selectedItem));
    }

    showActivities = async () => {
        const entity = this.state.selectedEntity;
        const query = ActivitiesQuery
        ['in' + entity](this.state.selectedItem.id);
        ActivitiesListView.activitiesQuery = query;
        this.props.navigation.navigate('ActivitiesList');
    }

    showPollsActivities = async () => {
        const entity = this.state.selectedEntity;
        const query = ActivitiesQuery
            ['in' + entity](this.state.selectedItem.id);
        PollsListView.activitiesQuery = query
            .withPollStatus(PollStatus.WithPoll);
        PollsListView.announcementsQuery = null;
        this.props.navigation.navigate('PollsList');
    }

    showPollsAnnouncements = async () => {
        const entity = this.state.selectedEntity;
        const query = ActivitiesQuery
            ['in' + entity](this.state.selectedItem.id);
        PollsListView.announcementsQuery = query
            .withPollStatus(PollStatus.WithPoll);
        PollsListView.activitiesQuery = null;
        this.props.navigation.navigate('PollsList');
    }

    joinGroup = async () => {
        showLoading();
        const query = JoinGroupQuery.create(this.state.selectedItem.id);
        Communities.joinGroup(query).then(() => {
            hideLoading();
            Alert.alert('Success', 'Joined to group');
            this.loadResults();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    approveInvite = async () => {
        showLoading();
        let query = JoinGroupQuery.create(this.state.selectedItem.id);
        query = query.withInvitationToken(
            this.state.selectedItem.membership.invitationToken
        );
        Communities.joinGroup(query).then(() => {
            hideLoading();
            Alert.alert('Success', 'Joined to group');
            this.loadResults();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    leaveGroup = async () => {
        showLoading();
        const currentUser = await GetSocial.getCurrentUser();
        const query = RemoveGroupMembersQuery.create(
            this.state.selectedItem.id,
            UserIdList.create([currentUser.id])
        );
        Communities.removeGroupMembers(query).then(() => {
            Alert.alert('Success', 'Left group');
            hideLoading();
            this.loadResults();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    deleteGroup = async () => {
        showLoading();
        Communities.removeGroups([this.state.selectedItem.id]).then(() => {
            Alert.alert('Success', 'Group deleted');
            hideLoading();
            this.loadResults();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    showGroupMembers = async () => {
        GroupMembersListView.groupId = this.state.selectedItem.id;
        if (this.state.selectedItem != undefined &&
            this.state.selectedItem.membership != null) {
            const membership = this.state.selectedItem.membership;
            const currentUser = await GetSocial.getCurrentUser();
            GroupMembersListView.currentUserRole = membership.role;
            GroupMembersListView.currentUser = currentUser;
            this.props.navigation.navigate('GroupMembersList');
        }
    }

    showCreatePost = async () => {
        const entity = this.state.selectedEntity;
        CreateActivityPost.activityTarget = PostActivityTarget
            [entity.toLowerCase()](this.state.selectedItem.id);
        CreateActivityPost.query = ActivitiesQuery
            ['in' + entity](this.state.selectedItem.id);
        this.props.navigation.navigate('CreateActivityPost');
    }

    showCreatePoll = async () => {
        const entity = this.state.selectedEntity;
        CreatePollView.target = PostActivityTarget
            [entity.toLowerCase()](this.state.selectedItem.id);
        this.props.navigation.navigate('CreatePoll');
    }

    showAddMember = async () => {
        AddGroupMemberView.groupId = this.state.selectedItem.id;
        this.props.navigation.navigate('AddGroupMember');
    }

    editGroup = async () => {
        UpdateGroupView.oldGroup = this.state.selectedItem;
        this.props.navigation.navigate('UpdateGroup');
    }

    showFollowers = async () => {
        const entity = this.state.selectedEntity;
        const query = entity === 'User'
            ? FollowersQuery.ofUser(
                UserId.create(this.state.selectedItem.userId)
            )
            : FollowersQuery
                ['of' + entity](this.state.selectedItem.id ||
                    this.state.selectedItem.name);
        FollowersListView.query = query;
        this.props.navigation.navigate('FollowersList');
    }

    showFollowings = async () => {
        const query = UsersQuery.followedBy(
            UserId.create(this.state.selectedItem.userId)
            );
        FollowingsListView.query = query;
        this.props.navigation.navigate('FollowingsList');
    }

    showPosts = async () => {
        const query = ActivitiesQuery.everywhere();
        query.byUser(UserId.create(this.state.selectedItem.userId));
        ActivitiesView.create(query).show();
    }

    showFeed = async () => {
        const entity = this.state.selectedEntity;
        let query = null;
        console.log ({ entity, item: this.state.selectedItem });
        switch (entity) {
            case 'User':
                query = ActivitiesQuery.feedOf(
                    UserId.create(this.state.selectedItem.userId)
                );
                break;
            case 'Topic':
            case 'Group':
                query = ActivitiesQuery
                ['in' + entity](this.state.selectedItem.id);
                break;
            case 'Tag':
                query = ActivitiesQuery.everywhere()
                    .withTag(this.state.selectedItem.name);
                break;
            case 'Label':
                query = ActivitiesQuery.everywhere()
                    .withLabels([this.state.selectedItem.name]);
                break;
        }

        console.log({query});
        const view = ActivitiesView.create(query);
        console.log({ view });
        view.onMentionClickListener = (mention: string) => {
            Alert.alert('Info', 'Mention [' + mention + '] clicked.');
        };
        view.onTagClickListener = (tag: string) => {
            Alert.alert('Info', 'Tag [' + tag + '] clicked.');
        };
        view.onAvatarClickListener = (user: User) => {
            Alert.alert('Info', 'User [' + JSON.stringify(user) + '] clicked.');
        };
        view.onActionButtonClickListener = (action: Action) => {
            globalActionProcessor(action);
        };
        view.show();
    }

    showMentions = async () => {
        const userId = UserId.create(this.state.selectedItem.userId);
        const query = ActivitiesQuery.everywhere().withMentions([userId]);
        ActivitiesView.create(query).show();
    }

    openChat = async () => {
        const userId = UserId.create(this.state.selectedItem.userId);
        ChatMessagesListView.userId = userId;
        this.props.navigation.navigate('ChatMessagesView');
    }

    react = async (reaction: string) => {
        const myReactions = this.state.selectedItem.myReactions || [];
        const id = this.state.selectedItem.id;
        const action = myReactions.includes(reaction)
            ? 'removed'
            : 'added';
        const method = action === 'added'
            ? 'addReaction'
            : 'removeReaction';

        return Communities[method](reaction, id)
            .then(() => {
                Alert.alert(
                    'Success',
                    `Reaction ${reaction} has been ${action}`
                );
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    }

    bookmark = async () => {
        return Communities.bookmark(this.state.selectedItem.id)
            .then(() => {
                Alert.alert('Success', 'Bookmark added');
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    }

    removeBookmark = async () => {
        return Communities.removeBookmark(this.state.selectedItem.id)
            .then(() => {
                Alert.alert('Success', 'Bookmark removed');
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    }

    loadFollowStatus = async () => {
        const promises = [];
        const entities = this.state.entities.filter((entity) => {
            const entityKey = this.state.entitiesResultsMap[entity.key];
            return entity.checked &&
                FollowQuery[entityKey] &&
                this.state.results[entityKey] &&
                this.state.results[entityKey].entries;
        });

        entities.forEach((entity) => {
            const entityKey = this.state.entitiesResultsMap[entity.key];
            const ids = this.state.results[entityKey].entries
                .map((item) => item.id || item.userId || item.name);

            if (ids.length) {
                const query = FollowQuery[entityKey](
                    entity.key === 'User'
                        ? UserIdList.create(ids)
                        : ids);
                promises.push(
                    Communities.isFollowing(UserId.currentUser(), query)
                );
            }
        });

        return Promise.all(promises)
            .then((results) => {
                const followMap = {};
                entities.forEach((entity, index) => {
                    followMap[entity.key] = results[index];
                });
                this.setState({ followMap });
            }, (error) => {
                this.setState({ followMap: {} });
                Alert.alert('Error', error.message);
            });
    }

    loadFriendsStatus = async () => {
        if (!this.state.results ||
            !this.state.results.users ||
            this.state.results.users.entries.length == 0) {
            return;
        }

        const userIds = this.state.results.users.entries
            .map((element) => element.userId);
        Communities.areFriends(UserIdList.create(userIds))
            .then((result) => this.setState({friendsStatus: result}))
            .catch((error) => Alert.alert('Error', error.message));
    }

    loadResults = async () => {
        if (!global.loadingIndicatorRef.current.state.visible) {
            showLoading();
            const query = this.state.searchText
                ? SearchQuery.find(this.state.searchText)
                : SearchQuery.all();
            const selectedEntities = this.state.entities
                .filter((entity) => entity.checked);
            query
                .inEntities(selectedEntities
                    .map((entity) => CommunitiesEntityType[entity.key]))
                .withProperties(this.state.properties)
                .withLabels(this.state.labels);

            Communities.search(new PagingQuery(query)).then((results) => {
                hideLoading();
                this.setState({
                    results,
                    showingResults: true,
                    selectedEntity: selectedEntities.length
                        ? selectedEntities[0].key
                        : 'Topic'
                }, () => {
                    this.loadFollowStatus();
                    this.loadFriendsStatus();
                });
            }, (error) => {
                hideLoading();
                Alert.alert('Error', error.message);
            });
        }
    }

    clearResults = async () => {
        this.setState({
            showingResults: false,
            results: null,
            entities: this.state.entities.map((entity) => {
                entity.checked = false;
                return entity;
            })
        })
    }

    constructor(props: any) {
        super(props);

        this.state = {
            results: null,
            showingResults: false,
            entities: [
                { key: 'Topic' },
                { key: 'Group' },
                { key: 'User' },
                { key: 'Activity' },
                { key: 'Tag' },
                { key: 'Label' }
            ],
            entitiesResultsMap: {
                Topic: 'topics',
                Group: 'groups',
                User: 'users',
                Activity: 'activities',
                Tag: 'tags',
                Label: 'labels'
            },
            searchText: null,
            labels: [],
            properties: {},
            selectedEntity: 'Topic',
            selectedItem: null
        };
    }

    updateFriendStatus = async () => {
        showLoading();
        const selectedUser = this.state.selectedItem;
        const areFriends = selectedUser != undefined &&
            this.state.friendsStatus != undefined &&
            this.state.friendsStatus[selectedUser.userId] === true;
        const promise = Communities
            [areFriends ? 'removeFriends' : 'addFriends'](
                UserIdList.create([selectedUser.userId])
            );
        promise
            .then((result) => {
                hideLoading();
                Alert.alert(
                    areFriends ? 'Friend removed' : 'Friend added',
                    'You have now ' + result + ' friends'
                );
                const mp = this.state.friendsStatus;
                mp[selectedUser.userId] = !areFriends;
                const fp = this.state.followMap;
                if (!fp.User) {
                    fp.User = {};
                }
                fp.User[selectedUser.userId] = !areFriends;
                this.setState({friendsStatus: mp, followMap: fp});
            })
            .catch((error) => {
                hideLoading();
                Alert.alert('Error', error.message);
            });
    }

    updateFollowStatus = async () => {
        showLoading();
        const entity = this.state.selectedEntity;
        const item = this.state.selectedItem;
        const key = item.userId || item.id || item.name;
        const method = this.state.entitiesResultsMap[entity];
        const isFollowed = this.state.followMap[entity] &&
            this.state.followMap[entity][key];
        const query = FollowQuery[method](
            entity === 'User'
                ? UserIdList.create([key])
                : [key]
            );
        const action = isFollowed ? 'Unfollow' : 'Follow';

        Communities[action.toLowerCase()](query)
            .then((result) => {
                hideLoading();
                Alert.alert(
                    action,
                    `You are following now ${result} ${method}`
                );
                const followMap = this.state.followMap;
                if (!followMap[entity]) {
                    followMap[entity] = {};
                }
                followMap[entity][key] = !isFollowed;
                this.setState({ followMap });
            })
            .catch((error) => {
                hideLoading();
                Alert.alert('Error', error.message);
            });
    }

    handleActionSheetSelection = async (selected: string, selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
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
        case 'Show Feed':
            this.showFeed();
            break;
        case 'User\'s Mentions':
            this.showMentions();
            break;
        case 'Open Chat':
            this.openChat();
            break;
        case 'Activities with Polls':
            this.showPollsActivities();
            break;
        case 'Activities':
            this.showActivities();
            break;
        case 'Announcements with Polls':
            this.showPollsAnnouncements();
            break;
        case 'Join':
            this.joinGroup();
            break;
        case 'Leave':
            this.leaveGroup();
            break;
        case 'Show Members':
            this.showGroupMembers();
            break;
        case 'Post':
            this.showCreatePost();
            break;
        case 'Create Poll':
            this.showCreatePoll();
            break;
        case 'Delete':
            this.deleteGroup();
            break;
        case 'Add member':
            this.showAddMember();
            break;
        case 'Edit':
            this.editGroup();
            break;
        case 'Approve invitation':
            this.approveInvite();
            break;
        case 'Like':
        case 'Unlike':
            this.react('like');
            break;
        case 'React with "test"':
        case 'Remove "test" reaction':
            this.react('test');
            break;
        case 'Bookmark':
            this.bookmark();
            break;
        case 'Remove Bookmark':
            this.removeBookmark();
            break;
        }
    }

    showActionSheet = (item: Object) => {
        this.setState({selectedItem: item}, () => {
            this.ActionSheet.show();
        });
    }

    mainText = (item: Object) => {
        switch (this.state.selectedEntity) {
            case 'Topic':
            case 'Group':
                return item.title;
            case 'Activity':
                return item.text;
            case 'User':
                return item.displayName;
            case 'Tag':
            case 'Label':
                return item.name;
            default:
                return 'Entity not supported';
        }
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                { !this.state.showingResults &&
                <>
                    <FlatList style={{height: 180}}
                        data={this.state.entities}
                        renderItem={({item, index}) => (
                            <View style={{
                                flex: 0,
                                flexDirection: 'row',
                                paddingLeft: 8,
                                paddingRight: 8,
                                height: 32,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    textAlign: 'left',
                                }} >{item.key}</Text>
                                <CheckBox center value={item.checked} onValueChange={() => this.updateEntities(index)}/>
                            </View>
                        )}
                        keyExtractor={(item) => item.key}
                    />
                    <SearchBar
                        ref='search'
                        textColor='black'
                        autoCapitalize='none'
                        onChangeText= { (text) => this.updateSearchText(text) }
                        placeholder="Search"
                        onCancelButtonPress= { () => this.updateSearchText(null) }
                        onSearchButtonPress={ () => this.loadResults() }
                    />
                    <SearchBar
                        ref="labels"
                        textColor='black'
                        autoCapitalize='none'
                        onChangeText= { (text) => this.updateLabels(text) }
                        placeholder="label1,label2"
                        onSearchButtonPress={ () => this.loadResults() }
                    />
                    <SearchBar
                        ref="props"
                        textColor='black'
                        autoCapitalize='none'
                        onChangeText= { (text) => this.updateProps(text) }
                        placeholder="key=value,key1=value1"
                        onSearchButtonPress={ () => this.loadResults() }
                    />
                </> }
                <View style={MenuStyle.menuitem}>
                    { !this.state.showingResults
                        ? <Button title="Submit"
                            onPress={ () => this.loadResults() }/>
                        : <Button title="Clear"
                        onPress={ () => this.clearResults() }/>
                    }
                </View>
                { this.state.results &&
                    <Picker
                        selectedValue={this.state.selectedEntity}
                        onValueChange={(itemValue) => {
                            this.setState({ selectedEntity: itemValue})
                        }}>
                        {
                            this.state.entities
                                .filter((entity) => {
                                    const key = this.state
                                        .entitiesResultsMap[entity.key];
                                    return !!this.state.results[key];
                                })
                                .map((entity) => (
                                    <Picker.Item label={entity.key}
                                        key={entity.key}
                                        value={entity.key} />
                                ))
                        }
                    </Picker>
                }
                { this.state.results && this.state.selectedEntity &&
                    (this.state.results[this.state.entitiesResultsMap[this.state.selectedEntity]] &&
                        this.state.results[this.state.entitiesResultsMap[this.state.selectedEntity]].entries.length
                        ? <>
                            <View style={MenuStyle.menuContainer}>
                                <FlatList style={{flex: 1}}
                                    data={this.state.results[this.state.entitiesResultsMap[this.state.selectedEntity]].entries}
                                    renderItem={({item}) => (
                                        <TouchableWithoutFeedback>
                                            <View
                                                style={MenuStyle.listitem}>
                                                <Text style={MenuStyle.menuitem}>
                                                    {this.mainText(item)}
                                                </Text>
                                                <View style={MenuStyle.rowEndContainer}>
                                                    <Button title='Actions'
                                                        onPress={ () => {
                                                        this.showActionSheet(item);
                                                    }}/>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                    keyExtractor={(item) => item.userId || item.id || item.name}
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
                        </>
                        : <View style={MenuStyle.menuContainer}>
                            <Text style={MenuStyle.menuitem}>
                                {this.state.selectedEntity}: Not found
                            </Text>
                        </View>
                    )

                }
            </View>
        );
    }
}

