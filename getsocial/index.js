/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// @flow

import {
  NativeModules,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native';

const {RNGetSocial} = NativeModules;

const mapToObj = (m) => {
  if (m == null) {
    return [];
  }
  return Array.from(m).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
};

/**
 * Media attachment class.
 */
class MediaAttachment {
  #imageUrl = null;
  #videoUrl = null;

  /**
   * Creates media attachment instance with image url.
   * @param {string} imageUrl Url of the image.
   * @return {MediaAttachment} Created media attachment instance.
   */
  static withImageUrl(imageUrl: string): MediaAttachment {
    const ma = new MediaAttachment();
    ma.#imageUrl = imageUrl;
    return ma;
  }

  /**
   * Creates media attachment instance with video url.
   * @param {string} videoUrl Url of the video.
   * @return {MediaAttachment} Created media attachment instance.
   */
  static withVideoUrl(videoUrl: string): MediaAttachment {
    const ma = new MediaAttachment();
    ma.#videoUrl = videoUrl;
    return ma;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    const propertyMap = new Map();
    propertyMap.set('imageUrl', this.#imageUrl);
    propertyMap.set('videoUrl', this.#videoUrl);
    return JSON.stringify(mapToObj(propertyMap));
  }
}

/**
 * Class to specify custom invite content.
 */
class CustomInviteContent {
  #inviteText = null;
  #inviteSubject = null;
  #mediaAttachment = null;

  /**
   * Set custom invite text.
   * @param {string} inviteText invite text.
   * @return {CustomInviteContent} modified instance.
   */
  withText(inviteText: ?string): CustomInviteContent {
    this.#inviteText = inviteText;
    return this;
  }

  /**
   * Set custom invite text.
   * @param {string} inviteSubject invite subject.
   * @return {CustomInviteContent} modified instance.
   */
  withSubject(inviteSubject: ?string): CustomInviteContent {
    this.#inviteSubject = inviteSubject;
    return this;
  }

  /**
   * Set media attachment.
   * @param {string} mediaAttachment media attachment.
   * @return {CustomInviteContent} modified instance.
   */
  withMediaAttachment(mediaAttachment: ?MediaAttachment): CustomInviteContent {
    this.#mediaAttachment = mediaAttachment;
    return this;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    const propertyMap = new Map();
    propertyMap.set('inviteText', this.#inviteText);
    propertyMap.set('inviteSubject', this.#inviteSubject);
    if (this.#mediaAttachment != null) {
      propertyMap.set('mediaAttachment', JSON.parse(this.#mediaAttachment.toJSON()));
    }
    return JSON.stringify(mapToObj(propertyMap));
  }
}

/**
 * Class describes Referral Data.
 */
class ReferralData {
  /** Unique Smart Invite link token. There is unique association between
  * token and attached referral data.
  */
  token: string
  /** The GetSocial user id of the user that created the referral data. */
  referrerUserId: ?string
  /** The id of the channel that was used for the invite. */
  referrerChannelId: ?string
  /** Returns true if the app is installed for the first time on this device. */
  isFirstMatch: boolean
  /** returns true if GetSocial can give 100% guarantee that received referral data corresponds to the user, false in case of the best match. */
  isGuaranteedMatch: boolean
  /** Returns true if the app is reinstalled on this device. */
  isReinstall: boolean
  /** Returns true if the app is opened for this link the first time on this device. */
  isFirstMatchLink: boolean
  /** Referral Link parameters that are assigned to this referral data. Includes value overrides from the Smart Link. */
  referralLinkParams: {[key: string] : string}
  /** Original Referral Link parameters that are assigned to this referral data. Contains original link parameters
  * attached to the Smart Link without overrides.
  */
  originalReferralLinksParams: {[key: string] : string}
}

/**
 * Immutable properties for a public user.
 */
class PublicUser {
  /** GetSocial User id. */
  userId: string
  /** Display name. */
  displayName: string
  /** Display name. */
  avatarUrl: ?string
  /** Returns all identities added to the user. */
  identities: {[key: string] : string}
  /** All public properties of user. */
  publicProperties: {[key: string] : string}
}

/**
 * Defines ReferredUser class.
 */
class ReferredUser extends PublicUser {
  /** UNIX-timestamp of date in seconds when user installed the application. */
  installationDate: number
  /** Invite channel on which the user was referred. */
  installationChannel: string
  /** Which platform user used to install the app. */
  installPlatform: string
  /** Returns true if that is not first install from this device. */
  isReinstall: boolean
  /** Returns true if install was marked as suspicious by fraud detection system. */
  isInstallSuspicious: boolean
}

/**
  Invites view.
 */
class InvitesView {
  #windowTitle;
  #customInviteContent = new CustomInviteContent();
  #linkParams = new Map();

  /**
   * Set custom window title.
   * @param {string} windowTitle title.
   * @return {InvitesView} modified instance.
   */
  withCustomWindowTitle(windowTitle: ?string): InvitesView {
    this.#windowTitle = windowTitle;
    return this;
  }

  /**
   * Set custom invite content.
   * @param {CustomInviteContent} customInviteContent Custom invite content.
   * @return {InvitesView} modified instance.
   */
  withCustomInviteContent(customInviteContent: CustomInviteContent): InvitesView {
    this.#customInviteContent = customInviteContent;
    return this;
  }

  /**
   * Set callbacks for different invites events.
   * @param {function(string)} onComplete called when an invite was sent.
   * @param {function(string)} onCancel called when an invite sending was canceled.
   * @param {function(string, string)} onError called when an error occured during sending an invite.
   * @return {InvitesView} modified instance.
   */
  withInviteUICallback(onComplete: ((channelId: string) => void), onCancel: ((channelId: string) => void), onError: (channelId: string, error: string) => void): InvitesView {
    GetSocialEventEmitter.removeAllListeners('InvitesUIEvent');
    GetSocialEventEmitter.addListener('InvitesUIEvent', (eventData) => {
      const status = eventData['STATUS'];
      const channelId = eventData['CHANNEL_ID'];
      if (status == 'onComplete') {
        onComplete(channelId);
      }
      if (status == 'onCancel') {
        onCancel(channelId);
      }
      if (status == 'onError') {
        const error = eventData['ERROR'];
        onError(channelId, error);
      }
    });
    return this;
  }

  /**
   * Set link params.
   * @param {Map} linkParams Link parameters.
   * @return {InvitesView} modified instance.
   */
  withLinkParams(linkParams: Map<string, string>): InvitesView {
    this.#linkParams = linkParams;
    return this;
  }

  /**
   * Shows the invites view.
   * @return {void} void.
   */
  show(): void {
    const inviteContentJSON = JSON.parse(this.#customInviteContent.toJSON());
    const linkParamsJSON = JSON.parse(JSON.stringify(mapToObj(this.#linkParams)));
    return RNGetSocial.showInvitesView(this.#windowTitle, inviteContentJSON, linkParamsJSON);
  }
}

/**
 * Main interface of GetSocial plugin.
 */
class GetSocial {
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
   * Returns referral data.
   * @return {Promise<ReferralData>} : ReferralData instance.
   */
  static getReferralData(): Promise<?ReferralData> {
    return RNGetSocial.getReferralData().then((referralDataMap?) => {
      if (referralDataMap == null) {
        return null;
      }
      const referralData = new ReferralData();
      referralData.token = referralDataMap['TOKEN'];
      referralData.referrerUserId = referralDataMap['REFERRER_USER_ID'];
      referralData.referrerChannelId = referralDataMap['REFERRER_CHANNEL_ID'];
      referralData.isFirstMatch = referralDataMap['IS_FIRST_MATCH'];
      referralData.isGuaranteedMatch = referralDataMap['IS_GUARANTEED_MATCH'];
      referralData.isReinstall = referralDataMap['IS_REINSTALL'];
      referralData.isFirstMatchLink = referralDataMap['IS_FIRST_MATCH_LINK'];
      referralData.referralLinkParams = referralDataMap['REFERRAL_LINK_PARAMS'];
      referralData.originalReferralLinksParams = referralDataMap['ORIGINAL_REFERRAL_LINK_PARAMS'];
      return referralData;
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
        const referredUser = new ReferredUser();
        referredUser.userId = referredUserMap['USER_ID'];
        referredUser.displayName = referredUserMap['DISPLAY_NAME'];
        referredUser.avatarUrl = referredUserMap['AVATAR_URL'];
        referredUser.identities = referredUserMap['IDENTITIES'];
        referredUser.publicProperties = referredUserMap['PUBLIC_PROPERTIES'];
        referredUser.installationDate = referredUserMap['INSTALLATION_DATE'];
        referredUser.installationChannel = referredUserMap['INSTALLATION_CHANNEL'];
        referredUser.installPlatform = referredUserMap['INSTALL_PLATFORM'];
        referredUser.isReinstall = referredUserMap['IS_REINSTALL'];
        referredUser.isInstallSuspicious = referredUserMap['IS_INSTALL_SUSPICIOUS'];
        return referredUser;
      });
    });
  }

  // constants for link parameters
  static LinkParams = {
    LANDING_PAGE_CUSTOM_TITLE: RNGetSocial.KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_TITLE,
    LANDING_PAGE_CUSTOM_DESCRIPTION: RNGetSocial.KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_DESCRIPTION,
    LANDING_PAGE_CUSTOM_IMAGE: RNGetSocial.KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_IMAGE,
    LANDING_PAGE_CUSTOM_YOUTUBE_VIDEO: RNGetSocial.KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_YOUTUBE_VIDEO}
}

/**
 * GetSocial UI class.
 */
class GetSocialUI {
  // UI section

  /**
   * Close the GetSocial View.
   * @param {boolean} saveViewState, true if the state of GetSocial view needs to be restored later by calling restoreView.
   * @return {Promise<void>} will be called when view closed.
   */
  static closeView(saveViewState: boolean): Promise<void> {
    return RNGetSocial.closeView(saveViewState);
  }

  /**
   * Displays GetSocial view, which was hidden using closeView.
   * @return {Promise<void>} will be called when view restored.
   */
  static restoreView(): Promise<void> {
    return RNGetSocial.restoreView();
  }

  // Invites UI section

  /**
   * Creates invites view.
   * @return {GetSocialInvitesView} Returns the created invites view.
   */
  static createInvitesView(): InvitesView {
    return new InvitesView();
  }

  // UI configuration section

  /**
   * Loads default UI configuration.
   * @return {Promise<void>} called when configuration was changed.
   */
  static loadDefaultConfiguration(): Promise<void> {
    return RNGetSocial.loadDefaultConfiguration();
  }

  /**
   * Loads custom UI configuration.
   * @param {string} path to custom UI configuration, like 'getsocial-custom/ui-config.json'.
   * @return {Promise<void>} called when configuration was changed.
   */
  static loadConfiguration(path: string): Promise<void> {
    return RNGetSocial.loadConfiguration(path);
  }
}

/**
  GetSocialUser class.
 */
class GetSocialUser {
  // User Management section

  /**
    Notifies listener when user changed.
    @param {function} onUserChanged listener to be invoked.
   */
  static onUserChanged(onUserChanged: () => void) {
    GetSocialEventEmitter.addListener('onUserChanged', onUserChanged);
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
  * Returns the avatar URL of current user.
  * @return {Promise<string>} : avatar url.
  */
  static getAvatarUrl(): Promise<?string> {
    return RNGetSocial.getAvatarUrl();
  }
}

/**
 * Event emitter to subscribe GetSocial related events.</br>
 * Available events:</br>
 * 1. whenInitialized: invoked when SDK finished initialization.</br>
 * 2. onUserChanged: invoked when any property of current user changed.</br>
 * 3. onGlobalError(error): invoked when an unhandled error happened.</br>
 */
const GetSocialEventEmitter = Platform.select({
  android: DeviceEventEmitter,
  ios: new NativeEventEmitter(RNGetSocial),
});

export {GetSocial, GetSocialUI, GetSocialUser, InvitesView, CustomInviteContent, ReferralData, ReferredUser, PublicUser, MediaAttachment};

