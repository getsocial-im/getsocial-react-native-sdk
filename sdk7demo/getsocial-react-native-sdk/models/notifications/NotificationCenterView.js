/* eslint-disable max-len */
// @flow

import Notification from './Notification.js';
import NotificationContext from './NotificationContext.js';
import NotificationsQuery from './NotificationsQuery.js';
import {GetSocialEventEmitter} from '../../GetSocialEventEmitter.js';
import {NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

/**
  Notification center view.
 */
export default class NotificationCenterView {
  windowTitle: ?string
  query: ?NotificationsQuery
  onOpenListener: ?(() => void);
  onCloseListener: ?(() => void);
  onNotificationClickListener: ?((notification: Notification, context: NotificationContext) => void);

  /**
    * Creates NotificationCenterView to show notifications based on {query} parameter.
    * @param {NotificationsQuery} query Defines which notifications will be shown.
    * @return {NotificationCenterView} View instance.
    */
  static create(query: NotificationsQuery): NotificationCenterView {
    const obj = new NotificationCenterView();
    obj.query = query;
    return obj;
  }

  /**
   * Shows the notification center view.
   * @return {void} void.
   */
  show(): void {
    const parameters = {
      'windowTitle': (this.windowTitle == undefined ? '' : this.windowTitle),
      'query': (this.query == undefined ? '' : this.query.toJSON()),
    };
    if (this.onOpenListener != undefined) {
      GetSocialEventEmitter.removeAllListeners('view_open');
      GetSocialEventEmitter.addListener('view_open', (result) => {
        if (this.onOpenListener != undefined) {
          this.onOpenListener();
        }
      });
    }
    if (this.onCloseListener != undefined) {
      GetSocialEventEmitter.removeAllListeners('view_close');
      GetSocialEventEmitter.addListener('view_close', (result) => {
        if (this.onCloseListener != undefined) {
          this.onCloseListener();
        }
      });
    }
    if (this.onNotificationClickListener != undefined) {
      GetSocialEventEmitter.removeAllListeners('ncview_notificationclick');
      GetSocialEventEmitter.addListener('ncview_notificationclick', (result) => {
      });
    }
    RNGetSocial.showView('ncView', parameters);
  }
}
