// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, TagsQuery, ActivitiesView, ActivitiesQuery} from './../getsocial-react-native-sdk';
import SearchBar from 'react-native-search-bar';
import ActionSheet from 'react-native-actionsheet';

type Props = { navigation: Function }
type State = {
    tags: [string],
    searchText: string,
    showOnlyTrending: boolean
}

export default class TagsListView extends Component<Props, State> {
    static navigationOptions = {title: 'Tags'};

    updateSearchText = async (text: String) => {
        this.setState({searchText: text});
    }

    loadTags = async () => {
        showLoading();
        let query = this.state.searchText == null ? TagsQuery.search('') : TagsQuery.search(this.state.searchText);
        query = query.onlyTrending(this.state.showOnlyTrending);
        Communities.getTags(query).then((result) => {
            hideLoading();
            this.setState({tags: result});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    showFeed = (item: string) => {
        const query = ActivitiesQuery.everywhere();
        query.tags = query.withTag(item);
        const view = ActivitiesView.create(query);
        view.show();
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyTags: [string]= [];
        this.state = {
            tags: emptyTags,
            showOnlyTrending: false,
            searchText: null,
        };
    }

    componentDidMount() {
        this.loadTags();
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
                <SearchBar
                    ref="tagsearch"
                    textColor='black'
                    autoCapitalize='none'
                    onChangeText= { (text) => this.updateSearchText(text) }
                    placeholder="Search"
                    onCancelButtonPress= { () => this.updateSearchText(null).then(() => this.loadTags()) }
                    onSearchButtonPress={ () => this.loadTags() }
                />
                <View style={MenuStyle.menuitem}>
                    <Button title={this.state.showOnlyTrending ? 'All': 'Only Trending'} onPress={ this.updateFilterButton }/>
                </View>
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.tags}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem}>
                                    <Text style={MenuStyle.menuitem}>{item}</Text>
                                    <View style={MenuStyle.rowEndContainer}>
                                        <Button title='Show Feed' onPress={ () => {
                                            this.showFeed(item);
                                        }}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item) => item}
                    />
                </View>
            </View>

        );
    }
}

