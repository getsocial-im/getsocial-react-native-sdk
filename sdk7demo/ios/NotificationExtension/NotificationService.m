//
//  NotificationService.m
//  NotificationExtension
//
//  Created by Gábor Vass on 19/03/2021.
//

#import "NotificationService.h"
#import <GetSocialNotificationExtension/GetSocialNotificationExtension.h>

@interface NotificationService ()

@property (nonatomic, strong) GetSocialNotificationRequestHandler *handler;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
  self.handler = [GetSocialNotificationRequestHandler new];
  [self.handler handleNotificationRequest:request withContentHandler:contentHandler];
}

- (void)serviceExtensionTimeWillExpire {
  [self.handler serviceExtensionTimeWillExpire];
}

@end
