/* eslint-disable no-undef */
import ChatMessageContent from './../../../models/communities/ChatMessageContent.js';
import MediaAttachment from './../../../models/MediaAttachment.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test text
const content = new ChatMessageContent();
content.text = 'hello';
const json = JSON.stringify(content);
const jsonResult = '{"attachments":[],"properties":{},"text":"hello"}';
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('chatmessagecontent', 'chatmessagecontent_text.json', json);
});

// Test properties
const content2 = new ChatMessageContent();
content2.properties = {'propkey': 'propvalue'};
const json2 = JSON.stringify(content2);
const jsonResult2 = '{"attachments":[],"properties":{"propkey":"propvalue"}}';
test('content2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('chatmessagecontent', 'chatmessagecontent_properties.json', json2);
});

// Test attachment
const content3 = new ChatMessageContent();
content3.attachments = [MediaAttachment.withImageUrl('image1'), MediaAttachment.withVideoUrl('image2')];
const json3 = JSON.stringify(content3);
const jsonResult3 = '{"attachments":[{"imageUrl":"image1","image":null,"videoUrl":null,"video":null},{"imageUrl":null,"image":null,"videoUrl":"image2","video":null}],"properties":{}}';
test('content3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('chatmessagecontent', 'chatmessagecontent_attachments.json', json3);
});

// Test complete
const content4 = new ChatMessageContent();
content4.properties = {'propkey': 'propvalue'};
content4.text = 'hello';
content4.attachments = [MediaAttachment.withImageUrl('image1'), MediaAttachment.withVideoUrl('image2')];
const json4 = JSON.stringify(content4);
const jsonResult4 = '{"attachments":[{"imageUrl":"image1","image":null,"videoUrl":null,"video":null},{"imageUrl":null,"image":null,"videoUrl":"image2","video":null}],"properties":{"propkey":"propvalue"},"text":"hello"}';
test('content4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('chatmessagecontent', 'chatmessagecontent_complete.json', json4);
});
