/* eslint-disable max-len */
/* eslint-disable no-undef */
import MembersQuery from './../../../models/communities/MembersQuery.js';
import Role from './../../../models/communities/Role.js';
import MemberStatus from './../../../models/communities/MemberStatus.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test query
const query = MembersQuery.ofGroup('bestgroup');
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('membersquery', 'membersquery.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test query + role
let query2 = MembersQuery.ofGroup('bestgroup');
query2 = query2.withRole(Role.Admin);
const json2 = JSON.stringify(query2);
const jsonResult2 = readEncodedObject('membersquery', 'membersquery_with_role.json');
test('query2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test query + status
let query3 = MembersQuery.ofGroup('bestgroup');
query3 = query3.withStatus(MemberStatus.Member);
const json3 = JSON.stringify(query3);
const jsonResult3 = readEncodedObject('membersquery', 'membersquery_with_status.json');
test('query3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test all
let query4 = MembersQuery.ofGroup('bestgroup');
query4 = query4.withStatus(MemberStatus.Member);
query4 = query4.withRole(Role.Admin);
const json4 = JSON.stringify(query4);
const jsonResult4 = readEncodedObject('membersquery', 'membersquery_complete.json');
test('query4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});
