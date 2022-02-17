/* eslint-disable no-undef */
import ActivityContent from './../../../models/communities/ActivityContent.js';
import ActivityButton from './../../../models/communities/ActivityButton.js';
import Action from './../../../models/actions/Action.js';
import MediaAttachment from './../../../models/MediaAttachment.js';
import PollContent from './../../../models/communities/PollContent.js';
import PollOptionContent from './../../../models/communities/PollOptionContent.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test text
const content = new ActivityContent();
content.text = 'hello';
const json = JSON.stringify(content);
const jsonResult = readEncodedObject('activitycontent', 'activitycontent_text.json');
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test properties
const content2 = new ActivityContent();
content2.properties = {'propKey': 'propValue'};
const json2 = JSON.stringify(content2);
const jsonResult2 = readEncodedObject('activitycontent', 'activitycontent_properties.json');
test('content2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test attachment
const content3 = new ActivityContent();
content3.attachments = [MediaAttachment.withImageUrl('imageurl'), MediaAttachment.withVideoUrl('videourl')];
const json3 = JSON.stringify(content3);
const jsonResult3 = readEncodedObject('activitycontent', 'activitycontent_attachments.json');
test('content3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test button
const content4 = new ActivityContent();
const action = Action.create('show', {'actionkey': 'actionvalue'});
const button = ActivityButton.create('title', action);
content4.button = button;
const json4 = JSON.stringify(content4);
const jsonResult4 = readEncodedObject('activitycontent', 'activitycontent_button.json');
test('content4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});

// Test complete
const content5 = new ActivityContent();
content5.properties = {'propKey': 'propValue'};
content5.text = 'hello';
content5.attachments = [MediaAttachment.withImageUrl('imageurl'), MediaAttachment.withVideoUrl('videourl')];
const action2 = Action.create('show', {'actionkey': 'actionvalue'});
const button2 = ActivityButton.create('title', action2);
content5.button = button2;
const pContent = new PollContent();
const o1Content = new PollOptionContent();
o1Content.text = 'option1';
o1Content.attachment = MediaAttachment.withImageUrl('image1');
const o2Content = new PollOptionContent();
o2Content.text = 'option2';
o2Content.attachment = MediaAttachment.withImageUrl('image2');
pContent.options = [o1Content, o2Content];
content5.poll = pContent;
content5.labels = ['label1'];

const json5 = JSON.stringify(content5);
const jsonResult5 = readEncodedObject('activitycontent', 'activitycontent_complete.json');
test('content5.toJSON() result shall be', () => {
    expect(json5).toBe(jsonResult5);
});

// Test poll
const content6 = new ActivityContent();
content6.text = 'hello';
const pollContent = new PollContent();
const option1 = new PollOptionContent();
option1.text = 'option1';
option1.attachment = MediaAttachment.withImageUrl('image1');
const option2 = new PollOptionContent();
option2.text = 'option2';
option2.attachment = MediaAttachment.withImageUrl('image2');
pollContent.options = [option1, option2];
content6.poll = pollContent;
const json6 = JSON.stringify(content6);
const jsonResult6 = readEncodedObject('activitycontent', 'activitycontent_poll.json');
test('content6.toJSON() result shall be', () => {
    expect(json6).toBe(jsonResult6);
});

