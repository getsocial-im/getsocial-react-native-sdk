/* eslint-disable max-len */
/* eslint-disable no-undef */
import RemoveGroupMembersQuery from './../../../models/communities/RemoveGroupMembersQuery.js';
import UserIdList from './../../../models/UserIdList.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = RemoveGroupMembersQuery.create('grooup', UserIdList.create(['activityid', 'activityid2']));
const json = JSON.stringify(query);
const jsonResult = '{"userIdList":{"ids":["activityid","activityid2"]},"groupId":"grooup"}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('removegroupmembersquery', 'removegroupmembersquery.json', json);
});
