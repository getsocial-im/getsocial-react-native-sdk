// @flow

import MediaAttachment from './../MediaAttachment.js';

/**
 * PollOption object.
 */
export default class PollOption {
  optionId: string;
  text: ?string;
  attachment: ?MediaAttachment;
  voteCount: number;
  isVotedByMe: boolean;

  /**
   * Creates a new PollOption instance from the provided parameters.
   * @param {any} optionMap option parameters
   */
  constructor(optionMap: any) {
      this.optionId = optionMap['optionId'];
      this.text = optionMap['text'];
      this.voteCount = optionMap['voteCount'];
      this.isVotedByMe = optionMap['isVotedByMe'] === true;
      const rawAttachment = optionMap['attachment'];
      if (rawAttachment !== undefined && rawAttachment != null) {
          const attachment = new MediaAttachment(rawAttachment);
          this.attachment = attachment;
      }
      Object.freeze(this);
  }
}
