/* eslint-disable no-undef */
import ActivityContent from './../../../models/communities/ActivityContent.js';
import ActivityButton from './../../../models/communities/ActivityButton.js';
import Action from './../../../models/actions/Action.js';
import MediaAttachment from './../../../models/MediaAttachment.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test text
const content = new ActivityContent();
content.text = 'hello';
const json = JSON.stringify(content);
const jsonResult = '{"attachments":[],"properties":{},"text":"hello"}';
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('activitycontent', 'activitycontent_text.json', json);
});

// Test properties
const content2 = new ActivityContent();
content2.properties = {'propkey': 'propvalue'};
const json2 = JSON.stringify(content2);
const jsonResult2 = '{"attachments":[],"properties":{"propkey":"propvalue"}}';
test('content2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('activitycontent', 'activitycontent_properties.json', json2);
});

// Test attachment
const content3 = new ActivityContent();
content3.attachments = [MediaAttachment.withImageUrl('image1'), MediaAttachment.withVideoUrl('image2')];
const json3 = JSON.stringify(content3);
const jsonResult3 = '{"attachments":[{"imageUrl":"image1","image":null,"videoUrl":null,"video":null},{"imageUrl":null,"image":null,"videoUrl":"image2","video":null}],"properties":{}}';
test('content3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('activitycontent', 'activitycontent_attachments.json', json3);
});

// Test button
const content4 = new ActivityContent();
const action = Action.create('show', {'actionkey': 'actionvalue'});
const button = ActivityButton.create('title', action);
content4.button = button;
const json4 = JSON.stringify(content4);
const jsonResult4 = '{"attachments":[],"properties":{},"button":{"title":"title","action":{"data":{"actionkey":"actionvalue"},"type":"show"}}}';
test('content4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('activitycontent', 'activitycontent_button.json', json4);
});

// Test complete
const content5 = new ActivityContent();
content5.properties = {'propkey': 'propvalue'};
content5.text = 'hello';
content5.attachments = [MediaAttachment.withImageUrl('image1'), MediaAttachment.withVideoUrl('image2')];
const action2 = Action.create('show', {'actionkey': 'actionvalue'});
const button2 = ActivityButton.create('title', action2);
content5.button = button2;
const json5 = JSON.stringify(content5);
const jsonResult5 = '{"attachments":[{"imageUrl":"image1","image":null,"videoUrl":null,"video":null},{"imageUrl":null,"image":null,"videoUrl":"image2","video":null}],"properties":{"propkey":"propvalue"},"text":"hello","button":{"title":"title","action":{"data":{"actionkey":"actionvalue"},"type":"show"}}}';
test('content5.toJSON() result shall be', () => {
    expect(json5).toBe(jsonResult5);
    saveResult('activitycontent', 'activitycontent_complete.json', json5);
});
