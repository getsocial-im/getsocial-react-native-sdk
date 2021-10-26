import ChatMessage from './../../../models/communities/ChatMessage.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('chatmessage.json');
const message = new ChatMessage(JSON.parse(testData));
test('parsed ChatMessage object properties must match', () => {
    expect(message.id).toBe('messageid');
    expect(message.text).toBe('hello');
    expect(message.properties['messagekey']).toBe('messagevalue');
    expect(message.sentAt).toBe(12345);

    const attachments = message.attachments;
    const attachment1 = attachments[0];
    expect(attachment1.getImageUrl()).toBe('imageurl');

    const attachment2 = attachments[1];
    expect(attachment2.getImageUrl()).toBe('imageurl2');

    const author = message.author;
    expect(author.userId).toBe('userid');
    expect(author.avatarUrl).toBe('avatarurl');
    expect(author.displayName).toBe('testuser');
    expect(author.identities['fb']).toBe('token');
    expect(author.publicProperties['publickey']).toBe('publicvalue');
    expect(author.isVerified).toBe(true);
});
