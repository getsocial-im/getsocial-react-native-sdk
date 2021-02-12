// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Switch, Picker, Image, View, Text, TextInput, Button, ScrollView, FlatList, KeyboardAvoidingView} from 'react-native';
import {CreateActivityPostStyle} from './CreateActivityPostStyle';
import {Communities, MemberStatus, Role, AddGroupMembersQuery, UserIdList} from 'getsocial-react-native-sdk';
import {showLoading, hideLoading} from './../common/LoadingIndicator';
import {Styles} from './../common/Styles.js';
// eslint-disable-next-line no-unused-vars
import DropDownPicker from 'react-native-dropdown-picker';
import {Platform} from 'react-native';

type Props = {}

type State = {
    userId : ?string,
    providerId : ?string,
    role: string,
    status: string,
}

export default class AddGroupMemberView extends Component<Props, State> {
    static navigationOptions = {title: 'Add Group Member'};
    static groupId: string;

    constructor(props: any) {
        super(props);
        this.state = {
            userId: null,
            providerId: null,
            role: '0',
            status: '0',
        };
    }

    addGroupMember = async () => {
        if (this.state.userId == null) {
            Alert.alert('Error', 'User Id is mandatory.');
            return;
        }

        const userIdList = this.state.providerId == undefined ? UserIdList.create([this.state.userId]): UserIdList.createWithProvider(this.state.providerId, [this.state.userId]);
        let query = AddGroupMembersQuery.create(AddGroupMemberView.groupId, userIdList);
        if (this.state.status == '0') {
            query = query.withMemberStatus(MemberStatus.InvitationPending);
        } else {
            query = query.withMemberStatus(MemberStatus.Member);
        }
        if (this.state.role == '0') {
            query = query.withRole(Role.Admin);
        } else {
            query = query.withRole(Role.Member);
        }
        showLoading();
        Communities.addGroupMembers(query).then((member) => {
            hideLoading();
            Alert.alert('Group member added');
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    renderRoleDropDown() {
        if (Platform.OS === 'ios') {
            return (
                <View style={Styles.pickerRowFirst}>
                    <Text style={Styles.formEntryTitle}>Role</Text>
                    <View style={CreateActivityPostStyle.formEntryPickerContainer}>
                        <DropDownPicker
                            defaultValue={this.state.role}
                            onChangeItem={(item) => this.setState({role: item.value})}
                            containerStyle={{height: 44}}
                            items={[
                                {label: 'Admin', value: '0'},
                                {label: 'Member', value: '1'},
                            ]}/>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={Styles.formEntryRow}>
                    <Text style={Styles.formEntryTitle}>Role</Text>
                    <View style={CreateActivityPostStyle.formEntryPickerContainer}>
                        <Picker style={CreateActivityPostStyle.pickerStyle} itemStyle={{height: 44}}
                            selectedValue={this.state.role} onValueChange={(itemValue, itemIndex) => this.setState({role: itemValue})}>
                            <Picker.Item label="Admin" value="0"/>
                            <Picker.Item label="Member" value="1"/>
                        </Picker>
                    </View>
                </View>
            );
        }
    }

    renderStatusDropDown() {
        if (Platform.OS === 'ios') {
            return (
                <View style={Styles.pickerRowSecond}>
                    <Text style={Styles.formEntryTitle}>Status</Text>
                    <View style={CreateActivityPostStyle.formEntryPickerContainer}>
                        <DropDownPicker
                            defaultValue={this.state.status}
                            onChangeItem={(item) => this.setState({status: item.value})}
                            containerStyle={{height: 44}}
                            items={[
                                {label: 'Invite', value: '0'},
                                {label: 'Member', value: '1'},
                            ]}/>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={Styles.formEntryRow}>
                    <Text style={Styles.formEntryTitle}>Status</Text>
                    <View style={CreateActivityPostStyle.formEntryPickerContainer}>
                        <Picker style={CreateActivityPostStyle.pickerStyle} itemStyle={{height: 44}}
                            selectedValue={this.state.status} onValueChange={(itemValue, itemIndex) => this.setState({status: itemValue})}>
                            <Picker.Item label="Invite" value="0"/>
                            <Picker.Item label="Member" value="1"/>
                        </Picker>
                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}} keyboardDismissMode='on-drag' removeClippedSubviews={false} keyboardShouldPersistTaps='always'>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >User Id</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.userId} onChangeText={(text) => this.setState({userId: text})} placeholder='User Id'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Provider Id</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.providerId} onChangeText={(text) => this.setState({providerId: text})} placeholder='Provider Id'/>
                    </View>
                </View>
                {this.renderRoleDropDown()}
                {this.renderStatusDropDown()}
                <KeyboardAvoidingView behavior='padding'>
                    <View style={CreateActivityPostStyle.sectionTitleRow}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Button title='Create' onPress={ () => this.addGroupMember() }/>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
