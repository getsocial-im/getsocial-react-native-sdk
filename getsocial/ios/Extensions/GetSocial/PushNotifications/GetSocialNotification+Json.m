//
// Created by Orest Savchak on 6/2/17.
//

#import "GetSocialNotification+Json.h"
#import "NSMutableDictionary+GetSocial.h"
#import "GetSocialAction+Json.h"
#import "NSArray+GetSocial.h"
#import "GetSocialUserReference+Json.h"

@implementation GetSocialNotification (Json)

- (NSMutableDictionary *)toJsonDictionary
{
    NSMutableDictionary *dictionary = @{}.mutableCopy;
    [dictionary gs_setValueOrNSNull:self.title forKey:@"TITLE"];
    [dictionary gs_setValueOrNSNull:self.text forKey:@"TEXT"];
    [dictionary gs_setValueOrNSNull:self.type forKey:@"TYPE"];
    [dictionary gs_setValueOrNSNull:[self.notificationAction toJsonDictionary] forKey:@"ACTION"];
    [dictionary gs_setValueOrNSNull:@(self.action) forKey:@"OLD_ACTION"];
    [dictionary gs_setValueOrNSNull:self.notificationId forKey:@"ID"];
    [dictionary gs_setValueOrNSNull:self.imageUrl forKey:@"IMAGE_URL"];
    [dictionary gs_setValueOrNSNull:self.videoUrl forKey:@"VIDEO_URL"];
    [dictionary gs_setValueOrNSNull:self.status forKey:@"STATUS"];
    NSArray *actionButtons = [self.actionButtons gs_map:^id(GetSocialActionButton *it) {
        return @{@"TITLE": it.title ?: [NSNull null], @"ACTION_ID": it.actionId ?: [NSNull null]};
    }];
    [dictionary gs_setValueOrNSNull:actionButtons forKey:@"ACTION_BUTTONS"];
    [dictionary gs_setValueOrNSNull:@(self.createdAt) forKey:@"CREATED_AT"];
    [dictionary gs_setValueOrNSNull:[self.sender toJsonDictionary] forKey:@"SENDER"];
    return dictionary;
}

@end
