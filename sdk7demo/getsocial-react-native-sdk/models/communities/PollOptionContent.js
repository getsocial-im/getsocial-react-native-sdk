/* eslint-disable max-len */
// @flow

import MediaAttachment from './../MediaAttachment.js';

/**
 * PollOptionContent object.
 */
export default class PollOptionContent {
  optionId: ?string;
  text: ?string;
  attachment: ?MediaAttachment;

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {optionId: this.optionId, text: this.text, attachment: this.attachment};
  }
}
