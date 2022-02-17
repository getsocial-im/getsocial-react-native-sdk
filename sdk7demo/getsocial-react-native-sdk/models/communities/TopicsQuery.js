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
    labels: Array<string> = [];
    properties: {[key: string] : string} = {};

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
   * @return {TopicsQuery} same instance.
   */
    followedBy(userId: UserId): TopicsQuery {
        this.userId = userId;
        return this;
    }

    /**
    * Get only trending topics.
    *
    * @param {boolean} trending Only trending topics or all.
    * @return {TopicsQuery} same query.
    */
    onlyTrending(trending: boolean): TopicsQuery {
        this.trending = trending;
        return this;
    }

    /**
     * Get topics matching the specified properties.
     *
     * @param {Object<string, string>} properties Properties.
     * @return {TopicsQuery} same query.
     */
    withProperties(properties: {[key: string] : string}): TopicsQuery {
        this.properties = properties;
        return this;
    }

    /**
     * Get topics matching the specified labels.
     *
     * @param {[string]} labels Labels list.
     * @return {TopicsQuery} same query.
     */
    withLabels(labels: string[]): TopicsQuery {
        this.labels = labels;
        return this;
    }

    /**
     * Generates JSON string.
     * @return {string} object as json.
     */
    toJSON() {
        return {followerId: this.userId ?? null, labels: this.labels ?? null, properties: this.properties ?? null, searchTerm: this.search ?? '', trending: this.trending};
    }
}
