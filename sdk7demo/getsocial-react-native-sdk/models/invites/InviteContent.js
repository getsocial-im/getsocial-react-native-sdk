/* eslint-disable max-len */
// @flow

import MediaAttachment from './../MediaAttachment.js';

/**
 * Class to specify custom invite content.
 */
export default class InviteContent {
  text: ?string;
  subject: ?string;
  mediaAttachment: ?MediaAttachment;
  linkParams: {[key: string] : string} = {};

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON() {
      return {text: this.text, subject: this.subject, mediaAttachment: this.mediaAttachment, linkParams: this.linkParams};
  }
}
