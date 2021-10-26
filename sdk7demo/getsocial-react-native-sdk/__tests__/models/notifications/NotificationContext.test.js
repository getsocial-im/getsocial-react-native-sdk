import NotificationContext from './../../../models/notifications/NotificationContext.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('notificationcontext.json');
const context = new NotificationContext(JSON.parse(testData));
test('parsed NotificationContext object properties must match', () => {
    expect(context.action).toBe('actionid');
});
