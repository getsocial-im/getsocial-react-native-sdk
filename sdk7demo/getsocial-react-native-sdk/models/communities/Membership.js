// @flow
import Role from './Role.js';
import MemberStatus from './MemberStatus.js';

/**
 * Membership object.
 */
export default class Membership {
    role: Role;
    status: MemberStatus;
    invitationToken: ?string;
    createdAt: number;

    // eslint-disable-next-line require-jsdoc
    constructor(membershipMap: any) {
        this.role = membershipMap['role'];
        this.status = membershipMap['status'];
        this.invitationToken = membershipMap['invitationToken'];
        this.createdAt = membershipMap['createdAt'];
        Object.freeze(this);
    }
}
