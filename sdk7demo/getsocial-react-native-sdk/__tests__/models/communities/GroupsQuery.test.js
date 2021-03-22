/* eslint-disable max-len */
/* eslint-disable no-undef */
import GroupsQuery from './../../../models/communities/GroupsQuery.js';
import UserId from './../../../models/UserId.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const userId = UserId.create('test');

// Test .all
const query = GroupsQuery.all();
const json = JSON.stringify(query);
const jsonResult = '{}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('groupsquery', 'groupsquery_all.json', json);
});

// Test .find
const query2 = GroupsQuery.find('best');
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"searchTerm":"best"}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('groupsquery', 'groupsquery_find.json', json2);
});

// Test .followedBy
let query3 = GroupsQuery.all();
query3 = query3.followedBy(userId);

const json3 = JSON.stringify(query3);
const jsonResult3 = '{"followerId":{"userId":"test"}}';
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('groupsquery', 'groupsquery_followedby.json', json3);
});

// Test .followedBy
let query4 = GroupsQuery.all();
query4 = query4.withMember(userId);

const json4 = JSON.stringify(query4);
const jsonResult4 = '{"memberId":{"userId":"test"}}';
test('query4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('groupsquery', 'groupsquery_withmember.json', json4);
});
