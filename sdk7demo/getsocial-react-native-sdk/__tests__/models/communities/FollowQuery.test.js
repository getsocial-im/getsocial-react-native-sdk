/* eslint-disable max-len */
/* eslint-disable no-undef */
import FollowQuery from './../../../models/communities/FollowQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = FollowQuery.topics(['topicId', 'topicId2']);
const json = JSON.stringify(query);
const jsonResult = '{"ids":{"ids":["topicId","topicId2"],"type":2}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('followquery', 'query.json', json);
});
