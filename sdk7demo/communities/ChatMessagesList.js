// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
import {Styles} from './../common/Styles.js';
// eslint-disable-next-line no-unused-vars
import {Alert, Keyboard, Switch, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, MediaAttachment, UserId, ChatId, ChatMessage, ChatMessageContent, ChatMessagesQuery, ChatMessagesPagingQuery} from './../getsocial-react-native-sdk';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import ActionSheet from 'react-native-actionsheet';

type Props = { navigation: Function }
type State = {
    messages: [ChatMessage],
    selectedMessage: ?ChatMessage,
    text: ?string,
    imageURL: ?string,
    videoURL: ?string,
    sendImage: boolean,
    sendVideo: boolean,
    attachments: Array<MediaAttachment>,
    attachmentImage: ?MediaAttachment,
    attachmentVideo: ?MediaAttachment,
    refreshCursor: ?string,
}

export default class ChatMessagesListView extends Component<Props, State> {
    static navigationOptions = {title: 'Messages'};
    static userId: ?UserId;
    static stringChatId: ?string;
    static chatId: ChatId;

    generateOptions() : [string] {
        const options = [];
        options.push('Details');
        options.push('Cancel');
        return options;
    }

    showDetails = async () => {
        let stringified = JSON.stringify(this.state.selectedMessage);
        stringified += ', SentAt: ' + moment(new Date(this.state.selectedMessage.sentAt * 1000)).format('DD/MM/YYYY hh:mm');

        Alert.alert('Details', stringified + '\n \n \n');
    }

    handleActionSheetSelection = async (selectedIndex: number) => {
        if (selectedIndex == this.generateOptions().length - 1) {
            return;
        }
        switch (selectedIndex) {
        case 0:
            this.showDetails();
            break;
        }
    }

    updateSendImage = async (newValue: bool) => {
        this.setState({sendImage: newValue});
        if (newValue == true) {
            this.loadAttachmentImage();
        } else {
            this.setState({attachmentImage: null});
        }
    }

    updateSendVideo = async (newValue: bool) => {
        this.setState({sendVideo: newValue});
        if (newValue == true) {
            this.loadAttachmentVideo();
        } else {
            this.setState({attachmentVideo: null});
        }
    }

    loadAttachmentImage = async () => {
        showLoading();
        MediaAttachment.loadLocalResource('activityImage.png').then((base64Image) => {
            const attachment = MediaAttachment.withBase64Image(base64Image);
            this.setState({attachmentImage: attachment});
            hideLoading();
        });
    }

    loadAttachmentVideo = async () => {
        showLoading();
        MediaAttachment.loadLocalResource('giphy.mp4').then((base64Video) => {
            const attachment = MediaAttachment.withBase64Video(base64Video);
            this.setState({attachmentVideo: attachment});
            hideLoading();
        });
    }

    sendMessage = async () => {
        showLoading();
        const chatMessageContent = new ChatMessageContent();
        chatMessageContent.text = this.state.text;
        if (this.state.imageURL != null) {
            const previousAttachments = this.state.attachments;
            previousAttachments.push(MediaAttachment.withImageUrl(this.state.imageURL));
            this.setState({attachments: previousAttachments});
        }
        if (this.state.videoURL != null) {
            const previousAttachments = this.state.attachments;
            previousAttachments.push(MediaAttachment.withVideoUrl(this.state.videoURL));
            this.setState({attachments: previousAttachments});
        }
        if (this.state.attachmentImage != null) {
            const previousAttachments = this.state.attachments;
            previousAttachments.push(this.state.attachmentImage);
            this.setState({attachments: previousAttachments});
        }
        if (this.state.attachmentVideo != null) {
            const previousAttachments = this.state.attachments;
            previousAttachments.push(this.state.attachmentVideo);
            this.setState({attachments: previousAttachments});
        }
        chatMessageContent.attachments = this.state.attachments;
        Communities.sendChatMessage(chatMessageContent, ChatMessagesListView.chatId).then((result) => {
            // insert last message
            const previousMessages = this.state.messages;
            previousMessages.push(result);
            this.setState({messages: previousMessages, text: null, imageURL: null, videoURL: null, attachments: []}, () => {
                setTimeout(() => {
                    this.FlatList.scrollToEnd();
                    hideLoading();
                }, 500);
            });
        }, (error) => {
            console.log(error);
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    refreshMessages = async () => {
        this.loadMessages(true);
    }

    loadTitle = async () => {
        if (ChatMessagesListView.userId != undefined && ChatMessagesListView.userId != null) {
            ChatMessagesListView.chatId = ChatId.createWithUserId(ChatMessagesListView.userId);
            Communities.getUser(ChatMessagesListView.userId).then((result) => {
                ChatMessagesListView.navigationOptions = {title: result.displayName};
                this.loadMessages();
            }, (error) => {
                hideLoading();
                Alert.alert('Error', error.message);
            });
        } else {
            ChatMessagesListView.chatId = ChatId.create(ChatMessagesListView.stringChatId);
            Communities.getChat(ChatMessagesListView.chatId).then((result) => {
                ChatMessagesListView.navigationOptions = {title: result.title};
                this.loadMessages();
            }, (error) => {
                hideLoading();
                Alert.alert('Error', error.message);
            });
        }
    }

    loadMessages = async (refresh: boolean) => {
        showLoading();

        const query = ChatMessagesQuery.messagesInChat(ChatMessagesListView.chatId);
        const pagingQuery = new ChatMessagesPagingQuery(query);
        if (refresh && this.state.refreshCursor != undefined && this.state.refreshCursor != null) {
            pagingQuery.next = this.state.refreshCursor;
        }
        Communities.getChatMessages(pagingQuery).then((result) => {
            const previousMessages = this.state.messages;
            result.entries.forEach((element) => {
                previousMessages.push(element);
            });
            this.setState({messages: previousMessages, refreshCursor: result.refreshCursor}, () => {
                setTimeout(() => {
                    this.FlatList.scrollToEnd();
                    hideLoading();
                }, 500);
            });
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    constructor(props: any) {
        super(props);

        // $FlowFixMe
        const emptyMessages: [ChatMessage]= [];
        this.state = {
            messages: emptyMessages,
            selectedMessage: undefined,
            text: null,
            imageURL: null,
            videoURL: null,
            attachments: [],
            attachmentImage: null,
            attachmentVideo: null,
        };
    }

    componentDidMount() {
        this.loadTitle();
    }

    showActionSheet = (message: ChatMessage) => {
        this.setState({selectedMessage: message}, () => {
            this.ActionSheet.show();
        });
    }

    getFirstImageUrl(lastMessage: ChatMessage): string {
        if (lastMessage.attachments.length == 0) {
            return '';
        }
        return lastMessage.attachments[0].getImageUrl().substring(0, 24);
    }

    getFirstVideoUrl(lastMessage: ChatMessage): string {
        if (lastMessage.attachments.length == 0) {
            return '';
        }
        return lastMessage.attachments[0].getVideoUrl().substring(0, 24);
    }

    getSender(item: ChatMessage): string {
        if (item.author == null) {
            return '';
        }
        return item.author.displayName;
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, padding: 10}}>
                        <View style={Styles.formEntryRow28}>
                            <View style={Styles.formEntryInputContainer}>
                                <TextInput style={Styles.formEntryInput} value={this.state.text} onChangeText={(text) => this.setState({text: text})} />
                            </View>
                        </View>
                        <View style={Styles.formEntryRow28}>
                            <View style={Styles.formEntryTitleContainer}>
                                <Text style={Styles.formEntryTitle16}>Image URL</Text>
                            </View>
                            <View style={Styles.formEntryInputContainer}>
                                <TextInput style={Styles.formEntryInput} value={this.state.imageURL} onChangeText={(text) => this.setState({imageURL: text})} />
                            </View>
                        </View>
                        <View style={Styles.formEntryRow28}>
                            <View style={Styles.formEntryTitleContainer}>
                                <Text style={Styles.formEntryTitle16}>Video URL</Text>
                            </View>
                            <View style={Styles.formEntryInputContainer}>
                                <TextInput style={Styles.formEntryInput} value={this.state.videoURL} onChangeText={(text) => this.setState({videoURL: text})} />
                            </View>
                        </View>
                        <View style={Styles.formEntryRow40}>
                            <Text style={Styles.formEntryTitle16}>Send Image</Text>
                            <Switch value={this.state.sendImage} onValueChange={(newValue) => this.updateSendImage(newValue)}/>
                            <Text style={Styles.formEntryTitle16}>Send Video</Text>
                            <Switch value={this.state.sendVideo} onValueChange={(newValue) => this.updateSendVideo(newValue)}/>
                        </View>
                        <View style={Styles.formEntryRow40}>
                            <Button title='Send' onPress={() => {
                                this.sendMessage();
                                Keyboard.dismiss();
                            }}/>
                            <Button title='Refresh' onPress={() => this.refreshMessages()}/>
                        </View>
                    </View>
                    <FlatList
                        ref={(o) => this.FlatList = o}
                        style={{flex: 1}}
                        data={this.state.messages}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem5rows}>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <Text style={MenuStyle.menuitem14}>Sender: {this.getSender(item)}</Text>
                                        <Text style={MenuStyle.menuitem14}>Text: {item.text}</Text>
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

