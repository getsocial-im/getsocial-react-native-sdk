/* eslint-disable no-undef */
import MediaAttachment from './../../../models/MediaAttachment.js';
import PollContent from './../../../models/communities/PollContent.js';
import PollOptionContent from './../../../models/communities/PollOptionContent.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const optionContent = new PollOptionContent();
optionContent.text = 'option1';

// Test
const content = new PollContent();
content.options = [optionContent];
const json = JSON.stringify(content);
const jsonResult = '{"allowMultipleVotes":false,"options":[{"text":"option1"}]}';
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('polloptioncontent', 'pollcontent.json', json);
});

// Test with endDate
const content1 = new PollContent();
content1.options = [optionContent];
content1.endDate = 12345;
const json1 = JSON.stringify(content1);
const jsonResult1 = '{"allowMultipleVotes":false,"endDate":12345,"options":[{"text":"option1"}]}';
test('content1.toJSON() result shall be', () => {
    expect(json1).toBe(jsonResult1);
    saveResult('pollcontent', 'pollcontent_with_enddate.json', json);
});

// Test allowMultipleVotes
const content2 = new PollContent();
content2.options = [optionContent];
content2.allowMultipleVotes = true;
const json2 = JSON.stringify(content2);
const jsonResult2 = '{"allowMultipleVotes":true,"options":[{"text":"option1"}]}';
test('content2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('pollcontent', 'pollcontent_with_allowmultiplevotes.json', json2);
});

// Test complete
const content3 = new PollContent();
content3.endDate = 1234;
content3.allowMultipleVotes = true;
content3.options = [optionContent];
const json3 = JSON.stringify(content3);
const jsonResult3 = '{"allowMultipleVotes":true,"endDate":1234,"options":[{"text":"option1"}]}';
test('content3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('pollcontent', 'pollcontent_complete.json', json3);
});
