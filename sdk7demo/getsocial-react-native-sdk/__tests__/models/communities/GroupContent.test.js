/* eslint-disable no-undef */
import GroupContent from './../../../models/communities/GroupContent.js';
import CommunitiesAction from './../../../models/communities/CommunitiesAction.js';
import Role from './../../../models/communities/Role.js';
import MediaAttachment from './../../../models/MediaAttachment.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test text
const content = new GroupContent();
content.id = 'groupid';
content.title = 'grouptitle';
const json = JSON.stringify(content);
const jsonResult = readEncodedObject('groupcontent', 'groupcontent_title.json');
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});

// Test description
const content2 = new GroupContent();
content2.id = 'groupid';
content2.description = 'groupdescription';
const json2 = JSON.stringify(content2);
const jsonResult2 = readEncodedObject('groupcontent', 'groupcontent_description.json');
test('content2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
});

// Test properties
const content3 = new GroupContent();
content3.id = 'groupid';
content3.properties = {'propkey': 'propvalue'};
const json3 = JSON.stringify(content3);
const jsonResult3 = readEncodedObject('groupcontent', 'groupcontent_properties.json');
test('content3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
});

// Test avatar
const content4 = new GroupContent();
content4.id = 'groupid';
content4.avatar = MediaAttachment.withImageUrl('image1');
const json4 = JSON.stringify(content4);
const jsonResult4 = readEncodedObject('groupcontent', 'groupcontent_attachment.json');
test('content4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
});

// Test permissions
const content5 = new GroupContent();
content5.id = 'groupid';
content5.permissions[CommunitiesAction.Comment] = Role.Owner;
const json5 = JSON.stringify(content5);
const jsonResult5 = readEncodedObject('groupcontent', 'groupcontent_permission.json');
test('content5.toJSON() result shall be', () => {
    expect(json5).toBe(jsonResult5);
});

// Test complete
const content6 = new GroupContent();
content6.id = 'groupid';
content6.title = 'grouptitle';
content6.description = 'groupdescription';
content6.properties = {'propkey': 'propvalue'};
content6.avatar = MediaAttachment.withImageUrl('image1');
content6.permissions[CommunitiesAction.Comment] = Role.Owner;
const json6 = JSON.stringify(content6);
const jsonResult6 = readEncodedObject('groupcontent', 'groupcontent_complete.json');
test('content6.toJSON() result shall be', () => {
    expect(json6).toBe(jsonResult6);
});
