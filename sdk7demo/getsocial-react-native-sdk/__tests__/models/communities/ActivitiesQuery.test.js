/* eslint-disable max-len */
/* eslint-disable no-undef */
import ActivitiesQuery from './../../../models/communities/ActivitiesQuery.js';
import UserId from './../../../models/UserId.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const userId = UserId.create('test');

// Test .feedOf
const feedOfQuery = ActivitiesQuery.feedOf(userId);
const json = JSON.stringify(feedOfQuery);
const jsonResult = '{"ids":{"ids":["test"],"type":4}}';
test('feedOfQuery.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('activitiesquery', 'activitiesquery_feedof.json', json);
});

// Test .feedOf + tag
let feedOfQuery2 = ActivitiesQuery.feedOf(userId);
feedOfQuery2 = feedOfQuery2.withTag('tag');
const json2 = JSON.stringify(feedOfQuery2);
const jsonResult2 = '{"ids":{"ids":["test"],"type":4},"tag":"tag"}';
test('feedOfQuery2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('activitiesquery', 'activitiesquery_feedof_tag.json', json2);
});

// Test .inTopic
const topicQuery = ActivitiesQuery.inTopic('topicId');
const topicJson = JSON.stringify(topicQuery);
const topicJsonResult = '{"ids":{"ids":["topicId"],"type":2}}';
test('topicQuery.toJSON() result shall be', () => {
    expect(topicJson).toBe(topicJsonResult);
    saveResult('activitiesquery', 'activitiesquery_intopic.json', topicJson);
});

// Test .inTopic + author
let topicQuery2 = ActivitiesQuery.inTopic('topicId');
topicQuery2 = topicQuery2.byUser(userId);
const topicJson2 = JSON.stringify(topicQuery2);
const topicJsonResult2 = '{"ids":{"ids":["topicId"],"type":2},"author":{"userId":"test"}}';
test('topicQuery2.toJSON() result shall be', () => {
    expect(topicJson2).toBe(topicJsonResult2);
    saveResult('activitiesquery', 'activitiesquery_intopic_author.json', topicJson2);
});

// Test .inAllTopics
const allTopicsQuery = ActivitiesQuery.inAllTopics();
const allTopicsJson = JSON.stringify(allTopicsQuery);
const allTopicsJsonResult = '{"ids":{"ids":[],"type":2}}';
test('allTopicsQuery.toJSON() result shall be', () => {
    expect(allTopicsJson).toBe(allTopicsJsonResult);
    saveResult('activitiesquery', 'activitiesquery_inalltopics.json', allTopicsJson);
});

// Test .inGroup
const groupsQuery = ActivitiesQuery.inGroup('groupId');
const groupsJson = JSON.stringify(groupsQuery);
const groupsJsonResult = '{"ids":{"ids":["groupId"],"type":3}}';
test('groupsQuery.toJSON() result shall be', () => {
    expect(groupsJson).toBe(groupsJsonResult);
    saveResult('activitiesquery', 'activitiesquery_ingroup.json', groupsJson);
});

// Test .timeline
const timeline = ActivitiesQuery.timeline();
const timelineJson = JSON.stringify(timeline);
const timelineJsonResult = '{"ids":{"ids":["timeline"],"type":1}}';
test('timeline.toJSON() result shall be', () => {
    expect(timelineJson).toBe(timelineJsonResult);
    saveResult('activitiesquery', 'activitiesquery_timeline.json', timelineJson);
});

// Test .everywhere
const everywhere = ActivitiesQuery.everywhere();
const everywhereJson = JSON.stringify(everywhere);
const everywhereJsonResult = '{"ids":{"ids":[]}}';
test('everywhere.toJSON() result shall be', () => {
    expect(everywhereJson).toBe(everywhereJsonResult);
    saveResult('activitiesquery', 'activitiesquery_everywhere.json', everywhereJson);
});

// Test .comments
const comments = ActivitiesQuery.commentsToActivity('activityId');
const commentsJson = JSON.stringify(comments);
const commentsJsonResult = '{"ids":{"ids":["activityId"],"type":6}}';
test('comments.toJSON() result shall be', () => {
    expect(commentsJson).toBe(commentsJsonResult);
    saveResult('activitiesquery', 'activitiesquery_comments.json', commentsJson);
});
