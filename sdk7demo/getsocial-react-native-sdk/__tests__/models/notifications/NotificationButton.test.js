/* eslint-disable no-undef */
import NotificationButton from './../../../models/notifications/NotificationButton.js';
const {readEncodedObject, readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test button
const button = NotificationButton.create('btn', 'action');
const jsonResult = readEncodedObject('notificationbutton', 'notificationbutton.json');
const json = JSON.stringify(button);
test('button.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test json received from bridge
const testData = readObjectToDecode('notificationbutton.json');
const notificationbutton = new NotificationButton(JSON.parse(testData));
test('parsed NotificationButton object properties must match', () => {
    expect(notificationbutton.title).toBe('button');
    expect(notificationbutton.actionId).toBe('actionId');
});
