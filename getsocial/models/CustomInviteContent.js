/* eslint-disable max-len */
// @flow

import MediaAttachment from './MediaAttachment.js';

/**
 * Class to specify custom invite content.
 */
export default class CustomInviteContent {
  #inviteText = null;
  #inviteSubject = null;
  #mediaAttachment = null;

  /**
   * Set custom invite text.
   * @param {string} inviteText invite text.
   * @return {CustomInviteContent} modified instance.
   */
  withText(inviteText: ?string): CustomInviteContent {
    this.#inviteText = inviteText;
    return this;
  }

  /**
   * Set custom invite text.
   * @param {string} inviteSubject invite subject.
   * @return {CustomInviteContent} modified instance.
   */
  withSubject(inviteSubject: ?string): CustomInviteContent {
    this.#inviteSubject = inviteSubject;
    return this;
  }

  /**
   * Set media attachment.
   * @param {string} mediaAttachment media attachment.
   * @return {CustomInviteContent} modified instance.
   */
  withMediaAttachment(mediaAttachment: ?MediaAttachment): CustomInviteContent {
    this.#mediaAttachment = mediaAttachment;
    return this;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    return JSON.stringify({
      'inviteText': this.#inviteText,
      'inviteSubject': this.#inviteSubject,
      'mediaAttachment': this.#mediaAttachment == null ? null : JSON.parse(this.#mediaAttachment.toJSON()),
    });
  }
}
