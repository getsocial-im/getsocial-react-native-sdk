/* eslint-disable max-len */
// @flow

import Identity from './models/communities/Identity.js';
import ConflictUser from './models/communities/ConflictUser.js';
import UserUpdate from './models/UserUpdate.js';
import BanInfo from './models/BanInfo.js';
import {NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

/**
  GetSocialUser class.
 */
export default class User {
  id: string;
  displayName: string;
  avatarUrl: ?string;
  identities: {[key: string] : string} = {};
  publicProperties: {[key: string] : string} = {};
  privateProperties: {[key: string] : string} = {};
  banInfo: BanInfo;
  verified: boolean;

  /**
   * Requests a bulk change of properties for the current user.
   *
   * @param {UserUpdate} update New user details.
   * @return {void}   A callback to indicate if this operation was successful.
   */
  updateDetails(update: UserUpdate): Promise<void> {
      return RNGetSocial.callAsync('CurrentUser.updateDetails', JSON.stringify(update));
  }

  /**
   * Returns if current user has any authentication info attached.
   * @return {bool} true, if user does not have any authentication info attached.
   */
  isAnonymous(): bool {
      if (Object.keys(this.identities).length === 0) {
          return true;
      }
      return false;
  }

  /**
   * Adds Identity for the specified provider.
   * @param {Identity} identity AuthIdentity to be added.
   * @param {function()} onSuccess called when identity successfully added.
   * @param {function(conflictUser: ConflictUser)} onConflict called when identity conflicts with another user.
   * @param {function(error)} onError called when an error occured during adding identity.
   * @return {void} Method simply returns after invoking, check the callbacks for result.
   */
  addIdentity(identity: Identity, onSuccess: (() => void), onConflict: ((conflictUser: ConflictUser) => void), onError: (error: string) => void): void {
      return RNGetSocial.callAsync('CurrentUser.addIdentity', JSON.stringify(identity)).then((result) => {
          if (result === null || JSON.parse(result)['result'] === null || JSON.parse(result)['result'] == '') {
              onSuccess();
          } else {
              onConflict(new ConflictUser(JSON.parse(result)));
          }
      }, (error) => {
          onError(error);
      });
  }

  /**
   * Removes Identity for the specified provider.
   * @param {string} providerId The provider connected to an auth identity on the current user to remove.
   * @return {Promise<void>} Called when operation finished.
   */
  removeIdentity(providerId: string): Promise<void> {
      return RNGetSocial.callAsync('CurrentUser.removeIdentity', providerId);
  }

  /**
   * Refresh user properties.
   * @return {Promise<void>} Called when operation finished.
   */
  refresh(): Promise<void> {
      return RNGetSocial.callAsync('CurrentUser.refresh', '');
  }

  /**
   * Returns reason and expiration of the ban of the current user
   * @return {Promise<BanInfo>} Ban information
   */
  getBanInfo(): Promise<BanInfo> {
      return RNGetSocial.callSync('CurrentUser.getBanInfo', '')
          .then((res) => {
              try {
                  res = JSON.parse(res);
                  if (!res || res.result === '') {
                      return null;
                  }

                  return new BanInfo(res);
              } catch (e) {
                  throw e;
              }
          });
  }

  /**
   * Returns if user is banned or not.
   * @return {Promise<bool>} True, if user is banned, otherwise false.
   */
  isBanned(): Promise<bool> {
      return RNGetSocial.callSync('CurrentUser.isBanned', '')
          .then((res) => {
              try {
                  res = JSON.parse(res);
                  return !!res.result;
              } catch(e) {
                  throw e;
              }
          });
  }

  /**
   * Creates a new CurrentUser instance from the provider parameters.
   * @param {any} userMap public user parameters
   */
  constructor(userMap: any) {
      const jsonObject = JSON.parse(userMap);
      if (jsonObject == null || jsonObject === undefined) {
          return;
      }
      this.id = jsonObject['userId'];
      this.displayName = jsonObject['displayName'];
      this.avatarUrl = jsonObject['avatarUrl'];
      this.identities = jsonObject['identities'];
      this.publicProperties = jsonObject['publicProperties'];
      this.privateProperties = jsonObject['privateProperties'];
      const rawBanInfo = jsonObject['banInfo'];
      if (rawBanInfo !== undefined && rawBanInfo != null) {
          this.banInfo = new BanInfo(rawBanInfo);
      }
      this.verified = jsonObject['verified'];
      Object.freeze(this);
  }
}
