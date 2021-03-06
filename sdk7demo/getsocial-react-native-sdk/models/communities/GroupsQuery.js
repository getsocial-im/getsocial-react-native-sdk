/* eslint-disable max-len */
// @flow
import UserId from './../UserId.js';

/**
 * GroupsQuery object.
 */
export default class GroupsQuery {
    search: ?string;
    followerId: ?UserId;
    memberId: ?UserId;

    /**
    * Get all groups.
    *
    * @return {GroupsQuery} new instance.
    */
    static all(): GroupsQuery {
        const instance = new GroupsQuery();
        return instance;
    }

    /**
    * Find groups by name or description.
    *
    * @param {string} searchTerm groups name/description or part of it.
    * @return {GroupsQuery} new instance.
    */
    static find(searchTerm: string): GroupsQuery {
        const instance = new GroupsQuery();
        instance.search = searchTerm;
        return instance;
    }

    /**
    * Get groups followed by a specific user.
    *
    * @param {UserId} userId ID of user.
    * @return {GroupsQuery} new instance.
    */
    followedBy(userId: UserId): GroupsQuery {
        this.followerId = userId;
        return this;
    }

    /**
    * Get groups by member.
    *
    * @param {UserId} userId ID of user.
    * @return {GroupsQuery} new instance.
    */
    withMember(userId: UserId): GroupsQuery {
        this.memberId = userId;
        return this;
    }

    /**
    * Generates JSON string.
    * @return {string} object as json.
    */
    toJSON() {
        return {searchTerm: this.search, followerId: this.followerId, memberId: this.memberId};
    }
}
