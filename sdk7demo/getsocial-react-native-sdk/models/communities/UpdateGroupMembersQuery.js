/* eslint-disable max-len */
// @flow
import UserIdList from '../UserIdList.js';
import Role from './Role.js';
import MemberStatus from './MemberStatus.js';

/**
 * UpdateGroupMembersQuery object.
 */
export default class UpdateGroupMembersQuery {
    groupId: string;
    userIdList: UserIdList;
    role: number = Role.Member;
    status: number = MemberStatus.Member;
    invitationToken: ?string;

    // eslint-disable-next-line require-jsdoc
    constructor(groupId: string, userIdList: UserIdList) {
        this.groupId = groupId;
        this.userIdList = userIdList;
    }

    /**
    * Create query to add users to a group.
    *
    * @param {string} groupId         Id of group to add members to.
    * @param {UserIdList} userIdList  List of user to add to group.
    * @return {UpdateGroupMembersQuery}  new instance.
    */
    static create(groupId: string, userIdList: UserIdList): UpdateGroupMembersQuery {
        return new UpdateGroupMembersQuery(groupId, userIdList);
    }

    /**
     * Define role for users.
     * @param {Role} role   Default role of users.
     * @return {UpdateGroupMembersQuery} Updated query.
     */
    withRole(role: number): UpdateGroupMembersQuery {
        this.role = role;
        return this;
    }

    /**
     * Define status for users.
     * @param {MemberStatus} memberStatus   Default status of users.
     * @return {UpdateGroupMembersQuery} Updated query.
     */
    withMemberStatus(memberStatus: number): UpdateGroupMembersQuery {
        this.status = memberStatus;
        return this;
    }

    /**
    * Generates JSON string.
    * @return {string} object as json.
    */
    toJSON() {
        return {groupId: this.groupId, invitationToken: this.invitationToken ?? null, role: this.role, status: this.status, userIdList: this.userIdList};
    }
}
