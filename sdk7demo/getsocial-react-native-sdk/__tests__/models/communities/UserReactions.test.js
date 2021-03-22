import UserReactions from './../../../models/communities/UserReactions.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'userreactions.json');
const userreaction = new UserReactions(JSON.parse(testData));
test('parsed UserReactions object properties must match', () => {
    const reactionUser1 = userreaction.user;
    expect(reactionUser1.userId).toBe('userId');
    expect(reactionUser1.avatarUrl).toBe('avatarUrl');
    expect(reactionUser1.displayName).toBe('displayName');
    expect(reactionUser1.identities['identity']).toBe('fb');
    expect(reactionUser1.publicProperties['propKey']).toBe('propValue');
    expect(reactionUser1.isVerified).toBe(true);

    expect(userreaction.reactions[0]).toBe('like');
    expect(userreaction.reactions[1]).toBe('wow');
});
