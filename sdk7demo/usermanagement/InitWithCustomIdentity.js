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

export default class InitWithCustomIdentity extends Component<Props, State> {
    static navigationOptions = {title: 'Init with Custom Identity'};

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

    callInit = async () => {
        if (this.state.userId == null || this.state.userId.length == 0) {
            Alert.alert('Error', 'UserId cannot be null or empty');
            return;
        }
        if (this.state.token == null || this.state.token.length == 0) {
            Alert.alert('Error', 'Token cannot be null or empty');
            return;
        }
        showLoading();
        const customIdentity = Identity.createCustomIdentity('rncustomproviderid', this.state.userId, this.state.token);
        GetSocial.initWithIdentity(customIdentity).then(() => {
            hideLoading();
            Alert.alert('Success', 'SDK initialized with Custom Identity.');
            this.updateUserDetails();
        },
        (error) => {
            hideLoading();
            Alert.alert('Failed to initialize with Custom Identity, error: ', error.message);
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
                        <Button title='Init' onPress={ () => this.callInit() }/>
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
