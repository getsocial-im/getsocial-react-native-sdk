/* eslint-disable no-undef */
import UserId from './../../models/UserId.js';
const {readEncodedObject} = require('./../utils/TestUtils.test.js');

// Test basic
const userId = UserId.create('bob');
const json = JSON.stringify(userId);
const jsonResult = readEncodedObject('userid', 'userid.json');
test('userId.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test with provider
const userId2 = UserId.createWithProvider('aws', 'bob');
const json2 = JSON.stringify(userId2);
const jsonResult2 = readEncodedObject('userid', 'userid_with_provider.json');
test('userId2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

