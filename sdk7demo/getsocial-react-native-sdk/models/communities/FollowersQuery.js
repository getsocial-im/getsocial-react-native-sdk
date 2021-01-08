// @flow
import UserId from './../UserId.js';
import CommunitiesIds from './CommunitiesIds.js';

/**
 * FollowersQuery object.
 */
export default class FollowersQuery {
  ids: CommunitiesIds;

  // eslint-disable-next-line require-jsdoc
  constructor(ids: CommunitiesIds) {
    this.ids = ids;
  }

  /**
   * Get followers of topic with ID.
   *
   * @param {string} id Topic ID.
   * @return {FollowersQuery} new query.
   */
  static ofTopic(id: string): FollowersQuery {
    return new FollowersQuery(CommunitiesIds.topic(id));
  }

  /**
   * Get followers of user with ID.
   *
   * @param {UserId} id User ID.
   * @return {FollowersQuery} new query.
   */
  static ofUser(id: UserId): FollowersQuery {
    return new FollowersQuery(CommunitiesIds.user(id));
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON(): string {
    return '{' +
      '"ids": ' + this.ids.toJSON() +
    '}';
  }
}
