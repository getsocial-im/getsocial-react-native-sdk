/* eslint-disable no-undef */
import ChatId from './../../../models/communities/ChatId.js';
import ChatMessagesQuery from './../../../models/communities/ChatMessagesQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const chatId = ChatId.create('hello');
const query = ChatMessagesQuery.messagesInChat(chatId);
const json = JSON.stringify(query);
const jsonResult = '{"chatId":{"id":"hello"}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('chatmessagesquery', 'chatmessagesquery.json', json);
});

