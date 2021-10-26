/* eslint-disable max-len */
/* eslint-disable no-undef */
import AnnouncementsQuery from './../../../models/communities/AnnouncementsQuery.js';
import PollStatus from './../../../models/communities/PollStatus.js';
import UserId from './../../../models/UserId.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

const userId = UserId.create('test');

// Test forFeedOf
const query = AnnouncementsQuery.forFeedOf(userId);
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('announcementsquery', 'announcementsquery_inuserfeed.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test inTopic
const inTopic = AnnouncementsQuery.inTopic('topicid');
const json2 = JSON.stringify(inTopic);
const jsonResult2 = readEncodedObject('announcementsquery', 'announcementsquery_intopic.json');
test('inTopic.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test inGroup
const inGroup = AnnouncementsQuery.inGroup('groupid');
const json3 = JSON.stringify(inGroup);
const jsonResult3 = readEncodedObject('announcementsquery', 'announcementsquery_ingroup.json');
test('inGroup.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test timeline
const timeline = AnnouncementsQuery.timeline();
const json4 = JSON.stringify(timeline);
const jsonResult4 = readEncodedObject('announcementsquery', 'announcementsquery_timeline.json');
test('timeline.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});

// Test .inTopic + All Poll Status
const pollQuery = AnnouncementsQuery.inTopic('topicid').withPollStatus(PollStatus.All);
const pollQueryJson = JSON.stringify(pollQuery);
const pollQueryJsonResult = readEncodedObject('announcementsquery', 'announcementsquery_intopic_with_pollstatus_all.json');
test('pollQuery.toJSON() result shall be', () => {
    expect(pollQueryJson).toBe(pollQueryJsonResult);
});

// Test .inTopic + Not Voted Poll Status
const pollQueryNV = AnnouncementsQuery.inTopic('topicid').withPollStatus(PollStatus.NotVotedByMe);
const pollQueryJsonNV = JSON.stringify(pollQueryNV);
const pollQueryJsonResultNV = readEncodedObject('announcementsquery', 'announcementsquery_intopic_with_pollstatus_notvoted.json');
test('pollQueryNV.toJSON() result shall be', () => {
    expect(pollQueryJsonNV).toBe(pollQueryJsonResultNV);
});

// Test .inTopic + Voted Poll Status
const pollQueryV = AnnouncementsQuery.inTopic('topicid').withPollStatus(PollStatus.VotedByMe);
const pollQueryJsonV = JSON.stringify(pollQueryV);
const pollQueryJsonResultV = readEncodedObject('announcementsquery', 'announcementsquery_intopic_with_pollstatus_voted.json');
test('pollQueryV.toJSON() result shall be', () => {
    expect(pollQueryJsonV).toBe(pollQueryJsonResultV);
});