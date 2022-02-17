
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import {View, FlatList, TouchableWithoutFeedback, Text} from 'react-native';
import {UserId, LabelsQuery} from './../getsocial-react-native-sdk';
import LabelsListView from './LabelsList';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class LabelsMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Labels'};

    constructor(props: any) {
        super(props);

        const search = new MenuItem();
        search.key = 'search';
        search.title = 'Search';
        search.action = () => {
            LabelsListView.query = null;
            LabelsListView.areFollowedLabels = false;
            this.props.navigation.navigate('LabelsList');
        };

        const mylabels = new MenuItem();
        mylabels.key = 'mylabels';
        mylabels.title = 'Followed by me';
        mylabels.action = () => {
            LabelsListView.areFollowedLabels = true;
            LabelsListView.query = LabelsQuery.all()
                .followedBy(UserId.currentUser());
            this.props.navigation.navigate('LabelsList');
        };

        const mainMenu = [search, mylabels];

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

