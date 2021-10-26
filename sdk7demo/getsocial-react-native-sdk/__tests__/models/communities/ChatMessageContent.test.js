/* eslint-disable no-undef */
import ChatMessageContent from './../../../models/communities/ChatMessageContent.js';
import MediaAttachment from './../../../models/MediaAttachment.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test text
const content = new ChatMessageContent();
content.text = 'hello';
const json = JSON.stringify(content);
const jsonResult = readEncodedObject('chatmessagecontent', 'chatmessagecontent_text.json');
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test properties
const content2 = new ChatMessageContent();
content2.properties = {'propkey': 'propvalue'};
const json2 = JSON.stringify(content2);
const jsonResult2 = readEncodedObject('chatmessagecontent', 'chatmessagecontent_properties.json');
test('content2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test attachment
const content3 = new ChatMessageContent();
content3.attachments = [MediaAttachment.withImageUrl('image1'), MediaAttachment.withVideoUrl('video1')];
const json3 = JSON.stringify(content3);
const jsonResult3 = readEncodedObject('chatmessagecontent', 'chatmessagecontent_attachments.json');
test('content3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test complete
const content4 = new ChatMessageContent();
content4.properties = {'propkey': 'propvalue'};
content4.text = 'hello';
content4.attachments = [MediaAttachment.withImageUrl('image1'), MediaAttachment.withVideoUrl('video1')];
const json4 = JSON.stringify(content4);
const jsonResult4 = readEncodedObject('chatmessagecontent', 'chatmessagecontent_complete.json');
test('content4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});
