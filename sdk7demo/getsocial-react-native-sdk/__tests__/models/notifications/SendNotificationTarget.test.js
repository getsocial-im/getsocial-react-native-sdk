/* eslint-disable max-len */
/* eslint-disable no-undef */
import SendNotificationTarget from './../../../models/notifications/SendNotificationTarget.js';
import UserIdList from './../../../models/UserIdList.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const userIdList = UserIdList.create(['userid1', 'userid2']);

// Test placeholders
let target = SendNotificationTarget.create();
target = target.addReceiverPlaceholder('referrer');
const json = JSON.stringify(target);
const jsonResult = '{"placeholderIds":["referrer"]}';
test('target.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('sendnotificationtarget', 'sendnotificationtarget_placeholders.json', json);
});

// Test userid
const target2 = SendNotificationTarget.usersWithIds(userIdList);
const json2 = JSON.stringify(target2);
const jsonResult2 = '{"userIdList":{"ids":["userid1","userid2"]},"placeholderIds":[]}';
test('target2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('sendnotificationtarget', 'sendnotificationtarget_userid.json', json2);
});

// Test complete
let target3 = SendNotificationTarget.usersWithIds(userIdList);
target3 = target3.addReceiverPlaceholder('follower');
const json3 = JSON.stringify(target3);
const jsonResult3 = '{"userIdList":{"ids":["userid1","userid2"]},"placeholderIds":["follower"]}';
test('target3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('sendnotificationtarget', 'sendnotificationtarget_complete.json', json3);
});
