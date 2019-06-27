//
// Created by Orest Savchak on 6/2/17.
//

#import "GetSocialInviteContent+Json.h"
#import "NSMutableDictionary+GetSocial.h"
#import "UIImage+GetSocial.h"


@implementation GetSocialInviteContent (Json)

- (NSMutableDictionary *)toJsonDictionary
{
    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
    [dictionary gs_setValueOrNSNull:self.imageUrl forKey:@"IMAGE_URL"];
    [dictionary gs_setValueOrNSNull:self.subject forKey:@"SUBJECT"];
    [dictionary gs_setValueOrNSNull:self.text forKey:@"TEXT"];
    [dictionary gs_setValueOrNSNull:[self.image toBase64] forKey:@"IMAGE_BASE64"];
    [dictionary gs_setValueOrNSNull:self.gifUrl forKey:@"GIF_URL"];
    [dictionary gs_setValueOrNSNull:self.videoUrl forKey:@"VIDEO_URL"];
    return dictionary;
}

@end
