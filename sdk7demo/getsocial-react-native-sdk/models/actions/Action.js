/* eslint-disable max-len */
// @flow
/**
 * Action class.
 */
export default class Action {
  type: string;
  data: {[key: string] : string} = {};

  /**
   * Creates a new Action instance from the provider parameters.
   * @param {any} actionMap notification parameters
   */
  constructor(actionMap: any) {
    this.type = actionMap['type'];
    this.data = actionMap['data'];
  }

  /**
   * Create an action instance..
   *
   * @param {string} type type of action.
   * @param {Map<string, string>} data Custom data.
   * @return {Action} new instance.
   */
  static create(type: string, data: Map<string, string>): Action {
    return new Action({'type': type, 'data': data});
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    return '{' +
      '"type": ' + '"' + this.type + '"' + ',' +
      '"data": ' + JSON.stringify(this.data) +
    '}';
  }

  // static Types = {
  //   OPEN_PROFILE: RNGetSocial.ACTION_TYPE_OPEN_PROFILE,
  //   OPEN_INVITES: RNGetSocial.ACTION_TYPE_OPEN_INVITES,
  //   OPEN_URL: RNGetSocial.ACTION_TYPE_OPEN_URL,
  //   ADD_FRIEND: RNGetSocial.ACTION_TYPE_ADD_FRIEND,
  // }

  // static DataKeys = {
  //   OPEN_PROFILE: { USER_ID: RNGetSocial.ACTION_DATA_KEY_OPEN_PROFILE_USER_ID },
  //   OPEN_URL: { URL: RNGetSocial.ACTION_DATA_KEY_OPEN_URL_URL },
  //   ADD_FRIEND: { USER_ID: RNGetSocial.ACTION_DATA_KEY_ADD_FRIEND_USER_ID},
  // }
}
