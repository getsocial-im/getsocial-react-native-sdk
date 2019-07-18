/* eslint-disable max-len */
// @flow

import {NativeModules} from 'react-native';
import Notification from './Notification.js';
import ActionButton from './ActionButton.js';
import {GetSocialEventEmitter} from './../GetSocialEventEmitter.js';
const {RNGetSocial} = NativeModules;

/**
  Notification center view.
 */
export default class NotificationCenterView {
  #windowTitle;
  #typesFilter;
  #actionsFilter;
  #notificationClickHandler;
  #actionButtonClickHandler;

  /**
   * Set custom window title.
   * @param {string} windowTitle title.
   * @return {NotificationCenterView} modified instance.
   */
  withCustomWindowTitle(windowTitle: ?string): NotificationCenterView {
    this.#windowTitle = windowTitle;
    return this;
  }

  /**
   * Sets filter for notification types.
   * @param {[string]} types filter for types.
   * @return {NotificationCenterView} modified instance
   */
  setFilterByTypes(types: [string]): NotificationCenterView {
    return this;
  }

  /**
   * Sets filter for notification actions.
   * @param {[string]} actions filter for actions.
   * @return {NotificationCenterView} modified instance
   */
  setFilterByActions(actions: [string]): NotificationCenterView {
    return this;
  }

  /**
   * Sets a listener to be invoked if a notification is clicked on the UI.
   * @param {void} onNotificationClicked listener to be invoked.
   * @return {NotificationCenterView} updated instance.
   */
  setNotificationClickListener(onNotificationClicked: ((notification: Notification) => void)): NotificationCenterView {
    GetSocialEventEmitter.removeAllListeners('NotificationUINotificationClickedEvent');
    GetSocialEventEmitter.addListener('NotificationUINotificationClickedEvent', (notificationMap) => {
      onNotificationClicked(new Notification(notificationMap));
    });
    this.#notificationClickHandler = true;
    return this;
  }

  /**
   * Sets a listener to be invoked if an action button in a notification is clicked on the UI.
   * @param {void} onNotificationActionButtonClicked listener to be invoked.
   * @return {NotificationCenterView} updated instance.
   */
  setActionButtonClickListener(onNotificationActionButtonClicked: ((actionButton: ActionButton, notification: Notification) => void)): NotificationCenterView {
    GetSocialEventEmitter.removeAllListeners('NotificationUIActionButtonClickedEvent');
    GetSocialEventEmitter.addListener('NotificationUIActionButtonClickedEvent', (eventMap) => {
      onNotificationActionButtonClicked(new ActionButton(eventMap['ACTION_BUTTON']), new Notification(eventMap['NOTIFICATION']));
    });
    this.#actionButtonClickHandler = true;
    return this;
  }

  /**
   * Shows the notification center view.
   * @return {void} void.
   */
  show(): void {
    const handlers = {};
    if (this.#notificationClickHandler == true) {
      handlers['NOTIFICATION_CLICK_HANDLER'] = true;
    }
    if (this.#actionButtonClickHandler == true) {
      handlers['ACTIONBUTTON_CLICK_HANDLER'] = true;
    }
    return RNGetSocial.showNotificationCenterView(this.#windowTitle, this.#typesFilter, this.#actionsFilter, handlers);
  }
}
