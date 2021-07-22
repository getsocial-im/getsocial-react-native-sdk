/* eslint-disable max-len */
// @flow

import Notification from './Notification.js';
import NotificationContext from './NotificationContext.js';
import NotificationsQuery from './NotificationsQuery.js';
import {GetSocialEventEmitter} from '../../GetSocialEventEmitter.js';
import {Platform, NativeModules} from 'react-native';
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
      const parameters = {windowTitle: (this.windowTitle == null ? null : this.windowTitle), query: JSON.stringify(this.query)};
      GetSocialEventEmitter.removeAllListeners('view_open');
      GetSocialEventEmitter.addListener('view_open', (result) => {
          if (this.onOpenListener != undefined) {
              this.onOpenListener();
          }
      });
      GetSocialEventEmitter.removeAllListeners('view_close');
      GetSocialEventEmitter.addListener('view_close', (result) => {
          if (this.onCloseListener != undefined) {
              this.onCloseListener();
          }
      });
      GetSocialEventEmitter.removeAllListeners('ncview_notificationclick');
      GetSocialEventEmitter.addListener('ncview_notificationclick', (result) => {
          if (this.onNotificationClickListener != undefined) {
              if (Platform.OS === 'ios') {
                  const notification = new Notification(JSON.parse(result['notification']));
                  const context = new NotificationContext(JSON.parse(result['context']));
                  this.onNotificationClickListener(notification, context);
              }
              if (Platform.OS === 'android') {
                  const obj = JSON.parse(result);
                  const notification = new Notification(obj['notification']);
                  const context = new NotificationContext(obj['context']);
                  this.onNotificationClickListener(notification, context);
              }
          }
      });
      RNGetSocial.showView('ncView', parameters);
  }
}
