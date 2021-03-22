/* eslint-disable max-len */
// @flow

/**
 * Class describes Referral Data.
 */
export default class ReferralData {
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

  /**
   * Creates a new ReferralData instance from the provider parameters.
   * @param {any} referralDataMap referral data parameters
   */
  constructor(referralDataMap: any) {
      this.token = referralDataMap['token'];
      this.referrerUserId = referralDataMap['referrerUserId'];
      this.referrerChannelId = referralDataMap['referrerChannelId'];
      this.isFirstMatch = referralDataMap['isFirstMatch'];
      this.isGuaranteedMatch = referralDataMap['isGuaranteedMatch'];
      this.isReinstall = referralDataMap['isReinstall'];
      this.isFirstMatchLink = referralDataMap['isFirstMatchLink'];
      this.referralLinkParams = referralDataMap['linkParams'];
      this.originalReferralLinksParams = referralDataMap['originalLinkParams'];

      Object.freeze(this);
  }
}
