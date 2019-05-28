// @flow
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Alert, View, Text, TextInput, Button, ScrollView} from 'react-native';
import {SendCustomInviteStyle} from './SendCustomInviteStyle';
import {GetSocial, GetSocialUI, CustomInviteContent, MediaAttachment} from 'getsocial-react-native-sdk';

type Props = {}

type State = {
    windowTitle : ?string,
    inviteSubject : ?string,
    inviteText : ?string,
    inviteImageUrl : ?string,
    inviteVideoUrl : ?string,
    landingPageTitle : ?string,
    landingPageDescription : ?string,
    landingPageImageUrl : ?string,
    landingPageVideoUrl : ?string,
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
        inviteVideoUrl: null,
        landingPageTitle: null,
        landingPageDescription: null,
        landingPageImageUrl: null,
        landingPageVideoUrl: null,
      };
    }

    openInvitesView = async () => {
      let mediaAttachment = null;
      if (this.state.inviteImageUrl != null) {
        mediaAttachment = MediaAttachment.withImageUrl(this.state.inviteImageUrl);
      } else if (this.state.inviteVideoUrl != null) {
        mediaAttachment = MediaAttachment.withVideoUrl(this.state.inviteVideoUrl);
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
