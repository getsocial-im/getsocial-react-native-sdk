/* eslint-disable no-undef */
import GroupContent from './../../../models/communities/GroupContent.js';
import CommunitiesAction from './../../../models/communities/CommunitiesAction.js';
import Role from './../../../models/communities/Role.js';
import MediaAttachment from './../../../models/MediaAttachment.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test text
const content = new GroupContent();
content.id = 'groupid';
content.title = 'grouptitle';
const json = JSON.stringify(content);
const jsonResult = '{"id":"groupid","title":"grouptitle","properties":{},"permissions":{}}';
test('content.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('groupcontent', 'groupcontent_text.json', json);
});

// Test description
const content2 = new GroupContent();
content2.id = 'groupid';
content2.description = 'groupdescription';
const json2 = JSON.stringify(content);
const jsonResult2 = '{"id":"groupid","title":"grouptitle","properties":{},"permissions":{}}';
test('content2.toJSON() result shall be', () => {
    expect(json2).toBe(jsonResult2);
    saveResult('groupcontent', 'groupcontent_description.json', json2);
});

// Test properties
const content3 = new GroupContent();
content3.id = 'groupid';
content3.properties = {'propkey': 'propvalue'};
const json3 = JSON.stringify(content2);
const jsonResult3 = '{"id":"groupid","description":"groupdescription","properties":{},"permissions":{}}';
test('content3.toJSON() result shall be', () => {
    expect(json3).toBe(jsonResult3);
    saveResult('groupcontent', 'groupcontent_properties.json', json3);
});

// Test avatar
const content4 = new GroupContent();
content4.id = 'groupid';
content4.avatar = MediaAttachment.withImageUrl('image1');
const json4 = JSON.stringify(content4);
const jsonResult4 = '{"id":"groupid","properties":{},"permissions":{},"avatar":{"imageUrl":"image1","image":null,"videoUrl":null,"video":null}}';
test('content4.toJSON() result shall be', () => {
    expect(json4).toBe(jsonResult4);
    saveResult('groupcontent', 'groupcontent_avatar.json', json4);
});

// Test permissions
const content5 = new GroupContent();
content5.id = 'groupid';
content5.permissions[CommunitiesAction.Comment] = Role.Owner;
const json5 = JSON.stringify(content5);
const jsonResult5 = '{"id":"groupid","properties":{},"permissions":{"comment":0}}';
test('content5.toJSON() result shall be', () => {
    expect(json5).toBe(jsonResult5);
    saveResult('groupcontent', 'groupcontent_permissions.json', json5);
});

// Test complete
const content6 = new GroupContent();
content6.id = 'groupid';
content6.title = 'grouptitle';
content6.description = 'groupdescription';
content6.properties = {'propkey': 'propvalue'};
content6.avatar = MediaAttachment.withImageUrl('image1');
content6.permissions[CommunitiesAction.Comment] = Role.Admin;
const json6 = JSON.stringify(content6);
const jsonResult6 = '{"id":"groupid","title":"grouptitle","description":"groupdescription","properties":{"propkey":"propvalue"},"permissions":{"comment":1},"avatar":{"imageUrl":"image1","image":null,"videoUrl":null,"video":null}}';
test('content6.toJSON() result shall be', () => {
    expect(json6).toBe(jsonResult6);
    saveResult('groupcontent', 'groupcontent_complete.json', json6);
});
