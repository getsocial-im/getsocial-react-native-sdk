/* eslint-disable no-undef */
import NotificationCustomization from './../../../models/notifications/NotificationCustomization.js';
const {readEncodedObject, readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test increase
const customization = NotificationCustomization.create();
customization.backgroundImage = 'bgImage';
customization.textColor = 'textcolor';
customization.titleColor = 'titlecolor';
const jsonResult = readEncodedObject('notificationcustomization', 'notificationcustomization.json');
const json = JSON.stringify(customization);
test('customization.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

const testData = readObjectToDecode('notificationcustomization.json');
const nc = new NotificationCustomization(JSON.parse(testData));
test('parsed NotificationCustomization object properties must match', () => {
    expect(nc.backgroundImage).toBe('bgimage');
    expect(nc.textColor).toBe('red');
    expect(nc.titleColor).toBe('black');
});

