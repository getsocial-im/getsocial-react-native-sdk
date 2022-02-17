/* eslint-disable max-len */
// @flow
import UserId from '../UserId.js';
import PostActivityTarget from './PostActivityTarget.js';

/**
 * TagsQuery object.
 */
export default class TagsQuery {
    search: string
    target: ?PostActivityTarget;
    trending: boolean = false;
    follower: ?UserId;

    // eslint-disable-next-line require-jsdoc
    constructor(search: string) {
        this.search = search || null;
    }

    /**
     * All tags.
     * @return {TagsQuery} New instance.
     */
    static all(): TagsQuery {
        return new TagsQuery();
    }

    /**
     * Search for a specific tag.
     * @param {string} searchTerm Search term.
     * @return {TagsQuery} New instance.
     */
    static search(searchTerm: string): TagsQuery {
        return new TagsQuery(searchTerm);
    }

    /**
     * Filter in which target execute the search.
     * @param {PostActivityTarget} target Search target.
     * @return {TagsQuery} same instance.
     */
    inTarget(target: PostActivityTarget): TagsQuery {
        this.target = target;
        return this;
    }

    /**
    * Get only trending tags.
    *
    * @param {boolean} trending Only trending tags or all.
    * @return {TagsQuery} same query.
    */
    onlyTrending(trending: boolean): TagsQuery {
        this.trending = trending;
        return this;
    }

    /**
     * Get tags followed by a specific user.
     *
     * @param {UserId} id User ID.
     * @return {TagsQuery} same query.
     */
    followedBy(id: UserId): TagsQuery {
        this.follower = id;
        return this;
    }

    /**
  * Generates JSON string.
  * @return {string} object as json.
  */
    toJSON() {
        return {followerId: this.follower ?? null, query: this.search, target: this.target ?? null, trending: this.trending};
    }
}
