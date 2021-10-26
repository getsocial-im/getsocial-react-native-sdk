import Group from './../../../models/communities/Group.js';
import MemberStatus from './../../../models/communities/MemberStatus.js';
import Role from './../../../models/communities/Role.js';
import CommunitiesAction from './../../../models/communities/CommunitiesAction.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('group.json');
const group = new Group(JSON.parse(testData));
test('parsed Group object properties must match', () => {
    expect(group.avatarUrl).toBe('avatar');
    expect(group.createdAt).toBe(555);
    expect(group.followersCount).toBe(50);
    expect(group.title).toBe('grouptitle');
    expect(group.id).toBe('groupid');
    expect(group.isFollowedByMe).toBe(true);
    expect(group.membersCount).toBe(20);
    expect(group.updatedAt).toBe(777);

    const membership = group.membership;
    expect(membership.role).toBe(Role.Owner);
    expect(membership.status).toBe(MemberStatus.Member);
    expect(membership.createdAt).toBe(999);

    const settings = group.settings;
    expect(settings.allowedActions[CommunitiesAction.React]).toBe(true);
    expect(settings.isDiscoverable).toBe(true);
    expect(settings.isPrivate).toBe(true);
    expect(settings.properties['groupKey']).toBe('groupValue');
    expect(settings.permissions[CommunitiesAction.Post]).toBe(Role.Owner);

});
