// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, View, Text, TextInput, Button, ScrollView, KeyboardAvoidingView} from 'react-native';
import {SendCustomInviteStyle} from './SendCustomInviteStyle';
import {GetSocialUI, InviteContent, MediaAttachment} from 'getsocial-react-native-sdk';
import ImagePicker from 'react-native-image-picker';
import InvitesView from '../getsocial-react-native-sdk/models/invites/InvitesView';

type Props = {}

type State = {
    windowTitle : ?string,
    inviteSubject : ?string,
    inviteText : ?string,
    inviteImageUrl : ?string,
    inviteImageUri : ?string,
    inviteImageData : ?string,
    inviteVideoUrl : ?string,
    inviteVideoUri: ?string,
    inviteVideoData: ?string,
    landingPageTitle : ?string,
    landingPageDescription : ?string,
    landingPageImageUrl : ?string,
    landingPageVideoUrl : ?string,
    landingPageImageUri : ?string,
    landingPageImageData : ?string,
    selectInviteImageButtonDisabled: boolean,
    selectInviteVideoButtonDisabled: boolean,
    selectLandingPageImageButtonDisabled: boolean,
}

export default class SendCustomInvite extends Component<Props, State> {
    static navigationOptions = {title: 'Send custom invite'};

    constructor(props: any) {
      super(props);
      this.state = {
        windowTitle: null,
        inviteSubject: null,
        inviteText: null,
        inviteImageUrl: null,
        inviteImageUri: null,
        inviteImageData: null,
        inviteVideoUrl: null,
        inviteVideoUri: null,
        inviteVideoData: null,
        landingPageTitle: null,
        landingPageDescription: null,
        landingPageImageUrl: null,
        landingPageVideoUrl: null,
        landingPageImageUri: null,
        landingPageImageData: null,
        selectInviteImageButtonDisabled: false,
        selectInviteVideoButtonDisabled: false,
        selectLandingPageImageButtonDisabled: false,
      };
    }

    updateButtonsState = async () => {
      if (this.state.inviteLocalImageUri == null) {
        if (this.state.inviteLocalVideoUri == null) {
          this.setState({selectInviteImageButtonDisabled: false});
          this.setState({selectInviteVideoButtonDisabled: false});
        } else {
          this.setState({selectInviteImageButtonDisabled: true});
          this.setState({selectInviteVideoButtonDisabled: false});
        }
      } else {
        if (this.state.inviteVideoUri == null) {
          this.setState({selectInviteImageButtonDisabled: false});
          this.setState({selectInviteVideoButtonDisabled: true});
        } else {
          this.setState({selectInviteImageButtonDisabled: false});
          this.setState({selectInviteVideoButtonDisabled: false});
        }
      }
    }

    selectImage = async () => {
      ImagePicker.launchImageLibrary({}, (response) => {
        if (response.uri != undefined) {
          MediaAttachment.loadLocalResource(response.uri).then((base64Image) => {
            this.setState({
              inviteImageUri: response.uri,
              inviteImageData: base64Image
            }, () => {
              this.updateButtonsState();
            });
            })
        }
      });
    }

    removeImage = async () => {
      this.setState({
        inviteImageUri: null,
        inviteImageData: null
      }, () => {
        this.updateButtonsState();
      });
    }

    selectVideo = async () => {
      const options = {mediaType: 'video'};
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri != undefined) {
          MediaAttachment.loadLocalResource(response.uri).then((base64Video) => {
            this.setState({
              inviteVideoUri: response.uri,
              inviteVideoData: base64Video
            }, () => {
              this.updateButtonsState();
            });
          });
        }
      });
    }

    removeVideo = async () => {
      this.setState({
        inviteVideoUri: null,
        inviteVideoData: null
      }, () => {
        this.updateButtonsState();
      });
    }

    selectLandingPageImage = async () => {
      ImagePicker.launchImageLibrary({}, (response) => {
        if (response.uri != undefined) {
          MediaAttachment.loadLocalResource(response.uri).then((base64Image) => {
            this.setState({
              landingPageImageUri: response.uri,
              landingPageImageData: base64Image,
            });
          });
        }
      });
    }

    useInviteImageForLandingPage = async () => {
      if (this.state.inviteImageUri != null) {
        this.setState({
          landingPageImageUri: this.state.inviteImageUri,
          landingPageImageData: this.state.inviteImageData
        });
      }
    }

    removeLandingPageImage = async () => {
      this.setState({
        landingPageImageUri: null,
        landingPageImageData: null
      });
    }

    openInvitesView = async () => {
      let mediaAttachment = null;
      if (this.state.inviteImageUrl != null) {
        mediaAttachment = MediaAttachment.withImageUrl(this.state.inviteImageUrl);
      } else if (this.state.inviteVideoUrl != null) {
        mediaAttachment = MediaAttachment.withVideoUrl(this.state.inviteVideoUrl);
      } else if (this.state.inviteImageUri != null) {
        mediaAttachment = MediaAttachment.withBase64Image(this.state.inviteImageData);
      } else if (this.state.inviteVideoUri != null) {
        mediaAttachment = MediaAttachment.withBase64Video(this.state.inviteVideoData);
      }

      const content = new InviteContent();
      content.text = this.state.inviteText;
      content.subject = this.state.inviteSubject;
      content.mediaAttachment = mediaAttachment;

      const linkParams = new Map();
      if (this.state.landingPageTitle != null) {
        linkParams['$title'] = this.state.landingPageTitle;
      }
      if (this.state.landingPageDescription != null) {
        linkParams['$description'] = this.state.landingPageDescription;
      }
      if (this.state.landingPageImageUrl != null) {
        linkParams['$image'] = this.state.landingPageImageUrl;
      }
      if (this.state.landingPageVideoUrl != null) {
        linkParams['$youtube_video'] = this.state.landingPageVideoUrl;
      }
      if (this.state.landingPageLocalImageUri != null) {
        linkParams['$image'] = this.state.landingPageBase64Image;
      }
      content.linkParams = linkParams;

      const view = new InvitesView();
      view.windowTitle = this.state.windowTitle;
      view.customInviteContent = content;
      view.onInviteSentListener = (channelId) => {
        Alert.alert('Smart Invite', 'Invite was sent using ' + channelId);
      };
      view.onInviteCancelledListener = (channelId) => {
        Alert.alert('Smart Invite', 'Invite sending was canceled, channel: ' + channelId);
      };
      view.onInviteErrorListener = (channelId, error) => {
        Alert.alert('Smart Invite', 'Failed to send invite, error: ' + error);
      };
      view.show();
    }

    renderMedia(image: any, onDelete:(() => void)) {
      return (<View style={SendCustomInviteStyle.formEntryRow}>
        <View style={SendCustomInviteStyle.formEntryTitleContainer}>
          <Image source={image} style={{width: 100, height: 50}}/>
        </View>
        <View style={SendCustomInviteStyle.formEntryInputContainer}>
          <Button title={'Remove'} onPress={() => onDelete()}/>
        </View>
      </View>);
    }

    renderInviteImage() {
      if (this.state.inviteImageUri != null) {
        return this.renderMedia({uri: this.state.inviteImageUri}, () => {
          this.removeImage();
        });
      }
      return null;
    }

    renderInviteVideo() {
      if (this.state.inviteVideoUri != null) {
        return this.renderMedia(require('./../img/video-thumbnail.jpg'), () => {
          this.removeVideo();
        });
      }
      return null;
    }

    renderLandingPageImage() {
      if (this.state.landingPageImageUri != null) {
        return this.renderMedia({uri: this.state.landingPageImageUri}, () => {
          this.removeLandingPageImage();
        });
      }
      return null;
    }

    render() {
      return (
        <ScrollView style={{flex: 1, padding: 10}}  keyboardDismissMode='on-drag' removeClippedSubviews={false}  keyboardShouldPersistTaps='always'>
          <View style={SendCustomInviteStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={SendCustomInviteStyle.sectionTitle} >Invite View Settings</Text>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Title</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <TextInput style={SendCustomInviteStyle.formEntryInput} value={this.state.windowTitle} onChangeText={(text) => this.setState({windowTitle: text})} placeholder='Title'/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={SendCustomInviteStyle.sectionTitle} >Customize your invite subject and text</Text>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Subject</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <TextInput style={SendCustomInviteStyle.formEntryInput} value={this.state.inviteSubject} onChangeText={(text) => this.setState({inviteSubject: text})} placeholder='Subject'/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Text</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <TextInput style={SendCustomInviteStyle.formEntryInput} value={this.state.inviteText} onChangeText={(text) => this.setState({inviteText: text})} placeholder='Text'/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Image Url</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <TextInput style={SendCustomInviteStyle.formEntryInput} value={this.state.inviteImageUrl} onChangeText={(text) => this.setState({inviteImageUrl: text})} placeholder='Image Url'/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Video Url</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <TextInput style={SendCustomInviteStyle.formEntryInput} value={this.state.inviteVideoUrl} onChangeText={(text) => this.setState({inviteVideoUrl: text})} placeholder='Video Url'/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Image</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <Button title={'Select'} disabled={this.state.selectInviteImageButtonDisabled} onPress={() => this.selectImage()}/>
            </View>
          </View>
          {this.renderInviteImage()}
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Video</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <Button title={'Select'} disabled={this.state.selectInviteVideoButtonDisabled} onPress={() => this.selectVideo()}/>
            </View>
          </View>
          {this.renderInviteVideo()}
          <View style={SendCustomInviteStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={SendCustomInviteStyle.sectionTitle} >Customize landing page</Text>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Title</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <TextInput style={SendCustomInviteStyle.formEntryInput} value={this.state.landingPageTitle} onChangeText={(text) => this.setState({landingPageTitle: text})} placeholder='Title'/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Description</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <TextInput style={SendCustomInviteStyle.formEntryInput} value={this.state.landingPageDescription} onChangeText={(text) => this.setState({landingPageDescription: text})} placeholder='Description'/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Image Url</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <TextInput style={SendCustomInviteStyle.formEntryInput} value={this.state.landingPageImageUrl} onChangeText={(text) => this.setState({landingPageImageUrl: text})} placeholder='Image Url'/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Video Url</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <TextInput style={SendCustomInviteStyle.formEntryInput} value={this.state.landingPageVideoUrl} onChangeText={(text) => this.setState({landingPageVideoUrl: text})} placeholder='Video Url'/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.formEntryRow}>
            <View style={SendCustomInviteStyle.formEntryTitleContainer}>
              <Text style={SendCustomInviteStyle.formEntryTitle} >Image</Text>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <Button title={'Select'} onPress={() => this.selectLandingPageImage()}/>
            </View>
            <View style={SendCustomInviteStyle.formEntryInputContainer}>
              <Button title={'Same as Invite'} onPress={() => this.useInviteImageForLandingPage()}/>
            </View>
          </View>
          {this.renderLandingPageImage()}
          <KeyboardAvoidingView behavior='padding'>
          <View style={SendCustomInviteStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Button title='Open Invites View' onPress={ this.openInvitesView }/>
            </View>
          </View>
          </KeyboardAvoidingView>

        </ScrollView>
      );
    }
}
