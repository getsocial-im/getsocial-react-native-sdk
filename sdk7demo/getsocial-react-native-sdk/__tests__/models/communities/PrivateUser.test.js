import CurrentUser from './../../../CurrentUser.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('privateuser.json');
const user = new CurrentUser(testData);
test('parsed CurrentUser object properties must match', () => {
    expect(user.id).toBe('userid');
    expect(user.avatarUrl).toBe('avatarurl');
    expect(user.displayName).toBe('testuser');
    expect(user.identities['fb']).toBe('token');
    expect(user.publicProperties['publickey']).toBe('publicvalue');
    expect(user.privateProperties['privatekey']).toBe('privatevalue');
});
