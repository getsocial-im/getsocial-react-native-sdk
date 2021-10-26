/* eslint-disable max-len */

/**
 * BanInfo object.
 */
export default class BanInfo {
  expiration: number;
  reason: ?string

  // eslint-disable-next-line require-jsdoc
  constructor(banInfoMap: any) {
      this.expiration = banInfoMap['expiration'];
      this.reason = banInfoMap['reason'];
      Object.freeze(this);
  }
}
