// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, Button, View, TouchableWithoutFeedback, Picker} from 'react-native';
import {Communities, Activity, ActivitiesQuery, PagingQuery, ActivitiesView, PostActivityTarget, GetSocial, RemoveActivitiesQuery, ReportingReason} from './../getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';
import SearchBar from 'react-native-search-bar';
import CreateActivityPost from './CreateActivityPost';

type Props = { navigation: Function }
type State = {
    currentUserId: string,
    activities: [Activity],
    selectedActivity: ?Activity,
    searchText: string,
    labels: [string],
    properties: Map<string, string>,
    showOnlyTrending: boolean,
    ui: string,
    showForm: boolean,
    parentActivities: [Activity],
    originalQuery: ActivitiesQuery
}

export default class ActivitiesListView extends Component<Props, State> {
    static navigationOptions = {title: 'Activities'};
    static activitiesQuery: ActivitiesQuery;

    updateSearchText = async (text: String) => {
        return this.setState({searchText: text});
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
        const activity = this.state.selectedActivity;
        const options = [];
        options.push('Details');
        if (activity) {
            const myReactions = activity.myReactions;
            options.push(myReactions.includes('like')
                ? 'Unlike'
                : 'Like'
            );
            options.push(myReactions.includes('test')
                ? 'Remove "test" reaction'
                : 'React with "test"'
            );
            options.push(activity.isBookmarked
                ? 'Remove Bookmark'
                : 'Bookmark'
            );

            if (activity.comments && activity.comments.length) {
                options.push('View included comments');
            }

            options.push(
                'View all comments',
                'Post comment',
            );

            if (activity.author.userId === this.state.currentUserId) {
                options.push('Delete activity');
            } else if (!activity.isAnnouncement) {
                options.push('Report activity');
            }
        }

        options.push('Cancel');

        return options;
    }

    showDetails = async () => {
        Alert.alert('Details', JSON.stringify(this.state.selectedActivity));
    }

    react = async (reaction: string) => {
        const myReactions = this.state.selectedActivity.myReactions;
        const id = this.state.selectedActivity.id;
        const action = myReactions.includes(reaction)
            ? 'removed'
            : 'added';
        const method = action === 'added'
            ? 'addReaction'
            : 'removeReaction';

        return Communities[method](reaction, id)
            .then(() => {
                Alert.alert(
                    'Success',
                    `Reaction ${reaction} has been ${action}`
                );
            });
    }

    bookmark = async () => {
        return Communities.bookmark(this.state.selectedActivity.id)
            .then(() => {
                Alert.alert('Success', 'Bookmark added');
            });
    }

    removeBookmark = async () => {
        return Communities.removeBookmark(this.state.selectedActivity.id)
            .then(() => {
                Alert.alert('Success', 'Bookmark removed');
            });
    }

    showComments = async (comments) => {
        return this.setState({
            ui: 'text',
            showForm: false,
            parentActivities: this.state.parentActivities
                && this.state.parentActivities.length
                    ? [
                        ...this.state.parentActivities,
                        this.state.activities
                    ]
                    : [ this.state.activities ]
        }, () => {
            if (comments && comments.length) {
                this.setState({ activities: comments})
            } else {
                if (!this.state.originalQuery) {
                    this.setState({ originalQuery: ActivitiesListView.activitiesQuery });
                }
                ActivitiesListView.activitiesQuery = ActivitiesQuery
                    .commentsToActivity(this.state.selectedActivity.id);
                this.loadActivities();
            }
        });
    }

    postComment = async () => {
        CreateActivityPost.activityTarget = PostActivityTarget
            .comment(this.state.selectedActivity.id);
        CreateActivityPost.query = ActivitiesQuery
            .commentsToActivity(this.state.selectedActivity.id);
        CreateActivityPost.activitiesListState = {
            originalQuery: this.state.originalQuery ||
                ActivitiesListView.activitiesQuery,
            parentActivities: this.state.parentActivities,
            selectedActivity: this.state.selectedActivity
        };
        this.props.navigation.navigate('CreateActivityPost');
    }

    deleteActivity = async () => {
        const id = this.state.selectedActivity.id;
        return Communities.removeActivities(
            RemoveActivitiesQuery.activityIds([id])
        ).then(() => {
            this.setState({
                selectedActivity: null,
                activities: this.state.activities
                    .filter((a) => a.id !== id)
            });
            Alert.alert('Success', 'Activity removed');
        });
    }

    reportActivity = async () => {
        return Communities.reportActivity(
            this.state.selectedActivity.id,
            ReportingReason.Spam,
            'Report from RN SDK'
        ).then(() => {
            Alert.alert('Success', 'Activity reported');
        });
    }

    handleActionSheetSelection = async (selected: string, selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
        switch (selected) {
            case 'Details':
                this.showDetails();
                break;
            case 'Like':
            case 'Unlike':
                this.react('like');
                break;
            case 'React with "test"':
            case 'Remove "test" reaction':
                this.react('test');
                break;
            case 'Bookmark':
                this.bookmark();
                break;
            case 'Remove Bookmark':
                this.removeBookmark();
                break;
            case 'View included comments':
                this.showComments(this.state.selectedActivity.comments);
                break;
            case 'View all comments':
                this.showComments();
                break;
            case 'Post comment':
                this.postComment();
                break;
            case 'Delete activity':
                this.deleteActivity();
                break;
            case 'Report activity':
                this.reportActivity();
                break;
        }
    }

    loadActivities = async () => {
        let query = ActivitiesListView.activitiesQuery
            .includeComments(3);

        if (query) {
            if (this.state.showForm) {
                query
                    .onlyTrending(this.state.showOnlyTrending)
                    .withText(this.state.searchText)
                    .withProperties(this.state.properties)
                    .withLabels(this.state.labels)
                    .includeComments(3);
            }

            if (this.state.ui === 'default') {
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
            } else {
                showLoading();
                Communities.getActivities(new PagingQuery(query)).then((result) => {
                    hideLoading();
                    this.setState({activities: result.entries});
                }, (error) => {
                    hideLoading();
                    Alert.alert('Error', error.message);
                });
            }

        }
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyActivities: [Activity] = [];
        this.state = {
            currentUserId: undefined,
            activities: emptyActivities,
            selectedActivity: undefined,
            showOnlyTrending: false,
            ui: 'text',
            showForm: true,
            parentActivities: emptyActivities,
            originalQuery: null
        };
    }

    componentDidMount() {
        if (ActivitiesListView.activitiesListState) {
            this.setState({
                ui: 'text',
                showForm: false,
                ...ActivitiesListView.activitiesListState,
            }, () => {
                ActivitiesListView.activitiesQuery = ActivitiesQuery
                    .commentsToActivity(this.state.selectedActivity.id);
                this.loadActivities();
            });
        } else {
            this.loadActivities();
        }

        GetSocial.getCurrentUser().then((currentUser) => {
            this.setState({currentUserId: currentUser.id});
        });
    }

    componentWillUnmount() {
        // Reset title
        ActivitiesListView.navigationOptions.title = 'Activities';
    }

    showActionSheet = (activity: Activity) => {
        this.setState({selectedActivity: activity}, () => {
            this.ActionSheet.show();
        });
    }

    updateFilterButton = async () => {
        const currentValue = this.state.showOnlyTrending;
        this.setState({showOnlyTrending: !currentValue}, () => {
            this.loadActivities();
        } );
    }

    backToParentThread = async () => {
        if (this.state.parentActivities && this.state.parentActivities.length) {
            this.setState({
                activities: this.state.parentActivities.pop(),
                parentActivities: this.state.parentActivities.slice(0, -1)
            })
        } else {
            ActivitiesListView.activitiesQuery = this.state.originalQuery;
            this.setState({ showForm: true, originalQuery: null });
            this.loadActivities();
        }
    }

    EmptyComponent = () => {
        return (
            <Text style={{textAlign: 'center'}}>
              No { this.state.showForm ? 'activities' : 'comments' } found
            </Text>
          );
    };

    render() {
        return (
            <View style={MenuStyle.container}>
                { this.state.showForm
                ? <>
                    <Picker
                        selectedValue={this.state.ui}
                        onValueChange={(itemValue) => {
                            this.setState({ ui: itemValue})
                        }}>
                        <Picker.Item label="Plain Text" value="text"/>
                        <Picker.Item label="Default UI" value="default"/>
                    </Picker>
                    <SearchBar
                        ref="feedSearch"
                        textColor='black'
                        autoCapitalize='none'
                        onChangeText= { (text) => this.updateSearchText(text) }
                        placeholder="Search"
                        onSearchButtonPress={ () => this.loadActivities() }
                    />
                    <SearchBar
                        ref="feedLabels"
                        textColor='black'
                        autoCapitalize='none'
                        onChangeText= { (text) => this.updateLabels(text) }
                        placeholder="label1,label2"
                        onSearchButtonPress={ () => this.loadActivities() }
                    />
                    <SearchBar
                        ref="feedProps"
                        textColor='black'
                        autoCapitalize='none'
                        onChangeText= { (text) => this.updateProps(text) }
                        placeholder="key=value,key1=value1"
                        onSearchButtonPress={ () => this.loadActivities() }
                    />
                    <View style={MenuStyle.menuitem}>
                        <Button title={this.state.showOnlyTrending ? 'All': 'Only Trending'} onPress={ this.updateFilterButton }/>
                    </View>
                    <View style={MenuStyle.menuitem}>
                        <Button title="Submit"
                            onPress={ () => this.loadActivities() }/>
                    </View>
                </>
                : <View style={MenuStyle.menuitem}>
                    <Button title={'Back to parent thread'} onPress={ this.backToParentThread }/>
                </View>
                }
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.activities}
                        ListEmptyComponent={this.EmptyComponent()}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem7rows}>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <Text style={MenuStyle.menuitem14}>
                                            Text: {item.text}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Popularity: {item.popularity}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Labels: {item.labels.length ? item.labels.join(', ') : 'None'}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Properties: {item.properties ? JSON.stringify(item.properties) : 'None'}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Is bookmarked: {item.isBookmarked ? 'Yes' : 'No'}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Comments count: {item.commentsCount}
                                        </Text>
                                        <Text style={MenuStyle.menuitem14}>
                                            Bookmarks count: {item.bookmarksCount}
                                        </Text>
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

