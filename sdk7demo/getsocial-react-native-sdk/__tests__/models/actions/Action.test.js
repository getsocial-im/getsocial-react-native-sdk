/* eslint-disable no-undef */
import Action from './../../../models/actions/Action.js';
const {saveResult, readTestData} = require('./../../utils/TestUtils.test.js');

// Test empty action data
const emptyData = Action.create('hello', {});
const json = JSON.stringify(emptyData);
const jsonResult = '{"data":{},"type":"hello"}';
test('emptyData.toJSON() result must be equal', () => {
    expect(json).toBe(jsonResult);
});

// Test valid action data
const someData = Action.create('hello', {'key': 'value'});
const json2 = JSON.stringify(someData);
const jsonResult2 = '{"data":{"key":"value"},"type":"hello"}';
test('someData.toJSON() result must be equal', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('action', 'action.json', json2);
});

// iOS Test json received from bridge
const testData = readTestData('encodedobjects', 'action.json');
const action = new Action(JSON.parse(testData));
test('parsed Action object properties must match', () => {
    expect(action.type).toBe('hello');
    expect(action.data['actionKey']).toBe('actionValue');
});
