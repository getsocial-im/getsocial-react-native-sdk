/* eslint-disable no-undef */
import NotificationBadge from './../../../models/notifications/NotificationBadge.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test increase
const badge = NotificationBadge.increase(40);
const jsonResult = readEncodedObject('notificationbadge', 'notificationbadge_increase.json');
const json = JSON.stringify(badge);
test('badge.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test set
const badge2 = NotificationBadge.set(12);
const jsonResult2 = readEncodedObject('notificationbadge', 'notificationbadge_set.json');
const json2 = JSON.stringify(badge2);
test('badge2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

