/* eslint-disable max-len */
// @flow
import UserId from '../UserId.js';

/**
 * LabelsQuery object.
 */
export default class LabelsQuery {
    searchTerm: string
    trending: boolean = false;
    follower: ?UserId;

    // eslint-disable-next-line require-jsdoc
    constructor(searchTerm: string) {
        this.searchTerm = searchTerm || null;
    }

    /**
     * All labels.
     * @return {LabelsQuery} New instance.
     */
    static all(): LabelsQuery {
        return new LabelsQuery();
    }

    /**
     * Search for a specific label.
     * @param {string} searchTerm Search term.
     * @return {LabelsQuery} New instance.
     */
    static search(searchTerm: string): LabelsQuery {
        return new LabelsQuery(searchTerm);
    }

    /**
    * Get only trending labels.
    *
    * @param {boolean} trending Only trending labels or all.
    * @return {LabelsQuery} same query.
    */
    onlyTrending(trending: boolean): LabelsQuery {
        this.trending = trending;
        return this;
    }

    /**
     * Get labels followed by a specific user.
     *
     * @param {UserId} id User ID.
     * @return {LabelsQuery} same query.
     */
    followedBy(id: UserId): LabelsQuery {
        this.follower = id;
        return this;
    }

    /**
     * Generates JSON string.
     * @return {string} object as json.
     */
    toJSON() {
        return {followerId: this.follower, query: this.searchTerm, trending: this.trending};
    }
}
