/* eslint-disable max-len */
/* eslint-disable no-undef */
import FollowersQuery from './../../../models/communities/FollowersQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = FollowersQuery.ofTopic('topicId');
const json = JSON.stringify(query);
const jsonResult = '{"ids":{"ids":["topicId"],"type":2}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('followersquery', 'query.json', json);
});
