/* eslint-disable max-len */
/* eslint-disable no-undef */
import TopicsQuery from './../../../models/communities/TopicsQuery.js';
import UserId from './../../../models/UserId.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const userId = UserId.create('test');

// Test .all
const query = TopicsQuery.all();
const json = JSON.stringify(query);
const jsonResult = '{"trending":false}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('topicsquery', 'topicsquery_all.json', json);
});

// Test .find
const query2 = TopicsQuery.find('best');
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"searchTerm":"best","trending":false}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('topicsquery', 'topicsquery_find.json', json2);
});

// Test .followedBy
let query3 = TopicsQuery.all();
query3 = query3.followedBy(userId);

const json3 = JSON.stringify(query3);
const jsonResult3 = '{"followerId":{"userId":"test"},"trending":false}';
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('topicsquery', 'topicsquery_followedby.json', json3);
});
