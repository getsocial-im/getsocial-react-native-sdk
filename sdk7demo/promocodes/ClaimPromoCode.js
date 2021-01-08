// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, View, Text, TextInput, Button, ScrollView} from 'react-native';
import {ClaimPromoCodeStyle} from './ClaimPromoCodeStyle';
import {PromoCodeContent, PromoCode, PromoCodes} from 'getsocial-react-native-sdk';
import DatePicker from 'react-native-datepicker'

type Props = {}

type State = {
    code : ?string,
}

export default class ClaimPromoCode extends Component<Props, State> {
    static navigationOptions = {title: 'Claim Promo Code'};

    constructor(props: any) {
      super(props);
      this.state = {
        code: null,
      };
    }

    claimPromoCode = async () => {
      if (this.state.code == null || this.state.code.length == 0) {
        Alert.alert('Error', 'PromoCode cannot be empty');
        return;
      }
        PromoCodes.claim(this.state.code).then((result) => {
            Alert.alert('Success', JSON.stringify(result));
        }, (error) => { Alert.alert('Error', error.message)});        
    }

    render() {
      return (
        <ScrollView style={{flex: 1, padding: 10}}>
          <View style={ClaimPromoCodeStyle.formEntryRow}>
            <View style={ClaimPromoCodeStyle.formEntryTitleContainer}>
              <Text style={ClaimPromoCodeStyle.formEntryTitle} >Code</Text>
            </View>
            <View style={ClaimPromoCodeStyle.formEntryInputContainer}>
              <TextInput style={ClaimPromoCodeStyle.formEntryInput} value={this.state.code} onChangeText={(code) => this.setState({code: code})} placeholder='Code'/>
            </View>
          </View>

          <View style={ClaimPromoCodeStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Button title='Claim Code' onPress={ () => this.claimPromoCode() }/>
            </View>
          </View>
          <View style={ClaimPromoCodeStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
            </View>
          </View>

        </ScrollView>
      );
    }
}
