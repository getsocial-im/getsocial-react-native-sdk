import NotificationContext from './../../../models/notifications/NotificationContext.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'notificationcontext.json');
const context = new NotificationContext(JSON.parse(testData));
test('parsed NotificationContext object properties must match', () => {
    expect(context.action).toBe('actionid');
});
