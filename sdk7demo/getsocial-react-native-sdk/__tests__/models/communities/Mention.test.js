import Mention from './../../../models/communities/Mention.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('mention.json');
const mention = new Mention(JSON.parse(testData));
test('parsed Mention object properties must match', () => {
    expect(mention.type).toBe(1);
    expect(mention.startIndex).toBe(100);
    expect(mention.endIndex).toBe(120);
    expect(mention.userId).toBe('userId');
});
