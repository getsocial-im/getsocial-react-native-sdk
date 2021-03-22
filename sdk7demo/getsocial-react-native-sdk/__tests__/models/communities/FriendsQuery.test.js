/* eslint-disable max-len */
/* eslint-disable no-undef */
import FriendsQuery from './../../../models/communities/FriendsQuery.js';
import UserId from './../../../models/UserId.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = FriendsQuery.ofUser(UserId.create('bob'));
const json = JSON.stringify(query);
const jsonResult = '{"userId":{"userId":"bob"}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('friendsquery', 'query.json', json);
});
