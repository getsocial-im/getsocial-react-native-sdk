/* eslint-disable max-len */
// @flow
import UserId from './../UserId.js';

/**
 * UsersQuery object.
 */
export default class UsersQuery {
  searchTerm: ?string;
  userId: ?UserId

  // eslint-disable-next-line require-jsdoc
  constructor(searchTerm: string, userId: UserId) {
      this.searchTerm = searchTerm;
      this.userId = userId;
  }

  /**
   * Create a query to find users, that have query string in their Display Name.
   *
   * @param {string} searchTerm part of display name.
   * @return {UsersQuery} new instance.
   */
  static find(searchTerm: string): UsersQuery {
      return new UsersQuery(searchTerm, null);
  }

  /**
   * Get users followed by a specific user.
   *
   * @param {UserId} id ID of user.
   * @return {UsersQuery} new instance.
   */
  static followedBy(id: UserId): UsersQuery {
      return new UsersQuery(null, id);
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON() {
      return {followedBy: this.userId ?? null, query: this.searchTerm ?? null};
  }
}
