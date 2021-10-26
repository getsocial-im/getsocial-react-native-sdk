/* eslint-disable max-len */
/* eslint-disable no-undef */
import ReactionsQuery from './../../../models/communities/ReactionsQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = ReactionsQuery.forActivity('activityid');
const json = JSON.stringify(query);
const jsonResult = '{"ids":{"ids":["activityid"],"type":6}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test with specific reaction
let query2 = ReactionsQuery.forActivity('activity');
query2 = query2.withReaction('hate');
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"ids":{"ids":["activity"],"type":6},"reaction":"hate"}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});
