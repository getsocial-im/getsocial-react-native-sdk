/* eslint-disable no-undef */
import ChatId from './../../../models/communities/ChatId.js';
import ChatMessagesQuery from './../../../models/communities/ChatMessagesQuery.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test
const chatId = ChatId.create('hello');
const query = ChatMessagesQuery.messagesInChat(chatId);
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('chatmessagesquery', 'chatmessagesquery.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

