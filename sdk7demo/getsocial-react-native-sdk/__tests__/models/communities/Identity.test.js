/* eslint-disable no-undef */
import Identity from './../../../models/communities/Identity.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test custom identity data
const identity = Identity.createCustomIdentity('provider', 'userid', 'accesstoken');
const json = JSON.stringify(identity);
const jsonResult = readEncodedObject('identity', 'identity_custom.json');
test('identity.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test FB identity
const identity2 = Identity.createFacebookIdentity('accesstoken');
const json2 = JSON.stringify(identity2);
const jsonResult2 = readEncodedObject('identity', 'identity_fb.json');
test('identity2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test Trusted identity
const identity3 = Identity.createTrustedIdentity('jwt','accesstoken');
const json3 = JSON.stringify(identity3);
const jsonResult3 = readEncodedObject('identity', 'identity_trusted.json');
test('identity3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});
