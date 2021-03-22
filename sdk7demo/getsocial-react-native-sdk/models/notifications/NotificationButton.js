/* eslint-disable max-len */
// @flow

/**
 * NotificationButton object.
 */
export default class NotificationButton {
  actionId: string;
  title: string;

  /**
   * Create a new notification button.
   *
   * @param {string} title title of the button.
   * @param {string} actionId ID of action. Could be one {@link #CONSUME_ACTION}, {@link #IGNORE_ACTION} or custom action.
   * @return {NotificationButton} new instance.
   */
  static create(title: string, actionId: string): NotificationButton {
      const instance = new NotificationButton([]);
      instance.title = title;
      instance.actionId = actionId;
      return instance;
  }

  /**
   * Creates a new Notification instance from the provider parameters.
   * @param {any} buttonMap notification parameters
   */
  constructor(buttonMap: any) {
      this.actionId = buttonMap['actionId'];
      this.title = buttonMap['title'];
  }
}
