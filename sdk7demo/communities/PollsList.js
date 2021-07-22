// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, CommunitiesAction, Activity, PollStatus, ActivitiesQuery, AnnouncementsQuery, PagingQuery} from './../getsocial-react-native-sdk';
import VoteView from './Vote';
import VotesListView from './VotesList';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';
import {Styles} from './../common/Styles.js';
import moment from 'moment';

type Props = { navigation: Function }
type State = {
    activities: [Activity],
    selectedActivity: ?Activity,
    pollStatus: PollStatus,
}

export default class PollsListView extends Component<Props, State> {
    static navigationOptions = {title: 'Polls'};
    static activitiesQuery: ActivitiesQuery;
    static announcementsQuery: AnnouncementsQuery;

    generateOptions() : [string] {
        const options = [];
        options.push('Details');

        let isVotingAllowed = false;
        if (this.state.selectedActivity != undefined) {
            const source = this.state.selectedActivity.source;
            if (source != undefined) {
                isVotingAllowed = source.isActionAllowed(CommunitiesAction.React);
            }
        }
        if (isVotingAllowed) {
            options.push('Vote');
        }
        options.push('Show votes');
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        const knownVoters = JSON.stringify(this.state.selectedActivity.poll.voters);
        Alert.alert('Details', 'Known voters:' + knownVoters + '\n \n \n');
    }

    showVotes = async () => {
        VotesListView.activityId = this.state.selectedActivity.id;
        this.props.navigation.navigate('VotesList');
    }

    showVote = async () => {
        VoteView.activityId = this.state.selectedActivity.id;
        this.props.navigation.navigate('Vote');
    }

    handleActionSheetSelection = async (selected: string, selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
        switch (selected) {
        case 'Details':
            this.showDetails();
            break;
        case 'Vote':
            this.showVote();
            break;
        case 'Show votes':
            this.showVotes();
            break;
        }
    }

    loadActivities = async () => {
        showLoading();
        const query = PollsListView.activitiesQuery.withPollStatus(this.state.pollStatus);
        Communities.getActivities(new PagingQuery(query)).then((result) => {
            hideLoading();
            this.setState({activities: result.entries});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    loadAnnouncements = async () => {
        showLoading();
        const query = PollsListView.announcementsQuery.withPollStatus(this.state.pollStatus);
        Communities.getAnnouncements(query).then((result) => {
            hideLoading();
            this.setState({activities: result});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyActivities: [Activity]= [];
        this.state = {
            activities: emptyActivities,
            selectedActivity: undefined,
            pollStatus: PollStatus.WithPoll,
        };
    }

    componentDidMount() {
        this.load();
        this.props.navigation.addListener('willFocus', this.load);
    }

    load = async () => {
        if (PollsListView.announcementsQuery !== null) {
            this.loadAnnouncements();
        }
        if (PollsListView.activitiesQuery !== null) {
            this.loadActivities();
        }
    }

    showActionSheet = (activity: Activity) => {
        this.setState({selectedActivity: activity}, () => {
            this.ActionSheet.show();
        });
    }

    changePollStatus = (newStatus: PollStatus) => {
        this.setState({pollStatus: newStatus}, () => {
            this.load();
        });
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                <View style={MenuStyle.menuContainer}>
                    <View style={Styles.formEntryRow}>
                        <Button title='All' disabled={this.state.pollStatus == PollStatus.WithPoll } onPress={ () => this.changePollStatus(PollStatus.WithPoll) }/>
                        <Button title='Voted' disabled={this.state.pollStatus == PollStatus.VotedByMe } onPress={ () => this.changePollStatus(PollStatus.VotedByMe) }/>
                        <Button title='Not Voted' disabled={this.state.pollStatus == PollStatus.NotVotedByMe } onPress={ () => this.changePollStatus(PollStatus.NotVotedByMe) }/>
                    </View>
                    <FlatList style={{flex: 1}}
                        data={this.state.activities}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem}>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <Text style={MenuStyle.menuitem14}>Text: {item.text}</Text>
                                        <Text style={MenuStyle.menuitem14}>Total votes: {item.poll.totalVotes}</Text>
                                    </View>
                                    <View style={MenuStyle.rowEndContainer}>
                                        <Button title='Actions' onPress={ () => {
                                            this.showActionSheet(item);
                                        }}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item) => item.id}
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

