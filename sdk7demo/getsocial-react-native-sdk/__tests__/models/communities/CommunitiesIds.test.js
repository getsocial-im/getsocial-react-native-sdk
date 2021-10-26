/* eslint-disable no-undef */
import CommunitiesIds from './../../../models/communities/CommunitiesIds.js';
import UserId from './../../../models/UserId.js';
import UserIdList from './../../../models/UserIdList.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test topic
const id = CommunitiesIds.topic('topicid');
const json = JSON.stringify(id);
const jsonResult = readEncodedObject('communitiesid', 'communitiesid_topic.json');
test('id.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test topics
const id2 = CommunitiesIds.topics(['topicid', 'topicid2']);
const json2 = JSON.stringify(id2);
const jsonResult2 = readEncodedObject('communitiesid', 'communitiesid_topics.json');
test('id2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test group
const id3 = CommunitiesIds.group('groupid');
const json3 = JSON.stringify(id3);
const jsonResult3 = readEncodedObject('communitiesid', 'communitiesid_group.json');
test('id3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test groups
const id4 = CommunitiesIds.groups(['groupid', 'groupid2']);
const json4 = JSON.stringify(id4);
const jsonResult4 = readEncodedObject('communitiesid', 'communitiesid_groups.json');
test('id4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});

// Test user
const id5 = CommunitiesIds.user(UserId.create('bob'));
const json5 = JSON.stringify(id5);
const jsonResult5 = readEncodedObject('communitiesid', 'communitiesid_user.json');
test('id5.toJSON() result shall be', () => {
    expect(json5).toBe(jsonResult5);
});

// Test users
const id6 = CommunitiesIds.users(UserIdList.create(['bob', 'jay']));
const json6 = JSON.stringify(id6);
const jsonResult6 = readEncodedObject('communitiesid', 'communitiesid_users.json');
test('id6.toJSON() result shall be', () => {
    expect(json6).toBe(jsonResult6);
});

// Test activity
const id7 = CommunitiesIds.activity('activityid');
const json7 = JSON.stringify(id7);
const jsonResult7 = readEncodedObject('communitiesid', 'communitiesid_activity.json');
test('id7.toJSON() result shall be', () => {
    expect(json7).toBe(jsonResult7);
});

// Test timeline
const id8 = CommunitiesIds.timeline();
const json8 = JSON.stringify(id8);
const jsonResult8 = readEncodedObject('communitiesid', 'communitiesid_timeline.json');
test('id8.toJSON() result shall be', () => {
    expect(json8).toBe(jsonResult8);
});

// Test everywhere
const id9 = CommunitiesIds.everywhere();
const json9 = JSON.stringify(id9);
const jsonResult9 = readEncodedObject('communitiesid', 'communitiesid_everywhere.json');
test('id9.toJSON() result shall be', () => {
    expect(json9).toBe(jsonResult9);
});
