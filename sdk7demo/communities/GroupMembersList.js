// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {GetSocial, CurrentUser, Communities, GroupMember, RemoveGroupMembersQuery, UpdateGroupMembersQuery, UserIdList, MembersQuery, PagingQuery, MemberStatus, Role} from './../getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';
// eslint-disable-next-line no-unused-vars
import SearchBar from 'react-native-search-bar';

type Props = { navigation: Function }
type State = {
    groupMembers: [GroupMember],
    selectedMember: ?GroupMember,
    searchText: null,
}

export default class GroupMembersListView extends Component<Props, State> {
    static navigationOptions = {title: 'Group Members'};
    static groupId: string;
    static currentUserRole: number;
    static currentUser: CurrentUser;

    updateSearchText = async (text: String) => {
        this.setState({searchText: text});
    }

    generateOptions() : [string] {
        let role = null;
        let status = null;
        let membership = null;
        if (this.state.selectedMember != undefined && this.state.selectedMember.membership != null) {
            membership = this.state.selectedMember.membership;
            role = membership.role;
            status = membership.status;
        }

        const options = [];
        options.push('Details');
        if ((GroupMembersListView.currentUserRole == Role.Admin || GroupMembersListView.currentUserRole == Role.Owner) &&
            (this.state.selectedMember != undefined && this.state.selectedMember.userId != GroupMembersListView.currentUser.id)) {
            if (role != Role.Owner) {
                options.push('Remove');
            }
            if (status == MemberStatus.ApprovalPending ||
                status == MemberStatus.Rejected) {
                options.push('Approve');
            }
            if (status != MemberStatus.Rejected) {
                options.push('Approve');
            }
            options.push('Reject');
        }
        if (this.state.selectedMember != undefined && this.state.selectedMember.userId == GroupMembersListView.currentUser.id && GroupMembersListView.currentUserRole != Role.Owner) {
            options.push('Leave');
        }
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        const stringified = JSON.stringify(this.state.selectedMember);
        Alert.alert('Details', stringified + '\n \n \n');
    }

    approveMember = async () => {
        showLoading();
        let query = UpdateGroupMembersQuery.create(GroupMembersListView.groupId, UserIdList.create([this.state.selectedMember.userId]));
        query
            .withMemberStatus(MemberStatus.Member)
            .withRole(this.state.selectedMember.membership.role);
        Communities.updateGroupMembers(query).then(() => {
            Alert.alert('Success', 'Member approved');
            hideLoading();
            this.loadGroupMembers();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    rejectMember = async () => {
        showLoading();
        let query = UpdateGroupMembersQuery.create(GroupMembersListView.groupId, UserIdList.create([this.state.selectedMember.userId]));
        query
            .withMemberStatus(MemberStatus.Rejected)
            .withRole(this.state.selectedMember.membership.role);
        Communities.updateGroupMembers(query).then(() => {
            Alert.alert('Success', 'Member rejected');
            hideLoading();
            this.loadGroupMembers();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    removeMember = async () => {
        showLoading();
        const query = RemoveGroupMembersQuery.create(GroupMembersListView.groupId, UserIdList.create([this.state.selectedMember.userId]));
        Communities.removeGroupMembers(query).then((result) => {
            Alert.alert('Success', 'Member removed');
            hideLoading();
            this.loadGroupMembers();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    leaveGroup = async () => {
        showLoading();
        const currentUser = await GetSocial.getCurrentUser();
        const query = RemoveGroupMembersQuery.create(GroupMembersListView.groupId, UserIdList.create([currentUser.id]));
        Communities.removeGroupMembers(query).then((result) => {
            Alert.alert('Success', 'Left group');
            hideLoading();
            this.props.navigation.navigate('GroupsList');
        }, (error) => {
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
        case 'Remove':
            this.removeMember();
            break;
        case 'Approve':
            this.approveMember();
            break;
        case 'Reject':
            this.rejectMember();
            break;
        case 'Leave':
            this.leaveGroup();
            break;
        }
    }

    loadGroupMembers = async () => {
        showLoading();
        const query = MembersQuery.ofGroup(GroupMembersListView.groupId);

        query.withName(this.state.searchText || null);

        Communities.getGroupMembers(new PagingQuery(query)).then((result) => {
            hideLoading();
            this.setState({groupMembers: result.entries});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyMembers: [GroupMember]= [];
        this.state = {
            groupMembers: emptyMembers,
            selectedGroup: undefined,
            searchText: null,
        };
    }

    componentDidMount() {
        this.loadGroupMembers();
    }

    getMemberStatus(member: GroupMember): string {
        const membership = member.membership;
        if (membership == undefined || membership == null) {
            return 'unknown';
        }
        return MemberStatus.valueToName(membership.status);
    }

    getMemberRole(member: GroupMember): string {
        const membership = member.membership;
        if (membership == undefined || membership == null) {
            return 'unknown';
        }
        return Role.valueToName(membership.role);
    }

    showActionSheet = (groupMember: GroupMember) => {
        this.setState({selectedMember: groupMember}, () => {
            this.ActionSheet.show();
        });
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                <SearchBar
                    ref="membersSearch"
                    textColor='black'
                    autoCapitalize='none'
                    onChangeText= { (text) => this.updateSearchText(text) }
                    placeholder="Search by name"
                    onCancelButtonPress= { () => this.updateSearchText(null).then(() => this.loadGroupMembers()) }
                    onSearchButtonPress={ () => this.loadGroupMembers() }
                />
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.groupMembers}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem3rows}>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <Text style={MenuStyle.menuitem14}>User: {item.displayName}</Text>
                                        <Text style={MenuStyle.menuitem14}>Member status: {this.getMemberStatus(item)}</Text>
                                        <Text style={MenuStyle.menuitem14}>Member role: {this.getMemberRole(item)}</Text>
                                    </View>
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

