import Topic from './../../../models/communities/Topic.js';
import CommunitiesAction from './../../../models/communities/CommunitiesAction.js';
import Role from './../../../models/communities/Role.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'topic.json');
const topic = new Topic(JSON.parse(testData));
test('parsed Topic object properties must match', () => {
    expect(topic.createdAt).toBe(123);
    expect(topic.avatarUrl).toBe('avatarUrl');
    expect(topic.title).toBe('title');
    expect(topic.description).toBe('topicDescription');
    expect(topic.followersCount).toBe(10);
    expect(topic.id).toBe('topicId');
    expect(topic.isFollowedByMe).toBe(true);
    expect(topic.updatedAt).toBe(456);

    const settings = topic.settings;
    expect(settings.allowedActions[CommunitiesAction.Post]).toBe(true);
    expect(settings.isDiscoverable).toBe(true);
    expect(settings.isPrivate).toBe(false);
    expect(settings.permissions[CommunitiesAction.React]).toBe(Role.Admin);
});
