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
   * Follow tags from list.
   *
   * @param {[string]} ids list of tag IDs.
   * @return {FollowQuery} new query.
   */
  static tags(ids: string[]): FollowQuery {
      return new FollowQuery(CommunitiesIds.tags(ids));
  }

  /**
   * Follow labels from list.
   *
   * @param {[string]} ids list of label IDs.
   * @return {FollowQuery} new query.
   */
  static labels(ids: string[]): FollowQuery {
      return new FollowQuery(CommunitiesIds.labels(ids));
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {ids: this.ids};
  }
}
