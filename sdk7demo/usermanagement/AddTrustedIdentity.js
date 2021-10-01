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
    providerId : ?string,
    token : ?string,
}

export default class AddTrustedIdentity extends Component<Props, State> {
    static navigationOptions = {title: 'Add Trusted Identity'};

    constructor(props: any) {
        super(props);
        this.state = {
            providerId: null,
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

    switchUser = async (identity: Identity, fetchFBDetails: boolean) => {
        showLoading();
        GetSocial.switchUser(identity).then(() => {
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
        if (this.state.providerId == null || this.state.providerId.length == 0) {
            Alert.alert('Error', 'ProviderId cannot be null or empty');
            return;
        }
        if (this.state.token == null || this.state.token.length == 0) {
            Alert.alert('Error', 'Token cannot be null or empty');
            return;
        }
        const trustedIdentity = Identity.createTrustedIdentity(this.state.providerId, this.state.token);
        GetSocial.getCurrentUser().then((currentUser) => {
            currentUser.addIdentity(trustedIdentity,
                () => {
                    hideLoading();
                    Alert.alert('Trusted Identity', 'Trusted Identity successfully added.');
                    this.updateUserDetails();
                },
                (conflictUser) => {
                    hideLoading();
                    Alert.alert('Trusted Identity', 'User conflict with remote user', [
                        {text: 'Use Remote (' + conflictUser.displayName + ')', onPress: () => {
                            this.switchUser(trustedIdentity, false);
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
                        <Text style={IdentityStyle.formEntryTitle} >ProviderId</Text>
                    </View>
                    <View style={IdentityStyle.formEntryInputContainer}>
                        <TextInput style={IdentityStyle.formEntryInput} value={this.state.providerId} onChangeText={(text) => this.setState({providerId: text})} placeholder='ProviderId'/>
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
