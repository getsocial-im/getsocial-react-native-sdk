/* eslint-disable max-len */
// @flow
import UserIdList from './../UserIdList.js';

/**
 * MembersQuery object.
 */
export default class RemoveGroupMembersQuery {
    userIdList: UserIdList;
    groupId: string;

    // eslint-disable-next-line require-jsdoc
    constructor(userIdList: UserIdList, groupId: string) {
        this.userIdList = userIdList;
        this.groupId = groupId;
    }

    /**
     * Create a query to remove members of a group.
     *
     * @param {string} groupId ID of group.
     * @param {UserIdList} userIdList User ids to remove.
     * @return {MembersQuery} new query object.
     */
    static create(groupId: string, userIdList: UserIdList): RemoveGroupMembersQuery {
        return new RemoveGroupMembersQuery(userIdList, groupId);
    }

    /**
    * Generates JSON string.
    * @return {string} object as json.
    */
    toJSON() {
        return {groupId: this.groupId, userIdList: this.userIdList};
    }
}
