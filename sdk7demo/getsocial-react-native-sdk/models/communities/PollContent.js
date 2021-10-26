/* eslint-disable max-len */
// @flow

import PollOptionContent from './PollOptionContent.js';

/**
 * PollContent object.
 */
export default class PollContent {
  allowMultipleVotes: boolean = false;
  endDate: number = 0;
  options: Array<PollOptionContent> = [];

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {allowMultipleVotes: this.allowMultipleVotes, endDate: this.endDate, options: this.options};
  }
}
