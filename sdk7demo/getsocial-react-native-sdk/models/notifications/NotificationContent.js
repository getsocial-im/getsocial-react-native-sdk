/* eslint-disable */
// @flow

import NotificationButton from './NotificationButton.js';
import NotificationBadge from './NotificationBadge.js';
import NotificationCustomization from './NotificationCustomization.js';
import MediaAttachment from './../MediaAttachment.js';
import Action from './../actions/Action.js';

/**
 * NotificationContent class.
 */
export default class NotificationContent {
  text: ?string;
  title: ?string;
  mediaAttachment: ?MediaAttachment;
  templateName: ?string;
  templatePlaceholders: {[key: string] : string} = {};
  action: ?Action;
  actionButtons: Array<NotificationButton> = [];
  customization: ?NotificationCustomization;
  badge: ?NotificationBadge;

  /**
   * Creates a new NotificationContent instance.
   * @param {string} text notification text.
   * @return {NotificationContent} new NotificationContent instance.
   */
  static withText(text: string): NotificationContent {
    const nc = new NotificationContent();
    nc.text = text;
    return nc;
  }

  /**
   * Creates a new NotificationContent instance from the template configured on the GetSocial Dashboard.
   * @param {string} templateName name of the template on the GetSocial Dashboard. Case-sensitive.
   * @return {NotificationContent} new NotificationContent instance.
   */
  static withTemplate(templateName: string): NotificationContent {
    const nc = new NotificationContent();
    nc.templateName = templateName;
    return nc;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
    return {text: this.text, title: this.title, mediaAttachment: this.mediaAttachment, templateName: this.templateName, templatePlaceholders: this.templatePlaceholders,
      action: this.action, actionButtons: this.actionButtons, customization: this.customization, badge: this.badge};
  }
}