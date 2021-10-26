import User from './../../../models/communities/User.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('user.json');
const user = new User(JSON.parse(testData));
test('parsed User object properties must match', () => {
    expect(user.userId).toBe('userid');
    expect(user.avatarUrl).toBe('avatarurl');
    expect(user.displayName).toBe('testuser');
    expect(user.identities['fb']).toBe('token');
    expect(user.publicProperties['publickey']).toBe('publicvalue');
    expect(user.isVerified).toBe(true);
});
