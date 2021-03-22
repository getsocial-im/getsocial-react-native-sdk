/* eslint-disable max-len */
/* eslint-disable no-undef */
import ReferralUsersQuery from './../../../models/invites/ReferralUsersQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = ReferralUsersQuery.allUsers();
const json = JSON.stringify(query);
const jsonResult = '{"eventName":""}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('referralusersquery', 'referralusersquery.json', json);
});

// Test withEvent
const query2 = ReferralUsersQuery.usersForEvent('install');
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"eventName":"install"}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('referralusersquery', 'referralusersquery_event.json', json2);
});
