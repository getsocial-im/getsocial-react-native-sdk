// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, Chat, PagingQuery} from './../getsocial-react-native-sdk';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';
import moment from 'moment';
import ChatMessagesListView from './ChatMessagesList';

type Props = { navigation: Function }
type State = {
    chats: [Chat],
    selectedChat: ?Chat,
}

export default class ChatsListView extends Component<Props, State> {
    static navigationOptions = {title: 'Chats'};
    static query: PagingQuery;

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        options.push('Open');
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        let stringified = JSON.stringify(this.state.selectedChat);
        stringified += ', CreatedAt: ' + moment(new Date(this.state.selectedChat.createdAt * 1000)).format('DD/MM/YYYY hh:mm');
        stringified += ', UpdatedAt: ' + moment(new Date(this.state.selectedChat.updatedAt * 1000)).format('DD/MM/YYYY hh:mm');

        Alert.alert('Details', stringified + '\n \n \n');
    }

    showChat = async () => {
        ChatMessagesListView.stringChatId = this.state.selectedChat.id;
        this.props.navigation.navigate('ChatMessagesView');
    }

    handleActionSheetSelection = async (selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
        switch (selectedIndex) {
        case 0:
            this.showDetails();
            break;
        case 1:
            this.showChat();
            break;
        }
    }

    loadChats = async () => {
        showLoading();
        Communities.getChats(new PagingQuery()).then((result) => {
            hideLoading();
            this.setState({chats: result.entries});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyChats: [Chat]= [];
        this.state = {
            chats: emptyChats,
            selectedChat: undefined,
        };
    }

    componentDidMount() {
        this.loadChats();
        this.props.navigation.addListener('willFocus', this.loadChats);
    }

    showActionSheet = (chat: Chat) => {
        this.setState({selectedChat: chat}, () => {
            this.ActionSheet.show();
        });
    }

    getText(item: Chat): string {
        if (item.lastMessage == null) {
            return '';
        }
        return item.lastMessage.text;
    }

    getSender(item: Chat): string {
        if (item.lastMessage == null) {
            return '';
        }
        if (item.lastMessage.author == null) {
            return '';
        }
        return item.lastMessage.author.displayName;
    }

    getFirstImageUrl(item: Chat): string {
        if (item.lastMessage == null) {
            return '';
        }
        const lastMessage = item.lastMessage;
        if (lastMessage.attachments.length == 0) {
            return '';
        }
        return lastMessage.attachments[0].getImageUrl().substring(0, 24);
    }

    getFirstVideoUrl(item: Chat): string {
        if (item.lastMessage == null) {
            return '';
        }
        const lastMessage = item.lastMessage;
        if (lastMessage.attachments.length == 0) {
            return '';
        }
        return lastMessage.attachments[0].getVideoUrl().substring(0, 24);
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.chats}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem5rows}>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <Text style={MenuStyle.menuitem14}>Title: {item.title}</Text>
                                        <Text style={MenuStyle.menuitem14}>Sender: {this.getSender(item)}</Text>
                                        <Text style={MenuStyle.menuitem14}>Text: {this.getText(item)}</Text>
                                        <Text style={MenuStyle.menuitem14}>Image: {this.getFirstImageUrl(item)}</Text>
                                        <Text style={MenuStyle.menuitem14}>Video: {this.getFirstVideoUrl(item)}</Text>
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
                        this.handleActionSheetSelection(index);
                    }}
                />
            </View>
        );
    }
}

