/* eslint-disable no-undef */
import NotificationCustomization from './../../../models/notifications/NotificationCustomization.js';
const {saveResult, readTestData} = require('./../../utils/TestUtils.test.js');

// Test increase
const customization = NotificationCustomization.create();
customization.backgroundImage = 'bgImage';
customization.textColor = 'textcolor';
customization.titleColor = 'titlecolor';
const jsonResult = '{"backgroundImage":"bgImage","titleColor":"titlecolor","textColor":"textcolor"}';
const json = JSON.stringify(customization);
test('customization.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('notificationcustomization', 'notificationcustomization.json', json);
});

const testData = readTestData('encodedobjects', 'notificationcustomization.json');
const nc = new NotificationCustomization(JSON.parse(testData));
test('parsed NotificationCustomization object properties must match', () => {
    expect(nc.backgroundImage).toBe('bgimage');
    expect(nc.textColor).toBe('red');
    expect(nc.titleColor).toBe('black');
});

