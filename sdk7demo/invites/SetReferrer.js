// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, View, Text, TextInput, Button, ScrollView} from 'react-native';
import {SetReferrerStyle} from './SetReferrerStyle';
import UserId from '../getsocial-react-native-sdk/models/UserId';
import Invites from '../getsocial-react-native-sdk/Invites';

type Props = {}

type State = {
    userid : ?string,
    providerId : ?string,
    event : ?string,
    customKey1 : ?string,
    customValue1 : ?string,
    customKey2 : ?string,
    customValue2 : ?string,
}

export default class SetReferrer extends Component<Props, State> {
    static navigationOptions = {title: 'Set Referrer'};

    constructor(props: any) {
        super(props);
        this.state = {
            userId: null,
            providerId: null,
            event: null,
            customKey1: null,
            customValue1: null,
            customKey2: null,
            customValue2: null,
        };
    }

    callSetReferrer = async () => {
        const userId = this.state.providerId != null ? UserId.createWithProvider(this.state.providerId, this.state.userId) : UserId.create(this.state.userId);
        const customData = new Map();
        if (this.state.customKey1 != null && this.state.customValue1 != null) {
            customData[this.state.customKey1] = this.state.customValue1;
        }
        if (this.state.customKey2 != null && this.state.customValue2 != null) {
            customData[this.state.customKey2] = this.state.customValue2;
        }
        Invites.setReferrer(userId, this.state.event, customData).then(() => {
            Alert.alert('Success', 'Referrer User was set');
        }, (error) => {
            Alert.alert('Error', error.message);
        });
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}}>
                <View style={SetReferrerStyle.formEntryRow}>
                    <View style={SetReferrerStyle.formEntryTitleContainer}>
                        <Text style={SetReferrerStyle.formEntryTitle} >UserId</Text>
                    </View>
                    <View style={SetReferrerStyle.formEntryInputContainer}>
                        <TextInput style={SetReferrerStyle.formEntryInput} value={this.state.userId} onChangeText={(text) => this.setState({userId: text})} placeholder='UserId'/>
                    </View>
                </View>
                <View style={SetReferrerStyle.formEntryRow}>
                    <View style={SetReferrerStyle.formEntryTitleContainer}>
                        <Text style={SetReferrerStyle.formEntryTitle} >Provider</Text>
                    </View>
                    <View style={SetReferrerStyle.formEntryInputContainer}>
                        <TextInput style={SetReferrerStyle.formEntryInput} value={this.state.providerId} onChangeText={(text) => this.setState({providerId: text})} placeholder='ProviderId'/>
                    </View>
                </View>
                <View style={SetReferrerStyle.formEntryRow}>
                    <View style={SetReferrerStyle.formEntryTitleContainer}>
                        <Text style={SetReferrerStyle.formEntryTitle} >Event</Text>
                    </View>
                    <View style={SetReferrerStyle.formEntryInputContainer}>
                        <TextInput style={SetReferrerStyle.formEntryInput} value={this.state.event} onChangeText={(text) => this.setState({event: text})} placeholder='Event'/>
                    </View>
                </View>
                <View style={SetReferrerStyle.formEntryRow}>
                    <View style={SetReferrerStyle.formEntryTitleContainer}>
                        <Text style={SetReferrerStyle.formEntryTitle} >Key 1</Text>
                    </View>
                    <View style={SetReferrerStyle.formEntryInputContainer}>
                        <TextInput style={SetReferrerStyle.formEntryInput} value={this.state.customKey1} onChangeText={(text) => this.setState({customKey1: text})} placeholder='Key'/>
                    </View>
                </View>
                <View style={SetReferrerStyle.formEntryRow}>
                    <View style={SetReferrerStyle.formEntryTitleContainer}>
                        <Text style={SetReferrerStyle.formEntryTitle} >Data 1</Text>
                    </View>
                    <View style={SetReferrerStyle.formEntryInputContainer}>
                        <TextInput style={SetReferrerStyle.formEntryInput} value={this.state.customValue1} onChangeText={(text) => this.setState({customValue1: text})} placeholder='Value'/>
                    </View>
                </View>
                <View style={SetReferrerStyle.formEntryRow}>
                    <View style={SetReferrerStyle.formEntryTitleContainer}>
                        <Text style={SetReferrerStyle.formEntryTitle} >Key 2</Text>
                    </View>
                    <View style={SetReferrerStyle.formEntryInputContainer}>
                        <TextInput style={SetReferrerStyle.formEntryInput} value={this.state.customKey2} onChangeText={(text) => this.setState({customKey2: text})} placeholder='Key'/>
                    </View>
                </View>
                <View style={SetReferrerStyle.formEntryRow}>
                    <View style={SetReferrerStyle.formEntryTitleContainer}>
                        <Text style={SetReferrerStyle.formEntryTitle} >Data 2</Text>
                    </View>
                    <View style={SetReferrerStyle.formEntryInputContainer}>
                        <TextInput style={SetReferrerStyle.formEntryInput} value={this.state.customValue2} onChangeText={(text) => this.setState({customValue2: text})} placeholder='Value'/>
                    </View>
                </View>

                <View style={SetReferrerStyle.sectionTitleRow}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Button title='Set' onPress={ () => this.callSetReferrer() }/>
                    </View>
                </View>
                <View style={SetReferrerStyle.sectionTitleRow}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                    </View>
                </View>

            </ScrollView>
        );
    }
}
