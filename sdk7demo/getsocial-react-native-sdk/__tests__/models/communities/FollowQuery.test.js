/* eslint-disable max-len */
/* eslint-disable no-undef */
import FollowQuery from './../../../models/communities/FollowQuery.js';
import UserIdList from './../../../models/UserId.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test Topic
const query = FollowQuery.topics(['topicId', 'topicId2']);
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('followquery', 'followquery_topics.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test Group
const query2 = FollowQuery.groups(['groupId', 'groupId2']);
const json2 = JSON.stringify(query2);
const jsonResult2 = readEncodedObject('followquery', 'followquery_groups.json');
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test User
const query3 = FollowQuery.users(UserIdList.create(['userId', 'userId2']));
const json3 = JSON.stringify(query3);
const jsonResult3 = readEncodedObject('followquery', 'followquery_users.json');
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});
