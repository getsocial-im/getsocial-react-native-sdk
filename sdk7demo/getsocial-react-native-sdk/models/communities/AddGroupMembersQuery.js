/* eslint-disable max-len */
// @flow

import UserIdList from '../UserIdList.js';
import UpdateGroupMembersQuery from './UpdateGroupMembersQuery.js';

/**
 * AddGroupMembersQuery object.
 */
export default class AddGroupMembersQuery {
     internalQuery: UpdateGroupMembersQuery;

     // eslint-disable-next-line require-jsdoc
     constructor(query: UpdateGroupMembersQuery) {
         this.internalQuery = query;
     }

     /**
    * Create query to add users to a group.
    *
    * @param {string} groupId         Id of group to add members to.
    * @param {UserIdList} userIdList  Users to add to group.
    * @return {AddGroupMembersQuery}  new instance.
    */
     static create(groupId: string, userIdList: UserIdList): AddGroupMembersQuery {
         const uQuery = UpdateGroupMembersQuery.create(groupId, userIdList);
         const instance = new AddGroupMembersQuery(uQuery);
         return instance;
     }

     /**
     * Define role for users.
     * @param {Role} role   Default role of users.
     * @return {UpdateGroupMembersQuery} Updated query.
     */
     withRole(role: number): AddGroupMembersQuery {
         this.internalQuery.role = role;
         return this;
     }

     /**
     * Define status for users.
     * @param {MemberStatus} memberStatus   Default status of users.
     * @return {UpdateGroupMembersQuery} Updated query.
     */
     withMemberStatus(memberStatus: number): AddGroupMembersQuery {
         this.internalQuery.status = memberStatus;
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
