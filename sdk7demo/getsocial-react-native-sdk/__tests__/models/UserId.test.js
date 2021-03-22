/* eslint-disable no-undef */
import UserId from './../../models/UserId.js';
const {saveResult} = require('./../utils/TestUtils.test.js');

// Test basic
const userId = UserId.create('bob');
const json = JSON.stringify(userId);
const jsonResult = '{"userId":"bob"}';
test('userId.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('userid', 'userid.json', json);
});

// Test with provider
const userId2 = UserId.createWithProvider('aws', 'bob');
const json2 = JSON.stringify(userId2);
const jsonResult2 = '{"userId":"bob","providerId":"aws"}';
test('userId2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('userid', 'userid_provider.json', json2);
});

