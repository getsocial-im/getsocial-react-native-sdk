/* eslint-disable max-len */
/* eslint-disable no-undef */
import TopicsQuery from './../../../models/communities/TopicsQuery.js';
import UserId from './../../../models/UserId.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

const userId = UserId.create('test');

// Test .all
const query = TopicsQuery.all();
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('topicsquery', 'topicsquery_all.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test .find
const query2 = TopicsQuery.find('best');
const json2 = JSON.stringify(query2);
const jsonResult2 = readEncodedObject('topicsquery', 'topicsquery_find.json');
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test .followedBy
let query3 = TopicsQuery.all();
query3 = query3.followedBy(userId);

const json3 = JSON.stringify(query3);
const jsonResult3 = readEncodedObject('topicsquery', 'topicsquery_followedby.json');
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test .onlyTrending
let query4 = TopicsQuery.all();
query4 = query4.onlyTrending(true);

const json4 = JSON.stringify(query4);
const jsonResult4 = readEncodedObject('topicsquery', 'topicsquery_onlytrending.json');
test('query4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});
