#import "RNGetSocial.h"
#import <React/RCTConvert.h>
#import <React/RCTLog.h>
#import <GetSocial/GetSocial.h>
#import <GetSocialUI/GetSocialUI.h>
#import "NSDictionary+GetSocial.h"
#import "GetSocialReferralData+Json.h"
#import "GetSocialReferredUser+Json.h"
#import "GetSocialPublicUser+Json.h"
#import "GetSocialSuggestedFriend+Json.h"
#import "GetSocialInviteChannel+Json.h"
#import "GetSocialInviteChannel+Json.h"
#import "GetSocialUserReference+Json.h"
#import "GetSocialAction+Json.h"
#import "GetSocialActionButton+Json.h"
#import "GetSocialNotification+Json.h"
#import "GetSocialNotificationsSummary+Json.h"

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
              // action types
              @"ACTION_TYPE_OPEN_PROFILE": GetSocialActionOpenProfile,
              @"ACTION_TYPE_OPEN_INVITES": GetSocialActionOpenInvites,
              @"ACTION_TYPE_OPEN_URL": GetSocialActionOpenUrl,
              @"ACTION_TYPE_ADD_FRIEND": GetSocialActionAddFriend,
              // action data keys
              @"ACTION_DATA_KEY_OPEN_PROFILE_USER_ID": GetSocialActionDataKey_OpenProfile_UserId,
              @"ACTION_DATA_KEY_OPEN_URL_URL": GetSocialActionDataKey_OpenUrl_Url,
              @"ACTION_DATA_KEY_ADD_FRIEND_USER_ID": GetSocialActionDataKey_AddFriend_UserId,
              // notification status
              @"NOTIFICATION_STATUS_READ": GetSocialNotificationStatusRead,
              @"NOTIFICATION_STATUS_UNREAD": GetSocialNotificationStatusUnread,
              @"NOTIFICATION_STATUS_CONSUMED": GetSocialNotificationStatusConsumed,
              @"NOTIFICATION_STATUS_IGNORED": GetSocialNotificationStatusIgnored,
              // notification receivers
              @"NOTIFICATION_RECEIVER_FRIENDS": GetSocial_NotificationPlaceholder_Receivers_Friends,
              @"NOTIFICATION_RECEIVER_REFERRED_USERS": GetSocial_NotificationPlaceholder_Receivers_ReferredUsers,
              @"NOTIFICATION_RECEIVER_REFERRER": GetSocial_NotificationPlaceholder_Receivers_Referrer,
              // notification placeholders
              @"NOTIFICATION_SENDER_DISPLAY_NAME": GetSocial_NotificationPlaceholder_CustomText_SenderDisplayName,
              @"NOTIFICATION_RECEIVER_DISPLAY_NAME": GetSocial_NotificationPlaceholder_CustomText_ReceiverDisplayName,
              // notification types
              @"NOTIFICATION_TYPE_NEW_FRIENDSHIP": GetSocialNotificationTypeNewFriendship,
              @"NOTIFICATION_TYPE_INVITE_ACCEPTED": GetSocialNotificationTypeInviteAccepted,
              @"NOTIFICATION_TYPE_TARGETING": GetSocialNotificationTypeTargeting,
              @"NOTIFICATION_TYPE_DIRECT": GetSocialNotificationTypeDirect,
              @"NOTIFICATION_TYPE_SDK": GetSocialNotificationTypeSDK
             };
}

#pragma mark - GetSocial methods

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
                                   [self invokeReject:reject withError:error];
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
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method isInviteChannelAvailable
RCT_REMAP_METHOD(isInviteChannelAvailable,
                 isInviteChannelAvailableWithChannelId:(NSString*)channelId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([NSNumber numberWithBool:[GetSocial isInviteChannelAvailable:channelId]]);
}

#pragma mark - Method getInviteChannels
RCT_REMAP_METHOD(getInviteChannels,
                 getInviteChannelsWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    NSArray<GetSocialInviteChannel*>* channels = [GetSocial inviteChannels];
    NSMutableArray<NSDictionary*>* returnStruct = [NSMutableArray array];
    for (GetSocialInviteChannel* inviteChannel in channels) {
        [returnStruct addObject:[inviteChannel toJsonDictionary]];
    }
    resolve(returnStruct);
}

#pragma mark - Method createInviteLink
RCT_REMAP_METHOD(createInviteLink,
                 createInviteLinkWithLinkParams:(NSDictionary*)linkParams
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocial createInviteLinkWithParams:linkParams success:^(NSString * _Nonnull result) {
        resolve(result);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method sendInvite
RCT_REMAP_METHOD(sendInvite,
                 sendInviteWithChannelId:(NSString*)channelId
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

    GetSocialMediaAttachment* mediaAttachment = [self createMediaAttachment:inviteParameters[KEY_MEDIA_ATTACHMENT]];
    if (mediaAttachment) {
        mutableInviteContent.mediaAttachment = mediaAttachment;
    }

    [GetSocial sendInviteWithChannelId:channelId inviteContent:mutableInviteContent linkParams:linkParams success:^{
        [self fireInvitesEventWithStatus:@"onComplete" errorMessage:nil];
    } cancel:^{
        [self fireInvitesEventWithStatus:@"onCancel" errorMessage:nil];
    } failure:^(NSError * _Nonnull error) {
        [self fireInvitesEventWithStatus:@"onError" errorMessage: error.description];
    }];
}

#pragma mark - Method getUserById
RCT_REMAP_METHOD(getUserById,
                 getUserById:(NSString*)userId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocial userWithId:userId success:^(GetSocialPublicUser * _Nonnull publicUser) {
        resolve([publicUser toJsonDictionary]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method getUserByAuthIdentity
RCT_REMAP_METHOD(getUserByAuthIdentity,
                  getUserByAuthIdentityWithProviderId:(NSString*)providerId
                  providerUserId:(NSString*)providerUserId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocial userWithId:providerUserId forProvider:providerId success:^(GetSocialPublicUser * _Nonnull publicUser) {
        resolve([publicUser toJsonDictionary]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method getUsersByAuthIdentities
RCT_REMAP_METHOD(getUsersByAuthIdentities,
                 getUsersByAuthIdentitiesWithProviderId:(NSString*)providerId
                 providerUserIds:(NSArray<NSString*>*)providerUserIds
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocial usersWithIds:providerUserIds forProvider:providerId success:^(NSDictionary<NSString *,GetSocialPublicUser *> * _Nonnull publicUsersDictionary) {
        NSMutableDictionary* result = [NSMutableDictionary dictionary];
        NSArray<NSString*>* keys = [publicUsersDictionary allKeys];
        for (NSString* key in keys) {
            result[key] = [publicUsersDictionary[key] toJsonDictionary];
        }
        resolve(result);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method findUsers
RCT_REMAP_METHOD(findUsers,
                 findUsersWithQuery:(NSDictionary*)queryParameters
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    GetSocialUsersQuery* query = [GetSocialUsersQuery usersByDisplayName:queryParameters[@"query"]];
    [query setLimit:[queryParameters[@"limit"] intValue]];

    [GetSocial findUsers:query success:^(NSArray<GetSocialUserReference *> * _Nonnull users) {
        NSMutableArray* result = [NSMutableArray array];
        for (GetSocialUserReference* userReference in users) {
            [result addObject:[userReference toJsonDictionary]];
        }
        resolve(result);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method registerForPushNotifications
RCT_REMAP_METHOD(registerForPushNotifications,
                 registerForPushNotificationsWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocial registerForPushNotifications];
}


#pragma mark - Event tracking


#pragma mark - Method trackCustomEvent
RCT_REMAP_METHOD(trackCustomEvent,
                  trackCustomEventWithEventName:(NSString*)eventName
                  eventProperties:(NSDictionary*)eventProperties
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([NSNumber numberWithBool:[GetSocial trackCustomEventWithName:eventName eventProperties:eventProperties]]);
}

#pragma mark - Action handling

#pragma mark - Method processAction
RCT_REMAP_METHOD(processAction,
                 processAction:(NSDictionary*)actionParameters) {
    NSString* actionType = actionParameters[@"TYPE"];
    NSDictionary* actionData = actionParameters[@"DATA"];
    GetSocialActionBuilder * actionBuilder = [[GetSocialActionBuilder alloc] initWithType:actionType];
    [actionBuilder addActionData:actionData];
    [GetSocial processAction:[actionBuilder build]];
}

#pragma mark - GetSocialUser methods

#pragma mark - Method isAnonymous
RCT_REMAP_METHOD(isAnonymous,
                 isAnonymousWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([NSNumber numberWithBool:[GetSocialUser isAnonymous]]);
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

#pragma mark - Method setDisplayName
RCT_REMAP_METHOD(setDisplayName,
                 setDisplayName:(NSString*)displayName
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser setDisplayName:displayName success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method getAvatarUrl
RCT_REMAP_METHOD(getAvatarUrl,
                 getAvatarUrlWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject){
    resolve([GetSocialUser avatarUrl]);
}

#pragma mark - Method setAvatarUrl
RCT_REMAP_METHOD(setAvatarUrl,
                 setAvatarUrl:(NSString*)avatarUrl
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser setAvatarUrl:avatarUrl success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method setPublicProperty
RCT_REMAP_METHOD(setPublicProperty,
                  setPublicProperty:(NSString*)propertyKey
                  propertyValue:(NSString*)propertyValue
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser setPublicPropertyValue:propertyValue forKey:propertyKey success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method setPrivateProperty
RCT_REMAP_METHOD(setPrivateProperty,
                 setPrivateProperty:(NSString*)propertyKey
                 propertyValue:(NSString*)propertyValue
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser setPrivatePropertyValue:propertyValue forKey:propertyKey success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method hasPublicProperty
RCT_REMAP_METHOD(hasPublicProperty,
                 hasPublicProperty:(NSString*)propertyKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([NSNumber numberWithBool:[GetSocialUser hasPublicPropertyForKey:propertyKey]]);
}

#pragma mark - Method hasPrivateProperty
RCT_REMAP_METHOD(hasPrivateProperty,
                 hasPrivateProperty:(NSString*)propertyKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([NSNumber numberWithBool:[GetSocialUser hasPrivatePropertyForKey:propertyKey]]);
}

#pragma mark - Method getPublicProperty
RCT_REMAP_METHOD(getPublicProperty,
                 getPublicProperty:(NSString*)propertyKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([GetSocialUser publicPropertyValueForKey:propertyKey]);
}

#pragma mark - Method getPrivateProperty
RCT_REMAP_METHOD(getPrivateProperty,
                 getPrivateProperty:(NSString*)propertyKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([GetSocialUser privatePropertyValueForKey:propertyKey]);
}

#pragma mark - Method allPublicProperties
RCT_REMAP_METHOD(allPublicProperties,
                 allPublicPropertiesWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([GetSocialUser allPublicProperties]);
}

#pragma mark - Method allPrivateProperties
RCT_REMAP_METHOD(allPrivateProperties,
                 allPrivatePropertiesWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([GetSocialUser allPrivateProperties]);
}

#pragma mark - Method removePublicProperty
RCT_REMAP_METHOD(removePublicProperty,
                 removePublicProperty:(NSString*)propertyKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser removePublicPropertyForKey:propertyKey success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method deletePrivateProperty
RCT_REMAP_METHOD(removePrivateProperty,
                 removePrivateProperty:(NSString*)propertyKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser removePrivatePropertyForKey:propertyKey success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method addAuthIdentity
RCT_REMAP_METHOD(addAuthIdentity,
                 addAuthIdentityWithJSON:(NSDictionary*)authIdentityDict
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    NSString* providerId = authIdentityDict[@"providerId"];
    NSString* providerUserId = authIdentityDict[@"providerUserId"];
    if ([providerUserId isKindOfClass:[NSNull class]]) {
        providerUserId = nil;
    }
    NSString* accessToken = authIdentityDict[@"accessToken"];
    GetSocialAuthIdentity* authIdentity = [GetSocialAuthIdentity customIdentityForProvider: providerId userId: providerUserId accessToken: accessToken];
    [GetSocialUser addAuthIdentity:authIdentity success:^{
        resolve(nil);
    } conflict:^(GetSocialConflictUser * _Nonnull conflictUser) {
        resolve([conflictUser toJsonDictionary]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method removeAuthIdentity
RCT_REMAP_METHOD(removeAuthIdentity,
                 removeAuthIdentityWithProviderId:(NSString*)providerId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser removeAuthIdentityWithProviderId:providerId success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method switchUser
RCT_REMAP_METHOD(switchUser,
                 switchUserWithJSON:(NSDictionary*)authIdentityDict
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    NSString* providerId = authIdentityDict[@"providerId"];
    NSString* providerUserId = authIdentityDict[@"providerUserId"];
    if ([providerUserId isKindOfClass:[NSNull class]]) {
        providerUserId = nil;
    }
    NSString* accessToken = authIdentityDict[@"accessToken"];
    GetSocialAuthIdentity* authIdentity = [GetSocialAuthIdentity customIdentityForProvider: providerId userId: providerUserId accessToken: accessToken];
    [GetSocialUser switchUserToIdentity:authIdentity success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method getAuthIdentities
RCT_REMAP_METHOD(getAuthIdentities,
                 getAuthIdentitiesWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    resolve([GetSocialUser authIdentities]);
}

#pragma mark - Method AddFriend
RCT_REMAP_METHOD(addFriend,
                 addFriendWithUserId:(NSString*)userId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser addFriend:userId success:^(int result) {
        resolve([NSNumber numberWithInt:result]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method AddFriendsByAuthIdentities
RCT_REMAP_METHOD(addFriendsByAuthIdentities,
                 addFriendsByAuthIdentitiesWithProviderId:(NSString*)providerId
                 userIds:(NSArray<NSString*>*)userIds
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser addFriendsWithIds:userIds forProvider:providerId success:^(int result) {
        resolve([NSNumber numberWithInt:result]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method removeFriend
RCT_REMAP_METHOD(removeFriend,
                 removeFriendWithUserId:(NSString*)userId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser removeFriend:userId success:^(int result) {
        resolve([NSNumber numberWithInt:result]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method removeFriendsByAuthIdentities
RCT_REMAP_METHOD(removeFriendsByAuthIdentities,
                 removeFriendsByAuthIdentitiesWithProviderId:(NSString*)providerId
                 userIds:(NSArray<NSString*>*)userIds
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser removeFriendsWithIds:userIds forProvider:providerId success:^(int result) {
        resolve([NSNumber numberWithInt:result]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method setFriends
RCT_REMAP_METHOD(setFriends,
                 setFriendsWithUserIds:(NSArray<NSString*>*)userIds
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser setFriendsWithIds:userIds success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method setFriendsByAuthIdentities
RCT_REMAP_METHOD(setFriendsByAuthIdentities,
                 setFriendsByAuthIdentitiesWithProviderId:(NSString*)providerId
                 userIds:(NSArray<NSString*>*)userIds
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser setFriendsWithIds:userIds forProvider:providerId success:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method isFriend
RCT_REMAP_METHOD(isFriend,
                 isFriendWithUserId:(NSString*)userId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser isFriend:userId success:^(BOOL result) {
        resolve([NSNumber numberWithBool:result]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method getFriendsCount
RCT_REMAP_METHOD(getFriendsCount,
                 getFriendsCountWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser friendsCountWithSuccess:^(int result) {
        resolve([NSNumber numberWithInt:result]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method getFriends
RCT_REMAP_METHOD(getFriends,
                  getFriendsWithOffset:(int)offset
                  limit:(int)limit
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser friendsWithOffset:0 limit:1000 success:^(NSArray<GetSocialPublicUser *> * _Nonnull friends) {
        NSMutableArray* friendsArray = [NSMutableArray array];
        for (GetSocialPublicUser* friend in friends) {
            [friendsArray addObject:[friend toJsonDictionary]];
        }
        resolve(friendsArray);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method getSuggestedFriends
RCT_REMAP_METHOD(getSuggestedFriends,
                 getSuggestedFriendsWithOffset:(int)offset
                 limit:(int)limit
                 withResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser suggestedFriendsWithOffset:offset limit:limit success:^(NSArray<GetSocialSuggestedFriend *> * _Nonnull suggestedFriends) {
        NSMutableArray* friendsArray = [NSMutableArray array];
        for (GetSocialSuggestedFriend* friend in suggestedFriends) {
            [friendsArray addObject:[friend toJsonDictionary]];
        }
        resolve(friendsArray);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Push notifications

#pragma mark - Method enableNotifications
RCT_REMAP_METHOD(enablePushNotifications,
                 enablePushNotificationsWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [self changePushNotificationsStatusToEnabled:YES resolver:resolve reject:reject];
}

#pragma mark - Method disableNotifications
RCT_REMAP_METHOD(disablePushNotifications,
                 disablePushNotificationsWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [self changePushNotificationsStatusToEnabled:NO resolver:resolve reject:reject];
}

- (void)changePushNotificationsStatusToEnabled:(BOOL)isEnabled
               resolver:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject {
    [GetSocialUser setPushNotificationsEnabled:isEnabled success:^{
        resolve([NSNumber numberWithBool:YES]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method isNotificationsEnabled
RCT_REMAP_METHOD(isPushNotificationsEnabled,
                 isPushNotificationsEnabledWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser isPushNotificationsEnabledWithSuccess:^(BOOL result) {
        resolve([NSNumber numberWithBool:result]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}


#pragma mark - Method getNotifications
RCT_REMAP_METHOD(getNotifications,
                 getNotificationsWithQuery:(NSDictionary*)queryDictionary
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {

    GetSocialNotificationsQuery* query = nil;
    NSArray* filterStatus = queryDictionary[@"STATUS"];
    if (filterStatus.count > 0) {
        query = [GetSocialNotificationsQuery withStatuses:filterStatus];
    } else {
        query = [GetSocialNotificationsQuery withAllStatuses];
    }
    int limit = [queryDictionary[@"LIMIT"] intValue];
    [query setLimit:limit];

    NSArray* filterTypes = queryDictionary[@"TYPES"];
    if (filterTypes.count > 0) {
        [query setTypes:filterTypes];
    }

    NSArray* filterActions = queryDictionary[@"ACTIONS"];
    if (filterActions.count > 0) {
        [query setActions:filterActions];
    }

    NSDictionary* filter = queryDictionary[@"FILTER"];
    GetSocialNotificationsFilter notificationsFilter = [filter[@"FILTER"] intValue];
    if (notificationsFilter != NotificationsNoFilter) {
        NSString* notificationId = filter[@"NOTIFICATION_ID"];
        [query setFilter:notificationsFilter notificationId:notificationId];
    }

    [GetSocialUser notificationsWithQuery:query success:^(NSArray<GetSocialNotification *> * _Nonnull notifications) {
        NSMutableArray* retValue = [NSMutableArray array];
        [notifications enumerateObjectsUsingBlock:^(GetSocialNotification * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            [retValue addObject:[obj toJsonDictionary]];
        }];
        resolve(retValue);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method getNotificationsCount
RCT_REMAP_METHOD(getNotificationsCount,
                 getNotificationsCountWithQuery:(NSDictionary*)queryDictionary
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {

    GetSocialNotificationsCountQuery* query = nil;
    NSArray* filterStatus = queryDictionary[@"STATUS"];
    if (filterStatus.count > 0) {
        query = [GetSocialNotificationsCountQuery withStatuses:filterStatus];
    } else {
        query = [GetSocialNotificationsCountQuery withAllStatuses];
    }

    NSArray* filterTypes = queryDictionary[@"TYPES"];
    if (filterTypes.count > 0) {
        [query setTypes:filterTypes];
    }

    NSArray* filterActions = queryDictionary[@"ACTIONS"];
    if (filterActions.count > 0) {
        [query setActions:filterActions];
    }

    [GetSocialUser notificationsCountWithQuery:query success:^(int result) {
        resolve([NSNumber numberWithInt:result]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method setNotificationStatus
RCT_REMAP_METHOD(setNotificationsStatus,
                  setNotificationsStatusWithNotificationIds:(NSArray*)notificationIds
                  newStatus:(NSString*)newStatus
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {

    [GetSocialUser setNotificationsStatus:notificationIds status:newStatus success:^{
        resolve([NSNumber numberWithBool:YES]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method sendNotification
RCT_REMAP_METHOD(sendNotification,
                  sendNotificationWithRecipients:(NSArray<NSString*>*)recipients
                  notificationContent:(NSDictionary*)notificationContentDictionary
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {

    GetSocialNotificationContent* notificationContent = nil;
    NSString* templateName = notificationContentDictionary[@"TEMPLATE_NAME"];
    if (![templateName isKindOfClass:[NSNull class]] && templateName) {
        notificationContent = [GetSocialNotificationContent withTemplateName:templateName];
    }
    NSString* notificationText = notificationContentDictionary[@"TEXT"];
    if (![notificationText isKindOfClass:[NSNull class]] && notificationText && notificationContent == nil) {
        notificationContent = [GetSocialNotificationContent withText:notificationText];
    }

    NSString* notificationTitle = notificationContentDictionary[@"TITLE"];
    if (![notificationTitle isKindOfClass:[NSNull class]] && notificationTitle) {
        [notificationContent setTitle:notificationTitle];
    }
    if (![notificationText isKindOfClass:[NSNull class]] && notificationText) {
        [notificationContent setText:notificationText];
    }

    // media attachment
    GetSocialMediaAttachment* mediaAttachment = [self createMediaAttachment:notificationContentDictionary[@"MEDIA_ATTACHMENT"]];
    if (mediaAttachment) {
        notificationContent.mediaAttachment = mediaAttachment;
    }

    NSDictionary* templatePlaceholders = notificationContentDictionary[@"TEMPLATE_PLACEHOLDERS"];
    [templatePlaceholders enumerateKeysAndObjectsUsingBlock:^(NSString*  _Nonnull key, NSString*  _Nonnull value, BOOL * _Nonnull stop) {
        [notificationContent addTemplatePlaceholderValue:value forKey:key];
    }];
    GetSocialAction* action = [self createAction: notificationContentDictionary[@"ACTION"]];
    if (action != nil) {
        [notificationContent setAction:action];
    }
    NSArray* actionButtonsDictionary = notificationContentDictionary[@"ACTION_BUTTONS"];
    if (![actionButtonsDictionary isKindOfClass:[NSNull class]]) {
        for(NSDictionary* actionButtonElement in actionButtonsDictionary) {
            [notificationContent addActionButton:[GetSocialActionButton createWithTitle:actionButtonElement[@"TITLE"] andActionId:actionButtonElement[@"ACTION_ID"]]];
        }
    }

    if (recipients.count == 0) {
        reject(@"GetSocial", @"At least 1 recipient must be set", nil);
        return;
    }

    [GetSocialUser sendNotification:recipients withContent:notificationContent success:^(GetSocialNotificationsSummary * _Nonnull summary) {
        resolve([summary toJsonDictionary]);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Method resetUser
RCT_REMAP_METHOD(resetUser,
                 resetUserWithResolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    [GetSocialUser resetWithSuccess:^{
        resolve(nil);
    } failure:^(NSError * _Nonnull error) {
        [self invokeReject:reject withError:error];
    }];
}

#pragma mark - Supported events
- (NSArray<NSString *> *)supportedEvents {
    return @[@"whenInitialized", @"onUserChanged", @"onGlobalError", @"InvitesUIEvent", @"InvitesEvent", @"onNotificationReceived",
             @"NotificationUIActionButtonClickedEvent", @"NotificationUINotificationClickedEvent"];
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

    // listen for notifications
    [GetSocial setNotificationHandler:^BOOL(GetSocialNotification * _Nonnull notification, BOOL wasClicked) {
        if (hasListeners) {
            NSMutableDictionary* retValue = [notification toJsonDictionary];
            retValue[@"WAS_CLICKED"] = [NSNumber numberWithBool:wasClicked];
            [self sendEventWithName:@"onNotificationReceived" body:retValue];
        }
        return YES;
    }];
}

#pragma mark - GetSocial UI methods

#pragma mark - Method closeView
RCT_REMAP_METHOD(closeView,
                 closeView:(BOOL)saveState
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result __unused = [GetSocialUI closeView:saveState];
    });
}

#pragma mark - Method restoreView
RCT_REMAP_METHOD(restoreView,
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL result __unused = [GetSocialUI restoreView];
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
    GetSocialMediaAttachment* mediaAttachment = [self createMediaAttachment:inviteParameters[KEY_MEDIA_ATTACHMENT]];
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

#pragma mark - Method showNotificationCenterView
RCT_REMAP_METHOD(showNotificationCenterView,
                  showNotificationCenterViewWithWindowTitle:(NSString*)windowTitle
                  filterTypes:(NSArray*)filterTypes
                  filterActions:(NSArray*)filterActions
                  handlers:(NSDictionary*)handlers
                 resolver:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {

    GetSocialUINotificationCenterView* ncView = [GetSocialUI createNotificationCenterView];
    [ncView setWindowTitle:windowTitle];

    [ncView setFilterTypes:filterTypes];
    [ncView setFilterActions:filterActions];
    if (handlers[@"NOTIFICATION_CLICK_HANDLER"] != nil) {
        ncView.clickHandler = ^BOOL(GetSocialNotification *notification) {
            [self fireNotificationUINotificationClickedEvent:notification];
            return NO;
        };
    }
    if (handlers[@"ACTIONBUTTON_CLICK_HANDLER"] != nil) {
        ncView.actionButtonHandler = ^BOOL(GetSocialNotification *notification, GetSocialActionButton *actionButton) {
            [self fireNotificationUIActionButtonClickedEvent:notification actionButton:actionButton];
            return NO;
        };
    }

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

- (void)fireInvitesEventWithStatus:(NSString*)status errorMessage:(NSString*)errorMessage
{
    NSMutableDictionary* eventData = [NSMutableDictionary dictionary];
    eventData[@"STATUS"] = status;
    if (errorMessage) {
        eventData[@"ERROR"]  = errorMessage;
    }
    [self sendEventWithName:@"InvitesEvent" body:eventData];
}

- (void)fireNotificationUINotificationClickedEvent:(GetSocialNotification*)notification {
    [self sendEventWithName:@"NotificationUINotificationClickedEvent" body:[notification toJsonDictionary]];
}

- (void)fireNotificationUIActionButtonClickedEvent:(GetSocialNotification*)notification actionButton:(GetSocialActionButton*)actionButton {
    NSMutableDictionary* retValue = [NSMutableDictionary dictionary];
    retValue[@"NOTIFICATION"] = [notification toJsonDictionary];
    retValue[@"ACTION_BUTTON"] = [actionButton toJsonDictionary];
    [self sendEventWithName:@"NotificationUIActionButtonClickedEvent" body:retValue];
}

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

- (GetSocialMediaAttachment*)createMediaAttachment:(NSDictionary*)mediaAttachmentDictionary {
    GetSocialMediaAttachment* mediaAttachment = nil;
    if (![mediaAttachmentDictionary isKindOfClass:[NSNull class]]) {
        NSString* imageUrl = [mediaAttachmentDictionary safeValueForKey:KEY_MEDIA_ATTACHMENT_IMAGE_URL];
        NSString* videoUrl = [mediaAttachmentDictionary safeValueForKey:KEY_MEDIA_ATTACHMENT_VIDEO_URL];
        if (imageUrl) {
            mediaAttachment = [GetSocialMediaAttachment imageUrl:imageUrl];
        }
        if (videoUrl) {
            mediaAttachment = [GetSocialMediaAttachment videoUrl:videoUrl];
        }
    }
    return mediaAttachment;
}

- (GetSocialAction*)createAction:(NSDictionary*)actionDictionary {
    GetSocialAction* action = nil;
    if (![actionDictionary isKindOfClass:[NSNull class]]) {
        NSString* actionType = actionDictionary[@"TYPE"];
        GetSocialActionBuilder *builder = [[GetSocialActionBuilder alloc] initWithType:actionType];

        NSDictionary* actionData = actionDictionary[@"DATA"];
        [actionData enumerateKeysAndObjectsUsingBlock:^(NSString*  _Nonnull key, NSString*  _Nonnull value, BOOL * _Nonnull stop) {
            [builder addActionDataValue:value withKey:key];
        }];
        action = [builder build];
    }
    return action;
}

- (void)invokeReject:(RCTPromiseRejectBlock)reject withError:(NSError*)error {
    NSMutableDictionary* userInfo = [NSMutableDictionary dictionaryWithObject:error.localizedDescription forKey:@"MESSAGE"];
    NSError* errorToReturn = [NSError errorWithDomain:@"GetSocial" code:error.code userInfo:userInfo];
    reject(error.localizedDescription, error.localizedDescription, errorToReturn);
}

@end
