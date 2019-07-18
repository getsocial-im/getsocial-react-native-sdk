// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, View, TouchableWithoutFeedback} from 'react-native';
import {GetSocial} from 'getsocial-react-native-sdk';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[],
    events: Array<any>
}

export default class EventTrackingMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Event tracking'};

    trackCustomEvent = async (eventIndex: number) => {
      const event = this.state.events[eventIndex];
      GetSocial.trackCustomEvent(event.eventName, event.properties).then((eventSent) => {
        Alert.alert('Result', eventSent == true ? 'Custom event was sent' : 'Failed to send custom event');
      });
    }

    constructor(props: any) {
      super(props);

      const levelCompleted = new MenuItem();
      levelCompleted.key = 'level-completed';
      levelCompleted.title = 'Level completed';
      levelCompleted.action = () => this.trackCustomEvent(0);

      const tutorialCompleted = new MenuItem();
      tutorialCompleted.key = 'tutorial-completed';
      tutorialCompleted.title = 'Tutorial completed';
      tutorialCompleted.action = () => this.trackCustomEvent(1);

      const achievementUnlocked = new MenuItem();
      achievementUnlocked.key = 'achievement-unlocked';
      achievementUnlocked.title = 'Achievement unlocked';
      achievementUnlocked.action = () => this.trackCustomEvent(2);

      const mainMenu = [levelCompleted, tutorialCompleted, achievementUnlocked];

      const levelCompletedEvent = {eventName: 'level_completed', properties: {'level': '1'}};
      const tutorialCompletedEvent = {eventName: 'tutorial_completed', properties: {}};
      const achievementUnlockedEvent = {eventName: 'achievement_unlocked', properties: {'achievement': 'early_backer', 'item': 'car001'}};

      this.state = {
        menu: mainMenu,
        events: [levelCompletedEvent, tutorialCompletedEvent, achievementUnlockedEvent],
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

