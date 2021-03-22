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
}
