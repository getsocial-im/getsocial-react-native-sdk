// @flow

import Action from './../actions/Action.js';

/**
 * ActivityButton object.
 */
export default class ActivityButton {
  title: string;
  action: Action;

  /**
   * Create a new ActivityButton instance.
   * @param {string} title Button title.
   * @param {Action} action Button action.
   * @return {ActivityButton} New instance.
   */
  static create(title: string, action: Action): ActivityButton {
      return new ActivityButton({'title': title, 'action': action});
  }

  /**
   * Creates a new ActivityButton instance from the provider parameters.
   * @param {any} activityButtonMap activity button parameters
   */
  constructor(activityButtonMap: any) {
      this.title = activityButtonMap['title'];
      const rawAction = activityButtonMap['action'];
      if (rawAction !== undefined && rawAction != null) {
          this.action = new Action(rawAction);
      }
      Object.freeze(this);
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {action: this.action ?? null, title: this.title ?? null};
  }
}
