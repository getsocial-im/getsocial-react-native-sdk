/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// @flow

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {View, Text} from 'react-native';
import {FooterComponentStyle} from './FooterComponentStyle';
import {version} from 'getsocial-react-native-sdk/package.json';

type Props = {}
type State = {
  pluginVersion: string
}

export default class FooterComponent extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            pluginVersion: version,
        };
    }

    render() {
        return (
            <View style={FooterComponentStyle.footerComponent}>
                <Text style={FooterComponentStyle.footerText}>GetSocial React SDK: {this.state.pluginVersion}</Text>
            </View>
        );
    }
}
