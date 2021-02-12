
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
import {UserId} from './../getsocial-react-native-sdk';
import GroupsQuery from '../getsocial-react-native-sdk/models/communities/GroupsQuery.js';
// import CreateGroup from './CreateActivityPost';
import GroupsListView from './GroupsList.js';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class GroupsMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Groups'};

    constructor(props: any) {
        super(props);

        const create = new MenuItem();
        create.key = 'Create';
        create.title = 'Create';
        create.action = () => {
            this.props.navigation.navigate('CreateGroup');
        };

        const search = new MenuItem();
        search.key = 'search';
        search.title = 'Search';
        search.action = () => {
            GroupsListView.query = null;
            GroupsListView.myGroups = false;
            this.props.navigation.navigate('GroupsList');
        };

        const myGroups = new MenuItem();
        myGroups.key = 'mygroups';
        myGroups.title = 'My Groups';
        myGroups.action = () => {
            GroupsListView.query = GroupsQuery.all().withMember(UserId.currentUser());
            GroupsListView.myGroups = true;
            this.props.navigation.navigate('GroupsList');
        };

        const mainMenu = [create, search, myGroups];

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

