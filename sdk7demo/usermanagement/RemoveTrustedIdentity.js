// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, View, Text, TextInput, Button, ScrollView} from 'react-native';
import {IdentityStyle} from './IdentityStyle';
import GetSocial from '../getsocial-react-native-sdk/GetSocial';
import {showLoading, hideLoading} from './../common/LoadingIndicator';

type Props = {}

type State = {
    providerId : ?string,
    token : ?string,
}

export default class RemoveTrustedIdentity extends Component<Props, State> {
    static navigationOptions = {title: 'Remove Trusted Identity'};

    constructor(props: any) {
        super(props);
        this.state = {
            providerId: null,
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

    callRemoveIdentity = async () => {
        if (this.state.providerId == null || this.state.providerId.length == 0) {
            Alert.alert('Error', 'ProviderId cannot be null or empty');
            return;
        }
        showLoading();
        GetSocial.getCurrentUser().then((currentUser) => {
            currentUser.removeIdentity(this.state.providerId)
                .then(() => {
                    hideLoading();
                    Alert.alert('Trusted Identity', 'Trusted Identity successfully removed.');
                    this.updateUserDetails();
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
                <View style={IdentityStyle.sectionTitleRow}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Button title='Remove' onPress={ () => this.callRemoveIdentity() }/>
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
