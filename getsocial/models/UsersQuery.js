/* eslint-disable max-len */
// @flow

/**
 * UsersQuery class.
 */
export default class UsersQuery {
  #query = null;
  #limit = 20;

  /**
   * Creates a query to find users, that have query string in their display name.
   *
   * @param {string} query Part of display name.
   * @return {UsersQuery} New instance.
  */
  static usersByDisplayName(query: string): UsersQuery {
    const uq = new UsersQuery();
    uq.#query = query;
    return uq;
  }

  /**
   * Creates a query to find users, that have query string in their display name.
   *
   * @param {number} limit New limit, should be between 1 and 20.
   * @return {UsersQuery} New instance.
  */
  withLimit(limit: number): UsersQuery {
    this.#limit = limit;
    return this;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    return JSON.stringify({
      'query': this.#query,
      'limit': this.#limit,
    });
  }
}
