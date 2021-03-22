// @flow
import UserIdList from './../UserId.js';
import CommunitiesIds from './CommunitiesIds.js';

/**
 * FollowQuery object.
 */
export default class FollowQuery {
  ids: CommunitiesIds;

  // eslint-disable-next-line require-jsdoc
  constructor(ids: CommunitiesIds) {
      this.ids = ids;
  }

  /**
   * Follow topics from list.
   *
   * @param {[string]} ids list of topic IDs.
   * @return {FollowQuery} new query.
   */
  static topics(ids: string[]): FollowQuery {
      return new FollowQuery(CommunitiesIds.topics(ids));
  }

  /**
   * Follow users from list.
   *
   * @param {UserIdList} ids list of user IDs.
   * @return {FollowQuery} new query.
   */
  static users(ids: UserIdList): FollowQuery {
      return new FollowQuery(CommunitiesIds.users(ids));
  }

  /**
   * Follow groups from list.
   *
   * @param {[string]} ids list of group IDs.
   * @return {FollowQuery} new query.
   */
  static groups(ids: string[]): FollowQuery {
      return new FollowQuery(CommunitiesIds.groups(ids));
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {ids: this.ids};
  }
}
