/* eslint-disable no-undef */
import Action from './../../../models/actions/Action.js';
const {readObjectToDecode, readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test valid action data
const someData = Action.create('hello', {'key': 'value'});
const json2 = JSON.stringify(someData);
const jsonResult2 = readEncodedObject('action', 'action.json');
test('someData.toJSON() result must be equal', () => {
    expect(json2).toBe(jsonResult2);
});

// iOS Test json received from bridge
const testData = readObjectToDecode('action.json');
const action = new Action(JSON.parse(testData));
test('parsed Action object properties must match', () => {
    expect(action.type).toBe('hello');
    expect(action.data['actionKey']).toBe('actionValue');
});
