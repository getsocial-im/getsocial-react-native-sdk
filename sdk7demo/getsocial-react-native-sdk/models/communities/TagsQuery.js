/* eslint-disable max-len */
// @flow
import PostActivityTarget from './PostActivityTarget.js';

/**
 * TagsQuery object.
 */
export default class TagsQuery {
    search: string
    target: ?PostActivityTarget;
    trending: boolean = false;

    // eslint-disable-next-line require-jsdoc
    constructor(search: string) {
        this.search = search;
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
     * @return {TagsQuery} New instance.
     */
    inTarget(target: PostActivityTarget): TagsQuery {
        this.target = target;
        return this;
    }

    /**
    * Get only trending tags.
    *
    * @param {boolean} trending Only trending tags or all.
    * @return {TagsQuery} new query.
    */
    onlyTrending(trending: boolean): TagsQuery {
        this.trending = trending;
        return this;
    }

    /**
  * Generates JSON string.
  * @return {string} object as json.
  */
    toJSON() {
        return {query: this.search, target: this.target ?? null, trending: this.trending};
    }
}
