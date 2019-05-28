//
// Created by Orest Savchak on 6/2/17.
//

#import "GetSocialPublicUser+Json.h"
#import "NSMutableDictionary+GetSocial.h"

@implementation GetSocialPublicUser (Json)

- (NSMutableDictionary *)toJsonDictionary
{
    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
    [dictionary gs_setValueOrNSNull:self.userId forKey:@"USER_ID"];
    [dictionary gs_setValueOrNSNull:self.displayName forKey:@"DISPLAY_NAME"];
    [dictionary gs_setValueOrNSNull:self.avatarUrl forKey:@"AVATAR_URL"];
    [dictionary gs_setValueOrNSNull:[self.authIdentities mutableCopy] forKey:@"IDENTITIES"];
    [dictionary gs_setValueOrNSNull:[self.allPublicProperties mutableCopy] forKey:@"PUBLIC_PROPERTIES"];
    return dictionary;
}

@end
