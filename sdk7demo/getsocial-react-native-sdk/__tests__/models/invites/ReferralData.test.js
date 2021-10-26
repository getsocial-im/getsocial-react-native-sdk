import ReferralData from './../../../models/invites/ReferralData.js';

const {readObjectToDecode} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readObjectToDecode('referraldata.json');
const data = new ReferralData(JSON.parse(testData));
test('parsed ReferralData object properties must match', () => {
    expect(data.token).toBe('token');
    expect(data.referrerUserId).toBe('userid');
    expect(data.referrerChannelId).toBe('channelid');
    expect(data.isFirstMatch).toBe(true);
    expect(data.isGuaranteedMatch).toBe(true);
    expect(data.isReinstall).toBe(true);
    expect(data.isFirstMatchLink).toBe(true);
    expect(data.referralLinkParams['link']).toBe('param');
    expect(data.originalReferralLinksParams['original']).toBe('linkparam');
});
