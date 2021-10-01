// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, Activity, ActivitiesQuery, PagingQuery} from './../getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';
import {Styles} from './../common/Styles.js';
import moment from 'moment';

type Props = { navigation: Function }
type State = {
    activities: [Activity],
    selectedActivity: ?Activity,
    showOnlyTrending: boolean
}

export default class ActivitiesListView extends Component<Props, State> {
    static navigationOptions = {title: 'Activities'};
    static activitiesQuery: ActivitiesQuery;

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        Alert.alert('Details', JSON.stringify(this.state.selectedActivity));
    }

    handleActionSheetSelection = async (selected: string, selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
        switch (selected) {
        case 'Details':
            this.showDetails();
            break;
        }
    }

    loadActivities = async () => {
        showLoading();
        let query = ActivitiesListView.activitiesQuery;
        query = query.onlyTrending(this.state.showOnlyTrending);
        console.log('FUCK: ' + JSON.stringify(query));
        Communities.getActivities(new PagingQuery(query)).then((result) => {
            hideLoading();
            this.setState({activities: result.entries});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
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
                <View style={MenuStyle.menuContainer}>
                    <View style={MenuStyle.menuitem}>
                        <Button title={this.state.showOnlyTrending ? 'All': 'Only Trending'} onPress={ this.updateFilterButton }/>
                    </View>
                    <FlatList style={{flex: 1}}
                        data={this.state.activities}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem}>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <Text style={MenuStyle.menuitem14}>Text: {item.text}</Text>
                                        <Text style={MenuStyle.menuitem14}>Popularity: {item.popularity}</Text>
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

