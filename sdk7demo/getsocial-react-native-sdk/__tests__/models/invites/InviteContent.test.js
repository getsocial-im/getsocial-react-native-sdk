/* eslint-disable no-undef */
import InviteContent from './../../../models/invites/InviteContent.js';
import MediaAttachment from './../../../models/MediaAttachment.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const content = new InviteContent();
content.linkParams = {'key': 'value'};
content.mediaAttachment = MediaAttachment.withImageUrl('imageurl');
content.subject = 'subject';
content.text = 'text';
const jsonResult = '{"text":"text","subject":"subject","mediaAttachment":{"imageUrl":"imageurl","image":null,"videoUrl":null,"video":null},"linkParams":{"key":"value"}}';
const json = JSON.stringify(content);
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('invitecontent', 'invitecontent.json', json);
});
