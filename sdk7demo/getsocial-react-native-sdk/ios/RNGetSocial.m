#import "RNGetSocial.h"
#import <React/RCTConvert.h>
#import <React/RCTLog.h>
#import <GetSocialSDK/GetSocialSDK.h>
#import <GetSocialUI/GetSocialUI.h>

#pragma mark - Private RNGetSocial declarations

@interface RNGetSocial()
@end

#pragma mark - RNGetSocial implementation

@implementation RNGetSocial
{
    bool hasListeners;
}

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

-(void)addListener:(NSString *)eventName {
    [super addListener:eventName];
    // register native listeners here to avoid race conditions

    if ([eventName isEqualToString:@"onInitialized"]) {
        [GetSocialJSONBridge addListener:@"GetSocial.addOnInitializedListener" listener:^(NSString * result) {
            if (self->hasListeners && self.bridge) {
                [self sendEventWithName:@"onInitialized" body: result];
            }
        }];
    }
    if ([eventName isEqualToString:@"onCurrentUserChanged"]) {
        [GetSocialJSONBridge addListener:@"GetSocial.addOnCurrentUserChangedListener" listener:^(NSString * result) {
            if (self->hasListeners && self.bridge) {
                [self sendEventWithName:@"onCurrentUserChanged" body: result];
            }
        }];
    }
    if ([eventName isEqualToString:@"onNotificationReceived"]) {
        [GetSocialJSONBridge addListener:@"Notifications.setOnNotificationReceivedListener" listener:^(NSString * notificationJSON) {
            if (self->hasListeners && self.bridge) {
                [self sendEventWithName:@"onNotificationReceived" body: notificationJSON];
            }
        }];
    }
    if ([eventName isEqualToString:@"onNotificationClicked"]) {
        [GetSocialJSONBridge addListener:@"Notifications.setOnNotificationClickedListener" listener:^(NSString * notificationClickedJSON) {
            if (self->hasListeners && self.bridge) {
                [self sendEventWithName:@"onNotificationClicked" body: notificationClickedJSON];
            }
        }];
    }
    if ([eventName isEqualToString:@"onTokenReceived"]) {
        [GetSocialJSONBridge addListener:@"Notifications.setOnTokenReceivedListener" listener:^(NSString * tokenJSON) {
            if (self->hasListeners && self.bridge) {
                [self sendEventWithName:@"onTokenReceived" body: tokenJSON];
            }
        }];
    }
    if ([eventName isEqualToString:@"onReferralDataReceived"]) {
        [GetSocialJSONBridge addListener:@"Invites.setOnReferralDataReceivedListener" listener:^(NSString * referralDataJSON) {
			if (self->hasListeners && self.bridge) {
                [self sendEventWithName:@"onReferralDataReceived" body: referralDataJSON];
            }
        }];
    }
}

#pragma mark - Constants

- (NSDictionary *)constantsToExport
{
    return @{};
}

#pragma mark - GetSocial methods

RCT_REMAP_METHOD(callSync,
                 callSync:(NSString*)method
                 parameters:(NSString*) parameters
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    
    NSString* newParameters = parameters;
    if (newParameters != nil && GetSocial.isInitialized) {
        newParameters = [parameters stringByReplacingOccurrencesOfString:@"GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42" withString: GetSocial.currentUser.userId];
    }
    NSString* result = [GetSocialJSONBridge callSyncMethod:method with: newParameters];
    resolve(result);
}

RCT_REMAP_METHOD(callAsync,
                 callAsync:(NSString*)method
                 parameters:(NSString*) parameters
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    NSString* newParameters = parameters;
    if (newParameters != nil && GetSocial.isInitialized) {
        newParameters = [parameters stringByReplacingOccurrencesOfString:@"GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42" withString: GetSocial.currentUser.userId];
    }
    
    if ([method isEqualToString:@"Communities.removeActivities"]) {
        newParameters = [newParameters stringByReplacingOccurrencesOfString:@"activityIds" withString:@"ids"];
    }
    [GetSocialJSONBridge callAsyncMethod:method with:newParameters success:^(NSString * result) {
        resolve(result);
    } failure:^(NSString * error) {
        [self invokeReject:reject withErrorMessage:error];
    }];
}


#pragma mark - Supported events
- (NSArray<NSString *> *)supportedEvents {
    return @[
        @"onInitialized",
        @"onCurrentUserChanged",
        @"inviteview_invitesent",
        @"inviteview_invitecancelled",
        @"inviteview_inviteerror",
        @"view_open",
        @"view_close",
        @"activityview_action",
        @"activityview_mentionclick",
        @"activityview_avatarclick",
        @"activityview_mentionclick",
        @"activityview_tagclick",
        @"ncview_notificationclick",
        @"onNotificationReceived",
        @"onNotificationClicked",
        @"onTokenReceived",
        @"onReferralDataReceived",
    ];
}

#pragma mark - Setup
- (void)setup {
}

#pragma mark - GetSocial UI methods

RCT_REMAP_METHOD(showView,
                 showView:(NSString*)viewName
                 parameters:(NSDictionary*)parameters
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    if ([viewName isEqualToString:@"invitesView"]) {
        [self showInvitesViewWithParameters:parameters];
    }
    if([viewName isEqualToString:@"activitiesView"]) {
        [self showActivitiesViewWithParameters: parameters];
    }
    if([viewName isEqualToString:@"ncView"]) {
        [self showNotificationCenterViewWithParameters:parameters resolver:resolve reject: reject];
    }
}

RCT_REMAP_METHOD(callAsyncUI,
                 callAsyncUI:(NSString*)method
                 parameter:(NSString*)parameter
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    if ([method isEqualToString:@"closeView"]) {
		dispatch_async(dispatch_get_main_queue(), ^{
			[GetSocialUI closeView:[parameter boolValue]];
		});
    }
    if ([method isEqualToString:@"restoreView"]) {
		dispatch_async(dispatch_get_main_queue(), ^{
			[GetSocialUI restoreView];
		});
    }
    if ([method isEqualToString:@"loadDefaultConfiguration"]) {
        if ([GetSocialUI loadDefaultConfiguration]) {
            resolve(@"");
        } else {
            [self invokeReject:reject withErrorMessage:@"Failed to load default UI configuration"];
        }
    }
    if ([method isEqualToString:@"loadConfiguration"]) {
        if ([GetSocialUI loadConfiguration:parameter]) {
            resolve(@"");
        } else {
            [self invokeReject:reject withErrorMessage:@"Failed to load custom UI configuration, check logs for more information"];
        }
    }
}


#pragma mark - Method showInvitesView

- (void)showInvitesViewWithParameters:(NSDictionary*)parameters {
    NSString* windowTitle = [parameters objectForKey: @"windowTitle"];
    NSString* customContent = [parameters objectForKey: @"inviteContent"];
    
    GetSocialUIInvitesView* invitesView = [GetSocialUIInvitesView new];
	if (![windowTitle isKindOfClass:[NSNull class]] && windowTitle.length > 0) {
        invitesView.windowTitle = windowTitle;
    }
	if (![customContent isKindOfClass:[NSNull class]] && customContent.length > 0) {
        GetSocialInviteContent* inviteContent = [GetSocialJSONBridge decodeInviteContent:customContent];
        [invitesView setCustomInviteContent:inviteContent];
    }
    
    [invitesView setHandlerForInvitesSent:^(NSString * _Nonnull channelId) {
        [self fireUIEvent: @"inviteview_invitesent" channelId:channelId errorMessage:nil];
    } cancel:^(NSString * _Nonnull channelId) {
        [self fireUIEvent: @"inviteview_invitecancelled" channelId:channelId errorMessage:nil];
    } failure:^(NSString * _Nonnull channelId, NSError * _Nonnull error) {
        [self fireUIEvent: @"inviteview_inviteerror" channelId:channelId errorMessage: error.description];
    }];
    [invitesView setHandlerForViewOpen:^{
        [self fireUIEvent:@"view_open" body: nil];
    } close:^{
        [self fireUIEvent:@"view_close" body: nil];
    }];
    dispatch_async(dispatch_get_main_queue(), ^{
        [invitesView show];
    });
}

- (void)showActivitiesViewWithParameters:(NSDictionary*)parameters {
    NSString* windowTitle = [parameters objectForKey: @"windowTitle"];
    NSString* queryParameters = [parameters objectForKey: @"query"];
    if (queryParameters != nil && GetSocial.isInitialized) {
        queryParameters = [queryParameters stringByReplacingOccurrencesOfString:@"GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42" withString: GetSocial.currentUser.userId];
    }
    GetSocialActivitiesQuery* query = [GetSocialJSONBridge decodeActivitiesQuery:queryParameters];
    GetSocialUIActivityFeedView* feedView = [GetSocialUIActivityFeedView viewForQuery:query];
	if (![windowTitle isKindOfClass:[NSNull class]] && windowTitle.length > 0) {
        feedView.windowTitle = windowTitle;
    }
    
    [feedView setHandlerForViewOpen:^{
        [self fireUIEvent:@"view_open" body:nil];
    } close:^{
        [self fireUIEvent:@"view_close" body:nil];
    }];
    [feedView setActionHandler:^(GetSocialAction *action) {
        [self fireUIEvent:@"activityview_action" body:[GetSocialJSONBridge encodeAny:action]];
    }];
    [feedView setTagClickHandler:^(NSString *tagName) {
        [self fireUIEvent:@"activityview_tagclick" body: tagName];
    }];
    [feedView setAvatarClickHandler:^(GetSocialUser *user) {
        [self fireUIEvent:@"activityview_avatarclick" body:[GetSocialJSONBridge encodeAny:user]];
    }];
    [feedView setMentionClickHandler:^(NSString *mention) {
        [self fireUIEvent:@"activityview_mentionclick" body: mention];
    }];
    dispatch_async(dispatch_get_main_queue(), ^{
        [feedView show];
    });
}

-(void)showNotificationCenterViewWithParameters:(NSDictionary*)parameters
                                       resolver:(RCTPromiseResolveBlock)resolve
                                         reject:(RCTPromiseRejectBlock)reject {
    
    NSString* windowTitle = [parameters objectForKey: @"windowTitle"];
    NSString* queryParameters = [parameters objectForKey: @"query"];
    if (queryParameters != nil && GetSocial.isInitialized) {
        queryParameters = [queryParameters stringByReplacingOccurrencesOfString:@"GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42" withString: GetSocial.currentUser.userId];
    }
    GetSocialNotificationsQuery* query = [GetSocialJSONBridge decodeNotificationsQuery: queryParameters];
    GetSocialUINotificationCenterView* ncView = [GetSocialUINotificationCenterView viewForQuery:query];
	if (![windowTitle isKindOfClass:[NSNull class]] && windowTitle.length > 0) {
        ncView.windowTitle = windowTitle;
    }
    
    [ncView setHandlerForViewOpen:^{
        [self fireUIEvent:@"view_open" body:nil];
    } close:^{
        [self fireUIEvent:@"view_close" body:nil];
    }];
    [ncView setClickHandler:^(GetSocialNotification *notification, GetSocialNotificationContext *notificationContext) {
        NSDictionary* notificationClickBody = @{ @"notification" : [GetSocialJSONBridge encodeAny:notification], @"context": [GetSocialJSONBridge encodeAny: notificationContext] };
        [self fireUIEvent:@"ncview_notificationclick" body: notificationClickBody];
    }];
    dispatch_async(dispatch_get_main_queue(), ^{
        [ncView show];
    });
}

#pragma mark - Method loadDefaultConfiguration
RCT_REMAP_METHOD(loadDefaultConfiguration,
                 loadDefaultConfigurationWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    if ([GetSocialUI loadDefaultConfiguration]) {
        resolve(nil);
    } else {
        reject(@"Could not load default configuration", @"Could not load default configuration", nil);
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
        reject(errorMessage, errorMessage, RCTErrorWithMessage(errorMessage));
    }
}

#pragma mark - Helper methods

RCT_REMAP_METHOD(loadLocalResource,
                 loadLocalResourceWithUri:(NSString*)path
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    NSData* imageData = [self loadImageFromFile:path];
    NSString *base64Encoded = [imageData base64EncodedStringWithOptions:0];
    resolve(base64Encoded);
}


- (void)fireUIEvent:(NSString*)uiEvent body:(id)body {
	if (self.bridge) {
		dispatch_async(dispatch_get_main_queue(), ^{
			[self sendEventWithName:uiEvent body: body];
		});
	}
}

- (void)fireUIEvent:(NSString*)uiEvent channelId:(NSString*)channelId errorMessage:(NSString*)errorMessage
{
    NSMutableDictionary* eventData = [NSMutableDictionary dictionary];
    eventData[@"channelId"]  = channelId;
    if (errorMessage) {
        eventData[@"error"]  = errorMessage;
    }
	if (self.bridge) {
		[self sendEventWithName: uiEvent body:eventData];
	}
}

- (NSData*) loadImageFromFile:(NSString*)fileUri {
	NSArray<NSString*>* parts = [fileUri componentsSeparatedByString:@"."];
	NSString* imagePath = [[NSBundle mainBundle] pathForResource: parts[0] ofType: parts[1]];
	if ([NSFileManager.defaultManager fileExistsAtPath:imagePath]) {
		return [NSData dataWithContentsOfFile: imagePath];
	}
    NSURL *url = [NSURL URLWithString:fileUri];
    NSData* imageData = [NSData dataWithContentsOfURL:url];
    return imageData;
}

- (void)invokeReject:(RCTPromiseRejectBlock)reject withErrorMessage:(NSString*)errorMessage
{
    NSDictionary* errorDictionary = [NSJSONSerialization JSONObjectWithData: [errorMessage dataUsingEncoding:NSUTF8StringEncoding] options: NSJSONReadingAllowFragments error:nil];
    reject(errorDictionary[@"code"], errorDictionary[@"message"], nil);
}

- (void)invokeReject:(RCTPromiseRejectBlock)reject withError:(NSError*)error {
    NSMutableDictionary* userInfo = [NSMutableDictionary dictionaryWithObject:error.localizedDescription forKey:@"MESSAGE"];
    NSError* errorToReturn = [NSError errorWithDomain:@"GetSocial" code:error.code userInfo:userInfo];
    reject(error.localizedDescription, error.localizedDescription, errorToReturn);
}

@end
