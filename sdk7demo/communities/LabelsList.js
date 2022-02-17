// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, Button, View, TouchableWithoutFeedback} from 'react-native';
import {Communities, LabelsQuery, ActivitiesView, ActivitiesQuery, Label} from './../getsocial-react-native-sdk';
import SearchBar from 'react-native-search-bar';
import PagingQuery from '../getsocial-react-native-sdk/models/PagingQuery';
import ActionSheet from 'react-native-actionsheet';
import FollowQuery from '../getsocial-react-native-sdk/models/communities/FollowQuery';
import FollowersQuery from '../getsocial-react-native-sdk/models/communities/FollowersQuery';
import FollowersListView from './FollowersList';

type Props = { navigation: Function }
type State = {
    labels: [string],
    selectedLabel: ?Label,
    followStatus: ?Map<string, boolean>,
    searchText: string,
    showOnlyTrending: boolean
}

export default class LabelsListView extends Component<Props, State> {
    static navigationOptions = {title: 'Labels'};
    static query: LabelsQuery;
    static areFollowedLabels: boolean = false;

    updateSearchText = async (text: String) => {
        this.setState({searchText: text});
    }

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        options.push('Show Feed');
        const isFollowed = this.state.selectedLabel != undefined &&
            (this.state.selectedLabel.isFollowedByMe ||
                this.state.followStatus[this.state.selectedLabel.name]);
        options.push(isFollowed ? 'Unfollow' : 'Follow');
        options.push('Show Followers');
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        let stringified = JSON.stringify(this.state.selectedLabel);

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
            case 'Show Feed':
                this.showFeed();
                break;
            case 'Follow':
            case 'Unfollow':
                this.updateFollowStatus();
                break;
            case 'Show Followers':
                this.showFollowers();
                break;
        }
    }

    loadLabels = async () => {
        showLoading();

        let query = LabelsListView.query == null
            ? (this.state.searchText == null
                ? LabelsQuery.all()
                : LabelsQuery.search(this.state.searchText)
            )
            : LabelsListView.query;

        query.onlyTrending(this.state.showOnlyTrending);

        Communities.getLabels(new PagingQuery(query)).then((result) => {
            hideLoading();
            this.setState({labels: result.entries});
        }, (error) => {
            console.log(error);
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    showFeed = () => {
        const query = ActivitiesQuery.everywhere();
        query.withLabels([this.state.selectedLabel.name]);
        const view = ActivitiesView.create(query);
        view.show();
    }

    showFollowers = async () => {
        const query = FollowersQuery.ofLabel(this.state.selectedLabel.name);
        FollowersListView.query = query;
        this.props.navigation.navigate('FollowersList');
    }

    updateFollowStatus = async () => {
        const labelName = this.state.selectedLabel.name;
        const isFollowed = this.state.selectedLabel &&
            (this.state.selectedLabel.isFollowedByMe ||
                this.state.followStatus[labelName]);
        const query = FollowQuery.labels([labelName]);

        showLoading();

        if (isFollowed) {
            Communities.unfollow(query).then(
                (result) => {
                    hideLoading();
                    Alert.alert('Unfollowed', 'You are following now ' + result + ' labels');
                    const mp = this.state.followStatus;
                    mp[labelName] = false;
                    this.setState({followStatus: mp});
                    if (LabelsListView.areFollowedLabels) {
                        this.setState({
                            labels: this.state.labels
                                .filter((label) => label.name !== labelName)
                        });
                    }
                },
                (error) => {
                    hideLoading();
                    Alert.alert('Error', error.message);
                });
        } else {
            Communities.follow(query).then(
                (result) => {
                    hideLoading();
                    Alert.alert('Followed', 'You are following now ' + result + ' labels');
                    const mp = this.state.followStatus;
                    mp[labelName] = true;
                    this.setState({followStatus: mp});
                },
                (error) => {
                    hideLoading();
                    Alert.alert('Error', error.message);
                });
        }
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyLabels: [string]= [];
        this.state = {
            labels: emptyLabels,
            showOnlyTrending: false,
            followStatus: {},
            searchText: null,
        };
    }

    componentDidMount() {
        this.loadLabels();
    }

    showActionSheet = (label: Label) => {
        this.setState({selectedLabel: label}, () => {
            this.ActionSheet.show();
        });
    }

    updateFilterButton = async () => {
        const currentValue = this.state.showOnlyTrending;
        this.setState({showOnlyTrending: !currentValue}, () => {
            this.loadLabels();
        } );
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                {/* menu starts */}
                {
                    !LabelsListView.areFollowedLabels &&
                    <SearchBar
                        ref="labelsearch"
                        textColor='black'
                        autoCapitalize='none'
                        onChangeText= { (text) => this.updateSearchText(text) }
                        placeholder="Search"
                        onCancelButtonPress= { () => this.updateSearchText(null).then(() => this.loadLabels()) }
                        onSearchButtonPress={ () => this.loadLabels() }
                    />
                }
                <View style={MenuStyle.menuitem}>
                    <Button title={this.state.showOnlyTrending ? 'All': 'Only Trending'} onPress={ this.updateFilterButton }/>
                </View>
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.labels}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem4rows}>
                                    <View style={{flex: 1, flexDirection: 'column', width: '80%'}}>
                                        <Text style={MenuStyle.menuitem14}>
                                            {item.name}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Popularity: {item.popularity}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Activities count: {item.activitiesCount}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Followers count: {item.followersCount}
                                        </Text>
                                    </View>
                                    <View>
                                        <Button title='Actions'
                                            onPress={ () => this.showActionSheet(item) }
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item) => item.name}
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

