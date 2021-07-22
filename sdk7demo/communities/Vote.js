// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, Poll, PollOption, UserVotes, PagingQuery} from './../getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';
import {Styles} from './../common/Styles.js';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';

type Props = { navigation: Function }
type State = {
    allowMultipleVotes: ?Poll,
    pollOptions: [PollOption],
    selectedPollOptions: [string],
}

export default class VoteView extends Component<Props, State> {
    static navigationOptions = {title: 'Votes'};
    static activityId: string;

    loadActivity = async () => {
        showLoading();
        Communities.getActivity(VoteView.activityId).then((result) => {
            hideLoading();
            const poll = result.poll;
            this.setState({allowMultipleVotes: poll.allowMultipleVotes, pollOptions: poll.options});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyOptions: [PollOption]= [];
        const emptySelectedOptions: [string]= [];
        this.state = {
            allowMultipleVotes: false,
            pollOptions: emptyOptions,
            selectedPollOptions: emptySelectedOptions,
        };
    }

    componentDidMount() {
        this.loadActivity();
    }

    showActionSheet = (vote: UserVotes) => {
        this.setState({selectedVote: vote}, () => {
            this.ActionSheet.show();
        });
    }

    addVotes = () => {
        showLoading();
        Communities.addVotes(this.state.selectedPollOptions, VoteView.activityId).then((result) => {
            hideLoading();
            this.loadActivity();
            Alert.alert('Success', 'Votes added');
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    setVotes = () => {
        Communities.setVotes(this.state.selectedPollOptions, VoteView.activityId).then((result) => {
            hideLoading();
            this.loadActivity();
            Alert.alert('Success', 'Votes set');
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    removeVotes = () => {
        Communities.removeVotes(this.state.selectedPollOptions, VoteView.activityId).then((result) => {
            hideLoading();
            this.loadActivity();
            Alert.alert('Success', 'Votes removed');
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    getImageUrl(item: PollOption): string {
        if (item.attachment == null) {
            return '';
        }
        if (item.attachment.getImageUrl() == null) {
            return '';
        }
        return item.attachment.getImageUrl().substring(0, 24);
    }

    getVideoUrl(item: PollOption): string {
        if (item.attachment == null) {
            return '';
        }
        if (item.attachment.getVideoUrl() == null) {
            return '';
        }
        return item.attachment.getVideoUrl().substring(0, 24);
    }

    updateSelectedOptions = (item: PollOption, isChecked: boolean) => {
        let votes = [];
        if (this.state.allowMultipleVotes) {
            votes = this.state.selectedPollOptions;
        }
        if (isChecked) {
            votes = votes.filter((element) => element !== item.optionId);
        } else {
            votes.push(item.optionId);
        }
        this.setState({selectedPollOptions: votes});
    }

    getChecked(item: PollOption): boolean {
        return this.state.selectedPollOptions.includes(item.optionId);
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                <View style={MenuStyle.menuContainer}>
                    <View style={Styles.formEntryRow}>
                        <Button title='Add' onPress={ () => this.addVotes() }/>
                        <Button title='Set' onPress={ () => this.setVotes() }/>
                        <Button title='Remove' onPress={ () => this.removeVotes() }/>
                    </View>
                    <FlatList style={{flex: 1}}
                        data={this.state.pollOptions}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem5rows}>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <Text style={MenuStyle.menuitem14}>Id: {item.optionId}</Text>
                                        <Text style={MenuStyle.menuitem14}>Text: {item.text}</Text>
                                        <Text style={MenuStyle.menuitem14}>Image Url: {this.getImageUrl(item)}</Text>
                                        <Text style={MenuStyle.menuitem14}>Video Url: {this.getVideoUrl(item)}</Text>
                                        <Text style={MenuStyle.menuitem14}>Vote count: {item.voteCount}</Text>
                                    </View>
                                    <View style={MenuStyle.rowEndContainer}>
                                        <CheckBox center value={this.getChecked(item)} onValueChange={() => this.updateSelectedOptions(item, this.getChecked(item)) }/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item) => item.optionId}
                    />
                </View>
            </View>
        );
    }
}

