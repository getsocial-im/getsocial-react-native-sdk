import Invite from './../../../models/invites/Invite.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'invite.json');
const invite = new Invite(JSON.parse(testData));
test('parsed Invite object properties must match', () => {
    expect(invite.gifURL).toBe('gifurl');
    expect(invite.imageURL).toBe('imageurl');
    expect(invite.linkParams['linkparamkey']).toBe('linkparamvalue');
    expect(invite.referralURL).toBe('referralurl');
    expect(invite.subject).toBe('subject');
    expect(invite.text).toBe('text');
    expect(invite.userName).toBe('user');
    expect(invite.videoURL).toBe('videourl');
});
