/* eslint-disable max-len */
/* eslint-disable no-undef */
import FollowersQuery from './../../../models/communities/FollowersQuery.js';
import UserId from './../../../models/UserId.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test Topic
const query = FollowersQuery.ofTopic('topicId');
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('followersquery', 'followersquery_oftopic.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test Group
const query2 = FollowersQuery.ofGroup('groupId');
const json2 = JSON.stringify(query2);
const jsonResult2 = readEncodedObject('followersquery', 'followersquery_ofgroup.json');
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test User
const query3 = FollowersQuery.ofUser(UserId.create('userId'));
const json3 = JSON.stringify(query3);
const jsonResult3 = readEncodedObject('followersquery', 'followersquery_ofuser.json');
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});
