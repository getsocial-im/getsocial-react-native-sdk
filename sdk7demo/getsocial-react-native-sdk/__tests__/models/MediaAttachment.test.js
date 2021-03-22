/* eslint-disable no-undef */
import MediaAttachment from './../../models/MediaAttachment.js';
const {saveResult, readTestData} = require('./../utils/TestUtils.test.js');

// Test image URL
const attachment = MediaAttachment.withImageUrl('imageurl');
const json = JSON.stringify(attachment);
const jsonResult = '{"imageUrl":"imageurl","image":null,"videoUrl":null,"video":null}';
test('attachment.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('mediaattachment', 'mediaattachment_imageurl.json', json);
});

// Test video URL
const attachment2 = MediaAttachment.withVideoUrl('videourl');
const json2 = JSON.stringify(attachment2);
const jsonResult2 = '{"imageUrl":null,"image":null,"videoUrl":"videourl","video":null}';
test('attachment2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('mediaattachment', 'mediaattachment_videourl.json', json2);
});

// Test base64 image
const attachment3 = MediaAttachment.withBase64Image('cRH9qeL3XyVnaXJkppBuH20tf5JlcG9uFX1lL2IvdHRRRS9kMMQxOPLKNYIzQQ');
const json3 = JSON.stringify(attachment3);
const jsonResult3 = '{"imageUrl":null,"image":"cRH9qeL3XyVnaXJkppBuH20tf5JlcG9uFX1lL2IvdHRRRS9kMMQxOPLKNYIzQQ","videoUrl":null,"video":null}';
test('attachment3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('mediaattachment', 'mediaattachment_base64image.json', json3);
});

// Test base64 video
const attachment4 = MediaAttachment.withBase64Video('cRH9qeL3XyVnaXJkppBuH20tf5JlcG9uFX1lL2IvdHRRRS9kMMQxOPLKNYIzQQ');
const json4 = JSON.stringify(attachment4);
const jsonResult4 = '{"imageUrl":null,"image":null,"videoUrl":null,"video":"cRH9qeL3XyVnaXJkppBuH20tf5JlcG9uFX1lL2IvdHRRRS9kMMQxOPLKNYIzQQ"}';
test('attachment4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('mediaattachment', 'mediaattachment_base64video.json', json4);
});

// iOS Test json received from bridge
const testData = readTestData('encodedobjects', 'mediaattachment_imageurl.json');
const parsedAttachment = new MediaAttachment(JSON.parse(testData));
test('parsed MediaAttachment object properties must match', () => {
    expect(parsedAttachment.getImageUrl()).toBe('imageurl');
});

// iOS Test json received from bridge
const testData2 = readTestData('encodedobjects', 'mediaattachment_videourl.json');
const parsedAttachment2 = new MediaAttachment(JSON.parse(testData2));
test('parsed MediaAttachment object properties must match', () => {
    expect(parsedAttachment2.getVideoUrl()).toBe('videourl');
});
