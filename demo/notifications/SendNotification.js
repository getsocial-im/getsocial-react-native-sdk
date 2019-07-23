// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, View, Image, Text, TextInput, Button, ScrollView, FlatList, Picker} from 'react-native';
import {SendNotificationStyle} from './SendNotificationStyle';
import {GetSocialUser, MediaAttachment, Action, ActionButton, NotificationContent} from 'getsocial-react-native-sdk';
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {CheckBox} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

type Props = {}

type State = {
    templateName : ?string,
    templateData : Array<any>,
    notificationText: ?string,
    notificationTitle: ?string,
    imageUrl: ?string,
    localImageUri: ?string,
    videoUrl: ?string,
    localVideoUri: ?string,
    action: string,
    actionButtons: Array<any>,
    notificationData: Array<any>,
    recipients: Array<any>,
    sendToFriends: boolean,
    sendToReferrer: boolean,
    sendToReferredUsers: boolean,
    sendingNotification: boolean,
    selectImageButtonDisabled: boolean,
    selectVideoButtonDisabled: boolean,
}

export default class SendNotification extends Component<Props, State> {
    static navigationOptions = {title: 'Send notification'};

    constructor(props: any) {
      super(props);
      this.state = {
        templateName: null,
        templateData: [],
        notificationText: null,
        notificationTitle: null,
        imageUrl: null,
        localImageUri: null,
        videoUrl: null,
        localVideoUri: null,
        action: 'default',
        actionButtons: [],
        notificationData: [],
        recipients: [],
        sendToFriends: false,
        sendToReferrer: false,
        sendToReferredUsers: false,
        sendingNotification: false,
        selectImageButtonDisabled: false,
        selectVideoButtonDisabled: false,
      };
    }

    generateRandom() {
      const min = 1;
      const max = 1000;
      return min + (Math.random() * (max-min));
    }

    updateTemplateData = async (index: number, newName: string, newValue: string) => {
      this.setState((prevState) => {
        const copiedData = [...prevState.templateData];
        copiedData[index].name = newName;
        copiedData[index].value = newValue;
        return {templateData: copiedData};
      });
    }

    updateActionButtonData = async (index: number, newName: string, newActionId: string) => {
      this.setState((prevState) => {
        const copiedData = [...prevState.actionButtons];
        copiedData[index].name = newName;
        copiedData[index].value = newActionId;
        return {actionButtons: copiedData};
      });
    }

    updateNotificationData = async (index: number, newName: string, newValue: string) => {
      this.setState((prevState) => {
        const copiedData = [...prevState.notificationData];
        copiedData[index].name = newName;
        copiedData[index].value = newValue;
        return {notificationData: copiedData};
      });
    }

    updateRecipientData = async (index: number, newName: string) => {
      this.setState((prevState) => {
        const copiedData = [...prevState.recipients];
        copiedData[index].name = newName;
        return {recipients: copiedData};
      });
    }

    addTemplateDataRow = async () => {
      this.setState({
        templateData: [...this.state.templateData, {key: 'TDR_' + this.generateRandom()}],
      });
    }

    removeTemplateDataRow = async (index: number) => {
      const data = this.state.templateData;
      data.splice(index, 1);
      this.setState((prevState) => {
        return {templateData: data};
      });
    }

    addNotificationDataRow = async () => {
      this.setState({
        notificationData: [...this.state.notificationData, {key: 'NDR_' + this.generateRandom()}],
      });
    }

    removeNotificationDataRow = async (index: number) => {
      const data = this.state.notificationData;
      data.splice(index, 1);
      this.setState((prevState) => {
        return {notificationData: data};
      });
    }

    addActionButtonDataRow = async () => {
      this.setState({
        actionButtons: [...this.state.actionButtons, {key: 'ABDR_' + this.generateRandom()}],
      });
    }

    removeActionButtonDataRow = async (index: number) => {
      const data = this.state.actionButtons;
      data.splice(index, 1);
      this.setState((prevState) => {
        return {actionButtons: data};
      });
    }

    addRecipientDataRow = async () => {
      this.setState({
        recipients: [...this.state.recipients, {key: 'RDR_' + this.generateRandom()}],
      });
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
          this.setState({localImageUri: response.uri}, () => {
            this.updateButtonsState();
          });
        }
      });
    }

    removeImage = async () => {
      this.setState({localImageUri: null}, () => {
        this.updateButtonsState();
      });
    }

    selectVideo = async () => {
      const options = {mediaType: 'video'};
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri != undefined) {
          this.setState({localVideoUri: response.uri}, () => {
            this.updateButtonsState();
          });
        }
      });
    }

    removeVideo = async () => {
      this.setState({localVideoUri: null}, () => {
        this.updateButtonsState();
      });
    }

    sendNotification = async () => {
      if (this.state.sendingNotification == true) {
        console.log('Sending notification in progress...');
        return;
      }
      this.setState({sendingNotification: true});
      const notification = this.state.templateName == null ? NotificationContent.withText(this.state.notificationText == null ? '' : this.state.notificationText) : NotificationContent.withTemplate(this.state.templateName);
      const templateData = new Map();
      this.state.templateData.forEach((item) => {
        templateData.set(item.name, item.value);
      });
      notification.addTemplatePlaceholders(templateData);
      if (this.state.notificationText != null) {
        notification.withText(this.state.notificationText);
      }
      if (this.state.notificationTitle != null) {
        notification.withTitle(this.state.notificationTitle);
      }
      let mediaAttachment = null;
      if (this.state.imageUrl != null) {
        mediaAttachment = MediaAttachment.withImageUrl(this.state.imageUrl);
      } else if (this.state.videoUrl != null) {
        mediaAttachment = MediaAttachment.withVideoUrl(this.state.videoUrl);
      } else if (this.state.localImageUri != null) {
        mediaAttachment = MediaAttachment.withLocalImageUri(this.state.localImageUri);
      } else if (this.state.localVideoUri != null) {
        mediaAttachment = MediaAttachment.withLocalVideoUri(this.state.localVideoUri);
      }
      if (mediaAttachment != null) {
        notification.withMediaAttachment(mediaAttachment);
      }
      this.state.actionButtons.forEach((item) => {
        notification.addActionButton(ActionButton.create(item.name, item.value));
      });
      const action = Action.withType(this.state.action);
      const notificationData = new Map();
      this.state.notificationData.forEach((item) => {
        notificationData.set(item.name, item.value);
      });
      action.addActionDataMap(notificationData);
      notification.withAction(action);
      const recipients : string[] = [];
      this.state.recipients.forEach((recipient) => {
        recipients.push(recipient.name);
      });
      if (this.state.sendToFriends == true) {
        recipients.push('friends');
      }
      if (this.state.sendToReferrer == true) {
        recipients.push('referrer');
      }
      if (this.state.sendToReferredUsers == true) {
        recipients.push('referred_users');
      }
      showLoading();
      console.log('Sending notification...');
      GetSocialUser.sendNotification(recipients, notification)
          .then((notificationSummary) => {
            this.setState({sendingNotification: false});
            hideLoading();
            console.log('Notification was sent...');
            Alert.alert('Notifications', 'Notification was sent to ' + notificationSummary.successfullySentCount + ' recipients');
          }, (error) => {
            this.setState({sendingNotification: false});
            hideLoading();
            Alert.alert('Error', 'Could not send notification, error: ' + error['code']);
          });
    }

    renderMedia(image: any, onDelete:(() => void)) {
      return (<View style={SendNotificationStyle.formEntryRow}>
        <View style={SendNotificationStyle.formEntryTitleContainer}>
          <Image source={image} style={{width: 100, height: 50}}/>
        </View>
        <View style={SendNotificationStyle.formEntryInputContainer}>
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
        <ScrollView style={{flex: 1, padding: 10}}>
          <View style={SendNotificationStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={SendNotificationStyle.sectionTitle} >Content</Text>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Template</Text>
            </View>
            <View style={SendNotificationStyle.formEntryInputContainer}>
              <TextInput style={SendNotificationStyle.formEntryInput} value={this.state.templateName} onChangeText={(text) => this.setState({templateName: text})} placeholder='Template name'/>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Template Data</Text>
            </View>
            <View style={SendNotificationStyle.formEntryButtonContainer}>
              <Button title='Add' onPress={ this.addTemplateDataRow }/>
            </View>
          </View>
          <FlatList style={{flex: 1}}
            data={this.state.templateData}
            extraData={this.state.templateData}
            renderItem={({item, index}) => (
              <View style={SendNotificationStyle.formEntryRow}>
                <View style={SendNotificationStyle.formEntryInputContainer}>
                  <TextInput style={SendNotificationStyle.formEntryInput} onChangeText={(newName) => {
                    this.updateTemplateData(index, newName, this.state.templateData[index].value);
                  }} value={item.name} placeholder='Key'/>
                </View>
                <View style={SendNotificationStyle.formEntryInputContainer}>
                  <TextInput style={SendNotificationStyle.formEntryInput} onChangeText={(newValue) => {
                    this.updateTemplateData(index, this.state.templateData[index].name, newValue);
                  }}value={item.value} placeholder='Value'/>
                </View>
                <View style={SendNotificationStyle.formEntryButtonContainer}>
                  <Button title='Remove' onPress={ () => this.removeTemplateDataRow(index) }/>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Text</Text>
            </View>
            <View style={SendNotificationStyle.formEntryInputContainer}>
              <TextInput style={SendNotificationStyle.formEntryInput} value={this.state.notificationText} onChangeText={(text) => this.setState({notificationText: text})} placeholder='Notification Text'/>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Title</Text>
            </View>
            <View style={SendNotificationStyle.formEntryInputContainer}>
              <TextInput style={SendNotificationStyle.formEntryInput} value={this.state.notificationTitle} onChangeText={(text) => this.setState({notificationTitle: text})} placeholder='Notification title'/>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Image Url</Text>
            </View>
            <View style={SendNotificationStyle.formEntryInputContainer}>
              <TextInput style={SendNotificationStyle.formEntryInput} value={this.state.imageUrl} onChangeText={(text) => this.setState({imageUrl: text})} placeholder='Image Url'/>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Video Url</Text>
            </View>
            <View style={SendNotificationStyle.formEntryInputContainer}>
              <TextInput style={SendNotificationStyle.formEntryInput} value={this.state.videoUrl} onChangeText={(text) => this.setState({videoUrl: text})} placeholder='Video Url'/>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Image</Text>
            </View>
            <View style={SendNotificationStyle.formEntryInputContainer}>
              <Button title={'Select'} disabled={this.state.selectImageButtonDisabled} onPress={() => this.selectImage()}/>
            </View>
          </View>
          {this.renderImage()}
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Video</Text>
            </View>
            <View style={SendNotificationStyle.formEntryInputContainer}>
              <Button title={'Select'} disabled={this.state.selectVideoButtonDisabled} onPress={() => this.selectVideo()}/>
            </View>
          </View>
          {this.renderVideo()}
          <View style={SendNotificationStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={SendNotificationStyle.sectionTitle} >Action</Text>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryPickerContainer}>
              <Picker
                style={SendNotificationStyle.pickerStyle} itemStyle={{height: 44}}
                selectedValue={this.state.action}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({action: itemValue})
                }>
                <Picker.Item label="Default" value="default" />
                <Picker.Item label="Open Profile" value="open_profile" />
                <Picker.Item label="Open Activity" value="open_activity" />
                <Picker.Item label="Open Invites" value="open_invites" />
                <Picker.Item label="Claim Promo Code" value="claim_promo_code" />
                <Picker.Item label="Open URL" value="open_url" />
                <Picker.Item label="Add Friend" value="add_friend" />
              </Picker>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Action Buttons</Text>
            </View>
            <View style={SendNotificationStyle.formEntryButtonContainer}>
              <Button title='Add' onPress={ this.addActionButtonDataRow }/>
            </View>
          </View>
          <FlatList style={{flex: 1}}
            data={this.state.actionButtons}
            renderItem={({item, index}) => (
              <View style={SendNotificationStyle.formEntryRow}>
                <View style={SendNotificationStyle.formEntryInputContainer}>
                  <TextInput style={SendNotificationStyle.formEntryInput} onChangeText={(newName) => this.updateActionButtonData(index, newName, item.value)} value={item.name} placeholder='Title'/>
                </View>
                <View style={SendNotificationStyle.formEntryInputContainer}>
                  <TextInput style={SendNotificationStyle.formEntryInput} onChangeText={(newValue) => this.updateActionButtonData(index, item.name, newValue)} value={item.value} placeholder='Action Id'/>
                </View>
                <View style={SendNotificationStyle.formEntryButtonContainer}>
                  <Button title='Remove' onPress={ () => this.removeActionButtonDataRow(index) }/>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Notification Data</Text>
            </View>
            <View style={SendNotificationStyle.formEntryButtonContainer}>
              <Button title='Add' onPress={ this.addNotificationDataRow }/>
            </View>
          </View>
          <FlatList style={{flex: 1}}
            data={this.state.notificationData}
            renderItem={({item, index}) => (
              <View style={SendNotificationStyle.formEntryRow}>
                <View style={SendNotificationStyle.formEntryInputContainer}>
                  <TextInput style={SendNotificationStyle.formEntryInput} onChangeText={(newName) => this.updateNotificationData(index, newName, item.value)} value={item.name} placeholder='Key'/>
                </View>
                <View style={SendNotificationStyle.formEntryInputContainer}>
                  <TextInput style={SendNotificationStyle.formEntryInput} onChangeText={(newValue) => this.updateNotificationData(index, item.name, newValue)} value={item.value} placeholder='Value'/>
                </View>
                <View style={SendNotificationStyle.formEntryButtonContainer}>
                  <Button title='Remove' onPress={ () => this.removeNotificationDataRow(index) }/>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
          <View style={SendNotificationStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={SendNotificationStyle.sectionTitle} >Recipients</Text>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Friends</Text>
            </View>
            <View style={SendNotificationStyle.formEntryButtonContainer}>
              <CheckBox center checked={this.state.sendToFriends} onPress={() => {
                this.setState({sendToFriends: !this.state.sendToFriends});
              }}/>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Referrer</Text>
            </View>
            <View style={SendNotificationStyle.formEntryButtonContainer}>
              <CheckBox center checked={this.state.sendToReferrer} onPress={() => {
                this.setState({sendToReferrer: !this.state.sendToReferrer});
              }}/>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >Referred Users</Text>
            </View>
            <View style={SendNotificationStyle.formEntryButtonContainer}>
              <CheckBox center checked={this.state.sendToReferredUsers} onPress={() => {
                this.setState({sendToReferredUsers: !this.state.sendToReferredUsers});
              }}/>
            </View>
          </View>
          <View style={SendNotificationStyle.formEntryRow}>
            <View style={SendNotificationStyle.formEntryTitleContainer}>
              <Text style={SendNotificationStyle.formEntryTitle} >User IDs</Text>
            </View>
            <View style={SendNotificationStyle.formEntryButtonContainer}>
              <Button title='Add' onPress={ this.addRecipientDataRow }/>
            </View>
          </View>
          <FlatList style={{flex: 1}}
            data={this.state.recipients}
            extraData={this.state.recipients}
            renderItem={({item, index}) => (
              <View style={SendNotificationStyle.formEntryRow}>
                <View style={SendNotificationStyle.formEntryInputContainer}>
                  <TextInput style={SendNotificationStyle.formEntryInput} onChangeText={(newName) => {
                    this.updateRecipientData(index, newName);
                  }} value={item.name} placeholder='User Id'/>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
          <View style={SendNotificationStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Button title='Send' onPress={ this.sendNotification }/>
            </View>
          </View>
        </ScrollView>
      );
    }
}
