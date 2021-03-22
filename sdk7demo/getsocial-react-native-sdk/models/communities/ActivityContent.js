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
}
