/* eslint-disable max-len */
/* eslint-disable no-undef */
import PromoCodeContent from './../../../models/promocodes/PromoCodeContent.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test withCode
const code = PromoCodeContent.withCode('code123');
const json = JSON.stringify(code);
const jsonResult = readEncodedObject('promocodecontent', 'promocodecontent_with_code.json');
test('code.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test withRandomCode
const code2 = PromoCodeContent.withRandomCode();
const json2 = JSON.stringify(code2);
const jsonResult2 = readEncodedObject('promocodecontent', 'promocodecontent_with_randomcode.json');
test('code2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test withRandomCode and time limit
const code3 = PromoCodeContent.withRandomCode();
code3.setTimeLimit(-62135596800, -62135596800);
const json3 = JSON.stringify(code3);
const jsonResult3 = readEncodedObject('promocodecontent', 'promocodecontent_with_randomcode_with_timelimit.json');
test('code3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test complete
const code4 = PromoCodeContent.withRandomCode();
code4.maxClaims = 500;
code4.properties['propkey'] = 'propvalue';
code4.setTimeLimit(-62135596800, -62135596800);
const json4 = JSON.stringify(code4);
const jsonResult4 = readEncodedObject('promocodecontent', 'promocodecontent_complete.json');
test('code4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});
