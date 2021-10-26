/* eslint-disable max-len */
/* eslint-disable no-undef */
import TagsQuery from './../../../models/communities/TagsQuery.js';
import PostActivityTarget from './../../../models/communities/PostActivityTarget.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test
const query = TagsQuery.search('#hello');
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('tagsquery', 'tagsquery.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

let query2 = TagsQuery.search('#hello');
query2 = query2.inTarget(PostActivityTarget.topic('topicid'));
const json2 = JSON.stringify(query2);
const jsonResult2 = readEncodedObject('tagsquery', 'tagsquery_intarget.json');
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

let query3 = TagsQuery.search('#hello');
query3 = query3.onlyTrending(true);
const json3 = JSON.stringify(query3);
const jsonResult3 = readEncodedObject('tagsquery', 'tagsquery_onlytrending.json');
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});
