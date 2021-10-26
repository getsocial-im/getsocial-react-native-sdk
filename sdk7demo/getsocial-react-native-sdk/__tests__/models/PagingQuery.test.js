/* eslint-disable no-undef */
import PagingQuery from './../../models/PagingQuery.js';
import ActivitiesQuery from './../../models/communities/ActivitiesQuery.js';
const {readEncodedObject} = require('./../utils/TestUtils.test.js');

// Test empty query
const query = new PagingQuery();
query.limit = 123;
query.next = 'next';
const json = JSON.stringify(query);
// test RN json only
const jsonResult = '{"limit":123,"next":"next"}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test with activitiesquery
const query2 = ActivitiesQuery.timeline();

const pagingQuery = new PagingQuery(query2);
pagingQuery.limit = 5;
pagingQuery.next = 'nc';
const json2 = JSON.stringify(pagingQuery);
const jsonResult2 = readEncodedObject('pagingquery', 'pagingquery.json');
test('pagingQuery.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

