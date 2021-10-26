/* eslint-disable max-len */
// @flow

import MediaAttachment from './../MediaAttachment.js';

/**
 * ChatMessageContent object.
 */
export default class ChatMessageContent {
  text: ?string;
  attachments: Array<MediaAttachment> = [];
  properties: {[key: string] : string} = {};

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {attachments: this.attachments, properties: this.properties, text: this.text ?? null};
  }
}
