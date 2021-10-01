/* eslint-disable no-undef */
import PagingQuery from './../../models/PagingQuery.js';
import ActivitiesQuery from './../../models/communities/ActivitiesQuery.js';
const {saveResult} = require('./../utils/TestUtils.test.js');

// Test empty query
const query = new PagingQuery();
query.limit = 123;
query.next = 'next';
const json = JSON.stringify(query);
const jsonResult = '{"next":"next","limit":123}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('pagingquery', 'pagingquery.json', json);
});

// Test with activitiesquery
const query2 = ActivitiesQuery.timeline();

const pagingQuery = new PagingQuery(query2);
pagingQuery.limit = 5;
pagingQuery.next = 'nc';
const json2 = JSON.stringify(pagingQuery);
const jsonResult2 = '{"query":{"ids":{"ids":["timeline"],"type":1},"pollStatus":0,"trending":false},"next":"nc","limit":5}';
test('pagingQuery.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('pagingquery', 'pagingquery_activitiesquery.json', json);
});

