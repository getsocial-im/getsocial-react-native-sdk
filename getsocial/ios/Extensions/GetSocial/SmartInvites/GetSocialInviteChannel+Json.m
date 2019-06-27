//
// Created by Orest Savchak on 6/2/17.
//

#import "GetSocialInviteChannel+Json.h"
#import "NSMutableDictionary+GetSocial.h"
#import "GetSocialInviteContent+Json.h"

@implementation GetSocialInviteChannel (Json)

- (NSMutableDictionary *)toJsonDictionary
{
    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
    [dictionary gs_setValueOrNSNull:self.channelId forKey:@"ID"];
    [dictionary gs_setValueOrNSNull:self.name forKey:@"NAME"];
    [dictionary gs_setValueOrNSNull:self.iconUrl forKey:@"ICON_IMAGE_URL"];
    [dictionary setValue:@(self.displayOrder) forKey:@"DISPLAY_ORDER"];
    [dictionary setValue:@(self.enabled) forKey:@"IS_ENABLED"];
    return dictionary;
}

@end
