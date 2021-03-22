import Membership from './../../../models/communities/Membership.js';
import MemberStatus from './../../../models/communities/MemberStatus.js';
import Role from './../../../models/communities/Role.js';
const {readTestData} = require('./../../utils/TestUtils.test.js');

const testData = readTestData('encodedobjects', 'membership.json');
const membership = new Membership(JSON.parse(testData));
test('parsed Membership object properties must match', () => {
    expect(membership.role).toBe(Role.Member);
    expect(membership.status).toBe(MemberStatus.InvitationPending);
    expect(membership.createdAt).toBe(123);
    expect(membership.invitationToken).toBe('token');
});

