// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, View, Text, TextInput, Button, ScrollView} from 'react-native';
import {PromoCodeInfoStyle} from './PromoCodeInfoStyle';
import {PromoCodeContent, PromoCode, PromoCodes} from 'getsocial-react-native-sdk';
import DatePicker from 'react-native-datepicker'

type Props = {}

type State = {
    code : ?string,
}

export default class PromoCodeInfo extends Component<Props, State> {
    static navigationOptions = {title: 'Promo Code Info'};

    constructor(props: any) {
      super(props);
      this.state = {
        code: null,
      };
    }

    showPromoCode = async () => {
        PromoCodes.get(this.state.code).then((result) => {
            Alert.alert('Success', JSON.stringify(result));
        }, (error) => { Alert.alert('Error', error.message)});        
    }

    render() {
      return (
        <ScrollView style={{flex: 1, padding: 10}}>
          <View style={PromoCodeInfoStyle.formEntryRow}>
            <View style={PromoCodeInfoStyle.formEntryTitleContainer}>
              <Text style={PromoCodeInfoStyle.formEntryTitle} >Code</Text>
            </View>
            <View style={PromoCodeInfoStyle.formEntryInputContainer}>
              <TextInput style={PromoCodeInfoStyle.formEntryInput} value={this.state.code} onChangeText={(code) => this.setState({code: code})} placeholder='Code'/>
            </View>
          </View>

          <View style={PromoCodeInfoStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Button title='Get Code' onPress={ () => this.showPromoCode() }/>
            </View>
          </View>
          <View style={PromoCodeInfoStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
            </View>
          </View>

        </ScrollView>
      );
    }
}
