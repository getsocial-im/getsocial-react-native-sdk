/* eslint-disable no-undef */
import ChatId from './../../../models/communities/ChatId.js';
import ChatMessagesQuery from './../../../models/communities/ChatMessagesQuery.js';
import ChatMessagesPagingQuery from './../../../models/communities/ChatMessagesPagingQuery.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

const chatId = ChatId.create('hello');
const query = ChatMessagesQuery.messagesInChat(chatId);

// Test default
const pagingQuery = new ChatMessagesPagingQuery(query);
pagingQuery.limit = 12;
const json = JSON.stringify(pagingQuery);
const jsonResult = readEncodedObject('chatmessagespagingquery', 'chatmessagespagingquery.json');
test('pagingQuery.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test next messages
const pagingQuery2 = new ChatMessagesPagingQuery(query);
pagingQuery2.next = 'givemenext';
const json2 = JSON.stringify(pagingQuery2);
const jsonResult2 = readEncodedObject('chatmessagespagingquery', 'chatmessagespagingquery_next.json');
test('pagingQuery2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test previous messages
const pagingQuery3 = new ChatMessagesPagingQuery(query);
pagingQuery3.previous = 'giveprevious';

const json3 = JSON.stringify(pagingQuery3);
const jsonResult3 = readEncodedObject('chatmessagespagingquery', 'chatmessagespagingquery_previous.json');
test('pagingQuery3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});
