import Chat from './../../../models/communities/Chat.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('chat.json');
const chat = new Chat(JSON.parse(testData));
test('parsed Activity object properties must match', () => {
    expect(chat.id).toBe('chatid');
    expect(chat.avatarUrl).toBe('avatar');
    expect(chat.createdAt).toBe(1234);
    expect(chat.membersCount).toBe(3);
    expect(chat.title).toBe('chatwithuser');
    expect(chat.updatedAt).toBe(12345);

    const otherMember = chat.otherMember;
    expect(otherMember.userId).toBe('userid');
    expect(otherMember.avatarUrl).toBe('avatarurl');
    expect(otherMember.displayName).toBe('testuser');
    expect(otherMember.identities['fb']).toBe('token');
    expect(otherMember.publicProperties['publickey']).toBe('publicvalue');
    expect(otherMember.isVerified).toBe(true);

    const message = chat.lastMessage;
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
