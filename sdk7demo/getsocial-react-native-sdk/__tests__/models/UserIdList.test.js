/* eslint-disable no-undef */
import UserIdList from './../../models/UserIdList.js';
const {saveResult} = require('./../utils/TestUtils.test.js');

// Test basic
const userIdList = UserIdList.create(['bob', 'jay']);
const json = JSON.stringify(userIdList);
const jsonResult = '{"ids":["bob","jay"]}';
test('userIdList.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('useridlist', 'useridlist.json', json);
});

// Test with provider
const userIdList2 = UserIdList.createWithProvider('aws', ['jay', 'bob']);
const json2 = JSON.stringify(userIdList2);
const jsonResult2 = '{"ids":["jay","bob"],"provider":"aws"}';
test('userIdList2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('useridlist', 'useridlist_provider.json', json2);
});

