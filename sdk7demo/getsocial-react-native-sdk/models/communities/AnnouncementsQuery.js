// @flow
import UserId from './../UserId.js';
import CommunitiesIds from './CommunitiesIds.js';

/**
 * AnnouncementsQuery object.
 */
export default class AnnouncementsQuery {
  ids: CommunitiesIds

  // eslint-disable-next-line require-jsdoc
  constructor(ids: CommunitiesIds) {
      this.ids = ids;
  }

  /**
   * Get announcements for user's feed.
   *
   * @param {UserId} id id of the user.
   * @return {AnnouncementsQuery} a new query.
   */
  static forFeedOf(id: UserId): AnnouncementsQuery {
      return new AnnouncementsQuery(CommunitiesIds.user(id));
  }

  /**
   * Get announcements in topic.
   *
   * @param {string} id id of topic.
   * @return {AnnouncementsQuery} a new query.
   */
  static inTopic(id: string): AnnouncementsQuery {
      return new AnnouncementsQuery(CommunitiesIds.topic(id));
  }

  /**
   * Get announcements in a group.
   *
   * @param {string} id ID of group.
   * @return {AnnouncementsQuery} new query.
   */
  static inGroup(id: string): AnnouncementsQuery {
      return new AnnouncementsQuery(CommunitiesIds.group(id));
  }

  /**
   * Get announcements for all feeds and targeting users timeline.
   *
   * @return {AnnouncementsQuery} a new query.
   */
  static timeline(): AnnouncementsQuery {
      return new AnnouncementsQuery(CommunitiesIds.timeline());
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {ids: this.ids};
  }
}
