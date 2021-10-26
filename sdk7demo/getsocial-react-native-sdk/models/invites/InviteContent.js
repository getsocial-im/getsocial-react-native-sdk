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
      return {linkParams: this.linkParams, mediaAttachment: this.mediaAttachment ?? null, subject: this.subject ?? null, text: this.text ?? null};
  }
}
