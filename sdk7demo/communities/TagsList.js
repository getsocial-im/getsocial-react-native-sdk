// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, Button, View, TouchableWithoutFeedback} from 'react-native';
import {Communities, TagsQuery, ActivitiesView, ActivitiesQuery, Tag} from './../getsocial-react-native-sdk';
import SearchBar from 'react-native-search-bar';
import ActionSheet from 'react-native-actionsheet';
import PagingQuery from '../getsocial-react-native-sdk/models/PagingQuery';
PagingQuery
import FollowQuery from '../getsocial-react-native-sdk/models/communities/FollowQuery';
import FollowersQuery from '../getsocial-react-native-sdk/models/communities/FollowersQuery';
import FollowersListView from './FollowersList';

type Props = { navigation: Function }
type State = {
    tags: [string],
    selectedTag: ?Tag,
    followStatus: ?Map<string, boolean>,
    searchText: string,
    showOnlyTrending: boolean
}

export default class TagsListView extends Component<Props, State> {
    static navigationOptions = {title: 'Tags'};
    static query: TagsQuery;
    static areFollowedTags: boolean = false;

    updateSearchText = async (text: String) => {
        this.setState({searchText: text});
    }

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        options.push('Show Feed');
        const isFollowed = this.state.selectedTag != undefined &&
            (this.state.selectedTag.isFollowedByMe ||
                this.state.followStatus[this.state.selectedTag.name]);
        options.push(isFollowed ? 'Unfollow' : 'Follow');
        options.push('Show Followers');
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        let stringified = JSON.stringify(this.state.selectedTag);

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

    loadTags = async () => {
        let query = TagsListView.query == null
            ? (this.state.searchText == null
                ? TagsQuery.all()
                : TagsQuery.search(this.state.searchText)
            )
            : TagsListView.query;

        query.onlyTrending(this.state.showOnlyTrending);

        showLoading();

        Communities.getTags(new PagingQuery(query)).then((result) => {
            hideLoading();
            this.setState({tags: result.entries});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    showFeed = () => {
        const query = ActivitiesQuery.everywhere();
        query.withTag(this.state.selectedTag.name);
        const view = ActivitiesView.create(query);
        view.show();
    }

    showFollowers = async () => {
        const query = FollowersQuery.ofTag(this.state.selectedTag.name);
        FollowersListView.query = query;
        this.props.navigation.navigate('FollowersList');
    }

    updateFollowStatus = async () => {
        const tagName = this.state.selectedTag.name;
        const isFollowed = this.state.selectedTag &&
            (this.state.selectedTag.isFollowedByMe ||
                this.state.followStatus[tagName]);
        const query = FollowQuery.tags([tagName]);

        showLoading();

        if (isFollowed) {
            Communities.unfollow(query).then(
                (result) => {
                    hideLoading();
                    Alert.alert('Unfollowed', 'You are following now ' + result + ' tags');
                    const mp = this.state.followStatus;
                    mp[tagName] = false;
                    this.setState({followStatus: mp});
                    if (TagsListView.areFollowedTags) {
                        this.setState({
                            tags: this.state.tags
                                .filter((tag) => tag.name !== tagName)
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
                    Alert.alert('Followed', 'You are following now ' + result + ' tags');
                    const mp = this.state.followStatus;
                    mp[tagName] = true;
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
        const emptyTags: [string]= [];
        this.state = {
            tags: emptyTags,
            showOnlyTrending: false,
            followStatus: {},
            searchText: null,
        };
    }

    componentDidMount() {
        this.loadTags();
    }

    showActionSheet = (tag: Tag) => {
        this.setState({selectedTag: tag}, () => {
            this.ActionSheet.show();
        });
    }

    updateFilterButton = async () => {
        const currentValue = this.state.showOnlyTrending;
        this.setState({showOnlyTrending: !currentValue}, () => {
            this.loadTags();
        } );
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                {/* menu starts */}
                {
                    !TagsListView.areFollowedTags &&
                    <SearchBar
                        ref="tagsearch"
                        textColor='black'
                        autoCapitalize='none'
                        onChangeText= { (text) => this.updateSearchText(text) }
                        placeholder="Search"
                        onCancelButtonPress= { () => this.updateSearchText(null).then(() => this.loadTags()) }
                        onSearchButtonPress={ () => this.loadTags() }
                    />
                }
                <View style={MenuStyle.menuitem}>
                    <Button title={this.state.showOnlyTrending ? 'All': 'Only Trending'} onPress={ this.updateFilterButton }/>
                </View>
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.tags}
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

