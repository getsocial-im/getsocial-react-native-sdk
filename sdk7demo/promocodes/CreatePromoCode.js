// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, View, Text, TextInput, Button, ScrollView} from 'react-native';
import {CreatePromoCodeStyle} from './CreatePromoCodeStyle';
import {PromoCodeContent, PromoCodes} from 'getsocial-react-native-sdk';
import DatePicker from 'react-native-datepicker';

type Props = {}

type State = {
    code : ?string,
    startDate: ?string,
    endDate: ?string,
    maxClaims: ?string,
    customKey1: ?string,
    customValue1: ?string,
    customKey2: ?string,
    customValue2: ?string
}

export default class CreatePromoCode extends Component<Props, State> {
    static navigationOptions = {title: 'Create Promo Code'};

    constructor(props: any) {
        super(props);
        this.state = {
            text: null,
            startDate: null,
            endDate: null,
            maxClaims: null,
            customKey1: null,
            customValue1: null,
            customKey2: null,
            customValue2: null,
        };
    }

    createPromoCode = async () => {
        const content = this.state.code == undefined ? PromoCodeContent.withRandomCode() : PromoCodeContent.withCode(this.state.code);
        if (this.state.startDate != undefined || this.state.endDate != undefined) {
            const startDateTimestamp = this.state.startDate == undefined ? 0 : new Date(this.state.startDate).getTime() / 1000;
            const endDateTimestamp = this.state.endDate == undefined ? 0 : new Date(this.state.endDate).getTime() / 1000;
            const currentTimestamp = new Date().getTime() / 1000;
            if (endDateTimestamp < startDateTimestamp) {
                Alert.alert('Error', 'Start time can not be after end time');
                return;
            }
            if (endDateTimestamp < currentTimestamp) {
                Alert.alert('Error', 'End time can not be before the current date');
                return;
            }
            content.setTimeLimit(startDateTimestamp, endDateTimestamp);
        }
        if (this.state.endDate != undefined) {
            content.endDate = this.state.endDate;
        }
        if (this.state.maxClaims != undefined) {
            content.maxClaims = Number(this.state.maxClaims);
            if (content.maxClaims > 99999) {
                Alert.alert('Error', 'MaxClaims cannot be larger than 99999');
                return;
            }
        }
        if (this.state.customKey1 != undefined && this.state.customValue1 != undefined) {
            content.properties[this.state.customKey1] = this.state.customValue1;
        }
        if (this.state.customKey2 != undefined && this.state.customValue2 != undefined) {
            content.properties[this.state.customKey2] = this.state.customValue2;
        }
        PromoCodes.create(content).then((result) => {
            Alert.alert('Success', JSON.stringify(result));
        }, (error) => {
            Alert.alert('Error', error.message);
        });
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}}>
                <View style={CreatePromoCodeStyle.formEntryRow}>
                    <View style={CreatePromoCodeStyle.formEntryTitleContainer}>
                        <Text style={CreatePromoCodeStyle.formEntryTitle} >Code</Text>
                    </View>
                    <View style={CreatePromoCodeStyle.formEntryInputContainer}>
                        <TextInput style={CreatePromoCodeStyle.formEntryInput} value={this.state.code} onChangeText={(code) => this.setState({code: code})} placeholder='Code'/>
                    </View>
                </View>
                <View style={CreatePromoCodeStyle.formEntryRow}>
                    <View style={CreatePromoCodeStyle.formEntryTitleContainer}>
                        <Text style={CreatePromoCodeStyle.formEntryTitle} >Start Date</Text>
                    </View>
                    <View style={CreatePromoCodeStyle.formEntryInputContainer}>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.startDate}
                            mode="date"
                            placeholder="Start Date"
                            format="YYYY-MM-DD"
                            minDate="2020-09-01"
                            maxDate="2030-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                this.setState({startDate: date});
                            }}
                        />
                    </View>
                </View>
                <View style={CreatePromoCodeStyle.formEntryRow}>
                    <View style={CreatePromoCodeStyle.formEntryTitleContainer}>
                        <Text style={CreatePromoCodeStyle.formEntryTitle} >End Date</Text>
                    </View>
                    <View style={CreatePromoCodeStyle.formEntryInputContainer}>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.endDate}
                            mode="date"
                            placeholder="End Date"
                            format="YYYY-MM-DD"
                            minDate="2020-09-01"
                            maxDate="2030-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                this.setState({endDate: date});
                            }}
                        />
                    </View>
                </View>
                <View style={CreatePromoCodeStyle.formEntryRow}>
                    <View style={CreatePromoCodeStyle.formEntryTitleContainer}>
                        <Text style={CreatePromoCodeStyle.formEntryTitle} >Max claims</Text>
                    </View>
                    <View style={CreatePromoCodeStyle.formEntryInputContainer}>
                        <TextInput style={CreatePromoCodeStyle.formEntryInput} value={this.state.maxClaims} onChangeText={(maxClaims) => this.setState({maxClaims: maxClaims})} placeholder='Max Claims'/>
                    </View>
                </View>
                <View style={CreatePromoCodeStyle.formEntryRow}>
                    <View style={CreatePromoCodeStyle.formEntryTitleContainer}>
                        <Text style={CreatePromoCodeStyle.formEntryTitle} >Custom Key 1</Text>
                    </View>
                    <View style={CreatePromoCodeStyle.formEntryInputContainer}>
                        <TextInput style={CreatePromoCodeStyle.formEntryInput} value={this.state.customKey1} onChangeText={(customKey1) => this.setState({customKey1: customKey1})} placeholder='Custom Key 1'/>
                    </View>
                </View>
                <View style={CreatePromoCodeStyle.formEntryRow}>
                    <View style={CreatePromoCodeStyle.formEntryTitleContainer}>
                        <Text style={CreatePromoCodeStyle.formEntryTitle} >Custom Data 1</Text>
                    </View>
                    <View style={CreatePromoCodeStyle.formEntryInputContainer}>
                        <TextInput style={CreatePromoCodeStyle.formEntryInput} value={this.state.customValue1} onChangeText={(customValue1) => this.setState({customValue1: customValue1})} placeholder='Custom Data 1'/>
                    </View>
                </View>
                <View style={CreatePromoCodeStyle.formEntryRow}>
                    <View style={CreatePromoCodeStyle.formEntryTitleContainer}>
                        <Text style={CreatePromoCodeStyle.formEntryTitle} >Custom Key 2</Text>
                    </View>
                    <View style={CreatePromoCodeStyle.formEntryInputContainer}>
                        <TextInput style={CreatePromoCodeStyle.formEntryInput} value={this.state.customKey2} onChangeText={(customKey2) => this.setState({customKey2: customKey2})} placeholder='Custom Key 2'/>
                    </View>
                </View>
                <View style={CreatePromoCodeStyle.formEntryRow}>
                    <View style={CreatePromoCodeStyle.formEntryTitleContainer}>
                        <Text style={CreatePromoCodeStyle.formEntryTitle} >Custom Data 2</Text>
                    </View>
                    <View style={CreatePromoCodeStyle.formEntryInputContainer}>
                        <TextInput style={CreatePromoCodeStyle.formEntryInput} value={this.state.customValue2} onChangeText={(customValue2) => this.setState({customValue2: customValue2})} placeholder='Custom Data 2'/>
                    </View>
                </View>

                <View style={CreatePromoCodeStyle.sectionTitleRow}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Button title='Create Code' onPress={ () => this.createPromoCode() }/>
                    </View>
                </View>
                <View style={CreatePromoCodeStyle.sectionTitleRow}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                    </View>
                </View>

            </ScrollView>
        );
    }
}
