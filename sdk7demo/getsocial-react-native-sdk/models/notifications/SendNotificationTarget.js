/* eslint-disable max-len */
// @flow

import UserIdList from '../UserIdList';

/**
 * SendNotificationTarget object.
 */
export default class SendNotificationTarget {
    userIdList: ?UserIdList;
    placeholders: Array<string> = [];

    /**
   * Create a new notification target.
   *
   * @return {SendNotificationTarget} new instance.
   */
    static create(): SendNotificationTarget {
        return new SendNotificationTarget();
    }

    /**
   * Create a new notification target with list of users.
   *
   * @param {UserIdList} userIdList list of user to receive notification.
   * @return {SendNotificationTarget} new instance.
   */
    static usersWithIds(userIdList: UserIdList): SendNotificationTarget {
        const object = new SendNotificationTarget();
        object.userIdList = userIdList;
        return object;
    }

    /**
   * Add a placeholder.
   *
   * @param {string} placeholder one of {@link SendNotificationPlaceholders.Receivers}.
   * @return {SendNotificationTarget} same instance for methods chaining.
   */
    addReceiverPlaceholder(placeholder: string): SendNotificationTarget {
        this.placeholders.push(placeholder);
        return this;
    }

    /**
    * Generates JSON string.
    * @return {string} object as json.
    */
    toJSON() {
        return {placeholderIds: this.placeholders, userIdList: this.userIdList ?? null};
    }
}
