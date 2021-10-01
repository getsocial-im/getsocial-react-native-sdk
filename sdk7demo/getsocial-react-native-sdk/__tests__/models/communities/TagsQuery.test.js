/* eslint-disable max-len */
/* eslint-disable no-undef */
import TagsQuery from './../../../models/communities/TagsQuery.js';
import PostActivityTarget from './../../../models/communities/PostActivityTarget.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = TagsQuery.search('#hello');
const json = JSON.stringify(query);
const jsonResult = '{"query":"#hello","trending":false}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('tagsquery', 'tagsquery.json', json);
});

let query2 = TagsQuery.search('#hello');
query2 = query2.inTarget(PostActivityTarget.topic('topicid'));
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"query":"#hello","target":{"ids":{"ids":["topicid"],"type":2}},"trending":false}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('tagsquery', 'tagsquery_intarget.json', json2);
});
