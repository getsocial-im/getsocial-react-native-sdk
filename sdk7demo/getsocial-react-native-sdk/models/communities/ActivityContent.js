/* eslint-disable max-len */
// @flow

import MediaAttachment from './../MediaAttachment.js';
import ActivityButton from './ActivityButton.js';

/**
 * ActivityContent object.
 */
export default class ActivityContent {
  text: ?string;
  attachments: Array<MediaAttachment> = [];
  button: ?ActivityButton;
  properties: {[key: string] : string} = {};

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON(): string {
    let json = '{' +
      '"text": ' + (this.text == undefined ? 'null' : '"' + this.text + '"') + ', ' +
      '"button":' + (this.button == undefined ? 'null' : this.button.toJSON()) + ', ' +
      '"properties":' + JSON.stringify(this.properties);

    if (this.attachments.length != 0) {
      json += ', "attachments": [ ';
      this.attachments.forEach((attachment) => {
        json += attachment.toJSON();
        json += ',';
      });
      json = json.substring(0, json.length - 1);
      json += ']';
    }
    json += '}';
    return json;
  }
}
