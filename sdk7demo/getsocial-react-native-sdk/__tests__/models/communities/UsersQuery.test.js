/* eslint-disable max-len */
/* eslint-disable no-undef */
import UsersQuery from './../../../models/communities/UsersQuery.js';
import UserId from './../../../models/UserId.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const userId = UserId.create('test');

// Test .find
const query2 = UsersQuery.find('best');
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"query":"best","followedBy":null}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('usersquery', 'usersquery_find.json', json2);
});

// Test .followedBy
const query3 = UsersQuery.followedBy(userId);

const json3 = JSON.stringify(query3);
const jsonResult3 = '{"query":"","followedBy":{"userId":"test"}}';
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('usersquery', 'usersquery_followedby.json', json3);
});
