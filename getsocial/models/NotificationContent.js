/* eslint-disable */
// @flow

import {mapToObjJSON} from './../utils/Utils.js';
import ActionButton from './ActionButton.js';
import MediaAttachment from './MediaAttachment.js';
import Action from './Action.js';
import {NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

/**
 * NotificationContent class.
 */
export default class NotificationContent {
  #text: ?string;
  #title: ?string;
  #mediaAttachment: ?MediaAttachment;
  #templateName: ?string;
  #templatePlaceholders: Map<string, string> = new Map();
  #action: ?Action;
  #actionButtons: Array<ActionButton> = [];

  /**
   * Creates a new NotificationContent instance.
   * @param {string} text notification text.
   * @return {NotificationContent} new NotificationContent instance.
   */
  static withText(text: string): NotificationContent {
    const nc = new NotificationContent();
    nc.#text = text;
    return nc;
  }

  /**
   * Creates a new NotificationContent instance from the template configured on the GetSocial Dashboard.
   * @param {string} templateName name of the template on the GetSocial Dashboard. Case-sensitive.
   * @return {NotificationContent} new NotificationContent instance.
   */
  static withTemplate(templateName: string): NotificationContent {
    const nc = new NotificationContent();
    nc.#templateName = templateName;
    return nc;
  }

  /**
   * Sets a notification action.
   * @param {Action} action notification action to perform.
   * @return {NotificationContent} updated NotificationContent instance.
   */
  withAction(action: Action): NotificationContent {
    this.#action = action;
    return this;
  }

  /**
   * Set notification title. If you use template, your title will be overriden by this.
   * @param {string} title notification title.
   * @return {NotificationContent} updated NotificationContent instance.
   */
  withTitle(title: string): NotificationContent {
    this.#title = title;
    return this;
  }

  /**
   * Sets a notification action.
   * Set notification text. If you use template, your text will be overriden by this.
   * @param {string} text notification text.
   * @return {NotificationContent} updated NotificationContent instance.
   */
  withText(text: string): NotificationContent {
    this.#text = text;
    return this;
  }

  /**
   * Set template name. Notification will use values from the GetSocial Dashboard as title and text.
   * But {@link #withTitle(string)} or {@link #withText(string)} have higher priority and will override template values.
   * @param {string} templateName name of the template on the dashboard. Case-sensitive.
   * @return {NotificationContent} updated NotificationContent instance.
   */
  withTemplateName(templateName: string): NotificationContent {
    this.#templateName = templateName;
    return this;
  }

  /**
   * If you specified placeholders on the GetSocial Dashboard for your template title or text - you can replace it using this method.
   * For example, if your template text it "Hello,  [USERNAME].", call notificationContent.addTemplatePlaceholder("USERNAME", "My actual name").
   * Brackets should be omitted in key.
   * Won't make any effect without template name.
   * @param {string} placeholder placeholder on the GetSocial Dashboard.
   * @param {string} replacementValue actual text that should be used instead.
   * @return {NotificationContent} updated NotificationContent instance.
   */
  addTemplatePlaceholder(placeholder: string, replacementValue: string): NotificationContent {
    this.#templatePlaceholders.set(placeholder, replacementValue);
    return this;
  }

  /**
   * Add all keys and values from map to template placeholders.
   * @param {Map<string, string>} placeholders template placeholders map.
   * @return {NotificationContent} updated NotificationContent instance.
   */
  addTemplatePlaceholders(placeholders: Map<string, string>): NotificationContent {
    const newMap = new Map([...this.#templatePlaceholders, ...placeholders]);
    this.#templatePlaceholders = newMap;
    return this;
  }

  /**
   * Attach media(image, video) to notification.
   * @param {MediaAttachment} mediaAttachment media attachment.
   * @return {NotificationContent} updated NotificationContent instance.
   */
  withMediaAttachment(mediaAttachment: MediaAttachment): NotificationContent {
    this.#mediaAttachment = mediaAttachment;
    return this;
  }

  /**
   * Attach action button to notifications.
   * @param {ActionButton} actionButton action button to show.
   * @return {NotificationContent} updated NotificationContent instance.
   */
  addActionButton(actionButton: ActionButton): NotificationContent {
    this.#actionButtons.push(actionButton);
    return this;
  }

  /**
   * Attach action buttons to notifications.
   * @param {[ActionButton]} actionButtons action button to show.
   * @return {NotificationContent} updated NotificationContent instance.
   */
  addActionButtons(actionButtons: [ActionButton]): NotificationContent {
    this.#actionButtons.push(...actionButtons);
    return this;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON(): string {
    return JSON.stringify({
      'TEXT': this.#text,
      'TITLE': this.#title,
      'MEDIA_ATTACHMENT': this.#mediaAttachment == null ? null : JSON.parse(this.#mediaAttachment.toJSON()),
      'TEMPLATE_NAME': this.#templateName,
      'TEMPLATE_PLACEHOLDERS': this.#templatePlaceholders == null ? null : JSON.parse(mapToObjJSON(this.#templatePlaceholders)),
      'ACTION': this.#action == null ? null : JSON.parse(this.#action.toJSON()),
      'ACTION_BUTTONS': this.#actionButtons.map((actionButton) => JSON.parse(actionButton.toJSON())),
    });
  }

  static Placeholders = {
    SENDER_DISPLAY_NAME: RNGetSocial.NOTIFICATION_SENDER_DISPLAY_NAME,
    RECEIVER_DISPLAY_NAME: RNGetSocial.NOTIFICATION_RECEIVER_DISPLAY_NAME,
  }
}
