// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {GetSocial, ActivitiesQuery, Action, User, ActivitiesView, Communities, RemoveGroupMembersQuery, UserIdList, JoinGroupQuery, GroupsQuery, Group, PagingQuery, MemberStatus, Role, CommunitiesAction} from './../getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import SearchBar from 'react-native-search-bar';
import GroupMembersListView from './GroupMembersList.js';
import CreateActivityPost from './CreateActivityPost';
import AddGroupMemberView from './AddGroupMember.js';
import UpdateGroupView from './UpdateGroup.js';
import PostActivityTarget from '../getsocial-react-native-sdk/models/communities/PostActivityTarget';
import {globalActionProcessor} from './../common/CommonMethods.js';

type Props = { navigation: Function }
type State = {
    groups: [Group],
    selectedGroup: ?Group,
    searchText: string,
    myGroups: boolean,
}

export default class GroupsListView extends Component<Props, State> {
    static navigationOptions = {title: 'Groups'};
    static query: GroupsQuery;

    updateSearchText = async (text: String) => {
        this.setState({searchText: text});
    }

    generateOptions() : [string] {
        let role = null;
        let status = null;
        let settings = null;
        let membership = null;
        if (this.state.selectedGroup != undefined && this.state.selectedGroup.settings != null) {
            settings = this.state.selectedGroup.settings;
        }
        if (this.state.selectedGroup != undefined && this.state.selectedGroup.membership != null) {
            membership = this.state.selectedGroup.membership;
            role = membership.role;
            status = membership.status;
        }

        const options = [];
        options.push('Details');
        if ((settings != null && !settings.isPrivate) || status == MemberStatus.Member) {
            options.push('Show Feed');
        }
        if (status == MemberStatus.Member) {
            if (role != null) {
                options.push('Show Members');
            }
            if (settings != null && settings.isActionAllowed(CommunitiesAction.Post)) {
                options.push('Post');
            }
            if (role == Role.Admin || role == Role.Owner) {
                options.push('Add member');
                options.push('Edit');
                options.push('Delete');
            }
        }
        if (membership == null) {
            options.push('Join');
        }
        if (membership != null && role != Role.Owner) {
            options.push('Leave');
        }
        if (status == MemberStatus.InvitationPending) {
            options.push('Approve invitation');
        }
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        let stringified = JSON.stringify(this.state.selectedGroup);
        stringified += ', CreatedAt: ' + moment(new Date(this.state.selectedGroup.createdAt * 1000)).format('DD/MM/YYYY hh:mm');
        stringified += ', UpdatedAt: ' + moment(new Date(this.state.selectedGroup.updatedAt * 1000)).format('DD/MM/YYYY hh:mm');

        Alert.alert('Details', stringified + '\n \n \n');
    }

    joinGroup = async () => {
        showLoading();
        const query = JoinGroupQuery.create(this.state.selectedGroup.id);
        Communities.joinGroup(query).then((result) => {
            hideLoading();
            Alert.alert('Success', 'Joined to group');
            this.loadGroups();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    approveInvite = async () => {
        showLoading();
        let query = JoinGroupQuery.create(this.state.selectedGroup.id);
        query = query.withInvitationToken(this.state.selectedGroup.membership.invitationToken);
        Communities.joinGroup(query).then((result) => {
            hideLoading();
            Alert.alert('Success', 'Joined to group');
            this.loadGroups();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    leaveGroup = async () => {
        showLoading();
        const currentUser = await GetSocial.getCurrentUser();
        const query = RemoveGroupMembersQuery.create(this.state.selectedGroup.id, UserIdList.create([currentUser.id]));
        Communities.removeGroupMembers(query).then((result) => {
            Alert.alert('Success', 'Left group');
            hideLoading();
            this.loadGroups();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    deleteGroup = async () => {
        showLoading();
        Communities.removeGroups([this.state.selectedGroup.id]).then((result) => {
            Alert.alert('Success', 'Group deleted');
            hideLoading();
            this.loadGroups();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    showGroupMembers = async () => {
        GroupMembersListView.groupId = this.state.selectedGroup.id;
        if (this.state.selectedGroup != undefined && this.state.selectedGroup.membership != null) {
            const membership = this.state.selectedGroup.membership;
            const currentUser = await GetSocial.getCurrentUser();
            GroupMembersListView.currentUserRole = membership.role;
            GroupMembersListView.currentUser = currentUser;
            this.props.navigation.navigate('GroupMembersList');
        }
    }

    showCreatePost = async () => {
        CreateActivityPost.activityTarget = PostActivityTarget.group(this.state.selectedGroup.id);
        CreateActivityPost.query = ActivitiesQuery.inGroup(this.state.selectedGroup.id);
        this.props.navigation.navigate('CreateActivityPost');
    }

    showAddMember = async () => {
        AddGroupMemberView.groupId = this.state.selectedGroup.id;
        this.props.navigation.navigate('AddGroupMember');
    }

    editGroup = async () => {
        UpdateGroupView.oldGroup = this.state.selectedGroup;
        this.props.navigation.navigate('UpdateGroup');
    }

    showFeed = async () => {
        const query = ActivitiesQuery.inGroup(this.state.selectedGroup.id);
        const view = ActivitiesView.create(query);
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

    handleActionSheetSelection = async (selected: string, selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
        switch (selected) {
        case 'Details':
            this.showDetails();
            break;
        case 'Show Feed':
            this.showFeed();
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
        }
    }

    loadGroups = async () => {
        showLoading();
        const query = GroupsListView.query == null ? (this.state.searchText == null ? GroupsQuery.all() : GroupsQuery.find(this.state.searchText)) : GroupsListView.query;
        Communities.getGroups(new PagingQuery(query)).then((result) => {
            hideLoading();
            this.setState({groups: result.entries});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyGroups: [Group]= [];
        this.state = {
            groups: emptyGroups,
            selectedGroup: undefined,
            searchText: null,
        };
    }

    componentDidMount() {
        this.setState({searchText: null});
        this.loadGroups();
    }

    getMemberStatus(group: Group): string {
        const membership = group.membership;
        if (membership == undefined || membership == null) {
            return 'unknown';
        }
        return MemberStatus.valueToName(membership.status);
    }

    getMemberRole(group: Group): string {
        const membership = group.membership;
        if (membership == undefined || membership == null) {
            return 'unknown';
        }
        return Role.valueToName(membership.role);
    }

    showActionSheet = (group: Group) => {
        this.setState({selectedGroup: group}, () => {
            this.ActionSheet.show();
        });
    }

    renderSearchBar() {
        if (!GroupsListView.myGroups) {
            return (<SearchBar
                ref="groupsearch"
                textColor='black'
                autoCapitalize='none'
                onChangeText= { (text) => this.updateSearchText(text) }
                placeholder="Search"
                onCancelButtonPress= { () => this.updateSearchText(null).then(() => this.loadGroups()) }
                onSearchButtonPress={ () => this.loadGroups() }
            />);
        }
        return null;
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                {this.renderSearchBar()}
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.groups}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem3rows}>
                                    <View style={{flex: 1, flexDirection: 'column', width: '80%'}}>
                                        <Text style={MenuStyle.menuitem14}>Title: {item.title}</Text>
                                        <Text style={MenuStyle.menuitem14}>Member status: {this.getMemberStatus(item)}</Text>
                                        <Text style={MenuStyle.menuitem14}>Member role: {this.getMemberRole(item)}</Text>
                                    </View>
                                    <View>
                                        <Button title='Actions' onPress={ () => {
                                            this.showActionSheet(item);
                                        }}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item) => item.id}
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

