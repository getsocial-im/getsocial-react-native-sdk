import ConflictUser from './../../../models/communities/ConflictUser.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('conflictuser.json');
const user = new ConflictUser(JSON.parse(testData));
test('parsed ConflictUser object properties must match', () => {
    expect(user.userId).toBe('userid');
    expect(user.avatarUrl).toBe('avatarurl');
    expect(user.displayName).toBe('testuser');
    expect(user.identities['fb']).toBe('token');
    expect(user.publicProperties['publickey']).toBe('publicvalue');
    expect(user.isVerified).toBe(false);
});
