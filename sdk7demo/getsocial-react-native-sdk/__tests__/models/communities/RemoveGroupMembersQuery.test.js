/* eslint-disable max-len */
/* eslint-disable no-undef */
import RemoveGroupMembersQuery from './../../../models/communities/RemoveGroupMembersQuery.js';
import UserIdList from './../../../models/UserIdList.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test
const query = RemoveGroupMembersQuery.create('groupid', UserIdList.create(['userid', 'userid2']));
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('removegroupmembersquery', 'removegroupmembersquery.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});
