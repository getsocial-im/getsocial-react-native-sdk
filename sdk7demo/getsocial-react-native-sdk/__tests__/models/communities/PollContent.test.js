/* eslint-disable no-undef */
import MediaAttachment from './../../../models/MediaAttachment.js';
import PollContent from './../../../models/communities/PollContent.js';
import PollOptionContent from './../../../models/communities/PollOptionContent.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

const optionContent = new PollOptionContent();
optionContent.text = 'option1';

// Test
const content = new PollContent();
content.options = [optionContent];
const json = JSON.stringify(content);
const jsonResult = readEncodedObject('pollcontent', 'pollcontent.json');
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test with endDate
const content1 = new PollContent();
content1.options = [optionContent];
content1.endDate = -62135596800;
const json1 = JSON.stringify(content1);
const jsonResult1 = readEncodedObject('pollcontent', 'pollcontent_with_enddate.json');
test('content1.toJSON() result shall be', () => {
    expect(json1).toBe(jsonResult1);
});

// Test allowMultipleVotes
const content2 = new PollContent();
content2.options = [optionContent];
content2.allowMultipleVotes = true;
const json2 = JSON.stringify(content2);
const jsonResult2 = readEncodedObject('pollcontent', 'pollcontent_allowmultiplevotes.json');
test('content2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test complete
const content3 = new PollContent();
content3.endDate = -62135596800;
content3.allowMultipleVotes = true;
content3.options = [optionContent];
const json3 = JSON.stringify(content3);
const jsonResult3 = readEncodedObject('pollcontent', 'pollcontent_complete.json');
test('content3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});
