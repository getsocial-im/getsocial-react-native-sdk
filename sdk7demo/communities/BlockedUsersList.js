// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, Button, View, TouchableWithoutFeedback} from 'react-native';
import {Communities, User, PagingQuery, UserIdList} from './../getsocial-react-native-sdk';
import ActionSheet from 'react-native-actionsheet';

type Props = { navigation: Function }
type State = {
    users: [User],
    selectedUser: ?User
}

export default class BlockedUsersListView extends Component<Props, State> {
    static navigationOptions = {title: 'Blocked Users'};

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        options.push('Unblock');
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        Alert.alert('Details', JSON.stringify(this.state.selectedUser));
    }

    unblockUser = async () => {
        const userId = this.state.selectedUser.userId;
        const userIdList = UserIdList.create([userId]);

        showLoading();
        Communities.unblockUsers(userIdList)
            .then(() => {
                hideLoading();
                this.setState({
                    users: this.state.users
                        .filter((user) => user.userId !== userId)
                });
                Alert.alert('Success', 'User unblocked');
            }, (error) => {
                hideLoading();
                Alert.alert('Error', error.message);
            });
    }

    loadUsers = async () => {
        if (!global.loadingIndicatorRef.current.state.visible) {
            showLoading();
            Communities.getBlockedUsers(new PagingQuery()).then((result) => {
                hideLoading();
                if (!result.entries || !result.entries.length) {
                    Alert.alert('Info', 'No users found');
                }
                this.setState({users: result.entries});
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
            selectedUser: undefined
        };
    }

    componentDidMount() {
        this.loadUsers();
    }

    handleActionSheetSelection = async (selected: string, selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
        switch (selected) {
        case 'Details':
            this.showDetails();
            break;
        case 'Unblock':
            this.unblockUser();
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
                        this.handleActionSheetSelection(this.generateOptions()[index], index);
                    }}
                />
            </View>
        );
    }
}

