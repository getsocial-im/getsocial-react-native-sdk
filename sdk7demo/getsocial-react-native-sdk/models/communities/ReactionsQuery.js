// @flow
import CommunitiesIds from './CommunitiesIds.js';

/**
 * ReactionsQuery object.
 */
export default class ReactionsQuery {
    ids: CommunitiesIds;
    reaction: ?string;

    // eslint-disable-next-line require-jsdoc
    constructor(ids: CommunitiesIds) {
        this.ids = ids;
    }

    /**
  * Get all users reacted to activity with ID.
   *
   * @param {string} id ID of activity.
   * @return {ReactionsQuery} new query object.
   */
    static forActivity(id: string): ReactionsQuery {
        return new ReactionsQuery(CommunitiesIds.activity(id));
    }

    /**
   * Get only users reacted with specific reaction.
   *
   * @param {string} reaction name of the reaction to filter by.
   * @return {ReactionsQuery} the same query instance.
   */
    withReaction(reaction: string): ReactionsQuery {
        this.reaction = reaction;
        return this;
    }
}
