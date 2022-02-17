// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, Button, View, TouchableWithoutFeedback, Picker} from 'react-native';
import {Communities, Activity, ActivitiesQuery, PagingQuery, ActivitiesView} from './../getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';
import SearchBar from 'react-native-search-bar';

type Props = { navigation: Function }
type State = {
    activities: [Activity],
    selectedActivity: ?Activity,
    searchText: string,
    labels: [string],
    properties: Map<string, string>,
    showOnlyTrending: boolean,
    ui: 'text'
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
        const options = [];
        options.push('Details');
        if (this.state.selectedActivity) {
            const myReactions = this.state.selectedActivity.myReactions;
            options.push(myReactions.includes('like')
                ? 'Unlike'
                : 'Like'
            );
            options.push(myReactions.includes('test')
                ? 'Remove "test" reaction'
                : 'React with "test"'
            );
            options.push(this.state.selectedActivity.isBookmarked
                ? 'Remove Bookmark'
                : 'Bookmark'
            );
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
        }
    }

    loadActivities = async () => {
        let query = ActivitiesListView.activitiesQuery;

        if (query) {
            query
            .onlyTrending(this.state.showOnlyTrending)
            .withText(this.state.searchText)
            .withProperties(this.state.properties)
            .withLabels(this.state.labels);

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
        const emptyActivities: [Activity]= [];
        this.state = {
            activities: emptyActivities,
            selectedActivity: undefined,
            showOnlyTrending: false,
        };
    }

    componentDidMount() {
        this.loadActivities();
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

    render() {
        return (
            <View style={MenuStyle.container}>
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
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.activities}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem6rows}>
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

