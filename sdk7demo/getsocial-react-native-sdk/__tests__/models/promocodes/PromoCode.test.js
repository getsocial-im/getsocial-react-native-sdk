import PromoCode from './../../../models/promocodes/PromoCode.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('promocode.json');
const code = new PromoCode(JSON.parse(testData));
test('parsed PromoCode object properties must match', () => {
    expect(code.claimCount).toBe(100);
    expect(code.code).toBe('code');
    expect(code.endDate).toBe(999);
    expect(code.startDate).toBe(123);
    expect(code.isClaimable).toBe(true);
    expect(code.isEnabled).toBe(true);
    expect(code.maxClaimCount).toBe(500);
    expect(code.properties['codekey']).toBe('codevalue');

    const creator = code.creator;
    expect(creator.userId).toBe('userid');
    expect(creator.avatarUrl).toBe('avatarurl');
    expect(creator.displayName).toBe('testuser');
    expect(creator.identities['fb']).toBe('token');
    expect(creator.publicProperties['publickey']).toBe('publicvalue');
});
