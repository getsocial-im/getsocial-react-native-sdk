import NotificationButton from './../../../models/notifications/NotificationButton.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('notificationbutton.json');
const nbutton = new NotificationButton(JSON.parse(testData));
test('parsed NotificationButton object properties must match', () => {
    expect(nbutton.actionId).toBe('actionId');
    expect(nbutton.title).toBe('button');
});
