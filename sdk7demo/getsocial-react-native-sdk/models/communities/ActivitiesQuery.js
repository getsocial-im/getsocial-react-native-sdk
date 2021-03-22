/* eslint-disable max-len */
// @flow
import UserId from './../UserId.js';
import CommunitiesIds from './CommunitiesIds.js';

/**
 * ActivitiesQuery object.
 */
export default class ActivitiesQuery {
  ids: CommunitiesIds;
  author: ?UserId;
  tag: ?string;

  // eslint-disable-next-line require-jsdoc
  constructor(ids: CommunitiesIds) {
      this.ids = ids;
  }

  /**
   * Get activities in user feed.
   *
   * @param {UserId} id ID of user.
   * @return {ActivitiesQuery} new query.
   */
  static feedOf(id: UserId): ActivitiesQuery {
      return new ActivitiesQuery(CommunitiesIds.user(id));
  }

  /**
   * Get activities in a topic.
   *
   * @param {string} id ID of topic.
   * @return {ActivitiesQuery} new query.
   */
  static inTopic(id: string): ActivitiesQuery {
      return new ActivitiesQuery(CommunitiesIds.topic(id));
  }

  /**
   * Get activities from all topics.
   *
   * @return {ActivitiesQuery} new query.
   */
  static inAllTopics(): ActivitiesQuery {
      return new ActivitiesQuery(CommunitiesIds.topics([]));
  }

  /**
   * Get activities in a group.
   *
   * @param {string} id ID of group.
   * @return {ActivitiesQuery} new query.
   */
  static inGroup(id: string): ActivitiesQuery {
      return new ActivitiesQuery(CommunitiesIds.group(id));
  }

  /**
   * Get activities in user's timeline.
   *
   * @return {ActivitiesQuery} new query.
   */
  static timeline(): ActivitiesQuery {
      return new ActivitiesQuery(CommunitiesIds.timeline());
  }

  /**
   * Get all activities.
   *
   * @return {ActivitiesQuery} new query.
   */
  static everywhere(): ActivitiesQuery {
      return new ActivitiesQuery(CommunitiesIds.everywhere());
  }

  /**
   * Get comments to a certain activity.
   *
   * @param {string} id ID of activity.
   * @return {ActivitiesQuery} new query.
   */
  static commentsToActivity(id: string): ActivitiesQuery {
      return new ActivitiesQuery(CommunitiesIds.activity(id));
  }

  /**
   * Get activities of a specific user.
   *
   * @param {UserId} id author of activities.
   * @return {ActivitiesQuery} new query.
   */
  byUser(id: UserId): ActivitiesQuery {
      this.author = id;
      return this;
  }

  /**
   * Get activities with a specific tag.
   *
   * @param {string} tag tag in activity text.
   * @return {ActivitiesQuery} new query.
   */
  withTag(tag: string): ActivitiesQuery {
      this.tag = tag;
      return this;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {ids: this.ids, author: this.author, tag: this.tag};
  }
}
