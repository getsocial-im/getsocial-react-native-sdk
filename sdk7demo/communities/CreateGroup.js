// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Picker, Switch, Image, View, Text, TextInput, Button, ScrollView, FlatList, KeyboardAvoidingView} from 'react-native';
import {CreateActivityPostStyle} from './CreateActivityPostStyle';
import {Communities, CommunitiesAction, GroupContent, MediaAttachment} from 'getsocial-react-native-sdk';
import ImagePicker from 'react-native-image-picker';
import {showLoading, hideLoading} from './../common/LoadingIndicator';
import {Styles} from './../common/Styles.js';
// eslint-disable-next-line no-unused-vars
import DropDownPicker from 'react-native-dropdown-picker';
import {Platform} from 'react-native';

type Props = {}

type State = {
    id : ?string,
    title : ?string,
    description : ?string,
    avatarUrl: ?string,
    base64Image: ?string,
    localImageUri: ?string,
    properties: Map<string, string>,
    isPrivate: boolean,
    isDiscoverable: boolean,
    allowPost: number,
    allowInteract: number,
}

export default class CreateGroupView extends Component<Props, State> {
  static navigationOptions = {title: 'Create Group'};

  constructor(props: any) {
      super(props);
      this.state = {
          id: null,
          title: null,
          description: null,
          avatarUrl: null,
          base64Image: null,
          localImageUri: null,
          base64Video: null,
          localVideoUri: null,
          properties: new Map(),
          isPrivate: false,
          isDiscoverable: true,
          allowPost: '0',
          allowInteract: '0',
      };
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


    createGroup = async () => {
        let mediaAttachment = null;
        if (this.state.avatarUrl != null && this.state.avatarUrl.length != 0) {
            mediaAttachment = MediaAttachment.withImageUrl(this.state.avatarUrl);
        } else if (this.state.localImageUri != null) {
            mediaAttachment = MediaAttachment.withBase64Image(this.state.base64Image);
        }

        const content = new GroupContent();
        content.id = this.state.id;
        content.title = this.state.title;
        content.description = this.state.description;
        if (mediaAttachment != null) {
            content.avatar = mediaAttachment;
        }
        const propertiesMap = {};
        let validprops = true;
        this.state.properties.forEach((item) => {
            if (item.name != null && item.name.trim().length != 0 && item.value != null && item.value.trim().length != 0) {
                propertiesMap[item.name] = item.value;
            } else {
                validprops = false;
            }
        });
        if (!validprops) {
            Alert.alert('Error', 'Property name and value cannot be empty.');
            return;
        }
        content.properties = propertiesMap;
        content.isPrivate = this.state.isPrivate;
        content.isDiscoverable = this.state.isDiscoverable;
        const permissionsMap = {};
        permissionsMap[CommunitiesAction.Post] = Number(this.state.allowPost);
        permissionsMap[CommunitiesAction.React] = Number(this.state.allowInteract);
        content.permissions = permissionsMap;

        if (content.id == null || content.id.length == 0 || content.title == null || content.title.length == 0) {
            Alert.alert('Error', 'Id and name fields are mandatory.');
            return;
        }
        showLoading();
        Communities.createGroup(content).then((group) => {
            hideLoading();
            Alert.alert('Success', 'Group created');
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

    renderPostDropDown() {
        if (Platform.OS === 'ios') {
            return (
                <View style={Styles.pickerRowFirst}>
                    <Text style={Styles.formEntryTitle}>Post</Text>
                    <View style={CreateActivityPostStyle.formEntryPickerContainer}>
                        <DropDownPicker
                            defaultValue={this.state.allowPost}
                            onChangeItem={(item) => this.setState({allowPost: item.value})}
                            containerStyle={{height: 44}}
                            items={[
                                {label: 'Owner', value: '0'},
                                {label: 'Admin', value: '1'},
                                {label: 'Member', value: '3'},
                            ]}/>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={Styles.formEntryRow}>
                    <Text style={Styles.formEntryTitle}>Post</Text>
                    <View style={CreateActivityPostStyle.formEntryPickerContainer}>
                        <Picker style={CreateActivityPostStyle.pickerStyle} itemStyle={{height: 44}}
                            selectedValue={this.state.allowPost} onValueChange={(itemValue, itemIndex) => this.setState({allowPost: itemValue})}>
                            <Picker.Item label="Owner" value="0"/>
                            <Picker.Item label="Admin" value="1"/>
                            <Picker.Item label="Member" value="3"/>
                        </Picker>
                    </View>
                </View>
            );
        }
    }

    renderInteractDropDown() {
        if (Platform.OS === 'ios') {
            return (
                <View style={Styles.pickerRowSecond}>
                    <Text style={Styles.formEntryTitle}>React</Text>
                    <View style={CreateActivityPostStyle.formEntryPickerContainer}>
                        <DropDownPicker
                            defaultValue={this.state.allowInteract}
                            onChangeItem={(item) => this.setState({allowInteract: item.value})}
                            containerStyle={{height: 44}}
                            items={[
                                {label: 'Owner', value: '0'},
                                {label: 'Admin', value: '1'},
                                {label: 'Member', value: '3'},
                            ]}/>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={Styles.formEntryRow}>
                    <Text style={Styles.formEntryTitle}>React</Text>
                    <View style={CreateActivityPostStyle.formEntryPickerContainer}>
                        <Picker style={CreateActivityPostStyle.pickerStyle} itemStyle={{height: 44}}
                            selectedValue={this.state.allowInteract} onValueChange={(itemValue, itemIndex) => this.setState({allowInteract: itemValue})}>
                            <Picker.Item label="Owner" value="0"/>
                            <Picker.Item label="Admin" value="1"/>
                            <Picker.Item label="Member" value="3"/>
                        </Picker>
                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1, padding: 10}} keyboardDismissMode='on-drag' removeClippedSubviews={false} keyboardShouldPersistTaps='always'>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Group Id</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.id} onChangeText={(text) => this.setState({id: text})} placeholder='Id'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Name</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.title} onChangeText={(text) => this.setState({title: text})} placeholder='Name'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Description</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.description} onChangeText={(text) => this.setState({description: text})} placeholder='Description'/>
                    </View>
                </View>
                <View style={CreateActivityPostStyle.formEntryRow}>
                    <View style={CreateActivityPostStyle.formEntryTitleContainer}>
                        <Text style={CreateActivityPostStyle.formEntryTitle} >Image Url</Text>
                    </View>
                    <View style={CreateActivityPostStyle.formEntryInputContainer}>
                        <TextInput style={CreateActivityPostStyle.formEntryInput} value={this.state.avatarUrl} onChangeText={(text) => this.setState({avatarUrl: text})} placeholder='Image Url'/>
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
                <View style={CreateActivityPostStyle.formEntryButtonContainer}>
                    <Button title='Add Property' onPress={ () => this.addPropertiesRow() }/>
                </View>
                <FlatList style={{flex: 1}} removeClippedSubviews={false}
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
                <View style={Styles.formEntryRow}>
                    <Text style={Styles.formEntryTitle}>Private</Text>
                    <Switch value={this.state.isPrivate} onValueChange={(newValue) => this.setState({isPrivate: newValue})}/>
                    <Text style={Styles.formEntryTitle}>Discoverable</Text>
                    <Switch value={this.state.isDiscoverable} onValueChange={(newValue) => this.setState({isDiscoverable: newValue})}/>
                </View>
                {this.renderPostDropDown()}
                {this.renderInteractDropDown()}
                <KeyboardAvoidingView behavior='padding'>
                    <View zIndex={40} style={CreateActivityPostStyle.sectionTitleRow}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Button title='Create' onPress={ () => this.createGroup() }/>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
