// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, VotesQuery, UserVotes, PagingQuery} from './../getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';
import moment from 'moment';

type Props = { navigation: Function }
type State = {
    votes: [UserVotes],
    selectedVote: ?UserVotes,
}

export default class VotesListView extends Component<Props, State> {
    static navigationOptions = {title: 'Votes'};
    static activityId: string;

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        const stringified = JSON.stringify(this.state.selectedVote);
        Alert.alert('Details', stringified + '\n \n \n');
    }

    handleActionSheetSelection = async (selected: string, selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
        switch (selected) {
        case 'Details':
            this.showDetails();
            break;
        }
    }

    loadVotes = async () => {
        showLoading();
        const query = VotesQuery.forActivity(VotesListView.activityId);
        Communities.getVotes(new PagingQuery(query)).then((result) => {
            hideLoading();
            this.setState({votes: result.entries});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyVotes: [UserVotes]= [];
        this.state = {
            votes: emptyVotes,
            selectedVote: undefined,
        };
    }

    componentDidMount() {
        this.loadVotes();
    }

    showActionSheet = (vote: UserVotes) => {
        this.setState({selectedVote: vote}, () => {
            this.ActionSheet.show();
        });
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.votes}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem5rows}>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <Text style={MenuStyle.menuitem14}>User: {item.user.displayName}</Text>
                                        <Text style={MenuStyle.menuitem14}>Votes: {JSON.stringify(item.votes)}</Text>
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

