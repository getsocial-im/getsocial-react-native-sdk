// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, Image, View, Text, TextInput, Button, ScrollView} from 'react-native';
import {SendCustomInviteStyle} from './SendCustomInviteStyle';
import {GetSocial, GetSocialUI, CustomInviteContent, MediaAttachment} from 'getsocial-react-native-sdk';
import ImagePicker from 'react-native-image-picker';

type Props = {}

type State = {
    windowTitle : ?string,
    inviteSubject : ?string,
    inviteText : ?string,
    inviteImageUrl : ?string,
    inviteLocalImageUri: ?string,
    inviteVideoUrl : ?string,
    inviteLocalVideoUri: ?string,
    landingPageTitle : ?string,
    landingPageDescription : ?string,
    landingPageImageUrl : ?string,
    landingPageVideoUrl : ?string,
    landingPageLocalImageUri : ?string,
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
        inviteLocalImageUri: null,
        inviteVideoUrl: null,
        inviteLocalVideoUri: null,
        landingPageTitle: null,
        landingPageDescription: null,
        landingPageImageUrl: null,
        landingPageVideoUrl: null,
        landingPageLocalImageUri: null,
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
        if (this.state.inviteLocalVideoUri == null) {
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
          this.setState({inviteLocalImageUri: response.uri}, () => {
            this.updateButtonsState();
          });
        }
      });
    }

    removeImage = async () => {
      this.setState({inviteLocalImageUri: null}, () => {
        this.updateButtonsState();
      });
    }

    selectVideo = async () => {
      const options = {mediaType: 'video'};
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri != undefined) {
          this.setState({inviteLocalVideoUri: response.uri}, () => {
            this.updateButtonsState();
          });
        }
      });
    }

    removeVideo = async () => {
      this.setState({inviteLocalVideoUri: null}, () => {
        this.updateButtonsState();
      });
    }

    selectLandingPageImage = async () => {
      ImagePicker.launchImageLibrary({}, (response) => {
        if (response.uri != undefined) {
          this.setState({landingPageLocalImageUri: response.uri});
        }
      });
    }

    useInviteImageForLandingPage = async () => {
      if (this.state.inviteLocalImageUri != null) {
        this.setState({landingPageLocalImageUri: this.state.inviteLocalImageUri});
      }
    }

    removeLandingPageImage = async () => {
      this.setState({landingPageLocalImageUri: null});
    }

    openInvitesView = async () => {
      let mediaAttachment = null;
      if (this.state.inviteImageUrl != null) {
        mediaAttachment = MediaAttachment.withImageUrl(this.state.inviteImageUrl);
      } else if (this.state.inviteVideoUrl != null) {
        mediaAttachment = MediaAttachment.withVideoUrl(this.state.inviteVideoUrl);
      } else if (this.state.inviteLocalImageUri != null) {
        mediaAttachment = MediaAttachment.withLocalImageUri(this.state.inviteLocalImageUri);
      } else if (this.state.inviteLocalVideoUri != null) {
        mediaAttachment = MediaAttachment.withLocalVideoUri(this.state.inviteLocalVideoUri);
      }

      const customInviteContent = new CustomInviteContent()
          .withText(this.state.inviteText)
          .withSubject(this.state.inviteSubject)
          .withMediaAttachment(mediaAttachment);

      const linkParams = new Map();
      if (this.state.landingPageTitle != null) {
        linkParams.set(GetSocial.LinkParams.LANDING_PAGE_CUSTOM_TITLE, this.state.landingPageTitle);
      }
      if (this.state.landingPageDescription != null) {
        linkParams.set(GetSocial.LinkParams.LANDING_PAGE_CUSTOM_DESCRIPTION, this.state.landingPageDescription);
      }
      if (this.state.landingPageImageUrl != null) {
        linkParams.set(GetSocial.LinkParams.LANDING_PAGE_CUSTOM_IMAGE, this.state.landingPageImageUrl);
      }
      if (this.state.landingPageVideoUrl != null) {
        linkParams.set(GetSocial.LinkParams.LANDING_PAGE_CUSTOM_YOUTUBE_VIDEO, this.state.landingPageVideoUrl);
      }
      if (this.state.landingPageLocalImageUri != null) {
        linkParams.set(GetSocial.LinkParams.LANDING_PAGE_CUSTOM_IMAGE, this.state.landingPageLocalImageUri);
      }

      GetSocialUI.createInvitesView()
          .withCustomWindowTitle(this.state.windowTitle)
          .withCustomInviteContent(customInviteContent)
          .withLinkParams(linkParams)
          .withInviteUICallback((channelId) => {
            Alert.alert('Smart Invite', 'Invite was sent using ' + channelId);
          }, (channelId) => {
            Alert.alert('Smart Invite', 'Invite sending was canceled, channel: ' + channelId);
          }, (channelId, error) => {
            Alert.alert('Smart Invite', 'Failed to send invite, error: ' + error);
          })
          .show();
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
      if (this.state.inviteLocalImageUri != null) {
        return this.renderMedia({uri: this.state.inviteLocalImageUri}, () => {
          this.removeImage();
        });
      }
      return null;
    }

    renderInviteVideo() {
      if (this.state.inviteLocalVideoUri != null) {
        return this.renderMedia(require('./../img/video-thumbnail.jpg'), () => {
          this.removeVideo();
        });
      }
      return null;
    }

    renderLandingPageImage() {
      if (this.state.landingPageLocalImageUri != null) {
        return this.renderMedia({uri: this.state.landingPageLocalImageUri}, () => {
          this.removeLandingPageImage();
        });
      }
      return null;
    }

    render() {
      return (
        <ScrollView style={{flex: 1, padding: 10}}>
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
          <View style={SendCustomInviteStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Button title='Open Invites View' onPress={ this.openInvitesView }/>
            </View>
          </View>
          <View style={SendCustomInviteStyle.sectionTitleRow}>
            <View style={{flex: 1, justifyContent: 'center'}}>
            </View>
          </View>

        </ScrollView>
      );
    }
}
