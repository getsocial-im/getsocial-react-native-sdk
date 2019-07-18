// @flow

import {mapToObjJSON} from './../utils/Utils.js';
import {NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

/**
 * Action class.
 */
export default class Action {
  type: string
  data: Map<string, string>

  /**
   * Creates a new Action instance from the provider parameters.
   * @param {any} actionMap notification parameters
   */
  constructor(actionMap: any) {
    this.type = actionMap['TYPE'];
    this.data = actionMap['DATA'];
  }

  /**
   * Creates new Action instance with the provided action type;
   * @param {string} actionType action type.
   * @return {Action} new Action instance.
   */
  static withType(actionType: string): Action {
    return new Action({'TYPE': actionType, 'DATA': new Map()});
  }

  /**
   * Adds action data.
   * @param {string} key data key.
   * @param {string} value data value.
   * @return {Action} updated Action instance.
   */
  addActionData(key: string, value: string): Action {
    this.data.set(key, value);
    return this;
  }

  /**
   * Adds multiple action data.
   * @param {Map<string, string>} actionData data map.
   * @return {Action} updated Action instance.
   */
  addActionDataMap(actionData: Map<string, string>): Action {
    const newDataMap = new Map([...this.data, ...actionData]);
    this.data = newDataMap;
    return this;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    return JSON.stringify({
      'TYPE': this.type,
      'DATA': this.data,
    });
  }

  static Types = {
    OPEN_PROFILE: RNGetSocial.ACTION_TYPE_OPEN_PROFILE,
    OPEN_INVITES: RNGetSocial.ACTION_TYPE_OPEN_INVITES,
    OPEN_URL: RNGetSocial.ACTION_TYPE_OPEN_URL,
    ADD_FRIEND: RNGetSocial.ACTION_TYPE_ADD_FRIEND, 
  }

  static DataKeys = {
    OPEN_PROFILE: { USER_ID: RNGetSocial.ACTION_DATA_KEY_OPEN_PROFILE_USER_ID },
    OPEN_URL: { URL: RNGetSocial.ACTION_DATA_KEY_OPEN_URL_URL },
    ADD_FRIEND: { USER_ID: RNGetSocial.ACTION_DATA_KEY_ADD_FRIEND_USER_ID},
  }
}
