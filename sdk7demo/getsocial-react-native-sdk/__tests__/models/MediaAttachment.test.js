/* eslint-disable no-undef */
import MediaAttachment from './../../models/MediaAttachment.js';
const {readObjectToDecode, readEncodedObject} = require('./../utils/TestUtils.test.js');

// Test image URL
const attachment = MediaAttachment.withImageUrl('imageurl');
const json = JSON.stringify(attachment);
const jsonResult = readEncodedObject('mediaattachment', 'mediaattachment_imageurl.json');
test('attachment.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test video URL
const attachment2 = MediaAttachment.withVideoUrl('videourl');
const json2 = JSON.stringify(attachment2);
const jsonResult2 = readEncodedObject('mediaattachment', 'mediaattachment_videourl.json');
test('attachment2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test base64 image
const attachment3 = MediaAttachment.withBase64Image('cRH9qeL3XyVnaXJkppBuH20tf5JlcG9uFX1lL2IvdHRRRS9kMMQxOPLKNYIzQQ');
const json3 = JSON.stringify(attachment3);
// Base64 is only in RN bridge, define json locally
const jsonResult3 = '{"gifUrl":null,"image":"cRH9qeL3XyVnaXJkppBuH20tf5JlcG9uFX1lL2IvdHRRRS9kMMQxOPLKNYIzQQ","imageUrl":null,"video":null,"videoUrl":null}';
test('attachment3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test base64 video
const attachment4 = MediaAttachment.withBase64Video('cRH9qeL3XyVnaXJkppBuH20tf5JlcG9uFX1lL2IvdHRRRS9kMMQxOPLKNYIzQQ');
const json4 = JSON.stringify(attachment4);
// Base64 is only in RN bridge, define json locally
const jsonResult4 = '{"gifUrl":null,"image":null,"imageUrl":null,"video":"cRH9qeL3XyVnaXJkppBuH20tf5JlcG9uFX1lL2IvdHRRRS9kMMQxOPLKNYIzQQ","videoUrl":null}';
test('attachment4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});

// iOS Test json received from bridge
const testData = readObjectToDecode('mediaattachment_imageurl.json');
const parsedAttachment = new MediaAttachment(JSON.parse(testData));
test('parsed MediaAttachment object properties must match', () => {
    expect(parsedAttachment.getImageUrl()).toBe('imageurl');
});

// iOS Test json received from bridge
const testData2 = readObjectToDecode('mediaattachment_videourl.json');
const parsedAttachment2 = new MediaAttachment(JSON.parse(testData2));
test('parsed MediaAttachment object properties must match', () => {
    expect(parsedAttachment2.getVideoUrl()).toBe('videourl');
});
