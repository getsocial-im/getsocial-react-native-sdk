//
//  GetSocialActionButton+Json.m
//  Unity-iPhone
//
//

#import "GetSocialActionButton+Json.h"
#import "NSMutableDictionary+GetSocial.h"

@implementation GetSocialActionButton(Json)

- (NSMutableDictionary *)toJsonDictionary
{
    return @{
             @"ACTION_ID": self.actionId ?: [NSNull null],
             @"TITLE": self.title ?: [NSNull null]
             }.mutableCopy;
}
@end
