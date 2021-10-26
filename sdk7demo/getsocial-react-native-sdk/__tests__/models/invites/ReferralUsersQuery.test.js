/* eslint-disable max-len */
/* eslint-disable no-undef */
import ReferralUsersQuery from './../../../models/invites/ReferralUsersQuery.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test
const query = ReferralUsersQuery.allUsers();
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('referralusersquery', 'referralusersquery.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test withEvent
const query2 = ReferralUsersQuery.usersForEvent('install');
const json2 = JSON.stringify(query2);
const jsonResult2 = readEncodedObject('referralusersquery', 'referralusersquery_with_event.json');
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});
