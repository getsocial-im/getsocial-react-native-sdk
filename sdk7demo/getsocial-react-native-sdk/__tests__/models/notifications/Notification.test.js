import Notification from './../../../models/notifications/Notification.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'notification.json');
const notification = new Notification(JSON.parse(testData));
test('parsed Notification object properties must match', () => {
    expect(notification.id).toBe('notificationid');
    expect(notification.status).toBe('read');
    expect(notification.text).toBe('text');
    expect(notification.title).toBe('title');
    expect(notification.type).toBe('comment');

    const action = notification.action;
    expect(action.type).toBe('hello');
    expect(action.data['actionKey']).toBe('actionValue');

    const buttons = notification.actionButtons;
    const button1 = buttons[0];
    expect(button1.title).toBe('button1');
    expect(button1.actionId).toBe('actionId1');

    const button2 = buttons[1];
    expect(button2.title).toBe('button2');
    expect(button2.actionId).toBe('actionId2');

    const customization = notification.customization;
    expect(customization.backgroundImage).toBe('bgimage');
    expect(customization.textColor).toBe('red');
    expect(customization.titleColor).toBe('black');

    const attachment = notification.mediaAttachment;
    expect(attachment.getVideoUrl()).toBe('videourl');

    const sender = notification.sender;
    expect(sender.userId).toBe('userid');
    expect(sender.avatarUrl).toBe('avatarurl');
    expect(sender.displayName).toBe('testuser');
    expect(sender.identities['fb']).toBe('token');
    expect(sender.publicProperties['publickey']).toBe('publicvalue');
    expect(sender.isVerified).toBe(true);
});
