/* eslint-disable no-undef */
import MediaAttachment from './../../../models/MediaAttachment.js';
import PollOptionContent from './../../../models/communities/PollOptionContent.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test without optionId
const content = new PollOptionContent();
content.text = 'hello';
const json = JSON.stringify(content);
const jsonResult = '{"text":"hello"}';
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('polloptioncontent', 'polloptioncontent_without_id.json', json);
});

// Test with optionId
const content2 = new PollOptionContent();
content2.optionId = 'id1';
content2.text = 'hello';
const json2 = JSON.stringify(content2);
const jsonResult2 = '{"optionId":"id1","text":"hello"}';
test('content2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('polloptioncontent', 'polloptioncontent_with_id.json', json2);
});

// Test with attachment
const content3 = new PollOptionContent();
content3.attachment = MediaAttachment.withImageUrl('imageurl');
const json3 = JSON.stringify(content3);
const jsonResult3 = '{"attachment":{"imageUrl":"imageurl","image":null,"videoUrl":null,"video":null}}';
test('content3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('polloptioncontent', 'polloptioncontent_with_attachment.json', json3);
});

// Test complete
const content4 = new PollOptionContent();
content4.optionId = 'id1';
content4.text = 'hello';
content4.attachment = MediaAttachment.withImageUrl('imageurl');
const json4 = JSON.stringify(content4);
const jsonResult4 = '{"optionId":"id1","text":"hello","attachment":{"imageUrl":"imageurl","image":null,"videoUrl":null,"video":null}}';
test('content4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('polloptioncontent', 'polloptioncontent_complete.json', json4);
});
