/* eslint-disable max-len */
// @flow

import PublicUser from './PublicUser.js';

/**
 * Defines ReferredUser class.
 */
export default class ReferredUser extends PublicUser {
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

  /**
   * Creates a new ReferredUser instance from the provider parameters.
   * @param {any} referredUserMap public user parameters
   */
  constructor(referredUserMap: any) {
    super(referredUserMap);
    this.installationDate = referredUserMap['INSTALLATION_DATE'];
    this.installationChannel = referredUserMap['INSTALLATION_CHANNEL'];
    this.installPlatform = referredUserMap['INSTALL_PLATFORM'];
    this.isReinstall = referredUserMap['IS_REINSTALL'];
    this.isInstallSuspicious = referredUserMap['IS_INSTALL_SUSPICIOUS'];
  }
}
