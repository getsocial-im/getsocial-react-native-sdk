/* eslint-disable max-len */
/* eslint-disable no-undef */
import NotificationsQuery from './../../../models/notifications/NotificationsQuery.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test
const query = NotificationsQuery.withAllStatus();
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('notificationsquery', 'notificationsquery.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test withStatus
const query2 = NotificationsQuery.withStatus(['read', 'unread']);
const json2 = JSON.stringify(query2);
const jsonResult2 = readEncodedObject('notificationsquery', 'notificationsquery_with_status.json');
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test withActions
let query3 = NotificationsQuery.withAllStatus();
query3 = query3.withActions(['action1', 'action2']);
const json3 = JSON.stringify(query3);
const jsonResult3 = readEncodedObject('notificationsquery', 'notificationsquery_with_actions.json');
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test withTypes
let query4 = NotificationsQuery.withAllStatus();
query4 = query4.ofTypes(['sdk', 'comment']);
const json4 = JSON.stringify(query4);
const jsonResult4 = readEncodedObject('notificationsquery', 'notificationsquery_with_types.json');
test('query4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});

// Test withAction and withTypes
let query5 = NotificationsQuery.withAllStatus();
query5 = query5.withActions(['action1', 'action2']);
query5 = query5.ofTypes(['sdk', 'comment']);
const json5 = JSON.stringify(query5);
const jsonResult5 = readEncodedObject('notificationsquery', 'notificationsquery_complete.json');
test('query5.toJSON() result shall be', () => {
    expect(json5).toBe(jsonResult5);
});
