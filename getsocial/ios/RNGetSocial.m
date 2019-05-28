#import "RNGetSocial.h"
#import <React/RCTConvert.h>
#import <React/RCTLog.h>
#import <GetSocial/GetSocial.h>
#import <GetSocialUI/GetSocialUI.h>
#import "NSDictionary+GetSocial.h"
#import "GetSocialReferralData+Json.h"
#import "GetSocialReferredUser+Json.h"

#pragma mark - Private RNGetSocial declarations

@interface RNGetSocial()
@end

#pragma mark - RNGetSocial implementation

@implementation RNGetSocial
{
    bool hasListeners;
}

#define KEY_MEDIA_ATTACHMENT @"mediaAttachment"
#define KEY_INVITE_CONTENT_PARAMETER_CUSTOM_SUBJECT @"inviteSubject"
#define KEY_INVITE_CONTENT_PARAMETER_CUSTOM_TEXT @"inviteText"
#define KEY_MEDIA_ATTACHMENT_IMAGE_URL @"imageUrl"
#define KEY_MEDIA_ATTACHMENT_VIDEO_URL @"videoUrl"

RCT_EXPORT_MODULE()

- (instancetype)init {
    self = [super init];
    if (self) {
        [self setup];
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    return NO;  //run on background thread
}

#pragma mark - Observers

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
}

#pragma mark - Constants

- (NSDictionary *)constantsToExport
{
    return @{
              // link params
              @"KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_TITLE" : GetSocial_Custom_Title,
              @"KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_DESCRIPTION": GetSocial_Custom_Description,
              @"KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_IMAGE": GetSocial_Custom_Image,
              @"KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_YOUTUBE_VIDEO": GetSocial_Custom_YouTubeVideo,
             };
}

#pragma mark - GetSocial

#pragma mark - Method getSdkVersion
RCT_REMAP_METHOD(getSdkVersion,
                 getSdkVersionWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([GetSocial sdkVersion]);
}

#pragma mark - Method isInitialized
RCT_REMAP_METHOD(isInitialized,
                 isInitializedWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([NSNumber numberWithBool:[GetSocial isInitialized]]);
}

#pragma mark - Method init
RCT_REMAP_METHOD(init, initGetSocial) {
    [GetSocial init];
}

#pragma mark - Method initWithAppId
RCT_REMAP_METHOD(initWithAppId, initWithAppId:(NSString*)appId) {
    [GetSocial initWithAppId:appId];
}

#pragma mark - Method getLanguage
RCT_REMAP_METHOD(getLanguage,
                 getLanguageWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([GetSocial language]);
}

#pragma mark - Method setLanguage
RCT_REMAP_METHOD(setLanguage,
                  setLanguage:(NSString*)language
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    BOOL result = [GetSocial setLanguage:language];
    resolve([NSNumber numberWithBool:result]);
}

#pragma mark - Method getUserId
RCT_REMAP_METHOD(getUserId,
                 getUserIdWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([GetSocialUser userId]);
}

#pragma mark - Method getDisplayName
RCT_REMAP_METHOD(getDisplayName,
                 getDisplayNameWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([GetSocialUser displayName]);
}

#pragma mark - Method getAvatarUrl
RCT_REMAP_METHOD(getAvatarUrl,
                 getAvatarUrlWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject){
    resolve([GetSocialUser avatarUrl]);
}

#pragma mark - Method getReferralData
RCT_REMAP_METHOD(getReferralData,
                 getReferralDataWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    
    [GetSocial referralDataWithSuccess:^(GetSocialReferralData *_Nullable referralData) {
        if (referralData == nil) {
            resolve(nil);
        }
        else {
            NSDictionary* referralDataDict = [referralData toJsonDictionary];
            resolve(referralDataDict);
        }
    }
                               failure:^(NSError *_Nonnull error) {
                                   reject(@"GetSocial", @"Failed getting referral data", error);
                               }];
}

#pragma mark - Method clear referral data
RCT_REMAP_METHOD(clearReferralData,
                 clearReferralDataWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocial clearReferralData];
    resolve(nil);
}

#pragma mark - Method get referred users
RCT_REMAP_METHOD(getReferredUsers,
                 getReferredUsersWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocial referredUsersWithSuccess:^(NSArray<GetSocialReferredUser *> * _Nonnull referredUsers) {
        NSMutableArray* referredUsersArray = [NSMutableArray array];
        for (GetSocialReferredUser* referredUser in referredUsers) {
            [referredUsersArray addObject:[referredUser toJsonDictionary]];
        }
        resolve(referredUsersArray);
    } failure:^(NSError * _Nonnull error) {
        reject(@"GetSocial", @"Failed to get referred users", error);
    }];
}

#pragma mark - Supported events
- (NSArray<NSString *> *)supportedEvents {
    return @[@"whenInitialized", @"onUserChanged", @"onGlobalError", @"InvitesUIEvent"];
}

#pragma mark - Setup
- (void)setup {
    //listen for global errors
    [GetSocial setGlobalErrorHandler:^(NSError * _Nonnull error) {
        if (hasListeners) {
            [self sendEventWithName:@"onGlobalError" body:error];
        }
    }];
    
    //listen to the library being initialized
    [GetSocial executeWhenInitialized:^() {
        // notify the JS thread that the GetSocial SDK has been initialized
        // so it can be cached there
        if (hasListeners) { // Only send events if anyone is listening
            [self sendEventWithName:@"whenInitialized" body:nil];
        }
    }];

    //listen for user changed event
    [GetSocialUser setOnUserChangedHandler:^(){
        // notify the JS thread about the new getsocial user id
        if (hasListeners) { // Only send events if anyone is listening
            [self sendEventWithName:@"onUserChanged" body:nil];
        }
    }];
}

#pragma mark - GetSocial UI

#pragma mark - Method closeView
RCT_REMAP_METHOD(closeView,
                 closeView:(BOOL)saveState
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result __unused = [GetSocialUI closeView:saveState];
        resolve(nil);
    });
}

#pragma mark - Method restoreView
RCT_REMAP_METHOD(restoreView,
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result __unused = [GetSocialUI restoreView];
        resolve(nil);
    });
}


#pragma mark - Method showInvitesView
RCT_REMAP_METHOD(showInvitesView,
                  showInvitesViewWithWindowTitle:(NSString*)windowTitle
                  inviteParameters:(NSDictionary*)inviteParameters
                  linkParams:(NSDictionary*)linkParams
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    
    // subject and text
    NSString* customInviteSubject = [inviteParameters safeValueForKey:KEY_INVITE_CONTENT_PARAMETER_CUSTOM_SUBJECT];
    NSString* customInviteText = [inviteParameters safeValueForKey:KEY_INVITE_CONTENT_PARAMETER_CUSTOM_TEXT];

    GetSocialMutableInviteContent* mutableInviteContent = [GetSocialMutableInviteContent new];
    mutableInviteContent.text = customInviteText;
    mutableInviteContent.subject = customInviteSubject;

    // media attachment
    NSDictionary* mediaAttachmentDictionary = inviteParameters[KEY_MEDIA_ATTACHMENT];
    NSString* imageUrl = [mediaAttachmentDictionary safeValueForKey:KEY_MEDIA_ATTACHMENT_IMAGE_URL];
    NSString* videoUrl = [mediaAttachmentDictionary safeValueForKey:KEY_MEDIA_ATTACHMENT_VIDEO_URL];
    GetSocialMediaAttachment* mediaAttachment;
    if (imageUrl) {
        mediaAttachment = [GetSocialMediaAttachment imageUrl:imageUrl];
    }
    if (videoUrl) {
        mediaAttachment = [GetSocialMediaAttachment videoUrl:videoUrl];
    }
    if (mediaAttachment) {
        mutableInviteContent.mediaAttachment = mediaAttachment;
    }

    GetSocialUIInvitesView* invitesView = [GetSocialUI createInvitesView];
    [invitesView setCustomInviteContent:mutableInviteContent];
    [invitesView setLinkParams:linkParams];
    [invitesView setWindowTitle:windowTitle];

    [invitesView setHandlerForInvitesSent:^(NSString * _Nonnull channelId) {
        [self fireInvitesUIEventWithStatus:@"onComplete" channelId:channelId errorMessage:nil];
        } cancel:^(NSString * _Nonnull channelId) {
            [self fireInvitesUIEventWithStatus:@"onCancel" channelId:channelId errorMessage:nil];
        } failure:^(NSString * _Nonnull channelId, NSError * _Nonnull error) {
            [self fireInvitesUIEventWithStatus:@"onError" channelId:channelId errorMessage: error.description];
    }];
    dispatch_async(dispatch_get_main_queue(), ^{
        [invitesView show];
    });
}

#pragma mark - Method loadDefaultConfiguration
RCT_REMAP_METHOD(loadDefaultConfiguration,
                 loadDefaultConfigurationWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    if ([GetSocialUI loadDefaultConfiguration]) {
        resolve(nil);
    } else {
        reject(@"GetSocial", @"Could not load default configuration", nil);
    }
}

#pragma mark - Method loadConfiguration
RCT_REMAP_METHOD(loadConfiguration,
                 loadConfigurationWithPath:(NSString*)path
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    NSString* bundlePath = [[NSBundle mainBundle] bundlePath];
    NSString* completeUIConfigPath = [bundlePath stringByAppendingPathComponent:path];
    if ([GetSocialUI loadConfiguration:completeUIConfigPath]) {
        resolve(nil);
    } else {
        NSString* errorMessage = [NSString stringWithFormat:@"Could not load configuration at path [%@]", path];
        reject(@"GetSocial", errorMessage, RCTErrorWithMessage(errorMessage));
    }
}

#pragma mark - Helper methods

- (void)fireInvitesUIEventWithStatus:(NSString*)status channelId:(NSString*)channelId errorMessage:(NSString*)errorMessage
{
    NSMutableDictionary* eventData = [NSMutableDictionary dictionary];
    eventData[@"STATUS"] = status;
    eventData[@"CHANNEL_ID"]  = channelId;
    if (errorMessage) {
        eventData[@"ERROR"]  = errorMessage;
    }
    [self sendEventWithName:@"InvitesUIEvent" body:eventData];
}

@end
