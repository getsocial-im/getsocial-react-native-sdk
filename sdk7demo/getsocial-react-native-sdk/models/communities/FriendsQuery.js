// @flow

import UserId from './../UserId.js';

/**
 * FriendsQuery object.
 */
export default class FriendsQuery {
  userId: UserId;

  /**
   * Get friends of a user.
   *
   * @param {UserId} userId user ID.
   * @return {FriendsQuery} new query.
   */
  static ofUser(userId: UserId) {
      const instance = new FriendsQuery();
      instance.userId = userId;
      return instance;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {userId: this.userId};
  }
}
