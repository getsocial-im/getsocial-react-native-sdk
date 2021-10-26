/* eslint-disable no-undef */
import UserUpdate from './../../models/UserUpdate.js';
const {readEncodedObject} = require('./../utils/TestUtils.test.js');

// Test complete user update
const update = new UserUpdate();
update.displayName = 'bob';
update.avatarUrl = 'url';
update.publicProperties = {'publickey': 'publicvalue'};
update.privateProperties = {'privatekey': 'privatevalue'};
const json = JSON.stringify(update);
const jsonResult = readEncodedObject('userupdate', 'userupdate_complete.json');
test('update.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test display name
const update2 = new UserUpdate();
update2.displayName = 'bob';
const json2 = JSON.stringify(update2);
const jsonResult2 = readEncodedObject('userupdate', 'userupdate_displayname.json');
test('update2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test avatar url
const update3 = new UserUpdate();
update3.avatarUrl = 'url';
const json3 = JSON.stringify(update3);
const jsonResult3 = readEncodedObject('userupdate', 'userupdate_avatarurl.json');
test('update3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test public property
const update5 = new UserUpdate();
update5.publicProperties = {'publickey': 'publicvalue'};
const json5 = JSON.stringify(update5);
const jsonResult5 = readEncodedObject('userupdate', 'userupdate_publicproperty.json');
test('update5.toJSON() result shall be', () => {
    expect(json5).toBe(jsonResult5);
});

// Test private property
const update6 = new UserUpdate();
update6.privateProperties = {'privatekey': 'privatevalue'};
const json6 = JSON.stringify(update6);
const jsonResult6 = readEncodedObject('userupdate', 'userupdate_privateproperty.json');
test('update6.toJSON() result shall be', () => {
    expect(json6).toBe(jsonResult6);
});
