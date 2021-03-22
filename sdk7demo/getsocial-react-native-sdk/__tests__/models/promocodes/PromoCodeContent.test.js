/* eslint-disable max-len */
/* eslint-disable no-undef */
import PromoCodeContent from './../../../models/promocodes/PromoCodeContent.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test withCode
const code = PromoCodeContent.withCode('code123');
const json = JSON.stringify(code);
const jsonResult = '{"code":"code123","data":{},"maxClaimCount":0}';
test('code.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('promocodecontent', 'promocodecontent_withcode.json', json);
});

// Test withRandomCode
const code2 = PromoCodeContent.withRandomCode();
const json2 = JSON.stringify(code2);
const jsonResult2 = '{"data":{},"maxClaimCount":0}';
test('code.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('promocodecontent', 'promocodecontent_withrandomcode.json', json2);
});

// Test withRandomCode and time limit
const code3 = PromoCodeContent.withRandomCode();
code3.setTimeLimit(100, 200);
const json3 = JSON.stringify(code3);
const jsonResult3 = '{"startDate":100,"endDate":200,"data":{},"maxClaimCount":0}';
test('code.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('promocodecontent', 'promocodecontent_withrandomcode_timelimit.json', json3);
});

// Test complete
const code4 = PromoCodeContent.withRandomCode();
code4.maxClaims = 500;
code4.properties = {'propkey': 'propvalue'};
code4.setTimeLimit(100, 200);
const json4 = JSON.stringify(code4);
const jsonResult4 = '{"startDate":100,"endDate":200,"data":{"propkey":"propvalue"},"maxClaimCount":500}';
test('code.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('promocodecontent', 'promocodecontent_complete.json', json4);
});
