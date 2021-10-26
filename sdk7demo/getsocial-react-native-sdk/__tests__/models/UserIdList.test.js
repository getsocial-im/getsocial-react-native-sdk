/* eslint-disable no-undef */
import UserIdList from './../../models/UserIdList.js';
const {readEncodedObject} = require('./../utils/TestUtils.test.js');

// Test basic
const userIdList = UserIdList.create(['bob', 'jay']);
const json = JSON.stringify(userIdList);
const jsonResult = readEncodedObject('useridlist', 'useridlist.json');
test('userIdList.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test with provider
const userIdList2 = UserIdList.createWithProvider('aws', ['bob', 'jay']);
const json2 = JSON.stringify(userIdList2);
const jsonResult2 = readEncodedObject('useridlist', 'useridlist_with_provider.json');
test('userIdList2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

