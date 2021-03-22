import GroupMember from './../../../models/communities/GroupMember.js';
import Role from './../../../models/communities/Role.js';
import MemberStatus from './../../../models/communities/MemberStatus.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'groupmember.json');
const member = new GroupMember(JSON.parse(testData));
test('parsed GroupMember object properties must match', () => {
    expect(member.userId).toBe('userid');
    expect(member.avatarUrl).toBe('avatarurl');
    expect(member.displayName).toBe('testuser');
    expect(member.identities['fb']).toBe('token');
    expect(member.publicProperties['publickey']).toBe('publicvalue');

    const membership = member.membership;
    expect(membership.role).toBe(Role.Member);
    expect(membership.status).toBe(MemberStatus.InvitationPending);
    expect(membership.createdAt).toBe(123);
    expect(membership.invitationToken).toBe('token');
});
