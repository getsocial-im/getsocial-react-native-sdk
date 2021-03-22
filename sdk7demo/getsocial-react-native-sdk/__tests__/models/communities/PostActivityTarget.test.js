/* eslint-disable max-len */
/* eslint-disable no-undef */
import PostActivityTarget from './../../../models/communities/PostActivityTarget.js';
import CommunitiesEntityType from './../../../models/communities/CommunitiesEntityType.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test topic
const query = PostActivityTarget.topic('topic');
const json = JSON.stringify(query);
const jsonResult = '{"ids":{"ids":["topic"],"type":2}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    expect(query.getType()).toBe(CommunitiesEntityType.Topic);
    expect(query.getTargetId()).toBe('topic');
    saveResult('postactivitytarget', 'postactivitytarget_topic.json', json);
});

// Test group
const query2 = PostActivityTarget.group('group');
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"ids":{"ids":["group"],"type":3}}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    expect(query2.getType()).toBe(CommunitiesEntityType.Group);
    expect(query2.getTargetId()).toBe('group');
    saveResult('postactivitytarget', 'postactivitytarget_group.json', json2);
});

// Test timeline
const query3 = PostActivityTarget.timeline();
const json3 = JSON.stringify(query3);
const jsonResult3 = '{"ids":{"ids":["GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42"],"type":4}}';
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    expect(query3.getType()).toBe(CommunitiesEntityType.User);
    expect(query3.getTargetId()).toBe('GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42');
    saveResult('postactivitytarget', 'postactivitytarget_topic.json', json3);
});

// Test comment
const query4 = PostActivityTarget.comment('activityid');
const json4 = JSON.stringify(query4);
const jsonResult4 = '{"ids":{"ids":["activityid"],"type":6}}';
test('query4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    expect(query4.getType()).toBe(CommunitiesEntityType.Activity);
    expect(query4.getTargetId()).toBe('activityid');
    saveResult('postactivitytarget', 'postactivitytarget_comment.json', json4);
});
