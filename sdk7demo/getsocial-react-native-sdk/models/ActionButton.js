// @flow

/**
 * ActionButton class.
 */
export default class ActionButton {
  static CONSUME_ACTION = 'consume';
  static IGNORE_ACTION = 'ignore';

  actionId: string
  title: string

  /**
   * Creates a new ActionButton instance from the provider parameters.
   * @param {any} actionButtonMap action button parameters
   */
  constructor(actionButtonMap: any) {
    this.actionId = actionButtonMap['ACTION_ID'];
    this.title = actionButtonMap['TITLE'];
  }

  /**
   * Creates a new ActionButton instance with the provided parameters.
   * @param {string} title Title of the button.
   * @param {string} actionId Action id assigned to the button.
   * @return {ActionButton} new ActionButton instance.
   */
  static create(title: string, actionId: string): ActionButton {
    return new ActionButton({'ACTION_ID': actionId, 'TITLE': title});
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON(): string {
    return JSON.stringify({
      'ACTION_ID': this.actionId,
      'TITLE': this.title,
    });
  }
}
