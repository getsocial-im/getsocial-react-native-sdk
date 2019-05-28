//
//  GetSocialReferredUser+Json.m
//  Unity-iPhone
//
//

#import "GetSocialReferredUser+Json.h"
#import "GetSocialPublicUser+Json.h"

@implementation GetSocialReferredUser(Json)

- (NSMutableDictionary *)toJsonDictionary
{
    NSMutableDictionary *dictionary = [super toJsonDictionary];
    dictionary[@"INSTALLATION_DATE"] = @(self.installationDate);
    dictionary[@"INSTALLATION_CHANNEL"] = self.installationChannel;
    dictionary[@"INSTALL_PLATFORM"] = self.installationPlatform;
    dictionary[@"IS_REINSTALL"] = @(self.isReinstall);
    dictionary[@"IS_INSTALL_SUSPICIOUS"] = @(self.isInstallSuspicious);
    return dictionary;
}

@end
