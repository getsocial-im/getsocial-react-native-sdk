/* eslint-disable no-undef */
import ActivityButton from './../../../models/communities/ActivityButton.js';
import Action from './../../../models/actions/Action.js';
const {saveResult, readTestData} = require('./../../utils/TestUtils.test.js');

// Test button
const action = Action.create('hello', {'key': 'value'});
const button = ActivityButton.create('btn', action);
const jsonResult = '{"title":"btn","action":{"data":{"key":"value"},"type":"hello"}}';
const json = JSON.stringify(button);
test('button.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('activitybutton', 'activitybutton.json', json);
});

// Test json received from bridge
const testData = readTestData('encodedobjects', 'activitybutton.json');
const activitybutton = new ActivityButton(JSON.parse(testData));
test('parsed ActivityButton object properties must match', () => {
    expect(activitybutton.title).toBe('title');
    expect(activitybutton.action.type).toBe('hello2');
    expect(activitybutton.action.data['actionKey2']).toBe('actionValue2');
});
