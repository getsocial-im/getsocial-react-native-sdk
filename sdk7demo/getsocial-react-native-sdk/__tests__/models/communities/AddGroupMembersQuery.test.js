/* eslint-disable max-len */
/* eslint-disable no-undef */
import AddGroupMembersQuery from './../../../models/communities/AddGroupMembersQuery.js';
import Role from './../../../models/communities/Role.js';
import MemberStatus from './../../../models/communities/Role.js';
import UserIdList from './../../../models/UserIdList.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const userIdList = UserIdList.create(['test']);

// Test query
const query = AddGroupMembersQuery.create('groupId', userIdList);
const json = JSON.stringify(query);
const jsonResult = '{"role":3,"status":2,"groupId":"groupId","userIdList":{"ids":["test"]}}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('addgroupmembersquery', 'addgroupmembersquery.json', json);
});

// Test query + member role
let query2 = AddGroupMembersQuery.create('groupId', userIdList);
query2 = query2.withRole(Role.Admin);
const json2 = JSON.stringify(query2);
const jsonResult2 = '{"role":1,"status":2,"groupId":"groupId","userIdList":{"ids":["test"]}}';
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('addgroupmembersquery', 'addgroupmembersquery_memberrole.json', json);
});

// Test query + member status
let query3 = AddGroupMembersQuery.create('groupId', userIdList);
query3 = query3.withMemberStatus(MemberStatus.Member);
const json3 = JSON.stringify(query3);
const jsonResult3 = '{"role":3,"status":3,"groupId":"groupId","userIdList":{"ids":["test"]}}';
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('addgroupmembersquery', 'addgroupmembersquery_memberstatus.json', json);
});

// Test query + member status and role
let query4 = AddGroupMembersQuery.create('groupId', userIdList);
query4 = query4.withMemberStatus(MemberStatus.Member);
query4 = query4.withRole(Role.Admin);
const json4 = JSON.stringify(query4);
const jsonResult4 = '{"role":1,"status":3,"groupId":"groupId","userIdList":{"ids":["test"]}}';
test('query4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('addgroupmembersquery', 'addgroupmembersquery_memberstatusandrole.json', json);
});
