/* eslint-disable max-len */
/* eslint-disable no-undef */
import JoinGroupQuery from './../../../models/communities/JoinGroupQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test query
const query = JoinGroupQuery.create('groupId');
const json = JSON.stringify(query);
const jsonResult = '{"role":3,"status":0,"groupId":"groupId","userIdList":{"ids":["GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42"]}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('joingroupquery', 'joingroupquery.json', json);
});

// Test query + invite token
let query2 = JoinGroupQuery.create('groupId');
query2 = query2.withInvitationToken('token');
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"role":3,"status":0,"groupId":"groupId","userIdList":{"ids":["GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42"]},"invitationToken":"token"}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('joingroupquery', 'joingroupquery_token.json', json2);
});
