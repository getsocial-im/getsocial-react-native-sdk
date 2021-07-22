/* eslint-disable max-len */
/* eslint-disable no-undef */
import AnnouncementsQuery from './../../../models/communities/AnnouncementsQuery.js';
import PollStatus from './../../../models/communities/PollStatus.js';
import UserId from './../../../models/UserId.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const userId = UserId.create('test');

// Test forFeedOf
const query = AnnouncementsQuery.forFeedOf(userId);
const json = JSON.stringify(query);
const jsonResult = '{"ids":{"ids":["test"],"type":4},"pollStatus":0}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('announcementsquery', 'announcementsquery_feedof.json', json);
});

// Test inTopic
const inTopic = AnnouncementsQuery.inTopic('topicid');
const json2 = JSON.stringify(inTopic);
const jsonResult2 = '{"ids":{"ids":["topicid"],"type":2},"pollStatus":0}';
test('inTopic.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('announcementsquery', 'announcementsquery_intopic.json', json2);
});

// Test inGroup
const inGroup = AnnouncementsQuery.inGroup('groupid');
const json3 = JSON.stringify(inGroup);
const jsonResult3 = '{"ids":{"ids":["groupid"],"type":3},"pollStatus":0}';
test('inGroup.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('announcementsquery', 'announcementsquery_ingroup.json', json3);
});

// Test timeline
const timeline = AnnouncementsQuery.timeline();
const json4 = JSON.stringify(timeline);
const jsonResult4 = '{"ids":{"ids":["timeline"],"type":1},"pollStatus":0}';
test('timeline.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('announcementsquery', 'announcementsquery_timeline.json', json4);
});

// Test .inTopic + All Poll Status
const pollQuery = AnnouncementsQuery.inTopic('topicId').withPollStatus(PollStatus.All);
const pollQueryJson = JSON.stringify(pollQuery);
const pollQueryJsonResult = '{"ids":{"ids":["topicId"],"type":2},"pollStatus":0}';
test('pollQuery.toJSON() result shall be', () => {
    expect(pollQueryJson).toBe(pollQueryJsonResult);
    saveResult('announcementsquery', 'announcementsquery_intopic_poll_all.json', pollQueryJson);
});

// Test .inTopic + Not Voted Poll Status
const pollQueryNV = AnnouncementsQuery.inTopic('topicId').withPollStatus(PollStatus.NotVotedByMe);
const pollQueryJsonNV = JSON.stringify(pollQueryNV);
const pollQueryJsonResultNV = '{"ids":{"ids":["topicId"],"type":2},"pollStatus":3}';
test('pollQueryNV.toJSON() result shall be', () => {
    expect(pollQueryJsonNV).toBe(pollQueryJsonResultNV);
    saveResult('announcementsquery', 'announcementsquery_intopic_poll_not_voted.json', pollQueryJsonNV);
});

// Test .inTopic + Voted Poll Status
const pollQueryV = AnnouncementsQuery.inTopic('topicId').withPollStatus(PollStatus.VotedByMe);
const pollQueryJsonV = JSON.stringify(pollQueryV);
const pollQueryJsonResultV = '{"ids":{"ids":["topicId"],"type":2},"pollStatus":2}';
test('pollQueryV.toJSON() result shall be', () => {
    expect(pollQueryJsonV).toBe(pollQueryJsonResultV);
    saveResult('announcementsquery', 'announcementsquery_intopic_poll_voted.json', pollQueryJsonV);
});