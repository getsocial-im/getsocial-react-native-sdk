import SuggestedFriend from './../../../models/communities/SuggestedFriend.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'suggestedfriend.json');
const user = new SuggestedFriend(JSON.parse(testData));
test('parsed SuggestedFriend object properties must match', () => {
    expect(user.userId).toBe('userid');
    expect(user.avatarUrl).toBe('avatarurl');
    expect(user.displayName).toBe('testuser');
    expect(user.identities['fb']).toBe('token');
    expect(user.publicProperties['publickey']).toBe('publicvalue');
    expect(user.mutualFriendsCount).toBe(123);
});
