// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, User, Action, TopicsQuery, Topic, PagingQuery, PollStatus, ActivitiesQuery, AnnouncementsQuery, ActivitiesView} from './../getsocial-react-native-sdk';
import FollowQuery from '../getsocial-react-native-sdk/models/communities/FollowQuery';
import FollowersQuery from '../getsocial-react-native-sdk/models/communities/FollowersQuery';
import FollowersListView from './FollowersList';
import PollsListView from './PollsList';
import ActivitiesListView from './ActivitiesList';
import CommunitiesAction from '../getsocial-react-native-sdk/models/communities/CommunitiesAction';
import CreateActivityPost from './CreateActivityPost';
import CreatePollView from './CreatePoll';
import PostActivityTarget from '../getsocial-react-native-sdk/models/communities/PostActivityTarget';
import moment from 'moment';
import {globalActionProcessor} from './../common/CommonMethods.js';
import SearchBar from 'react-native-search-bar';
import ActionSheet from 'react-native-actionsheet';

type Props = { navigation: Function }
type State = {
    topics: [Topic],
    selectedTopic: ?Topic,
    searchText: string,
    labels: [string],
    properties: Map<string, string>,
    followStatus: ?Map<string, boolean>,
    showOnlyTrending: boolean,
}

export default class TopicsListView extends Component<Props, State> {
    static navigationOptions = {title: 'Topics'};
    static query: TopicsQuery;
    static areFollowedTopics: boolean = false;

    updateSearchText = async (text: String) => {
        this.setState({searchText: text});
    }

    updateLabels = async (text: String) => {
        return this.setState({
            labels: text
                ? text.split(',').map((label) => label.trim())
                : []
        });
    }

    updateProps = async (text: String) => {
        let properties = {};

        if (text) {
            text.split(',').forEach((prop) => {
                prop = prop.split('=');
                if (prop.length === 2 && prop[0] && prop[1]) {
                    properties[prop[0].trim()] = prop[1].trim();
                }
            });
        }

        return this.setState({ properties });
    }

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        options.push('Show Feed');
        options.push('Activities');
        options.push('Activities with Polls');
        options.push('Announcements with Polls');
        const isFollowed = this.state.selectedTopic != undefined && (this.state.selectedTopic.isFollowedByMe === true || this.state.followStatus[this.state.selectedTopic.id] === true);
        options.push(isFollowed === true ? 'Unfollow' : 'Follow');
        options.push('Show Followers');
        const canPost = this.state.selectedTopic != undefined && this.state.selectedTopic.settings.isActionAllowed(CommunitiesAction.Post) == true;
        if (canPost) {
            options.push('Post');
            options.push('Create Poll');
        }
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        let stringified = JSON.stringify(this.state.selectedTopic);
        stringified += ', CreatedAt: ' + moment(new Date(this.state.selectedTopic.createdAt * 1000)).format('DD/MM/YYYY hh:mm');
        stringified += ', UpdatedAt: ' + moment(new Date(this.state.selectedTopic.updatedAt * 1000)).format('DD/MM/YYYY hh:mm');

        Alert.alert('Details', stringified + '\n \n \n');
    }

    showFeed = async () => {
        const query = ActivitiesQuery.inTopic(this.state.selectedTopic.id);
        const view = ActivitiesView.create(query);
        view.onMentionClickListener = (mention: string) => {
            Alert.alert('Info', 'Mention [' + mention + '] clicked.');
        };
        view.onTagClickListener = (tag: string) => {
            Alert.alert('Info', 'Tag [' + tag + '] clicked.');
        };
        view.onAvatarClickListener = (user: User) => {
            Alert.alert('Info', 'User [' + JSON.stringify(user) + '] clicked.');
        };
        view.onActionButtonClickListener = (action: Action) => {
            globalActionProcessor(action);
        };
        view.show();
    }

    showActivities = async () => {
        ActivitiesListView.activitiesQuery = ActivitiesQuery.inTopic(this.state.selectedTopic.id);
        this.props.navigation.navigate('ActivitiesList');
    }

    showPollsActivities = async () => {
        PollsListView.activitiesQuery = ActivitiesQuery.inTopic(this.state.selectedTopic.id).withPollStatus(PollStatus.WithPoll);
        PollsListView.announcementsQuery = null;
        this.props.navigation.navigate('PollsList');
    }

    showPollsAnnouncements = async () => {
        PollsListView.announcementsQuery = AnnouncementsQuery.inTopic(this.state.selectedTopic.id).withPollStatus(PollStatus.WithPoll);
        PollsListView.activitiesQuery = null;
        this.props.navigation.navigate('PollsList');
    }

    showFollowers = async () => {
        const query = FollowersQuery.ofTopic(this.state.selectedTopic.id);
        FollowersListView.query = query;
        this.props.navigation.navigate('FollowersList');
    }

    showCreatePost = async () => {
        CreateActivityPost.activityTarget = PostActivityTarget.topic(this.state.selectedTopic.id);
        CreateActivityPost.query = ActivitiesQuery.inTopic(this.state.selectedTopic.id);
        this.props.navigation.navigate('CreateActivityPost');
    }

    showCreatePoll = async () => {
        CreatePollView.target = PostActivityTarget.topic(this.state.selectedTopic.id);
        this.props.navigation.navigate('CreatePoll');
    }

    updateFollowStatus = async () => {
        const topicId = this.state.selectedTopic.id;
        const isFollowed = this.state.selectedTopic != undefined &&
        (this.state.selectedTopic.isFollowedByMe ||
            this.state.followStatus[topicId]);
        const query = FollowQuery.topics([topicId]);

        showLoading();

        if (isFollowed) {
            Communities.unfollow(query).then(
                (result) => {
                    hideLoading();
                    Alert.alert('Unfollowed', 'You are following now ' + result + ' topics');
                    const mp = this.state.followStatus;
                    mp[topicId] = false;
                    this.setState({followStatus: mp});
                    if (TopicsListView.areFollowedTopics) {
                        this.setState({
                            topics: this.state.topics
                                .filter((topic) => topic.id !== topicId)
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
                    Alert.alert('Followed', 'You are following now ' + result + ' topics');
                    const mp = this.state.followStatus;
                    mp[this.state.selectedTopic.id] = true;
                    this.setState({followStatus: mp});
                },
                (error) => {
                    hideLoading();
                    Alert.alert('Error', error.message);
                });
        }
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
        case 'Activities with Polls':
            this.showPollsActivities();
            break;
        case 'Activities':
            this.showActivities();
            break;
        case 'Announcements with Polls':
            this.showPollsAnnouncements();
            break;
        case 'Follow':
            this.updateFollowStatus();
            break;
        case 'Unfollow':
            this.updateFollowStatus();
            break;
        case 'Show Followers':
            this.showFollowers();
            break;
        case 'Post':
            this.showCreatePost();
            break;
        case 'Create Poll':
            this.showCreatePoll();
            break;
        }
    }

    loadTopics = async () => {
        showLoading();
        let query = TopicsListView.query == null
            ? (this.state.searchText == null
                ? TopicsQuery.all()
                : TopicsQuery.find(this.state.searchText)
            )
            : TopicsListView.query;

        query
            .onlyTrending(this.state.showOnlyTrending)
            .withProperties(this.state.properties)
            .withLabels(this.state.labels);

        Communities.getTopics(new PagingQuery(query)).then((result) => {
            hideLoading();
            this.setState({topics: result.entries});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyTopics: [Topic]= [];
        this.state = {
            topics: emptyTopics,
            selectedTopic: undefined,
            searchText: null,
            followStatus: {},
            showOnlyTrending: false,
        };
    }

    componentDidMount() {
        this.setState({searchText: null});
        this.loadTopics();
    }

    showActionSheet = (topic: Topic) => {
        this.setState({selectedTopic: topic}, () => {
            this.ActionSheet.show();
        });
    }

    updateFilterButton = async () => {
        const currentValue = this.state.showOnlyTrending;
        this.setState({showOnlyTrending: !currentValue}, () => {
            this.loadTopics();
        } );
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                {
                    !TopicsListView.areFollowedTopics &&
                    <>
                        <SearchBar
                            ref="topicsearch"
                            textColor='black'
                            autoCapitalize='none'
                            onChangeText= { (text) => this.updateSearchText(text) }
                            placeholder="Search"
                            onCancelButtonPress= { () => this.updateSearchText(null).then(() => this.loadTopics()) }
                            onSearchButtonPress={ () => this.loadTopics() }
                        />
                        <SearchBar
                            ref="topicLabels"
                            textColor='black'
                            autoCapitalize='none'
                            onChangeText= { (text) => this.updateLabels(text) }
                            placeholder="label1,label2"
                            onCancelButtonPress= { () => this.updateLabels().then(() => this.loadTopics()) }
                            onSearchButtonPress={ () => this.loadTopics() }
                        />
                        <SearchBar
                            ref="topicProps"
                            textColor='black'
                            autoCapitalize='none'
                            onChangeText= { (text) => this.updateProps(text) }
                            placeholder="key=value,key1=value1"
                            onCancelButtonPress= { () => this.updateProps().then(() => this.loadTopics()) }
                            onSearchButtonPress={ () => this.loadTopics() }
                        />
                    </>
                }
                <View style={MenuStyle.menuitem}>
                    <Button title={this.state.showOnlyTrending ? 'All': 'Only Trending'} onPress={ this.updateFilterButton }/>
                </View>
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.topics}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem4rows}>
                                    <View style={{flex: 1, flexDirection: 'column', width: '80%'}}>
                                        <Text style={MenuStyle.menuitem14}>
                                            Title: {item.title}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Popularity: {item.popularity}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Labels: {item.settings.labels.length ? item.settings.labels.join(', ') : 'None'}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Properties: {item.settings.properties ? JSON.stringify(item.settings.properties) : 'None'}
                                        </Text>
                                    </View>
                                    <View>
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

