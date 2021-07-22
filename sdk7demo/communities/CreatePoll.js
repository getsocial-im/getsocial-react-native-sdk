// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Picker, Switch, Image, View, Text, TextInput, Button, ScrollView, FlatList, KeyboardAvoidingView} from 'react-native';
import {CreateActivityPostStyle} from './CreateActivityPostStyle';
import {Communities, MediaAttachment, PostActivityTarget, ActivityContent, PollOptionContent, PollContent} from 'getsocial-react-native-sdk';
import {showLoading, hideLoading} from './../common/LoadingIndicator';
import {Styles} from './../common/Styles.js';
// eslint-disable-next-line no-unused-vars
import DropDownPicker from 'react-native-dropdown-picker';
import PollOptionContentView from './PollOptionContentView';
import DatePicker from 'react-native-datepicker';
import CheckBox from '@react-native-community/checkbox';

type Props = {}

type State = {
    text : ?string,
    endDate : ?number,
    allowMultipleVotes : boolean,
    optionsRef: [string],
}

export default class CreatePollView extends Component<Props, State> {
  static navigationOptions = {title: 'Create Poll'};
  static target: PostActivityTarget

  constructor(props: any) {
      super(props);
      const emptyOptions: [string]= [];

      this.state = {
          text: null,
          endDate: null,
          allowMultipleVotes: false,
          optionsRef: emptyOptions,
      };
  }

  generateRandom() {
      const min = 1;
      const max = 1000;
      return min + (Math.random() * (max-min));
  }


    addPollOption = async () => {
        const existingOptions = this.state.optionsRef;
        existingOptions.push(React.createRef());
        this.setState({
            options: existingOptions,
        });
    }

    removePollOption = async (index: number) => {
        const data = this.state.properties;
        data.splice(index, 1);
        this.setState((prevState) => {
            return {properties: data};
        });
    }

    updatePropertyData = async (index: number, newName: string, newValue: string) => {
        this.setState((prevState) => {
            const copiedData = [...prevState.properties];
            copiedData[index].name = newName;
            copiedData[index].value = newValue;
            return {properties: copiedData};
        });
    }

    renderPollOptions() {
        return this.state.optionsRef.map((ref) => (<PollOptionContentView ref={ref}/>));
    }

    createPoll = async () => {
        const activityContent = new ActivityContent();
        activityContent.text = this.state.text;
        const poll = new PollContent();
        this.state.optionsRef.forEach((ref) => {
            const pollOption = new PollOptionContent();
            pollOption.optionId = ref.current.state.optionId;
            pollOption.text = ref.current.state.text;
            if (ref.current.state.imageUrl != null && ref.current.state.imageUrl.length != 0) {
                pollOption.attachment = MediaAttachment.withImageUrl(ref.current.state.imageUrl);
            } else if (ref.current.state.videoUrl != null && ref.current.state.videoUrl.length != 0) {
                pollOption.attachment = MediaAttachment.withVideoUrl(ref.current.state.videoUrl);
            }
            poll.options.push(pollOption);
        });
        poll.allowMultipleVotes = this.state.allowMultipleVotes;
        if (this.state.endDate != null) {
            poll.endDate = new Date(this.state.endDate).getTime() / 1000;
        }
        activityContent.poll = poll;
        showLoading();
        Communities.postActivity(activityContent, CreatePollView.target).then(() => {
            hideLoading();
            const emptyOptions: [string]= [];
            this.setState(() => {
                return {text: null, endDate: null, allowMultipleVotes: false, optionsRef: emptyOptions};
            });
            Alert.alert('Success', 'Poll created');
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}} keyboardDismissMode='on-drag' removeClippedSubviews={false} keyboardShouldPersistTaps='always'>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Text</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.text} onChangeText={(text) => this.setState({text: text})} placeholder='Text'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >End date</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.endDate} onChangeText={(text) => this.setState({endDate: text})} placeholder='End date'/>
                    </View>
                </View>
                <View>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.endDate}
                        mode="date"
                        placeholder="End date"
                        format="YYYY-MM-DD"
                        minDate="2020-09-01"
                        maxDate="2030-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                            },
                            datePicker: {
                                backgroundColor: '#d1d3d8',
                                justifyContent: 'center',
                            },
                        }}
                        onDateChange={(date) => {
                            this.setState({endDate: date});
                        }}
                    />
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Allow multiple votes</Text>
                    </View>
                    <View>
                        <CheckBox center value={this.state.allowMultipleVotes} onValueChange={(newValue) => this.setState({allowMultipleVotes: newValue}) }/>
                    </View>
                </View>
                {this.renderPollOptions()}
                <KeyboardAvoidingView behavior='padding'>
                    <View zIndex={40} style={CreateActivityPostStyle.sectionTitleRow}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Button title='Add Poll Option' onPress={ () => this.addPollOption() }/>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior='padding'>
                    <View zIndex={40} style={CreateActivityPostStyle.sectionTitleRow}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Button title='Create' onPress={ () => this.createPoll() }/>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
