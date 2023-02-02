/* eslint-disable max-len */
// @flow
import UserId from './../UserId.js';
import CommunitiesIds from './CommunitiesIds.js';
import PollStatus from './PollStatus.js';

/**
 * ActivitiesQuery object.
 */
export default class ActivitiesQuery {
  ids: CommunitiesIds;
  author: ?UserId;
  tag: ?string;
  pollStatus: PollStatus = PollStatus.All;
  trending: boolean = false;
  labels: Array<string> = [];
  properties: {[key: string] : string} = {};
  mentions: Array<UserId> = [];
  searchTerm: ?string;
  reactionGroup: ?string;
  reactions: Array<string> = [];

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
   * Get bookmarked activities.
   *
   * @return {ActivitiesQuery} new query.
   */
  static bookmarkedActivities(): ActivitiesQuery {
      const query = ActivitiesQuery.everywhere();
      query.reactionGroup = 'bookmarks';
      return query;
  }

  /**
   * Get activities that match given reaction(s).
   *
   * @param {[string]} reactions
   * @return {ActivitiesQuery} new query.
   */
  static reactedActivities(reactions: string[]): ActivitiesQuery {
      const query = ActivitiesQuery.everywhere();
      query.reactionGroup = 'reactions';
      query.reactions = reactions;

      return query;
  }

  /**
   * Get polls voted with the given option(s).
   *
   * @param {[string]} options
   * @return {ActivitiesQuery} new query.
   */
  static votedActivities(options: string[]): ActivitiesQuery {
      const query = ActivitiesQuery.everywhere();
      query.reactionGroup = 'votes';
      query.reactions = options;

      return query;
  }

  /**
   * Get activities of a specific user.
   *
   * @param {UserId} id author of activities.
   * @return {ActivitiesQuery} same query.
   */
  byUser(id: UserId): ActivitiesQuery {
      this.author = id;
      return this;
  }

  /**
   * Get activities with a specific tag.
   *
   * @param {string} tag tag in activity text.
   * @return {ActivitiesQuery} same query.
   */
  withTag(tag: string): ActivitiesQuery {
      this.tag = tag;
      return this;
  }

  /**
   * Get activities with the specified poll status.
   *
   * @param {number} status Poll status value.
   * @return {ActivitiesQuery} same query.
   */
  withPollStatus(status: number): ActivitiesQuery {
      this.pollStatus = status;
      return this;
  }

  /**
   * Get only trending activities.
   *
   * @param {boolean} trending Only trending activities or all.
   * @return {ActivitiesQuery} same query.
   */
  onlyTrending(trending: boolean): ActivitiesQuery {
      this.trending = trending;
      return this;
  }

  /**
   * Get activities matching the specified text.
   *
   * @param {string} searchTerm Text.
   * @return {ActivitiesQuery} same query.
   */
  withText(searchTerm: string): ActivitiesQuery {
      this.searchTerm = searchTerm;
      return this;
  }

  /**
   * Get activities matching the specified properties.
   *
   * @param {Object<string, string>} properties Properties.
   * @return {ActivitiesQuery} same query.
   */
  withProperties(properties: {[key: string] : string}): ActivitiesQuery {
      this.properties = properties;
      return this;
  }

  /**
   * Get activities matching the specified labels.
   *
   * @param {[string]} labels Labels list.
   * @return {ActivitiesQuery} same query.
   */
  withLabels(labels: string[]): ActivitiesQuery {
      this.labels = labels;
      return this;
  }

  /**
   * Get activities matching the specified mentions.
   *
   * @param {[UserId]} mentions User IDs.
   * @return {ActivitiesQuery} same query.
   */
  withMentions(mentions: UserId[]): ActivitiesQuery {
      this.mentions = mentions;
      return this;
  }

  /**
   * Include a number of comments from each activity in the response.
   *
   * @param {number} upTo Number of comments to include (max: 3)
   * @return {ActivitiesQuery} same query.
   */
  includeComments(upTo: number): ActivitiesQuery {
      this.includedComments = upTo;
      return this;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {author: this.author ?? null, ids: this.ids, includeComments: this.includedComments ?? null, labels: this.labels ?? null, mentions: this.mentions ?? null, pollStatus: this.pollStatus, properties: this.properties ?? null, reactions: this.reactions ?? null, reactionGroup: this.reactionGroup ?? null, searchTerm: this.searchTerm ?? null, tag: this.tag ?? null, trending: this.trending};
  }
}
