/* eslint-disable max-len */
/* eslint-disable no-undef */
import AnnouncementsQuery from './../../../models/communities/AnnouncementsQuery.js';
import UserId from './../../../models/UserId.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const userId = UserId.create('test');

// Test forFeedOf
const query = AnnouncementsQuery.forFeedOf(userId);
const json = JSON.stringify(query);
const jsonResult = '{"ids":{"ids":["test"],"type":4}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('announcementsquery', 'announcementsquery_feedof.json', json);
});

// Test inTopic
const inTopic = AnnouncementsQuery.inTopic('topicid');
const json2 = JSON.stringify(inTopic);
const jsonResult2 = '{"ids":{"ids":["topicid"],"type":2}}';
test('inTopic.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('announcementsquery', 'announcementsquery_intopic.json', json2);
});

// Test inGroup
const inGroup = AnnouncementsQuery.inGroup('groupid');
const json3 = JSON.stringify(inGroup);
const jsonResult3 = '{"ids":{"ids":["groupid"],"type":3}}';
test('inGroup.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('announcementsquery', 'announcementsquery_ingroup.json', json3);
});

// Test timeline
const timeline = AnnouncementsQuery.timeline();
const json4 = JSON.stringify(timeline);
const jsonResult4 = '{"ids":{"ids":["timeline"],"type":1}}';
test('timeline.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('announcementsquery', 'announcementsquery_timeline.json', json4);
});
