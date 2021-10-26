/* eslint-disable max-len */
/* eslint-disable no-undef */
import UpdateGroupMembersQuery from './../../../models/communities/UpdateGroupMembersQuery.js';
import Role from './../../../models/communities/Role.js';
import MemberStatus from './../../../models/communities/MemberStatus.js';
import UserIdList from './../../../models/UserIdList.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

const userIdList = UserIdList.create(['test']);

// Test query
const query = UpdateGroupMembersQuery.create('groupId', userIdList);
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('updategroupmembersquery', 'updategroupmembersquery.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test query + member role
let query2 = UpdateGroupMembersQuery.create('groupId', userIdList);
query2 = query2.withRole(Role.Admin);
const json2 = JSON.stringify(query2);
const jsonResult2 = readEncodedObject('updategroupmembersquery', 'updategroupmembersquery_with_memberrole.json');
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test query + member status
let query3 = UpdateGroupMembersQuery.create('groupId', userIdList);
query3 = query3.withMemberStatus(MemberStatus.Member);
const json3 = JSON.stringify(query3);
const jsonResult3 = readEncodedObject('updategroupmembersquery', 'updategroupmembersquery_with_memberstatus.json');
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test query + member status and role
let query4 = UpdateGroupMembersQuery.create('groupId', userIdList);
query4 = query4.withMemberStatus(MemberStatus.Member);
query4 = query4.withRole(Role.Admin);
const json4 = JSON.stringify(query4);
const jsonResult4 = readEncodedObject('updategroupmembersquery', 'updategroupmembersquery_with_memberstatusandrole.json');
test('query4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});
