/* eslint-disable max-len */
// @flow
import CommunitiesIds from './CommunitiesIds.js';
import CommunitiesEntityType from './CommunitiesEntityType.js';
import UserId from '../UserId.js';

/**
 * PostActivityTarget object.
 */
export default class PostActivityTarget {
    ids: CommunitiesIds

    // eslint-disable-next-line require-jsdoc
    constructor(ids: CommunitiesIds) {
        this.ids = ids;
    }

    /**
   * Post activity in topic.
   *
   * @param {string} id ID of topic to be posted in.
   * @return {PostActivityTarget} new instance.
   */
    static topic(id: string): PostActivityTarget {
        return new PostActivityTarget(CommunitiesIds.topic(id));
    }

    /**
   * Post activity in group.
   *
   * @param {string} id ID of group to be posted in.
   * @return {PostActivityTarget} new instance.
   */
    static group(id: string): PostActivityTarget {
        return new PostActivityTarget(CommunitiesIds.group(id));
    }

    /**
   * Post comment to the activity.
   *
   * @param {string} activityId ID of activity to be commented.
   * @return {PostActivityTarget} new instance.
   */
    static comment(activityId: string): PostActivityTarget {
        return new PostActivityTarget(CommunitiesIds.activity(activityId));
    }

    /**
   * Post to the feed of current user.
   *
   * @return {PostActivityTarget} new instance.
   */
    static timeline(): PostActivityTarget {
        return new PostActivityTarget(CommunitiesIds.user(UserId.currentUser()));
    }

    // eslint-disable-next-line require-jsdoc
    getType(): number {
        return this.ids.type ?? CommunitiesEntityType.Unknown;
    }

    // eslint-disable-next-line require-jsdoc
    getTargetId(): string {
        if (this.ids.ids.length == 0) {
            return '';
        }
        return this.ids.ids[0];
    }
}
