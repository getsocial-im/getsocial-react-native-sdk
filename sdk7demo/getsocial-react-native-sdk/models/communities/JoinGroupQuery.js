/* eslint-disable max-len */
// @flow
import UserIdList from './../UserIdList.js';
import UpdateGroupMembersQuery from './UpdateGroupMembersQuery.js';
import MemberStatus from './MemberStatus.js';
import Role from './Role.js';

/**
 * JoinGroupQuery object.
 */
export default class JoinGroupQuery {
    internalQuery: UpdateGroupMembersQuery

    // eslint-disable-next-line require-jsdoc
    constructor(query: UpdateGroupMembersQuery) {
        this.internalQuery = query;
    }

    /**
    * Create query to add users to a group.
    *
    * @param {string} groupId         Id of group to add members to.
    * @return {JoinGroupQuery}  new instance.
    */
    static create(groupId: string): JoinGroupQuery {
        let uQuery = UpdateGroupMembersQuery.create(groupId, UserIdList.create(['GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42']));
        uQuery = uQuery.withRole(Role.Member);
        uQuery = uQuery.withMemberStatus(MemberStatus.ApprovalPending);
        const instance = new JoinGroupQuery(uQuery);
        return instance;
    }

    /**
     * Add invitation token.
     * @param {string} token    Invitation token.
     * @return {JoinGroupQuery} Updated query instance.
     */
    withInvitationToken(token: string): JoinGroupQuery {
        this.internalQuery.invitationToken = token;
        return this;
    }

    /**
    * Generates JSON string.
    * @return {string} object as json.
    */
    toJSON() {
        return this.internalQuery;
    }
}
