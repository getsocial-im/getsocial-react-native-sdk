/* eslint-disable max-len */
// @flow
import JSONBridge from './utils/JSONBridge.js';
import PagingQuery from './models/PagingQuery.js';
import PagingResult from './models/PagingResult.js';
import Notification from './models/notifications/Notification.js';
import NotificationContent from './models/notifications/NotificationContent.js';
import NotificationContext from './models/notifications/NotificationContext.js';
import NotificationsQuery from './models/notifications/NotificationsQuery.js';
import SendNotificationTarget from './models/notifications/SendNotificationTarget.js';

/**
 * Notification interface of GetSocial plugin.
 */
export default class Notifications {
    /**
     * Call this method to register for push notifications.
     */
    static registerDevice() {
        JSONBridge.registerDevice();
    }

    /**
     * Set a notification listener, you can handle notification while application is in foreground.
     *
     * @param {function} listener An object that will be notified with received notification.
     */
    static setOnNotificationReceivedListener(listener: (notification : Notification) => void) {
        JSONBridge.setOnNotificationReceivedListener(listener);
    }

    /**
     * Set a notification listener, you can handle a click on notification in {@link OnNotificationClickedListener#onNotificationClicked(Notification, NotificationContext)} method.
     *
     * @param {function} listener An object that will be notified with clicked notification.
     */
    static setOnNotificationClickedListener(listener: (notification : Notification, context: NotificationContext) => void) {
        JSONBridge.setOnNotificationClickedListener(listener);
    }

    /**
     * Set a listener to be called when Push Notifications token obtained by GetSocial.
     *
     * @param {function} listener An object that will be notified with push token.
     */
    static setOnTokenReceivedListener(listener: (token: string) => void) {
        JSONBridge.setOnTokenReceivedListener(listener);
    }

    /**
     * Checks if push notifications are enabled or not.
     * @return {Promise<boolean>} True, if push notifications are enabled, otherwise false.
     */
    static arePushNotificationsEnabled(): Promise<boolean> {
        return JSONBridge.arePushNotificationsEnabled();
    }

    /**
     * Enables or disables push notifications for current user.
     * @param {boolean} enabled
     * @return {void} Called when operation finished.
     */
    static setPushNotificationsEnabled(enabled: boolean): Promise<void> {
        return JSONBridge.setPushNotificationsEnabled(enabled);
    }

    /**
     * Returns notifications based on the provided query.
     * @param {NotificationsPagingQuery} query to use to filter notifications.
     * @return {Promise<[Notification]>} List of notifications based on the query.
     */
    static get(query: PagingQuery<NotificationsQuery>): Promise<PagingResult<Notification>> {
        return JSONBridge.getNotifications(query);
    }

    /**
     * Returns number of notifications based on the provided query.
     * @param {NotificationsCountQuery} query to use to filter notifications.
     * @return {Promise<number>} Number of notifications based on the query.
     */
    static getCount(query: NotificationsQuery): Promise<number> {
        return JSONBridge.getNotificationsCount(query);
    }

    /**
     * Sends the provided notification content to the recipients.
     * @param {NotificationContent} content Content of push notification.
     * @param {SendNotificationTarget} target List of recipients.
     * @return {Promise<NotificationsSummary>} Summary of sending notifications.
     */
    static send(content: NotificationContent, target: SendNotificationTarget): Promise<void> {
        return JSONBridge.sendNotification(content, target);
    }

    /**
     * Updates notification status.
     * @param {string} status New status.
     * @param {[string]} notificationIds Notifications to be updated.
     * @return {Promise<boolean>} Called when operation finished.
     */
    static setStatus(status: string, notificationIds: [string]): Promise<void> {
        return JSONBridge.setNotificationsStatus(status, notificationIds);
    }
}
