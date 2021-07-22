// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Picker, Switch, Image, View, Text, TextInput, Button, ScrollView, FlatList, KeyboardAvoidingView} from 'react-native';
import {CreateActivityPostStyle} from './CreateActivityPostStyle';
// eslint-disable-next-line no-unused-vars
import DropDownPicker from 'react-native-dropdown-picker';

type Props = {}

type State = {
    optionId : ?string,
    text : ?string,
    imageUrl: ?string,
    videoUrl: ?string,
    attachImage: boolean,
    attachVideo: boolean,
}

export default class PollOptionContentView extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            optionId: null,
            text: null,
            imageUrl: null,
            videoUrl: null,
            attachImage: false,
            attachVideo: false,
        };
    }

    collectData = async () => {
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}} keyboardDismissMode='on-drag' removeClippedSubviews={false} keyboardShouldPersistTaps='always'>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle}>Option Id</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.optionId} onChangeText={(text) => this.setState({optionId: text})} placeholder='Option Id'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle}>Text</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.text} onChangeText={(text) => this.setState({text: text})} placeholder='Text'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle}>Image URL</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.imageUrl} onChangeText={(text) => this.setState({imageUrl: text})} placeholder='Image URL'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Video URL</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.videoUrl} onChangeText={(text) => this.setState({videoUrl: text})} placeholder='Video URL'/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
