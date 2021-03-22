/* eslint-disable no-undef */
import ChatId from './../../../models/communities/ChatId.js';
import ChatMessagesQuery from './../../../models/communities/ChatMessagesQuery.js';
import ChatMessagesPagingQuery from './../../../models/communities/ChatMessagesPagingQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const chatId = ChatId.create('hello');
const query = ChatMessagesQuery.messagesInChat(chatId);

// Test default
const pagingQuery = new ChatMessagesPagingQuery(query);
pagingQuery.limit = 12;
const json = JSON.stringify(pagingQuery);
const jsonResult = '{"query":{"chatId":{"id":"hello"}},"limit":12}';
test('pagingQuery.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('chatmessagespagingquery', 'chatmessagespagingquery.json', json);
});

// Test next messages
const pagingQuery2 = new ChatMessagesPagingQuery(query);
pagingQuery2.next = 'givemenext';
const json2 = JSON.stringify(pagingQuery2);
const jsonResult2 = '{"query":{"chatId":{"id":"hello"}},"nextMessages":"givemenext","limit":20}';
test('pagingQuery2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('chatmessagespagingquery', 'chatmessagespagingquery_next.json', json2);
});

// Test previous messages
const pagingQuery3 = new ChatMessagesPagingQuery(query);
pagingQuery3.previous = 'givemeprevious';

const json3 = JSON.stringify(pagingQuery3);
const jsonResult3 = '{"query":{"chatId":{"id":"hello"}},"previousMessages":"givemeprevious","limit":20}';
test('pagingQuery3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('chatmessagespagingquery', 'chatmessagespagingquery_previous.json', json3);
});
