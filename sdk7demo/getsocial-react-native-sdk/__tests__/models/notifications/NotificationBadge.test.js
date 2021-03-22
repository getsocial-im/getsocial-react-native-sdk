/* eslint-disable no-undef */
import NotificationBadge from './../../../models/notifications/NotificationBadge.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test increase
const badge = NotificationBadge.increase(40);
const jsonResult = '{"increase":40}';
const json = JSON.stringify(badge);
test('badge.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('notificationbadge', 'notificationbadge_increase.json', json);
});

// Test set
const badge2 = NotificationBadge.set(12);
const jsonResult2 = '{"badge":12}';
const json2 = JSON.stringify(badge2);
test('badge2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('notificationbadge', 'notificationbadge_set.json', json);
});

