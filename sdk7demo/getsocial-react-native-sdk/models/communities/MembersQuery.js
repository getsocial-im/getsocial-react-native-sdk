/* eslint-disable max-len */
// @flow

/**
 * MembersQuery object.
 */
export default class MembersQuery {
    groupId: string;
    role: ?number;
    status: ?number;
    searchTerm: ?string;

    // eslint-disable-next-line require-jsdoc
    constructor(groupId: string) {
        this.groupId = groupId;
    }

    /**
     * Create a query to get members of a group.
     *
     * @param {string} groupId ID of activity.
     * @return {MembersQuery} new query object.
     */
    static ofGroup(groupId: string): MembersQuery {
        return new MembersQuery(groupId);
    }

    /**
     * Filters members by role.
     *
     * @param {number} role Member role.
     * @return {MembersQuery} the same query instance.
     */
    withRole(role: number): MembersQuery {
        this.role = role;
        return this;
    }

    /**
     * Filters members by status.
     *
     * @param {number} status Member status.
     * @return {MembersQuery} the same query instance.
     */
    withStatus(status: number): MembersQuery {
        this.status = status;
        return this;
    }

    /**
     * Filter members by username or displayName.
     *
     * @param {string} searchTerm Beginning of name.
     * @return {MembersQuery} same query.
     */
    withName(searchTerm: string): MembersQuery {
        this.searchTerm = searchTerm;
        return this;
    }

    /**
    * Generates JSON string.
    * @return {string} object as json.
    */
    toJSON() {
        return {groupId: this.groupId, role: this.role ?? null, searchTerm: this.searchTerm ?? null, status: this.status ?? null};
    }
}
