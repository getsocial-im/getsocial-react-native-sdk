/* eslint-disable max-len */
/* eslint-disable no-undef */
import VotesQuery from './../../../models/communities/VotesQuery.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test
const query = VotesQuery.forActivity('activityid');
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('votesquery', 'votesquery.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test with specific vote
let query2 = VotesQuery.forActivity('activityid');
query2 = query2.withPollOptionId('hate');
const json2 = JSON.stringify(query2);
const jsonResult2 = readEncodedObject('votesquery', 'votesquery_with_vote.json');
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});
