//
// Created by Orest Savchak on 6/2/17.
//

#import "GetSocialReferralData+Json.h"
#import "NSMutableDictionary+GetSocial.h"


@implementation GetSocialReferralData (Json)

- (NSMutableDictionary *)toJsonDictionary
{
    NSMutableDictionary *dictionary = [NSMutableDictionary new];
    [dictionary gs_setValueOrNSNull:self.token forKey:@"TOKEN"];
    [dictionary gs_setValueOrNSNull:self.referrerUserId forKey:@"REFERRER_USER_ID"];
    [dictionary gs_setValueOrNSNull:self.referrerChannelId forKey:@"REFERRER_CHANNEL_ID"];
    [dictionary gs_setValueOrNSNull:@(self.isFirstMatch) forKey:@"IS_FIRST_MATCH"];
    [dictionary gs_setValueOrNSNull:@(self.isGuaranteedMatch) forKey:@"IS_GUARANTEED_MATCH"];
    [dictionary gs_setValueOrNSNull:@(self.isReinstall) forKey:@"IS_REINSTALL"];
    [dictionary gs_setValueOrNSNull:@(self.isFirstMatchLink) forKey:@"IS_FIRST_MATCH_LINK"];
    [dictionary gs_setValueOrNSNull:self.referralLinkParams forKey:@"REFERRAL_LINK_PARAMS"];
    [dictionary gs_setValueOrNSNull:self.originalReferralLinkParams forKey:@"ORIGINAL_REFERRAL_LINK_PARAMS"];
    return dictionary;
}

@end
