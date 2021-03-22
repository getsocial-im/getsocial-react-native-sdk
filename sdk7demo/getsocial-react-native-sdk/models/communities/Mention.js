// @flow

/**
 * Mention object.
 */
export default class Mention {
  userId: string;
  type: string;
  startIndex: number;
  endIndex: number;

  /**
   * Creates a new Mention instance from the provider parameters.
   * @param {any} mentionMap reaction parameters
   */
  constructor(mentionMap: any) {
      this.userId = mentionMap['userId'];
      this.type = mentionMap['type'];
      this.startIndex = mentionMap['startIndex'];
      this.endIndex = mentionMap['endIndex'];
      Object.freeze(this);
  }
}
