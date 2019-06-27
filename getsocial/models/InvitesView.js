/* eslint-disable max-len */
// @flow

import {mapToObjJSON} from './../utils/Utils.js';
import CustomInviteContent from './CustomInviteContent.js';
import {GetSocialEventEmitter} from './../GetSocialEventEmitter.js';
import {NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

/**
  Invites view.
 */
export default class InvitesView {
  #windowTitle;
  #customInviteContent = new CustomInviteContent();
  #linkParams = new Map();

  /**
   * Set custom window title.
   * @param {string} windowTitle title.
   * @return {InvitesView} modified instance.
   */
  withCustomWindowTitle(windowTitle: ?string): InvitesView {
    this.#windowTitle = windowTitle;
    return this;
  }

  /**
   * Set custom invite content.
   * @param {CustomInviteContent} customInviteContent Custom invite content.
   * @return {InvitesView} modified instance.
   */
  withCustomInviteContent(customInviteContent: CustomInviteContent): InvitesView {
    this.#customInviteContent = customInviteContent;
    return this;
  }

  /**
   * Set callbacks for different invites events.
   * @param {function(string)} onComplete called when an invite was sent.
   * @param {function(string)} onCancel called when an invite sending was canceled.
   * @param {function(string, string)} onError called when an error occured during sending an invite.
   * @return {InvitesView} modified instance.
   */
  withInviteUICallback(onComplete: ((channelId: string) => void), onCancel: ((channelId: string) => void), onError: (channelId: string, error: string) => void): InvitesView {
    GetSocialEventEmitter.removeAllListeners('InvitesUIEvent');
    GetSocialEventEmitter.addListener('InvitesUIEvent', (eventData) => {
      const status = eventData['STATUS'];
      const channelId = eventData['CHANNEL_ID'];
      if (status == 'onComplete') {
        onComplete(channelId);
      }
      if (status == 'onCancel') {
        onCancel(channelId);
      }
      if (status == 'onError') {
        const error = eventData['ERROR'];
        onError(channelId, error);
      }
    });
    return this;
  }

  /**
   * Set link params.
   * @param {Map} linkParams Link parameters.
   * @return {InvitesView} modified instance.
   */
  withLinkParams(linkParams: Map<string, string>): InvitesView {
    this.#linkParams = linkParams;
    return this;
  }

  /**
   * Shows the invites view.
   * @return {void} void.
   */
  show(): void {
    const inviteContentJSON = this.#customInviteContent == null ? null : JSON.parse(this.#customInviteContent.toJSON());
    const linkParamsJSON = this.#linkParams == null ? null : JSON.parse(mapToObjJSON(this.#linkParams));
    return RNGetSocial.showInvitesView(this.#windowTitle, inviteContentJSON, linkParamsJSON);
  }
}
