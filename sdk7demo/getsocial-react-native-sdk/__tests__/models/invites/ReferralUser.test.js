import ReferralUser from './../../../models/invites/ReferralUser.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('referraluser.json');
const user = new ReferralUser(JSON.parse(testData));
test('parsed ReferralUser object properties must match', () => {
    expect(user.userId).toBe('userid');
    expect(user.avatarUrl).toBe('avatarurl');
    expect(user.displayName).toBe('testuser');
    expect(user.identities['fb']).toBe('token');
    expect(user.publicProperties['publickey']).toBe('publicvalue');
    expect(user.event).toBe('app_install');
    expect(user.eventDate).toBe(456);
    expect(user.eventData['event']).toBe('data');
});
