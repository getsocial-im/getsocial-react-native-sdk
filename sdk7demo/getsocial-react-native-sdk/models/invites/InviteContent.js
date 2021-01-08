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
  toJSON(): string {
    return '{' +
      '"text":' + (this.text == undefined ? 'null' : '"' + this.text + '"') + ',' +
      '"subject":' + (this.subject == undefined ? 'null' : '"' + this.subject + '"') + ',' +
      '"mediaAttachment":' + (this.mediaAttachment == undefined ? 'null' : this.mediaAttachment.toJSON()) + ',' +
      '"linkParams":' + (this.linkParams == undefined ? 'null' : JSON.stringify(this.linkParams)) +
    '}';
  }
}
