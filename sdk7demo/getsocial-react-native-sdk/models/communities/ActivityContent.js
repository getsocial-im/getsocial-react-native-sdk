/* eslint-disable max-len */
// @flow

import MediaAttachment from './../MediaAttachment.js';
import ActivityButton from './ActivityButton.js';
import PollContent from './PollContent.js';

/**
 * ActivityContent object.
 */
export default class ActivityContent {
  text: ?string;
  attachments: Array<MediaAttachment> = [];
  button: ?ActivityButton;
  properties: {[key: string] : string} = {};
  poll: ?PollContent;

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {attachments: this.attachments, button: this.button ?? null, poll: this.poll ?? null,
          properties: this.properties, text: this.text ?? null};
  }
}
