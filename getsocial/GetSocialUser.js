/* eslint-disable max-len */
// @flow

import {NativeModules} from 'react-native';
import {GetSocialEventEmitter} from './GetSocialEventEmitter.js';
import ConflictUser from './models/ConflictUser.js';
import AuthIdentity from './models/AuthIdentity.js';
import SuggestedFriend from './models/SuggestedFriend.js';
import PublicUser from './models/PublicUser.js';
import Notification from './models/Notification.js';
import NotificationContent from './models/NotificationContent.js';
import NotificationsQuery from './models/NotificationsQuery.js';
import NotificationsCountQuery from './models/NotificationsCountQuery.js';
import NotificationsSummary from './models/NotificationsSummary.js';

const {RNGetSocial} = NativeModules;

/**
  GetSocialUser class.
 */
export default class GetSocialUser {
  // User Management section

  /**
    Notifies listener when user changed.
    @param {function} onUserChanged listener to be invoked.
   */
  static onUserChanged(onUserChanged: () => void) {
    GetSocialEventEmitter.addListener('onUserChanged', onUserChanged);
  }

  /**
   * Returns if current user has any authentication info attached.
   * @return {bool} true, if user does not have any authentication info attached.
   */
  static isAnonymous(): Promise<bool> {
    return RNGetSocial.isAnonymous();
  }

  /**
  * Returns the id of current user.
  * @return {Promise<string>} : user id.
  */
  static getUserId(): Promise<string> {
    return RNGetSocial.getUserId();
  }

  /**
  * Returns the display name of current user.
  * @return {Promise<string>} : display name.
  */
  static getDisplayName(): Promise<string> {
    return RNGetSocial.getDisplayName();
  }

  /**
  * Sets user's display name.
  * @param {string} displayName: new display name.
  * @return {Promise<void>} called when operation finished.
   */
  static setDisplayName(displayName: string): Promise<void> {
    return RNGetSocial.setDisplayName(displayName);
  }

  /**
  * Returns the avatar URL of current user.
  * @return {Promise<string>} : avatar url.
  */
  static getAvatarUrl(): Promise<?string> {
    return RNGetSocial.getAvatarUrl();
  }

  /**
  * Sets user's avatar.
  * @param {string} avatarUrl: new avatar.
  * @return {Promise<void>} called when operation finished.
   */
  static setAvatarUrl(avatarUrl: string): Promise<void> {
    return RNGetSocial.setAvatarUrl(avatarUrl);
  }

  /**
   * Sets a public property for the user.
   * @param {string} key: Property key.
   * @param {string} value: Property value.
   * @return {Promise} Called when operation finished.
   */
  static setPublicProperty(key: string, value: string): Promise<void> {
    return RNGetSocial.setPublicProperty(key, value);
  }

  /**
   * Sets a private property for the user.
   * @param {string} key: Property key.
   * @param {string} value: Property value.
   * @return {Promise} Called when operation finished.
   */
  static setPrivateProperty(key: string, value: string): Promise<void> {
    return RNGetSocial.setPrivateProperty(key, value);
  }

  /**
   * Checks if user has a public property for the specified key.
   * @param {string} key: Property key.
   * @return {Promise<bool>} Called when operation finished.
   */
  static hasPublicProperty(key: string): Promise<bool> {
    return RNGetSocial.hasPublicProperty(key);
  }

  /**
   * Checks if user has a private property for the specified key.
   * @param {string} key: Property key.
   * @return {Promise<bool>} Called when operation finished.
   */
  static hasPrivateProperty(key: string): Promise<bool> {
    return RNGetSocial.hasPrivateProperty(key);
  }

  /**
   * Returns all public properties of the user.
   * @return {Promise<Map<string, string>>} Called when operation finished.
   */
  static allPublicProperties(): Promise<Map<string, string>> {
    return RNGetSocial.allPublicProperties();
  }

  /**
   * Returns all private properties of the user.
   * @return {Promise<Map<string, string>>} Called when operation finished.
   */
  static allPrivateProperties(): Promise<Map<string, string>> {
    return RNGetSocial.allPrivateProperties();
  }

  /**
   * Gets public property for the specified key.
   * @param {string} key: Property key.
   * @return {Promise<string>} Called when operation finished.
   */
  static getPublicProperty(key: ?string): Promise<string> {
    return RNGetSocial.getPublicProperty(key);
  }

  /**
   * Gets private property for the specified key.
   * @param {string} key: Property key.
   * @return {Promise<string>} Called when operation finished.
   */
  static getPrivateProperty(key: ?string): Promise<string> {
    return RNGetSocial.getPrivateProperty(key);
  }

  /**
   * Removes public property for the specified key.
   * @param {string} key: Property key.
   * @return {Promise<void>} Called when operation finished.
   */
  static removePublicProperty(key: string): Promise<void> {
    return RNGetSocial.removePublicProperty(key);
  }

  /**
   * Removes private property for the specified key.
   * @param {string} key: Property key.
   * @return {Promise<void>} Called when operation finished.
   */
  static removePrivateProperty(key: string): Promise<void> {
    return RNGetSocial.removePrivateProperty(key);
  }

  /**
   * Adds AuthIdentity for the specified provider.
   * @param {AuthIdentity} authIdentity AuthIdentity to be added.
   * @param {function()} onSuccess called when identity successfully added.
   * @param {function(conflictUser: ConflictUser)} onConflict called when identity conflicts with another user.
   * @param {function(error)} onError called when an error occured during adding identity.
   * @return {void} Method simply returns after invoking, check the callbacks for result.
   */
  static addAuthIdentity(authIdentity: AuthIdentity, onSuccess: (() => void), onConflict: ((conflictUser: ConflictUser) => void), onError: (error: string) => void): void {
    return RNGetSocial.addAuthIdentity(JSON.parse(authIdentity.toJSON())).then((conflictUserMap) => {
      if (conflictUserMap == undefined) {
        onSuccess();
      } else {
        const conflictUser = new ConflictUser(conflictUserMap);
        onConflict(conflictUser);
      }
    }, (error) => {
      onError(error);
    });
  }

  /**
   * Switches the current user to the user identified by details provided.
   * @param {AuthIdentity} authIdentity to be switched to.
   * @return {Promise<void>} Called when operation finished.
   */
  static switchUser(authIdentity: AuthIdentity): Promise<void> {
    return RNGetSocial.switchUser(JSON.parse(authIdentity.toJSON()));
  }

  /**
   * Removes AuthIdentity for the specified provider.
   * @param {string} providerId The provider connected to an auth identity on the current user to remove.
   * @return {Promise<void>} Called when operation finished.
   */
  static removeAuthIdentity(providerId: string): Promise<void> {
    return RNGetSocial.removeAuthIdentity(providerId);
  }

  /**
   * Returns all auth identities added to the user. The key is the providerId and the value is the userId
   * used internally by that provider for this user.
   * @return {Promise<Map<string, string>>} All auth identities added to the user or an empty map.
   */
  static getAuthIdentities(): Promise<Map<string, string>> {
    return RNGetSocial.getAuthIdentities().then((authIdentities) => {
      const retValue = new Map();
      Object.getOwnPropertyNames(authIdentities).forEach(function(key) {
        // $FlowFixMe
        retValue[key] = authIdentities[key];
      });
      return retValue;
    });
  }

  /**
    * Add a friend for current user, if operation succeed - they both became friends.
    * If you're trying to add a user, that already is your friend, {@link Callback#onSuccess(Object)} will be called,
    * but user will be added to your friends list only once and your friends count won't be increased.
    *
    * @param {string} userId   Unique user identifier you want to become friend with.
    * @return {Promise<number>} Called when operation finished, returns current number of friends.
    */
  static addFriend(userId: string): Promise<number> {
    return RNGetSocial.addFriend(userId);
  }

  /**
    * Add a list of users to the list of current user friends.
    * This method can be used to import external social graph data to GetSocial.
    *
    * @param {string} providerId      A auth identity provider id for which user ids will be provided. Can be "facebook", or any custom value.
    * @param {string} providerUserIds A list of user ids on the selected identity provider that need to be added to the current user's friends list.
    * @return {Promise<number>} Called when operation finished, returns current number of friends.
    */
  static addFriendsByAuthIdentities(providerId: string, providerUserIds: [string]): Promise<number> {
    return RNGetSocial.addFriendsByAuthIdentities(providerId, providerUserIds);
  }

  /**
    * Remove a user from friends list.
    * If you're trying to remove a user, that is not your friend, your friends count won't be decreased.
    *
    * @param {string} userId   Unique user identifier you don't want to be friends anymore.
    * @return {Promise<number>} Called when operation finished, returns current number of friends.
    */
  static removeFriend(userId: string): Promise<number> {
    return RNGetSocial.removeFriend(userId);
  }

  /**
    * Remove a list of users for list of current user's friends.
    *
    * @param {string} providerId      A auth identity provider id for which user ids will be provided. Can be "facebook", or any custom value.
    * @param {string} providerUserIds A list of user ids on the selected identity provider that need to be removed from the current user's friends list.
    * @return {Promise<number>} Called when operation finished, returns current number of friends.
    */
  static removeFriendsByAuthIdentities(providerId: string, providerUserIds: [string]): Promise<number> {
    return RNGetSocial.removeFriendsByAuthIdentities(providerId, providerUserIds);
  }

  /**
    * Replace existing friends with the provided list of users.
    *
    * @param {[string] }userIds List of GetSocial user identifiers.
    * @return {Promise<void>} Called when operation finished.
    */
  static setFriends(userIds: [string]): Promise<void> {
    return RNGetSocial.setFriends(userIds);
  }

  /**
    * Replace existing friends with the provided list of users.
    *
    * @param {string} providerId An auth identity provider id for which user ids will be provided. Can be "facebook", or any custom value.
    * @param {[string]} providerUserIds A list of user ids on the selected identity provider that will be set as the current user's friends list.
    * @return {Promise<void>} Called when operation finished.
    */
  static setFriendsByAuthIdentities(providerId: string, providerUserIds: [string]): Promise<void> {
    return RNGetSocial.setFriendsByAuthIdentities(providerId, providerUserIds);
  }

  /**
    * Check if user is your friend.
    *
    * @param {string} userId   Unique user identifier.
    * @return {Promise<boolean>} Called when operation finished.
    */
  static isFriend(userId: string): Promise<boolean> {
    return RNGetSocial.isFriend(userId);
  }

  /**
    * Get count of friends.
    *
    * @return {Promise<boolean>} Called when operation finished with number of friends.
    */
  static getFriendsCount(): Promise<number> {
    return RNGetSocial.getFriendsCount();
  }

  /**
    * Get a list of friends for current user.
    *
    * @param {number} offset   Position from which start.
    * @param {number} limit    Limit of users.
    * @return {Promise<[PublicUser]>} Called when operation finished with list of friends.
    */
  static getFriends(offset: number, limit: number): Promise<[PublicUser]> {
    return RNGetSocial.getFriends(offset, limit).then((friendsArray) => {
      return friendsArray.map((friendMap) => {
        return new PublicUser(friendMap);
      });
    });
  }

  /**
    * Get a list of suggested friends for current user.
    *
    * @param {number} offset   Position from which start.
    * @param {number} limit    Limit of users.
    * @return {Promise<[SuggestedFriend]>} Called when operation finished with list of suggested friends.
    */
  static getSuggestedFriends(offset: number, limit: number): Promise<[SuggestedFriend]> {
    return RNGetSocial.getSuggestedFriends(offset, limit).then((suggestedFriendsArray) => {
      return suggestedFriendsArray.map((suggestedFriendMap) => {
        return new SuggestedFriend(suggestedFriendMap);
      });
    });
  }

  /**
   * Reset current user and create new anonymous one.
   * @return {Promise<void>} Called when operation finished.
   */
  static reset(): Promise<void> {
    return RNGetSocial.resetUser();
  }

  // Push Notifications

  /**
   * Checks if push notifications are enabled or not.
   * @return {Promise<boolean>} True, if push notifications are enabled, otherwise false.
   */
  static isPushNotificationsEnabled(): Promise<boolean> {
    return RNGetSocial.isPushNotificationsEnabled();
  }

  /**
   * Enables push notifications for current user.
   * @return {Promise<boolean>} Called when operation finished.
   */
  static enablePushNotifications(): Promise<boolean> {
    return RNGetSocial.enablePushNotifications();
  }

  /**
   * Disabled push notifications for current user.
   * @return {Promise<boolean>} Called when operation finished.
   */
  static disablePushNotifications(): Promise<boolean> {
    return RNGetSocial.disablePushNotifications();
  }

  /**
   * Returns notifications based on the provided query.
   * @param {NotificationsQuery} query to use to filter notifications.
   * @return {Promise<[Notification]>} List of notifications based on the query.
   */
  static getNotifications(query: NotificationsQuery): Promise<[Notification]> {
    return RNGetSocial.getNotifications(JSON.parse(query.toJSON())).then((notificationsArray) => {
      return notificationsArray.map((notificationMap) => {
        return new Notification(notificationMap);
      });
    });
  }

  /**
   * Returns number of notifications based on the provided query.
   * @param {NotificationsCountQuery} query to use to filter notifications.
   * @return {Promise<number>} Number of notifications based on the query.
   */
  static getNotificationsCount(query: NotificationsCountQuery): Promise<number> {
    return RNGetSocial.getNotificationsCount(JSON.parse(query.toJSON()));
  }

  /**
   * Sends the provided notification content to the recipients.
   * @param {string[]} recipients List of GetSocial id of recipients.
   * @param {NotificationContent} content Content of push notification.
   * @return {Promise<NotificationsSummary>} Summary of sending notifications.
   */
  static sendNotification(recipients: string[], content: NotificationContent): Promise<NotificationsSummary> {
    return RNGetSocial.sendNotification(recipients, JSON.parse(content.toJSON())).then((summaryMap) => {
      return new NotificationsSummary(summaryMap);
    });
  }

  /**
   * Updates notification status.
   * @param {[string]} notificationIds Notifications to be updated.
   * @param {string} status New status.
   * @return {Promise<boolean>} Called when operation finished.
   */
  static setNotificationsStatus(notificationIds: [string], status: string): Promise<boolean> {
    return RNGetSocial.setNotificationsStatus(notificationIds, status);
  }
}
