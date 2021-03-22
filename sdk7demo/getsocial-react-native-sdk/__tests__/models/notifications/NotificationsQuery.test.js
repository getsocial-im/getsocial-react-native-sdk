/* eslint-disable max-len */
/* eslint-disable no-undef */
import NotificationsQuery from './../../../models/notifications/NotificationsQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = NotificationsQuery.withAllStatus();
const json = JSON.stringify(query);
const jsonResult = '{"statuses":[],"types":[],"actions":[]}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('notificationsquery', 'notificationsquery.json', json);
});

// Test withStatus
const query2 = NotificationsQuery.withStatus(['read', 'unread']);
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"statuses":["read","unread"],"types":[],"actions":[]}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('notificationsquery', 'notificationsquery_status.json', json2);
});

// Test withActions
let query3 = NotificationsQuery.withAllStatus();
query3 = query3.withActions(['action1', 'action2']);
const json3 = JSON.stringify(query3);
const jsonResult3 = '{"statuses":[],"types":[],"actions":["action1","action2"]}';
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('notificationsquery', 'notificationsquery_withactions.json', json3);
});

// Test withTypes
let query4 = NotificationsQuery.withAllStatus();
query4 = query4.ofTypes(['sdk', 'comment']);
const json4 = JSON.stringify(query4);
const jsonResult4 = '{"statuses":[],"types":["sdk","comment"],"actions":[]}';
test('query4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('notificationsquery', 'notificationsquery_oftypes.json', json4);
});

// Test withAction and withTypes
let query5 = NotificationsQuery.withAllStatus();
query5 = query5.withActions(['action1', 'action2']);
query5 = query5.ofTypes(['sdk', 'comment']);
const json5 = JSON.stringify(query5);
const jsonResult5 = '{"statuses":[],"types":["sdk","comment"],"actions":["action1","action2"]}';
test('query5.toJSON() result shall be', () => {
    expect(json5).toBe(jsonResult5);
    saveResult('notificationsquery', 'notificationsquery_complete.json', json5);
});
