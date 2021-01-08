
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
import {PagingQuery, GetSocialUI, Action, ActivitiesView, ActivitiesQuery, UserId, User} from './../getsocial-react-native-sdk';
import GetSocial from '../getsocial-react-native-sdk/GetSocial';
import Communities from '../getsocial-react-native-sdk/Communities';
import TopicsQuery from '../getsocial-react-native-sdk/models/communities/TopicsQuery.js';
import CreateActivityPost from './CreateActivityPost';
import {globalActionProcessor} from './../common/CommonMethods.js';
import TopicsListView from './TopicsList.js';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class TopicsMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Topics'};

    constructor(props: any) {
      super(props);

      const search = new MenuItem();
      search.key = 'search';
      search.title = 'Search';
      search.action = () => {
        TopicsListView.query = null;
        TopicsListView.areFollowedTopics = false;
        this.props.navigation.navigate('TopicsList');
      };

      const mytopics = new MenuItem();
      mytopics.key = 'mytopics';
      mytopics.title = 'Followed by me';
      mytopics.action = () => {
        TopicsListView.areFollowedTopics = true;
        TopicsListView.query = TopicsQuery.all().followedBy(UserId.currentUser());
        this.props.navigation.navigate('TopicsList');
      };

      const mainMenu = [search, mytopics];

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

