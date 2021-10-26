/* eslint-disable max-len */
// @flow
import UserId from './../UserId.js';

/**
 * TopicsQuery object.
 */
export default class TopicsQuery {
    search: string = '';
    userId: ?UserId;
    trending: boolean = false;

    /**
   * Get all topics.
   *
   * @return {TopicsQuery} new instance.
   */
    static all(): TopicsQuery {
        const instance = new TopicsQuery();
        return instance;
    }

    /**
   * Find topics by name or description.
   *
   * @param {string} searchTerm topics name/description or part of it.
   * @return {TopicsQuery} new instance.
   */
    static find(searchTerm: string): TopicsQuery {
        const instance = new TopicsQuery();
        instance.search = searchTerm;
        return instance;
    }

    /**
   * Get topics followed by a specific user.
   *
   * @param {UserId} userId ID of user.
   * @return {TopicsQuery} new instance.
   */
    followedBy(userId: UserId): TopicsQuery {
        this.userId = userId;
        return this;
    }

    /**
    * Get only trending topics.
    *
    * @param {boolean} trending Only trending topics or all.
    * @return {TopicsQuery} new query.
    */
    onlyTrending(trending: boolean): TopicsQuery {
        this.trending = trending;
        return this;
    }

    /**
  * Generates JSON string.
  * @return {string} object as json.
  */
    toJSON() {
        return {followerId: this.userId ?? null, searchTerm: this.search ?? '', trending: this.trending};
    }
}
