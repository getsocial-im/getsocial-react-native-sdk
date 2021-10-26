// @flow
import CommunitiesIds from './CommunitiesIds.js';

/**
 * VotesQuery object.
 */
export default class VotesQuery {
    ids: CommunitiesIds;
    pollOptionId: ?string;

    // eslint-disable-next-line require-jsdoc
    constructor(ids: CommunitiesIds) {
        this.ids = ids;
    }

    /**
  * Get all users voted to activity with ID.
   *
   * @param {string} id ID of activity.
   * @return {VotesQuery} new query object.
   */
    static forActivity(id: string): VotesQuery {
        return new VotesQuery(CommunitiesIds.activity(id));
    }

    /**
   * Get only users reacted with specific poll option.
   *
   * @param {string} pollOptionId id of the poll option to filter by.
   * @return {VotesQuery} the same query instance.
   */
    withPollOptionId(pollOptionId: string): VotesQuery {
        this.pollOptionId = pollOptionId;
        return this;
    }

    /**
  * Generates JSON string.
  * @return {string} object as json.
  */
    toJSON() {
        return {ids: this.ids, pollOptionId: this.pollOptionId ?? null};
    }
}
