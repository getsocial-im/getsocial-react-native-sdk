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
  toJSON(): string {
    return '{' +
      '"text":' + (this.text == undefined ? 'null' : '"' + this.text + '"') + ',' +
      '"title": ' + (this.title == undefined ? 'null' : '"' + this.title + '"')  + ',' +
      '"mediaAttachment": ' + (this.mediaAttachment == null ? 'null' : this.mediaAttachment.toJSON()) + ',' +
      '"templateName": ' + (this.templateName == null ? 'null' : '"' + this.templateName + '"') + ',' +
      '"templatePlaceholders": ' + (this.templatePlaceholders == null ? 'null' : JSON.stringify(this.templatePlaceholders)) + ',' +
      '"action": ' + (this.action == null ? 'null' : this.action.toJSON()) + "," +
      '"actionButtons": [' + this.generateActionButtonsMap() + '],' + 
      '"customization": ' + (this.customization == null ? 'null' : this.customization.toJSON()) + ',' +
      '"badge": ' + (this.badge == null ? 'null' : this.badge.toJSON()) +
    '}';
  }

  generateActionButtonsMap(): string {
    var retValue = '';
    this.actionButtons.forEach((actionButton) => {
      retValue += actionButton.toJSON() + ',';
    });
    retValue = retValue.substring(0, retValue.length - 1);
    return retValue;
  }
}