/* eslint-disable max-len */
/* eslint-disable no-undef */
import ActivitiesQuery from './../../../models/communities/ActivitiesQuery.js';
import PollStatus from './../../../models/communities/PollStatus.js';
import UserId from './../../../models/UserId.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

const userId = UserId.create('test');

// Test .feedOf
const feedOfQuery = ActivitiesQuery.feedOf(userId);
const json = JSON.stringify(feedOfQuery);
const jsonResult = readEncodedObject('activitiesquery', 'activitiesquery_feedof.json');
test('feedOfQuery.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test .feedOf + tag
let feedOfQuery2 = ActivitiesQuery.feedOf(userId);
feedOfQuery2 = feedOfQuery2.withTag('tag');
const json2 = JSON.stringify(feedOfQuery2);
const jsonResult2 = readEncodedObject('activitiesquery', 'activitiesquery_feedof_with_tag.json');
test('feedOfQuery2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test .inTopic
const topicQuery = ActivitiesQuery.inTopic('topicId');
const topicJson = JSON.stringify(topicQuery);
const topicJsonResult = readEncodedObject('activitiesquery', 'activitiesquery_intopic.json');
test('topicQuery.toJSON() result shall be', () => {
    expect(topicJson).toBe(topicJsonResult);
});

// Test .inTopic + author
let topicQuery2 = ActivitiesQuery.inTopic('topicId');
topicQuery2 = topicQuery2.byUser(userId);
const topicJson2 = JSON.stringify(topicQuery2);
const topicJsonResult2 = readEncodedObject('activitiesquery', 'activitiesquery_intopic_byuser.json');
test('topicQuery2.toJSON() result shall be', () => {
    expect(topicJson2).toBe(topicJsonResult2);
});

// Test .inAllTopics
const allTopicsQuery = ActivitiesQuery.inAllTopics();
const allTopicsJson = JSON.stringify(allTopicsQuery);
const allTopicsJsonResult = readEncodedObject('activitiesquery', 'activitiesquery_inalltopics.json');
test('allTopicsQuery.toJSON() result shall be', () => {
    expect(allTopicsJson).toBe(allTopicsJsonResult);
});

// Test .inGroup
const groupsQuery = ActivitiesQuery.inGroup('groupId');
const groupsJson = JSON.stringify(groupsQuery);
const groupsJsonResult = readEncodedObject('activitiesquery', 'activitiesquery_ingroup.json');
test('groupsQuery.toJSON() result shall be', () => {
    expect(groupsJson).toBe(groupsJsonResult);
});

// Test .timeline
const timeline = ActivitiesQuery.timeline();
const timelineJson = JSON.stringify(timeline);
const timelineJsonResult = readEncodedObject('activitiesquery', 'activitiesquery_timeline.json');
test('timeline.toJSON() result shall be', () => {
    expect(timelineJson).toBe(timelineJsonResult);
});

// Test .everywhere
const everywhere = ActivitiesQuery.everywhere();
const everywhereJson = JSON.stringify(everywhere);
const everywhereJsonResult = readEncodedObject('activitiesquery', 'activitiesquery_everywhere.json');
test('everywhere.toJSON() result shall be', () => {
    expect(everywhereJson).toBe(everywhereJsonResult);
});

// Test .comments
const comments = ActivitiesQuery.commentsToActivity('activityId');
const commentsJson = JSON.stringify(comments);
const commentsJsonResult = readEncodedObject('activitiesquery', 'activitiesquery_comments.json');
test('comments.toJSON() result shall be', () => {
    expect(commentsJson).toBe(commentsJsonResult);
});

// Test .inTopic + All Poll Status
const pollQuery = ActivitiesQuery.inTopic('topicId').withPollStatus(PollStatus.All);
const pollQueryJson = JSON.stringify(pollQuery);
const pollQueryJsonResult = readEncodedObject('activitiesquery', 'activitiesquery_intopic_with_pollstatus_all.json');
test('pollQuery.toJSON() result shall be', () => {
    expect(pollQueryJson).toBe(pollQueryJsonResult);
});

// Test .inTopic + Not Voted Poll Status
const pollQueryNV = ActivitiesQuery.inTopic('topicId').withPollStatus(PollStatus.NotVotedByMe);
const pollQueryJsonNV = JSON.stringify(pollQueryNV);
const pollQueryJsonResultNV = readEncodedObject('activitiesquery', 'activitiesquery_intopic_with_pollstatus_notvoted.json');
test('pollQueryNV.toJSON() result shall be', () => {
    expect(pollQueryJsonNV).toBe(pollQueryJsonResultNV);
});

// Test .inTopic + Voted Poll Status
const pollQueryV = ActivitiesQuery.inTopic('topicId').withPollStatus(PollStatus.VotedByMe);
const pollQueryJsonV = JSON.stringify(pollQueryV);
const pollQueryJsonResultV = readEncodedObject('activitiesquery', 'activitiesquery_intopic_with_pollstatus_voted.json');
test('pollQueryV.toJSON() result shall be', () => {
    expect(pollQueryJsonV).toBe(pollQueryJsonResultV);
});
