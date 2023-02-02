
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, View, FlatList, TouchableWithoutFeedback, Text} from 'react-native';
import {PagingQuery, PollStatus, ActivitiesQuery, UserId} from './../getsocial-react-native-sdk';
import Communities from '../getsocial-react-native-sdk/Communities';
import CreateActivityPost from './CreateActivityPost';
import UpdateActivityPost from './UpdateActivityPost';
import ActivitiesListView from './ActivitiesList';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class ActivitiesMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Activities'};

    loadLastPost = async () => {
        const query = ActivitiesQuery.everywhere().byUser(UserId.currentUser()).withPollStatus(PollStatus.WithoutPoll);
        showLoading();
        Communities.getActivities(new PagingQuery(query)).then((result) => {
            hideLoading();
            if (result.entries === undefined || result.entries.length == 0) {
                Alert.alert('Info', 'No activity to edit');
            } else {
                UpdateActivityPost.oldActivity = result.entries[0];
                this.props.navigation.navigate('UpdateActivityPost');
            }
        }, (error) => {
            hideLoading(); Alert.alert('Error', error.message);
        });
    }

    openList = async (title: string, query: ActivitiesQuery) => {
        ActivitiesListView.navigationOptions.title = title;
        ActivitiesListView.activitiesQuery = query;
        this.props.navigation.navigate('ActivitiesList');
    }

    constructor(props: any) {
        super(props);

        const timeline = new MenuItem();
        timeline.key = 'timeline';
        timeline.title = 'Open Timeline';
        timeline.action = () => this.openList(
            'Timeline',
            ActivitiesQuery.timeline()
                .includeComments(3)
        );

        const myfeed = new MenuItem();
        myfeed.key = 'myfeed';
        myfeed.title = 'Open My feed';
        myfeed.action = () => this.openList(
            'My Feed',
            ActivitiesQuery.feedOf(UserId.currentUser())
                .includeComments(3)
        );

        const demofeed = new MenuItem();
        demofeed.key = 'demofeed';
        demofeed.title = 'Open Demo Feed';
        demofeed.action = () => this.openList(
            'Demo Feed',
            ActivitiesQuery.inTopic('demoTopic')
                .includeComments(3)
        );

        const myposts = new MenuItem();
        myposts.key = 'myposts';
        myposts.title = 'My Posts';
        myposts.action = () => this.openList(
            'My Posts',
            ActivitiesQuery.everywhere().byUser(UserId.currentUser())
                .includeComments(3)
        );

        const appMentions = new MenuItem();
        appMentions.key = 'appMentions';
        appMentions.title = 'All app mentions';
        appMentions.action = () => this.openList(
            'App mentions',
            ActivitiesQuery.everywhere()
                .withMentions([UserId.createForApp()])
                .includeComments(3)
        );

        const bookmarks = new MenuItem();
        bookmarks.key = 'bookmarks';
        bookmarks.title = 'All Bookmarks';
        bookmarks.action = () => this.openList(
            'Bookmarks',
            ActivitiesQuery.bookmarkedActivities()
                .includeComments(3)
        );

        const reactedActivities = new MenuItem();
        reactedActivities.key = 'reactedActivities';
        reactedActivities.title = 'All reacted activities';
        reactedActivities.action = () => this.openList(
            'Reacted activities',
            ActivitiesQuery.reactedActivities()
                .includeComments(3)
        );

        const likedActivities = new MenuItem();
        likedActivities.key = 'likedActivities';
        likedActivities.title = 'All liked activities';
        likedActivities.action = () => this.openList(
            'Liked activities',
            ActivitiesQuery.reactedActivities(['like'])
                .includeComments(3)
        );

        const votedActivities = new MenuItem();
        votedActivities.key = 'votedActivities';
        votedActivities.title = 'All voted activities';
        votedActivities.action = () => this.openList(
            'Voted activities',
            ActivitiesQuery.votedActivities()
                .includeComments(3)
        );

        const createpost = new MenuItem();
        createpost.key = 'createpost';
        createpost.title = 'Create Post';
        createpost.action = () => {
            this.props.navigation.navigate('CreateActivityPost');
        };

        const editpost = new MenuItem();
        editpost.key = 'editpost';
        editpost.title = 'Edit Post (Last post by current user)';
        editpost.action = () => this.loadLastPost();

        const mainMenu = [
            timeline,
            myfeed,
            demofeed,
            myposts,
            appMentions,
            bookmarks,
            reactedActivities,
            likedActivities,
            votedActivities,
            createpost,
            editpost];

        this.state = {
            menu: mainMenu,
        };
    }

    menuItemSelected(menuItem : MenuItem) {
        if (menuItem.navigateTo != null) {
            this.props.navigation.navigate(menuItem.navigateTo);
        }
        if (menuItem.action != null) {
            menuItem.action();
        }
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                {/* menu starts */}
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.menu}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback onPress={ () => this.menuItemSelected(item)}>
                                <View style={MenuStyle.listitem}>
                                    <Text style={MenuStyle.menuitem}>{item.title}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item) => item.key}
                    />
                </View>
                {/* menu ends */}
            </View>
        );
    }
}

