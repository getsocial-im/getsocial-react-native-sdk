// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, View, Text, TextInput, Button, ScrollView} from 'react-native';
import {IdentityStyle} from './IdentityStyle';
import GetSocial from '../getsocial-react-native-sdk/GetSocial';
import {Identity} from './../getsocial-react-native-sdk';
import {showLoading, hideLoading} from './../common/LoadingIndicator';

type Props = {}

type State = {
    userId : ?string,
    token : ?string,
}

export default class AddCustomIdentity extends Component<Props, State> {
    static navigationOptions = {title: 'Add Custom Identity'};

    constructor(props: any) {
        super(props);
        this.state = {
            userId: null,
            token: null,
        };
    }

    updateUserDetails = async () => {
        GetSocial.getCurrentUser().then((currentUser) => {
            if (currentUser.isAnonymous()) {
                global.userInfoComponentRef.current.setState({userIdentities: 'Anonymous'});
            } else {
                global.userInfoComponentRef.current.setState({userIdentities: JSON.stringify(currentUser.identities)});
            }
            if (currentUser.avatarUrl !== '') {
                global.userInfoComponentRef.current.setState({userAvatarUrl: currentUser.avatarUrl});
            } else {
                global.userInfoComponentRef.current.setState({userAvatarUrl: undefined});
            }

            global.userInfoComponentRef.current.setState({userDisplayName: currentUser.displayName});
        });
    }

    switchUser = async (customIdentity: Identity, fetchFBDetails: boolean) => {
        showLoading();
        GetSocial.switchUser(customIdentity).then(() => {
            hideLoading();
            Alert.alert('Switch User', 'Successfully switched user.');
            if (fetchFBDetails) {
                this.fetchUserProfile();
            } else {
                this.updateUserDetails();
            }
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    callAddIdentity = async () => {
        const customIdentity = Identity.createCustomIdentity('rncustomproviderid', this.state.userId, this.state.token);
        GetSocial.getCurrentUser().then((currentUser) => {
            currentUser.addIdentity(customIdentity,
                () => {
                    hideLoading();
                    Alert.alert('Custom Identity', 'Custom Identity successfully added.');
                    this.updateUserDetails();
                },
                (conflictUser) => {
                    hideLoading();
                    Alert.alert('Custom Identity', 'User conflict with remote user', [
                        {text: 'Use Remote (' + conflictUser.displayName + ')', onPress: () => {
                            this.switchUser(customIdentity, false);
                        }},
                        {text: 'Use Current', onPress: () => {/* use current user */}},
                        {text: 'Cancel', onPress: () => {/* do nothing */}},
                    ]);
                },
                (error) => {
                    hideLoading();
                    Alert.alert('Error', error.message);
                });
        });
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}}>
                <View style={IdentityStyle.formEntryRow}>
                    <View style={IdentityStyle.formEntryTitleContainer}>
                        <Text style={IdentityStyle.formEntryTitle} >UserId</Text>
                    </View>
                    <View style={IdentityStyle.formEntryInputContainer}>
                        <TextInput style={IdentityStyle.formEntryInput} value={this.state.userId} onChangeText={(text) => this.setState({userId: text})} placeholder='UserId'/>
                    </View>
                </View>
                <View style={IdentityStyle.formEntryRow}>
                    <View style={IdentityStyle.formEntryTitleContainer}>
                        <Text style={IdentityStyle.formEntryTitle} >Token</Text>
                    </View>
                    <View style={IdentityStyle.formEntryInputContainer}>
                        <TextInput style={IdentityStyle.formEntryInput} value={this.state.token} onChangeText={(text) => this.setState({token: text})} placeholder='Token'/>
                    </View>
                </View>
                <View style={IdentityStyle.sectionTitleRow}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Button title='Add' onPress={ () => this.callAddIdentity() }/>
                    </View>
                </View>
                <View style={IdentityStyle.sectionTitleRow}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                    </View>
                </View>

            </ScrollView>
        );
    }
}
