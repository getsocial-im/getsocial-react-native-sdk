// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, View, TouchableWithoutFeedback} from 'react-native';
import GetSocial from '../getsocial-react-native-sdk/GetSocial';
import PromoCodeContent from '../getsocial-react-native-sdk/models/promocodes/PromoCodeContent';
import PromoCodes from '../getsocial-react-native-sdk/PromoCodes';
import UserUpdate from '../getsocial-react-native-sdk/models/UserUpdate';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[],
}

export default class PromoCodesMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Promo Codes'};

    constructor(props: any) {
      super(props);

      const createPromoCode = new MenuItem();
      createPromoCode.key = 'create-promocode';
      createPromoCode.title = 'Create Promo Code';
      createPromoCode.navigateTo = 'CreatePromoCode';

      const claimPromoCode = new MenuItem();
      claimPromoCode.key = 'claim-promocode';
      claimPromoCode.title = 'Claim Promo Code';
      claimPromoCode.navigateTo = 'ClaimPromoCode';

      const promoCodeInfo = new MenuItem();
      promoCodeInfo.key = 'promocode-info';
      promoCodeInfo.title = 'Promo Code Info';
      promoCodeInfo.navigateTo = 'PromoCodeInfo';

      const mainMenu = [createPromoCode, claimPromoCode, promoCodeInfo];

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

