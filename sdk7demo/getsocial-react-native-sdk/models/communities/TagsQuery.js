/* eslint-disable max-len */
// @flow
import PostActivityTarget from './PostActivityTarget.js';

/**
 * TagsQuery object.
 */
export default class TagsQuery {
    search: string
    target: ?PostActivityTarget;

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
  * Generates JSON string.
  * @return {string} object as json.
  */
    toJSON() {
        return {query: this.search, target: this.target};
    }
}
