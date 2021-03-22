/* eslint-disable max-len */
// @flow

import User from './../communities/User.js';

/**
 * Defines ReferredUser class.
 */
export default class ReferralUser extends User {
  eventDate: number
  event: string
  eventData: Map<string, string>

  /**
   * Creates a new ReferralUser instance from the provider parameters.
   * @param {any} referralUserMap public user parameters
   */
  constructor(referralUserMap: any) {
      super(referralUserMap);
      this.event = referralUserMap['event'];
      this.eventDate = referralUserMap['eventDate'];
      this.eventData = referralUserMap['eventData'];

      Object.freeze(this);
  }
}
