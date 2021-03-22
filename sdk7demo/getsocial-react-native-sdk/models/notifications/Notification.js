/* eslint-disable max-len */
// @flow

import Action from './../actions/Action.js';
import NotificationButton from './NotificationButton.js';
import NotificationCustomization from './NotificationCustomization.js';
import User from './../communities/User.js';
import MediaAttachment from './../MediaAttachment.js';

/**
 * Notification class.
 */
export default class Notification {
  id: string
  status: string
  type: string
  createdAt: number
  title: string
  text: string
  action: Action
  actionButtons: Array<NotificationButton> = []
  mediaAttachment: ?MediaAttachment
  sender: User
  customization: ?NotificationCustomization

  /**
   * Creates a new Notification instance from the provider parameters.
   * @param {any} notificationMap notification parameters
   */
  constructor(notificationMap: any) {
      this.id = notificationMap['id'];
      this.status = notificationMap['status'];
      this.type = notificationMap['type'];
      this.createdAt = notificationMap['createdAt'];
      this.title = notificationMap['title'];
      this.text = notificationMap['text'];
      const actionMap = notificationMap['action'];
      if (actionMap != null) {
          this.action = new Action(actionMap);
      }
      this.actionButtons = [];
      const notificationsButtonsArray = notificationMap['actionButtons'];
      if (notificationsButtonsArray != undefined) {
          notificationsButtonsArray.forEach((notificationButtonMap) => {
              const button = new NotificationButton(notificationButtonMap);
              this.actionButtons.push(button);
          });
      }
      if (notificationMap['mediaAttachment'] != undefined) {
          this.mediaAttachment = new MediaAttachment(notificationMap['mediaAttachment']);
      }
      const senderMap = notificationMap['sender'];
      if (senderMap != null) {
          this.sender = new User(senderMap);
      }
      this.customization = notificationMap['customization'];
  }
}
