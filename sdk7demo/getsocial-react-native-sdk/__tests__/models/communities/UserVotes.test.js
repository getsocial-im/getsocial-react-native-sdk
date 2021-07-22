import UserVotes from './../../../models/communities/UserVotes.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'uservotes.json');
const uservotes = new UserVotes(JSON.parse(testData));
test('parsed UserVotes object properties must match', () => {
    const voteUser1 = uservotes.user;
    expect(voteUser1.userId).toBe('userId');
    expect(voteUser1.avatarUrl).toBe('avatarUrl');
    expect(voteUser1.displayName).toBe('displayName');
    expect(voteUser1.identities['identity']).toBe('fb');
    expect(voteUser1.publicProperties['propKey']).toBe('propValue');
    expect(voteUser1.isVerified).toBe(true);

    expect(uservotes.votes[0]).toBe('option1');
    expect(uservotes.votes[1]).toBe('option2');
});
