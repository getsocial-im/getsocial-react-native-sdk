import InviteChannel from './../../../models/invites/InviteChannel.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'invitechannel.json');
const channel = new InviteChannel(JSON.parse(testData));
test('parsed InviteChannel object properties must match', () => {
    expect(channel.channelId).toBe('fb');
    expect(channel.displayOrder).toBe(4);
    expect(channel.iconUrl).toBe('randomiconurl');
    expect(channel.name).toBe('channel');
});
