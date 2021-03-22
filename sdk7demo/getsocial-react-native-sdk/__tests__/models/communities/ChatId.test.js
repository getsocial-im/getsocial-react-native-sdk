/* eslint-disable no-undef */
import ChatId from './../../../models/communities/ChatId.js';
import UserId from './../../../models/UserId.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test string
const chatId = ChatId.create('hello');
const json = JSON.stringify(chatId);
const jsonResult = '{"id":"hello"}';
test('chatId.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('chatid', 'chatid_string.json', json);
});

// Test userId
const chatId2 = ChatId.createWithUserId(UserId.create('bob'));
const json2 = JSON.stringify(chatId2);
const jsonResult2 = '{"userId":{"userId":"bob"}}';
test('chatId2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('chatid', 'chatid_userid.json', json2);
});

