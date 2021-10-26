import CommunitiesSettings from './../../../models/communities/CommunitiesSettings.js';
import CommunitiesAction from './../../../models/communities/CommunitiesAction.js';
import Role from './../../../models/communities/Role.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('communitiessettings.json');
const settings = new CommunitiesSettings(JSON.parse(testData));
test('parsed CommunitiesSettings object properties must match', () => {
    expect(settings.allowedActions[CommunitiesAction.Post]).toBe(true);
    expect(settings.isDiscoverable).toBe(true);
    expect(settings.isPrivate).toBe(false);
    expect(settings.properties['propKey']).toBe('propValue');
    expect(settings.permissions[CommunitiesAction.React]).toBe(Role.Admin);
});
