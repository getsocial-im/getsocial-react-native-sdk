/* eslint-disable no-undef */
import Identity from './../../../models/communities/Identity.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test custom identity data
const identity = Identity.createCustomIdentity('provider', 'userid', 'accesstoken');
const json = JSON.stringify(identity);
const jsonResult = '{"provider":"provider","userId":"userid","accessToken":"accesstoken"}';
test('identity.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('identity', 'identity_custom.json', json);
});

// Test FB identity
const identity2 = Identity.createFacebookIdentity('accesstoken');
const json2 = JSON.stringify(identity2);
const jsonResult2 = '{"provider":"facebook","userId":null,"accessToken":"accesstoken"}';
test('identity2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('identity', 'identity_fb.json', json2);
});
