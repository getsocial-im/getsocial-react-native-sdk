
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import {View, FlatList, TouchableWithoutFeedback, Text} from 'react-native';
import {UserId, TagsQuery} from './../getsocial-react-native-sdk';
import TagsListView from './TagsList';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class TagsMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Tags'};

    constructor(props: any) {
        super(props);

        const search = new MenuItem();
        search.key = 'search';
        search.title = 'Search';
        search.action = () => {
            TagsListView.query = null;
            TagsListView.areFollowedTags = false;
            this.props.navigation.navigate('TagsList');
        };

        const mytags = new MenuItem();
        mytags.key = 'mytags';
        mytags.title = 'Followed by me';
        mytags.action = () => {
            TagsListView.areFollowedTags = true;
            TagsListView.query = TagsQuery.all()
                .followedBy(UserId.currentUser());
            this.props.navigation.navigate('TagsList');
        };

        const mainMenu = [search, mytags];

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

