import CommunitiesEntity from './../../../models/communities/CommunitiesEntity.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'communitiesentity.json');
const entity = new CommunitiesEntity(JSON.parse(testData));
test('parsed CommunitiesEntity object properties must match', () => {
    expect(entity.avatarUrl).toBe('avatarurl');
    expect(entity.followersCount).toBe(10);
    expect(entity.id).toBe('sourceid');
    expect(entity.isFollowedByMe).toBe(true);
    expect(entity.title).toBe('sourcetitle');
    expect(entity.type).toBe(2);
});
