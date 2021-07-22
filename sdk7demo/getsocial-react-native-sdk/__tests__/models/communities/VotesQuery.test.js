/* eslint-disable max-len */
/* eslint-disable no-undef */
import VotesQuery from './../../../models/communities/VotesQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = VotesQuery.forActivity('activityid');
const json = JSON.stringify(query);
const jsonResult = '{"ids":{"ids":["activityid"],"type":6}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('votesquery', 'votesquery.json', json);
});

// Test with specific vote
let query2 = VotesQuery.forActivity('activity');
query2 = query2.withPollOptionId('hate');
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"ids":{"ids":["activity"],"type":6},"pollOptionId":"hate"}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('votesquery', 'votesquery_vote.json', json2);
});
