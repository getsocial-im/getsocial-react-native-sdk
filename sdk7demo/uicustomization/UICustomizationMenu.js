// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, View, TouchableWithoutFeedback} from 'react-native';
import {GetSocialUI} from 'getsocial-react-native-sdk';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

export default class UICustomizationMenu extends Component<Props, State> {
    static navigationOptions = {title: 'UI Customization'};

    changeUIConfiguration = async (path: string) => {
      if (path.length == 0) {
        GetSocialUI.loadDefaultConfiguration().then(() => {
          Alert.alert('UI Config', 'UI Configuration has been changed to default');
        }, (error) => {
          Alert.alert('Error', error.message);
        });
      } else {
        GetSocialUI.loadConfiguration(path).then(() => {
          Alert.alert('UI Config', 'UI Configuration has been changed');
        }, (error) => {
          Alert.alert('Error', error.message);
        });
      }
    }

    constructor(props: any) {
      super(props);

      const changeToDefault = new MenuItem();
      changeToDefault.key = 'default';
      changeToDefault.title = 'Default UI';
      changeToDefault.action = () => this.changeUIConfiguration('');

      const changeToDefaultLandscape = new MenuItem();
      changeToDefaultLandscape.key = 'default-landscape';
      changeToDefaultLandscape.title = 'Default UI - Landscape';
      changeToDefaultLandscape.action = () => this.changeUIConfiguration('getsocial-default-landscape/ui-config.json');

      const changeToDark = new MenuItem();
      changeToDark.key = 'dark';
      changeToDark.title = 'Dark UI - Portait';
      changeToDark.action = () => this.changeUIConfiguration('getsocial-dark/ui-config.json');

      const changeToDarkLandscape = new MenuItem();
      changeToDarkLandscape.key = 'dark-landscape';
      changeToDarkLandscape.title = 'Dark UI - Landscape';
      changeToDarkLandscape.action = () => this.changeUIConfiguration('getsocial-dark-landscape/ui-config.json');

      const changeToLight = new MenuItem();
      changeToLight.key = 'light';
      changeToLight.title = 'Light UI - Portait';
      changeToLight.action = () => this.changeUIConfiguration('getsocial-light/ui-config.json');

      const changeToLightLandscape = new MenuItem();
      changeToLightLandscape.key = 'light-landscape';
      changeToLightLandscape.title = 'Light UI - Landscape';
      changeToLightLandscape.action = () => this.changeUIConfiguration('getsocial-light-landscape/ui-config.json');

      const mainMenu = [changeToDefault, changeToDefaultLandscape,
        changeToDark, changeToDarkLandscape,
        changeToLight, changeToLightLandscape];

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

