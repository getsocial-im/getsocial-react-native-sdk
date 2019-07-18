/* eslint-disable max-len */
// @flow

import {NativeModules} from 'react-native';
import {GetSocialEventEmitter} from './GetSocialEventEmitter.js';
import {mapToObjJSON} from './utils/Utils.js';
import CustomInviteContent from './models/CustomInviteContent.js';
import InviteChannel from './models/InviteChannel.js';
import ReferralData from './models/ReferralData.js';
import ReferredUser from './models/ReferredUser.js';
import PublicUser from './models/PublicUser.js';
import UsersQuery from './models/UsersQuery.js';
import UserReference from './models/UserReference.js';
import Notification from './models/Notification.js';
import Action from "./models/Action.js";

const {RNGetSocial} = NativeModules;

/**
 * Main interface of GetSocial plugin.
 */
export default class GetSocial {
  // Core section

  /**
   * Initializes the SDK, App Id will be taken from .plist or .gradle files.
   * Use whenInitialized method to get notified when initialization finished.
   */
  static init() {
    RNGetSocial.init();
  }

  /**
   * Initializes the SDK.
   * Use whenInitialized event with GetSocialEventEmitter to get notified when initialization finished.
   * @param {string} appid, as it is on GetSocial Dashboard.
   */
  static initWithAppId(appid: string) {
    RNGetSocial.initWithAppId(appid);
  }

  /**
    Notifies callers when SDK finished initialization.
    @param {function} onInit function to be invoked.
   */
  static whenInitialized(onInit: () => void) {
    GetSocialEventEmitter.addListener('whenInitialized', onInit);
  }

  /**
   * Returns if SDK is initialized or not.
   * @return {boolean} true, if initialized, otherwise false.
   */
  static isInitialized(): Promise<boolean> {
    return RNGetSocial.isInitialized();
  }
  /**
   * Returns current language of GetSocial plugin.
   * @return {Promise<string>} currently used language.
   */
  static getLanguage(): Promise<string> {
    return RNGetSocial.getLanguage();
  }

  /**
   * Sets the language of GetSocial plugin.
   * If provided value is incorrect, sets the default language.
   * @param {string} language
   * @return {Promise<boolean>} true, if language was set.
   */
  static setLanguage(language: string): Promise<boolean> {
    return RNGetSocial.setLanguage(language);
  }

  /**
   * Returns version of native GetSocial Framework.
   * @return {Promise<string>} : version as string.
   */
  static getSdkVersion(): Promise<string> {
    return RNGetSocial.getSdkVersion();
  }

  /**
   * Creates a Smart Link with user referral data attached used for Smart Invites.
   *
   * @param {Map<string, string>} linkParams Link customization parameters. More info @see <a href="https://docs.getsocial.im/guides/smart-links/parameters/">here</a>
   * @return {Promise<string>} Smart invite url.
   */
  static createInviteLink(linkParams: ?Map<string, string>): Promise<string> {
    return RNGetSocial.createInviteLink(linkParams);
  }

  /**
   * Invite friends via a specified invite channel.
   *
   * @param {string} channelId The channel through which the invite will be sent, one of the constants defined in {@link InviteChannelIds}.
   * @param {CustomInviteContent} customInviteContent Custom content to override the default content provided from the Dashboard.
   * @param {Map<string, string>} linkParams Link customization parameters.
   * @param {function()} onComplete called when an invite was sent.
   * @param {function()} onCancel called when an invite sending was canceled.
   * @param {function(string)} onError called when an error occured during sending an invite.
   * @return {void} Method simply returns after invoking, check the callbacks for result.
   */
  static sendInvite(channelId: string, customInviteContent: ?CustomInviteContent, linkParams: ?Map<string, string>,
      onComplete: (() => void), onCancel: (() => void), onError: (error: string) => void): void {
    GetSocialEventEmitter.removeAllListeners('InvitesEvent');
    GetSocialEventEmitter.addListener('InvitesEvent', (eventData) => {
      const status = eventData['STATUS'];
      if (status == 'onComplete') {
        onComplete();
      }
      if (status == 'onCancel') {
        onCancel();
      }
      if (status == 'onError') {
        const error = eventData['ERROR'];
        onError(error);
      }
    });
    const inviteContentJSON = customInviteContent == null ? null : JSON.parse(customInviteContent.toJSON());
    const linkParamsJSON = linkParams == null ? null : JSON.parse(mapToObjJSON(linkParams));

    return RNGetSocial.sendInvite(channelId, inviteContentJSON, linkParamsJSON);
  }

  /**
   * Returns all supported invite channels.
   *
   * @return {Promise<[InviteChannel]>} List containing all available channels.
   */
  static getInviteChannels(): Promise<[InviteChannel]> {
    return RNGetSocial.getInviteChannels().then((inviteChannelsArray) => {
      return inviteChannelsArray.map((inviteChannelMap) => {
        return new InviteChannel(inviteChannelMap);
      });
    });
  }

  /**
   * Check if invite channel with specified id is available to send invitations.
   *
   * @param {string} channelId Channel id.
   * @return {Promise<boolean>} True if channel is available for sending invites, false otherwise.
   */
  static isInviteChannelAvailable(channelId: string): Promise<boolean> {
    return RNGetSocial.isInviteChannelAvailable(channelId);
  }

  /**
   * Returns referral data.
   * @return {Promise<ReferralData>} : ReferralData instance.
   */
  static getReferralData(): Promise<?ReferralData> {
    return RNGetSocial.getReferralData().then((referralDataMap?) => {
      if (referralDataMap == null) {
        return null;
      }
      return new ReferralData(referralDataMap);
    });
  }

  /**
   * Clears referral data.
   * @return {Promise<void>}: will be called when referral data is removed.
   */
  static clearReferralData(): Promise<void> {
    return RNGetSocial.clearReferralData();
  }

  /**
   * Returns list of users who installed the app by accepting invite of current user.
   * @return {Promise<[ReferredUser]>} : List of referred users, can be empty.
   */
  static getReferredUsers() : Promise<[ReferredUser]> {
    return RNGetSocial.getReferredUsers().then((referredUsersArray) => {
      return referredUsersArray.map((referredUserMap) => {
        return new ReferredUser(referredUserMap);
      });
    });
  }

  /**
    * Fetch a user by their GetSocial userId.
    *
    * @param {string} userId The GetSocial userId.
    * @return {Promise<PublicUser>} Promise returning a PublicUser instance or error.
    */
  static getUserById(userId: string): Promise<PublicUser> {
    return RNGetSocial.getUserById(userId).then((publicUserMap) => {
      return new PublicUser(publicUserMap);
    });
  }

  /**
    * Fetch a user by auth provider id and user id on this provider.
    *
    * @param {string} providerId Auth identity provider id for which user id is provided. Can be "facebook", or any custom value.
    * @param {string} providerUserId User id on the selected identity provider for which PublicUser will be returned.
    * @return {Promise<PublicUser>} Promise returning a PublicUser instance or error.
    */
  static getUserByAuthIdentity(providerId: string, providerUserId: string): Promise<PublicUser> {
    return RNGetSocial.getUserByAuthIdentity(providerId, providerUserId).then((publicUserMap) => {
      return new PublicUser(publicUserMap);
    });
  }

  /**
    * Fetch a list of users by their auth identities pairs.
    * Auth identity pair is a combination of provider id and user id on this provider.
    *
    * @param {string} providerId A auth identity provider id for which user ids will be provided. Can be "facebook", or any custom value.
    * @param {[string]} providerUserIds A list of user ids on the selected identity provider for which {@link PublicUser}s will be returned.
    * @return {Promise<Map<string, PublicUser>>} Promise returning a map of provider user id with matching PublicUser instance or error Please note, that not all requested user may be returned.
    */
  static getUsersByAuthIdentities(providerId: string, providerUserIds: [string]): Promise<Map<string, PublicUser>> {
    return RNGetSocial.getUsersByAuthIdentities(providerId, providerUserIds).then((publicUsers) => {
      const retValue = new Map();
      Object.keys(publicUsers).forEach(function(key) {
        const publicUserMap = publicUsers[key];
        const publicUser = new PublicUser(publicUserMap);
        // $FlowFixMe
        retValue[publicUser.userId] = publicUser;
      }, publicUsers);
      return retValue;
    });
  }

  /**
    * Find users matching query.
    *
    * @param {UsersQuery} query users query.
    * @return {Promise<[UserReference]>} Promise returning a list of users.
    */
  static findUsers(query: UsersQuery): Promise<[UserReference]> {
    return RNGetSocial.findUsers(JSON.parse(query.toJSON())).then((userReferenceArray) => {
      return userReferenceArray.map((userReferenceMap) => {
        return new UserReference(userReferenceMap);
      });
    });
  }

  // Push Notifications

  /**
   * Call this method to register for push notifications.
   */
  static registerForPushNotifications() {
    RNGetSocial.registerForPushNotifications();
  }

  /**
   * Set a listener which will be invoked when a notification is clicked on,
   * or handle notification while application is in foreground.
   * @param {function} notificationReceived function to process notification.
   */
  static onNotificationReceived(notificationReceived: (notification : Notification, wasClicked: boolean) => void) {
    GetSocialEventEmitter.addListener('onNotificationReceived', function(rawNotification) {
      const wasClicked = rawNotification['WAS_CLICKED'];
      const receivedNotification = new Notification(rawNotification);
      notificationReceived(receivedNotification, wasClicked);
    });
  }

  // Action handling

	/**
	 * Process action with default GetSocial behaviour.
	 * @param {Action} action action to be processed.
	 */
  static processAction(action: Action): void {
    RNGetSocial.processAction(JSON.parse(action.toJSON()));
  }

  // Event tracking

	/**
	 * Reports custom event to Dashboard.
	 * @param {string} eventName Name of custom event.
	 * @param {Map<string, string>} eventProperties Properties of custom event.
	 * @return {Promise<boolean>} Promise called when operation finished. True if operation was successful, otherwise false.
	 *
	 */
  static trackCustomEvent(eventName: string, eventProperties: Map<string, string>): Promise<boolean> {
    return RNGetSocial.trackCustomEvent(eventName, JSON.parse(JSON.stringify(eventProperties)));
  }

  // constants for link parameters
  static LinkParams = {
    LANDING_PAGE_CUSTOM_TITLE: RNGetSocial.KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_TITLE,
    LANDING_PAGE_CUSTOM_DESCRIPTION: RNGetSocial.KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_DESCRIPTION,
    LANDING_PAGE_CUSTOM_IMAGE: RNGetSocial.KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_IMAGE,
    LANDING_PAGE_CUSTOM_YOUTUBE_VIDEO: RNGetSocial.KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_YOUTUBE_VIDEO}
}
