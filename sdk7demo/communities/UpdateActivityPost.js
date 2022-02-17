// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, View, Text, TextInput, Button, ScrollView, Picker, FlatList, KeyboardAvoidingView} from 'react-native';
import {CreateActivityPostStyle} from './CreateActivityPostStyle';
import {Communities, ActivityContent, Activity, MediaAttachment, ActivitiesView, UserId} from 'getsocial-react-native-sdk';
import ImagePicker from 'react-native-image-picker';
import PostActivityTarget from '../getsocial-react-native-sdk/models/communities/PostActivityTarget';
import ActivitiesQuery from '../getsocial-react-native-sdk/models/communities/ActivitiesQuery';
import ActivityButton from '../getsocial-react-native-sdk/models/communities/ActivityButton';
import {showLoading, hideLoading} from './../common/LoadingIndicator';
import Action from '../getsocial-react-native-sdk/models/actions/Action';

type Props = {}

type State = {
    text : ?string,
    imageUrl: ?string,
    base64Image: ?string,
    localImageUri: ?string,
    videoUrl: ?string,
    base64Video: ?string,
    localVideoUri: ?string,
    action: ?string,
    actionButtonName: ?string,
    actionData: Map<string, string>,
    properties: Map<string, string>,
    labels: [string],
}

export default class UpdateActivityPost extends Component<Props, State> {
  static oldActivity: ?Activity;
  static navigationOptions = {title: 'Update Activity Post'};

    static activityTarget: PostActivityTarget;

    constructor(props: any) {
        super(props);
        this.state = {
            text: UpdateActivityPost.oldActivity == null ? null : UpdateActivityPost.oldActivity.text,
            imageUrl: (UpdateActivityPost.oldActivity == null || UpdateActivityPost.oldActivity.attachments == null) ? null : UpdateActivityPost.oldActivity.attachments[0].imageUrl,
            base64Image: null,
            localImageUri: null,
            videoUrl: null,
            base64Video: null,
            localVideoUri: null,
            action: null,
            actionButtonName: null,
            actionData: new Map(),
            properties: new Map(),
            labels: new Array(),
        };
    }

    addActionDataRowWithValue = async (name: string, value: string) => {
        this.setState({
            actionData: [...this.state.actionData, {key: 'TDR_' + this.generateRandom(), name: name, value: value}],
        });
    }

    actionTypeUpdated = async () => {
        const selectedAction = this.state.action;
        let actionKey = '';
        if (selectedAction == 'open_profile') {
            actionKey = '$user_id';
        }
        if (selectedAction == 'open_activity') {
            actionKey = '$activity_id';
        }
        if (selectedAction == 'open_url') {
            actionKey = '$url';
        }
        if (actionKey != '') {
            this.setState({
                actionData: new Map(),
            }, () => {
                this.addActionDataRowWithValue(actionKey, '');
            });
        }
    }

    componentDidMount() {
        const props = [];
        if (UpdateActivityPost.oldActivity != null) {
            Object.keys(UpdateActivityPost.oldActivity.properties).map((itemKey) => {
                props.push({key: ('PR_' + itemKey), name: itemKey, value: UpdateActivityPost.oldActivity.properties[itemKey]});
            });
        }
        this.setState({
            properties: props,
        });
        if (UpdateActivityPost.oldActivity != null) {
            const mediaAttachments = UpdateActivityPost.oldActivity.mediaAttachments;
            if (mediaAttachments !== undefined && mediaAttachments.length != 0) {
                const first = mediaAttachments[0];
                this.setState({
                    imageUrl: first.getImageUrl(),
                    videoUrl: first.getVideoUrl(),
                });
            }
            if (UpdateActivityPost.oldActivity.button !== undefined && UpdateActivityPost.oldActivity.button != null) {
                const button = UpdateActivityPost.oldActivity.button;
                const action = button.action;
                const actionData = action.data;
                const buttonText = button.title;
                const data = [];
                Object.keys(actionData).map((itemKey) => {
                    data.push({key: ('AD_' + itemKey), name: itemKey, value: actionData[itemKey]});
                });
                this.setState({
                    action: action.type,
                    actionData: data,
                    actionButtonName: buttonText,
                });
            }
            this.setState({
                labels: UpdateActivityPost.oldActivity.labels.length
                    ? UpdateActivityPost.oldActivity.labels
                        .map((label) => { return { key: 'LBL_' + label, label }; })
                    : [],
            });
        }
    }

    updateButtonsState = async () => {
        if (this.state.localImageUri == null) {
            if (this.state.localVideoUri == null) {
                this.setState({selectImageButtonDisabled: false});
                this.setState({selectVideoButtonDisabled: false});
            } else {
                this.setState({selectImageButtonDisabled: true});
                this.setState({selectVideoButtonDisabled: false});
            }
        } else {
            if (this.state.localVideoUri == null) {
                this.setState({selectImageButtonDisabled: false});
                this.setState({selectVideoButtonDisabled: true});
            } else {
                this.setState({selectImageButtonDisabled: false});
                this.setState({selectVideoButtonDisabled: false});
            }
        }
    }

    selectImage = async () => {
        ImagePicker.launchImageLibrary({}, (response) => {
            if (response.uri != undefined) {
                MediaAttachment.loadLocalResource(response.uri).then((base64Image) => {
                    this.setState({
                        localImageUri: response.uri,
                        base64Image: base64Image,
                    }, () => {
                        this.updateButtonsState();
                    });
                });
            }
        });
    }

    removeImage = async () => {
        this.setState({localImageUri: null, base64Image: null}, () => {
            this.updateButtonsState();
        });
    }

    selectVideo = async () => {
        const options = {mediaType: 'video'};
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri != undefined) {
                MediaAttachment.loadLocalResource(response.uri).then((base64Image) => {
                    this.setState({
                        localVideoUri: response.uri,
                        base64Video: base64Image,
                    }, () => {
                        this.updateButtonsState();
                    });
                });
            }
        });
    }

    removeVideo = async () => {
        this.setState({localVideoUri: null, base64Video: null}, () => {
            this.updateButtonsState();
        });
    }

    generateRandom() {
        const min = 1;
        const max = 1000;
        return min + (Math.random() * (max-min));
    }

    addActionDataRow = async () => {
        this.setState({
            actionData: [...this.state.actionData, {key: 'TDR_' + this.generateRandom()}],
        });
    }

    removeActionDataRow = async (index: number) => {
        const data = this.state.actionData;
        data.splice(index, 1);
        this.setState((prevState) => {
            return {actionData: data};
        });
    }

    updateActionData = async (index: number, newName: string, newValue: string) => {
        this.setState((prevState) => {
            const copiedData = [...prevState.actionData];
            copiedData[index].name = newName;
            copiedData[index].value = newValue;
            return {actionData: copiedData};
        });
    }

    addPropertiesRow = async () => {
        this.setState({
            properties: [...this.state.properties, {key: 'PR_' + this.generateRandom()}],
        });
    }

    removePropertiesRow = async (index: number) => {
        const data = this.state.properties;
        data.splice(index, 1);
        this.setState((prevState) => {
            return {properties: data};
        });
    }

    updatePropertyData = async (index: number, newName: string, newValue: string) => {
        this.setState((prevState) => {
            const copiedData = [...prevState.properties];
            copiedData[index].name = newName;
            copiedData[index].value = newValue;
            return {properties: copiedData};
        });
    }

    addLabelsRow = async () => {
        this.setState({
            labels: [
                ...this.state.labels,
                { key: 'LBL_' + this.generateRandom() }
            ],
        });
    }

    removeLabelsRow = async (key: string) => {
        this.setState((prevState) => {
            return {
                labels: prevState.labels
                    .filter((label) => label.key !== key)
            };
        });
    }

    updateLabelData = async (key: string, newLabel: string) => {
        this.setState((prevState) => {
            return {
                labels: prevState.labels
                    .map((label) => {
                        if (label.key === key) {
                            label.label = newLabel;
                        }

                        return label
                    })
            };
        });
    }

    createPost = async () => {
        let mediaAttachment = null;
        if (this.state.imageUrl != null) {
            mediaAttachment = MediaAttachment.withImageUrl(this.state.imageUrl);
        } else if (this.state.videoUrl != null) {
            mediaAttachment = MediaAttachment.withVideoUrl(this.state.videoUrl);
        } else if (this.state.localImageUri != null) {
            mediaAttachment = MediaAttachment.withBase64Image(this.state.base64Image);
        } else if (this.state.localVideoUri != null) {
            mediaAttachment = MediaAttachment.withBase64Video(this.state.base64Video);
        }

        const content = new ActivityContent();

        if (this.state.action != null && this.state.action != 'default') {
            const dataMap = {};
            this.state.actionData.forEach((item) => {
                dataMap[item.name] = item.value;
            });
            const action = Action.create(this.state.action, dataMap);
            const activityButton = ActivityButton.create(this.state.actionButtonName, action);
            content.button = activityButton;
        }

        if (this.state.text != null) {
            content.text = this.state.text;
        }
        if (mediaAttachment != null) {
            content.attachments.push(mediaAttachment);
        }
        const propertiesMap = {};
        this.state.properties.forEach((item) => {
            propertiesMap[item.name] = item.value;
        });
        content.properties = propertiesMap;
        content.labels = this.state.labels.map((label) => label.label);
        if (content.button == null && content.mediaAttachment == null && content.text == null) {
            Alert.alert('Error', 'Text, MediaAttachment or Button is mandatory');
            return;
        }

        showLoading();
        Communities.updateActivity(UpdateActivityPost.oldActivity.id, content).then((post) => {
            hideLoading();
            let query = ActivitiesQuery.everywhere();
            query = query.byUser(UserId.currentUser());
            ActivitiesView.create(query).show();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    renderMedia(image: any, onDelete:(() => void)) {
        return (<View style={CreateActivityPostStyle.formEntryRow}>
            <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                <Image source={image} style={{width: 100, height: 50}}/>
            </View>
            <View style={CreateActivityPostStyle.formEntryInputContainer}>
                <Button title={'Remove'} onPress={() => onDelete()}/>
            </View>
        </View>);
    }

    renderImage() {
        if (this.state.localImageUri != null) {
            return this.renderMedia({uri: this.state.localImageUri}, () => {
                this.removeImage();
            });
        }
        return null;
    }

    renderVideo() {
        if (this.state.localVideoUri != null) {
            return this.renderMedia(require('./../img/video-thumbnail.jpg'), () => {
                this.removeVideo();
            });
        }
        return null;
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}} keyboardDismissMode='on-drag' removeClippedSubviews={false} keyboardShouldPersistTaps='always'>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Text</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.text} onChangeText={(text) => this.setState({text: text})} placeholder='Text'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Image Url</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.imageUrl} onChangeText={(text) => this.setState({imageUrl: text})} placeholder='Image Url'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Video Url</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.videoUrl} onChangeText={(text) => this.setState({videoUrl: text})} placeholder='Video Url'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Image</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <Button title={'Select'} disabled={this.state.selectImageButtonDisabled} onPress={() => this.selectImage()}/>
                    </View>
                </View>
                {this.renderImage()}
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Video</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <Button title={'Select'} disabled={this.state.selectVideoButtonDisabled} onPress={() => this.selectVideo()}/>
                    </View>
                </View>
                {this.renderVideo()}
                <View style={CreateActivityPostStyle.formEntryButtonContainer}>
                    <Button title='Add Property' onPress={ () => this.addPropertiesRow() }/>
                </View>
                <FlatList style={{flex: 1}}
                    data={this.state.properties}
                    extraData={this.state.properties}
                    renderItem={({item, index}) => (
                        <View style={CreateActivityPostStyle.formEntryRow}>
                            <View style={CreateActivityPostStyle.formEntryInputContainer}>
                                <TextInput style={CreateActivityPostStyle.formEntryInput} onChangeText={(newName) => {
                                    this.updatePropertyData(index, newName, this.state.properties[index].value);
                                }} value={item.name} placeholder='Key'/>
                            </View>
                            <View style={CreateActivityPostStyle.formEntryInputContainer}>
                                <TextInput style={CreateActivityPostStyle.formEntryInput} onChangeText={(newValue) => {
                                    this.updatePropertyData(index, this.state.properties[index].name, newValue);
                                }}value={item.value} placeholder='Value'/>
                            </View>
                            <View style={CreateActivityPostStyle.formEntryButtonContainer}>
                                <Button title='Remove' onPress={ () => this.removePropertiesRow(index) }/>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.key}
                />
                <View style={CreateActivityPostStyle.formEntryButtonContainer}>
                    <Button title='Add Label' onPress={ () => this.addLabelsRow() }/>
                </View>
                <FlatList style={{flex: 1}} removeClippedSubviews={false}
                    data={this.state.labels}
                    extraData={this.state.labels}
                    renderItem={({item}) => (
                        <View style={CreateActivityPostStyle.formEntryRow}>
                            <View style={CreateActivityPostStyle.formEntryInputContainer}>
                                <TextInput style={CreateActivityPostStyle.formEntryInput} onChangeText={(newLabel) => {
                                    this.updateLabelData(item.key, newLabel);
                                }} value={item.label} placeholder='label'/>
                            </View>
                            <View style={CreateActivityPostStyle.formEntryButtonContainer}>
                                <Button title='Remove' onPress={ () => this.removeLabelsRow(item.key) }/>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.key}
                />
                <View style={CreateActivityPostStyle.sectionTitleRow}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={CreateActivityPostStyle.sectionTitle} >Action</Text>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryPickerContainer}>
                        <Picker
                            style={CreateActivityPostStyle.pickerStyle} itemStyle={{height: 44}}
                            selectedValue={this.state.action}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({action: itemValue}, () => {
                                    this.actionTypeUpdated();
                                })
                            }>
                            <Picker.Item label="None" value="default" />
                            <Picker.Item label="Open Profile" value="open_profile" />
                            <Picker.Item label="Open Activity" value="open_activity" />
                            <Picker.Item label="Open Invites" value="open_invites" />
                            <Picker.Item label="Open URL" value="open_url" />
                            <Picker.Item label="Custom" value="custom" />
                        </Picker>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Button title</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.actionButtonName} onChangeText={(text) => this.setState({actionButtonName: text})} placeholder='Action Button Title'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryButtonContainer}>
                    <Button title='Add Data' onPress={ () => this.addActionDataRow() }/>
                </View>
                <FlatList style={{flex: 1}}
                    data={this.state.actionData}
                    extraData={this.state.actionData}
                    renderItem={({item, index}) => (
                        <View style={CreateActivityPostStyle.formEntryRow}>
                            <View style={CreateActivityPostStyle.formEntryInputContainer}>
                                <TextInput style={CreateActivityPostStyle.formEntryInput} onChangeText={(newName) => {
                                    this.updateActionData(index, newName, this.state.actionData[index].value);
                                }} value={item.name} placeholder='Key'/>
                            </View>
                            <View style={CreateActivityPostStyle.formEntryInputContainer}>
                                <TextInput style={CreateActivityPostStyle.formEntryInput} onChangeText={(newValue) => {
                                    this.updateActionData(index, this.state.actionData[index].name, newValue);
                                }}value={item.value} placeholder='Value'/>
                            </View>
                            <View style={CreateActivityPostStyle.formEntryButtonContainer}>
                                <Button title='Remove' onPress={ () => this.removeActionDataRow(index) }/>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.key}
                />
                <KeyboardAvoidingView>
                    <View style={CreateActivityPostStyle.sectionTitleRow}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Button title='Update Activity' onPress={ () => this.createPost() }/>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
