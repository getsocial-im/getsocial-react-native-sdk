
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
import {PagingQuery, Action, ActivitiesView, ActivitiesQuery, AnnouncementsQuery, UserId, User} from './../getsocial-react-native-sdk';
import Communities from '../getsocial-react-native-sdk/Communities';
import CreateActivityPost from './CreateActivityPost';
import UpdateActivityPost from './UpdateActivityPost';
import {globalActionProcessor} from './../common/CommonMethods.js';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class ActivitiesMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Activities'};

    loadLastPost = async () => {
        const query = AnnouncementsQuery.timeline();
        Communities.getAnnouncements(query).then((result) => {
            console.log('ok');
        }, (error) => {
            console.log('error');
        });
    }

    openFeed = async (query: ActivitiesQuery) => {
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

    constructor(props: any) {
        super(props);

        const timeline = new MenuItem();
        timeline.key = 'timeline';
        timeline.title = 'Open Timeline';
        timeline.action = () => this.openFeed(ActivitiesQuery.timeline());

        const myfeed = new MenuItem();
        myfeed.key = 'myfeed';
        myfeed.title = 'Open My feed';
        myfeed.action = () => this.openFeed(ActivitiesQuery.feedOf(UserId.currentUser()));

        const demofeed = new MenuItem();
        demofeed.key = 'demofeed';
        demofeed.title = 'Open Demo Feed';
        demofeed.action = () => this.openFeed(ActivitiesQuery.inTopic('demoTopic'));

        const myposts = new MenuItem();
        myposts.key = 'myposts';
        myposts.title = 'My Posts';
        myposts.action = () => this.openFeed(ActivitiesQuery.everywhere().byUser(UserId.currentUser()));

        const createpost = new MenuItem();
        createpost.key = 'createpost';
        createpost.title = 'Create Post';
        createpost.action = () => {
            CreateActivityPost.oldActivity == null;
            this.props.navigation.navigate('CreateActivityPost');
        };

        const editpost = new MenuItem();
        editpost.key = 'editpost';
        editpost.title = 'Edit Post (Last post by current user)';
        editpost.action = () => this.loadLastPost();

        const mainMenu = [timeline, myfeed,
            demofeed, myposts, createpost, editpost];

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

