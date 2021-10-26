/* eslint-disable no-undef */
import InviteContent from './../../../models/invites/InviteContent.js';
import MediaAttachment from './../../../models/MediaAttachment.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test
const content = new InviteContent();
content.linkParams = {'key': 'value'};
content.mediaAttachment = MediaAttachment.withImageUrl('imageurl');
content.subject = 'subject';
content.text = 'text';
const jsonResult = readEncodedObject('invitecontent', 'invitecontent.json');
const json = JSON.stringify(content);
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});
