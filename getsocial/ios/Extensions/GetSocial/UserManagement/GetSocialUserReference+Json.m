//
//  GetSocialUserReference+Json.m
//  Unity-iPhone
//
//  Created by Orest Savchak on 11/3/17.
//

#import "GetSocialUserReference+Json.h"
#import "NSMutableDictionary+GetSocial.h"

@implementation GetSocialUserReference (Json)

- (NSMutableDictionary *)toJsonDictionary
{
    NSMutableDictionary *dictionary = [@{} mutableCopy];
    [dictionary gs_setValueOrNSNull:self.userId forKey:@"USER_ID"];
    [dictionary gs_setValueOrNSNull:self.displayName forKey:@"DISPLAY_NAME"];
    [dictionary gs_setValueOrNSNull:self.avatarUrl forKey:@"AVATAR_URL"];
    return dictionary;
}

@end
