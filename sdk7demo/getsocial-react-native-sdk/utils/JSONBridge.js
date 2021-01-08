/* eslint-disable max-len */
// @flow
/* eslint-disable require-jsdoc */
import CurrentUser from './../CurrentUser.js';
import Action from './../models/actions/Action.js';
import Topic from './../models/communities/Topic.js';
import PurchaseData from './../models/analytics/PurchaseData.js';
import PagingQuery from './../models/PagingQuery.js';
import PagingResult from './../models/PagingResult.js';
import UserId from './../models/UserId.js';
import UserIdList from './../models/UserIdList.js';
import User from './../models/communities/User.js';
import FriendsQuery from './../models/communities/FriendsQuery.js';
import TopicsQuery from './../models/communities/TopicsQuery.js';
import UsersQuery from './../models/communities/UsersQuery.js';
import FollowQuery from './../models/communities/FollowQuery.js';
import FollowersQuery from './../models/communities/FollowersQuery.js';
import Activity from './../models/communities/Activity.js';
import ActivityContent from './../models/communities/ActivityContent.js';
import Identity from './../models/communities/Identity.js';
import SuggestedFriend from './../models/communities/SuggestedFriend.js';
import AnnouncementsQuery from './../models/communities/AnnouncementsQuery.js';
import ActivitiesQuery from './../models/communities/ActivitiesQuery.js';
import PostActivityTarget from './../models/communities/PostActivityTarget.js';
import ReactionsQuery from './../models/communities/ReactionsQuery.js';
import TagsQuery from './../models/communities/TagsQuery.js';
import UserReactions from './../models/communities/UserReactions.js';
import RemoveActivitiesQuery from './../models/communities/RemoveActivitiesQuery.js';
import Invite from './../models/invites/Invite.js';
import InviteChannel from './../models/invites/InviteChannel.js';
import InviteContent from './../models/invites/InviteContent.js';
import ReferralData from './../models/invites/ReferralData.js';
import ReferralUser from './../models/invites/ReferralUser.js';
import ReferralUsersQuery from './../models/invites/ReferralUsersQuery.js';
import Notification from './../models/notifications/Notification.js';
import NotificationsQuery from './../models/notifications/NotificationsQuery.js';
import NotificationContent from './../models/notifications/NotificationContent.js';
import NotificationContext from './../models/notifications/NotificationContext.js';
import PromoCode from './../models/promocodes/PromoCode.js';
import PromoCodeContent from './../models/promocodes/PromoCodeContent.js';
import SendNotificationTarget from '../models/notifications/SendNotificationTarget.js';
import {GetSocialEventEmitter} from '../GetSocialEventEmitter.js';
import {Platform, NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

export default class JSONBridge {
  static init() {
    RNGetSocial.callSync('GetSocial.init', '');
  }

  static initWithAppId(appid: string) {
    RNGetSocial.callSync('GetSocial.init', appid);
  }

  static addOnInitializedListener(onInit: () => void) {
    JSONBridge.isInitialized().then((initialized) => {
      if (initialized) {
        onInit();
      } else {
        GetSocialEventEmitter.addListener('onInitialized', onInit);
      }
    });
  }

  static isInitialized(): Promise<boolean> {
    return RNGetSocial.callSync('GetSocial.isInitialized', '').then((result) => {
      return JSON.parse(result)['result'] === true;
    });
  }

  static getLanguage(): Promise<string> {
    return RNGetSocial.callSync('GetSocial.getLanguage', '').then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static setLanguage(language: string): Promise<void> {
    return RNGetSocial.callSync('GetSocial.setLanguage', language);
  }

  static isTestDevice(): Promise<boolean> {
    return RNGetSocial.callSync('GetSocial.isTestDevice', '').then((result) => {
      return JSON.parse(result)['result'] === true;
    });
  }

  static getDeviceIdentifier(): Promise<string> {
    return RNGetSocial.callSync('GetSocial.getDeviceIdentifier', '').then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static getSdkVersion(): Promise<string> {
    return RNGetSocial.callSync('GetSocial.getSdkVersion', '').then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static getCurrentUser(): Promise<CurrentUser> {
    return RNGetSocial.callSync('GetSocial.getCurrentUser', '').then((result) => {
      return new CurrentUser(result);
    });
  }

  static addOnCurrentUserChangedListener(onChanged: (newUser: CurrentUser) => void) {
    GetSocialEventEmitter.addListener('onCurrentUserChanged', (result) => {
      onChanged(new CurrentUser(result));
    });
  }

  static handleAction(action: Action): void {
    return RNGetSocial.callSync('GetSocial.handleAction', action.toJSON());
  }

  static resetUser(): Promise<void> {
    return RNGetSocial.callAsync('GetSocial.resetUser', '');
  }

  static switchUser(identity: Identity) {
    return RNGetSocial.callAsync('GetSocial.switchUser', identity.toJSON());
  }

  static trackPurchase(purchaseData: PurchaseData): Promise<boolean> {
    return RNGetSocial.callSync('Analytics.trackPurchase', purchaseData.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static trackCustomEvent(eventName: string, eventProperties: Map<string, string>): Promise<boolean> {
    const trackCustomEventBody = {
      'eventName': eventName,
      'eventData': eventProperties,
    };
    return RNGetSocial.callSync('Analytics.trackCustomEvent', JSON.stringify(trackCustomEventBody)).then((result) => {
      return JSON.parse(result)['result'] === true;
    });
  }

  static addFriends(ids: UserIdList): Promise<number> {
    return RNGetSocial.callAsync('Communities.addFriends', ids.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static removeFriends(ids: UserIdList): Promise<number> {
    return RNGetSocial.callAsync('Communities.removeFriends', ids.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static areFriends(ids: UserIdList): Promise<Map<string, boolean>> {
    return RNGetSocial.callAsync('Communities.areFriends', ids.toJSON()).then((result) => {
      return JSON.parse(result);
    });
  }

  static isFriend(id: UserId): Promise<boolean> {
    return RNGetSocial.callAsync('Communities.isFriend', id.toJSON()).then((result) => {
      return JSON.parse(result)['result'] === true;
    });
  }

  static getFriendsCount(query: FriendsQuery): Promise<number> {
    return RNGetSocial.callAsync('Communities.getFriendsCount', query.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static getFriends(query: PagingQuery<FriendsQuery>): Promise<PagingResult<User>> {
    return RNGetSocial.callAsync('Communities.getFriends', query.toJSON()).then((result) => {
      return new PagingResult<User>(result, (userJson) => {
        return new User(userJson);
      });
    });
  }

  static getSuggestedFriends(query: PagingQuery): Promise<PagingResult<SuggestedFriend>> {
    return RNGetSocial.callAsync('Communities.getSuggestedFriends', query.toJSON()).then((result) => {
      return new PagingResult<SuggestedFriend>(result, (jsonString) => {
        return new SuggestedFriend(jsonString);
      });
    });
  }

  static setFriends(ids: UserIdList): Promise<number> {
    return RNGetSocial.callAsync('Communities.setFriends', ids.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static getUsers(query: PagingQuery<UsersQuery>): Promise<PagingResult<User>> {
    return RNGetSocial.callAsync('Communities.getUsers', query.toJSON()).then((result) => {
      return new PagingResult<User>(result, (userJson) => {
        return new User(userJson);
      });
    });
  }

  static getUsersByIds(ids: UserIdList): Promise<Map<string, User>> {
    return RNGetSocial.callAsync('Communities.getUsersByIds', ids.toJSON());
  }

  static getUser(id: UserId): Promise<User> {
    return RNGetSocial.callAsync('Communities.getUser', id.toJSON()).then((result) => {
      return new User(JSON.parse(result));
    });
  }

  static getUsersCount(query: UsersQuery): Promise<number> {
    return RNGetSocial.callAsync('Communities.getUsersCount', query.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static follow(query: FollowQuery): Promise<number> {
    return RNGetSocial.callAsync('Communities.follow', query.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static unfollow(query: FollowQuery): Promise<number> {
    return RNGetSocial.callAsync('Communities.unfollow', query.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static isFollowing(id: UserId, query: FollowQuery): Promise<Map<string, boolean>> {
    const isFollowingBody = '{' +
      '"userId": ' + id.toJSON() + ',' +
      '"query": ' + query.toJSON() +
    '}';
    return RNGetSocial.callAsync('Communities.isFollowing', isFollowingBody).then((result) => {
      return JSON.parse(result);
    });
  }

  static getFollowers(query: PagingQuery<FollowersQuery>): Promise<PagingResult<User>> {
    return RNGetSocial.callAsync('Communities.getFollowers', query.toJSON()).then((result) => {
      return new PagingResult<User>(result, (userJson) => {
        return new User(userJson);
      });
    });
  }

  static getFollowersCount(query: FollowersQuery): Promise<number> {
    return RNGetSocial.callAsync('Communities.getFollowersCount', query.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static getAnnouncements(query: AnnouncementsQuery): Promise<[Activity]> {
    return RNGetSocial.callAsync('Communities.getAnnouncements', query.toJSON()).then((result) => {
      return new PagingResult<Activity>(result, (activityJson) => {
        return new Activity(activityJson);
      });
    });
  }

  static getActivities(query: PagingQuery<ActivitiesQuery>): Promise<PagingResult<Activity>> {
    return RNGetSocial.callAsync('Communities.getActivities', query.toJSON()).then((result) => {
      return new PagingResult<Activity>(result, (activityJson) => {
        return new Activity(activityJson);
      });
    });
  }

  static getActivity(id: string): Promise<Activity> {
    return RNGetSocial.callAsync('Communities.getActivity', id).then((result) => {
      return new Activity(JSON.parse(result));
    });
  }

  static postActivity(content: ActivityContent, target: PostActivityTarget): Promise<Activity> {
    const postActivityTargetBody = '{' +
      '"target":' + target.toJSON() + ', ' +
      '"content":' + content.toJSON() +
    '}';
    return RNGetSocial.callAsync('Communities.postActivity', postActivityTargetBody).then((result) => {
      return new Activity(JSON.parse(result));
    });
  }

  static updateActivity(id: string, content: ActivityContent): Promise<Activity> {
    const updateActivityTargetBody = '{' +
      '"target": "' + id + '", ' +
      '"content":' + content.toJSON() +
    '}';
    return RNGetSocial.callAsync('Communities.updateActivity', updateActivityTargetBody).then((result) => {
      return new Activity(JSON.parse(result));
    });
  }

  static addReaction(reaction: string, activityId: string): Promise<void> {
    const addReactionBody = {
      'activityId': activityId,
      'reaction': reaction,
    };
    return RNGetSocial.callAsync('Communities.addReaction', addReactionBody);
  }

  static removeReaction(reaction: string, activityId: string): Promise<void> {
    const removeReactionBody = {
      'activityId': activityId,
      'reaction': reaction,
    };
    return RNGetSocial.callAsync('Communities.removeReaction', removeReactionBody);
  }

  static getReactions(query: PagingQuery<ReactionsQuery>): Promise<PagingResult<UserReactions>> {
    return RNGetSocial.callAsync('Communities.getReactions', query.toJSON()).then((result) => {
      return new PagingResult<UserReactions>(result, (reactionJson) => {
        return new Activity(reactionJson);
      });
    });
  }

  static reportActivity(id: string, reason: number, explanation: ?string): Promise<void> {
    const reportActivityBody = {
      'activityId': id,
      'reason': reason,
      'explanation': explanation,
    };
    return RNGetSocial.callAsync('Communities.reportActivity', reportActivityBody);
  }

  static removeActivities(query: RemoveActivitiesQuery): Promise<void> {
    return RNGetSocial.callAsync('Communities.removeActivities', query.toJSON());
  }

  static getTags(query: TagsQuery): Promise<[string]> {
    return RNGetSocial.callAsync('Communities.getTags', query.toJSON()).then((result) => {
      return JSON.parse(result);
    });
  }

  static getTopic(id: string): Promise<Topic> {
    return RNGetSocial.callAsync('Communities.getTopic', id).then((result) => {
      const object = JSON.parse(result);
      return new Topic(object);
    });
  }

  static getTopics(query: PagingQuery<TopicsQuery>): Promise<PagingResult<Topic>> {
    return RNGetSocial.callAsync('Communities.getTopics', query.toJSON()).then((result) => {
      return new PagingResult<Topic>(result, (topicJson) => {
        return new Topic(topicJson);
      });
    });
  }

  static getTopicsCount(query: TopicsQuery): Promise<number> {
    return RNGetSocial.callAsync('Communities.getTopicsCount', query.toJSON());
  }

  static getAvailableChannels(): Promise<[InviteChannel]> {
    return RNGetSocial.callAsync('Invites.getAvailableChannels', '').then((result) => {
      const jsonArray = JSON.parse(result);
      const channelsResult: InviteChannel[] = [];
      jsonArray.forEach((rawChannel) => {
        const channel = new InviteChannel(rawChannel);
        channelsResult.push(channel);
      });
      return channelsResult;
    });
  }

  static createURL(linkParams: ?Map<string, string>): Promise<string> {
    return RNGetSocial.callAsync('Invites.createLink', linkParams === undefined ? '' : JSON.stringify(linkParams)).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static sendInvite(inviteContent: ?InviteContent, channelId: string,
      onComplete: (() => void), onCancel: (() => void), onError: (error: string) => void): void {
    const sendInviteBody = {
      'content': inviteContent == null ? null : inviteContent.toJSON(),
      'channelId': channelId,
    };
    return RNGetSocial.callAsync('Invites.send', JSON.stringify(sendInviteBody)).then((result) => {
      if (result != null && JSON.parse(result)['result'] === 'cancel') {
        onCancel();
      } else {
        onComplete();
      }
    }, (error) => {
      onError(error);
    });
  }

  static createInvite(inviteContent: ?InviteContent): Promise<Invite> {
    return RNGetSocial.callAsync('Invites.create', inviteContent == null ? null : inviteContent.toJSON()).then((result) => {
      return new Invite(JSON.parse(result));
    });
  }

  static setOnReferralDataReceivedListener(onReferralDataReceived: (referralData: ReferralData) => void) {
    GetSocialEventEmitter.addListener('onReferralDataReceived', (result) => {
      onReferralDataReceived(new ReferralData(JSON.parse(result)));
    });
  }

  static getReferredUsers(query: PagingQuery<ReferralUsersQuery>) : Promise<PagingResult<ReferralUser>> {
    return RNGetSocial.callAsync('Invites.getReferredUsers', query.toJSON()).then((result) => {
      return new PagingResult<ReferralUser>(result, (userJson) => {
        return new ReferralUser(userJson);
      });
    });
  }

  static getReferrerUsers(query: PagingQuery<ReferralUsersQuery>) : Promise<PagingResult<ReferralUser>> {
    return RNGetSocial.callAsync('Invites.getReferrerUsers', query.toJSON()).then((result) => {
      return new PagingResult<ReferralUser>(result, (userJson) => {
        return new ReferralUser(userJson);
      });
    });
  }

  static setReferrer(userId: UserId, event: string, eventData: Map<string, string>) : Promise<void> {
    const setReferrerBody = '{' +
      '"userId":' + userId.toJSON() + ',' +
      '"eventName": "' + event + '",' +
      '"customData":' + JSON.stringify(eventData) +
    '}';
    return RNGetSocial.callAsync('Invites.setReferrer', setReferrerBody);
  }

  static registerDevice() {
    return RNGetSocial.callSync('Notifications.registerDevice', '');
  }

  static setOnNotificationReceivedListener(onNotificationReceived: ((notification : Notification) => void)) {
    GetSocialEventEmitter.addListener('onNotificationReceived', (result) => {
      onNotificationReceived(new Notification(JSON.parse(result)));
    });
  }

  static setOnNotificationClickedListener(onNotificationClicked: (notification : Notification, context: NotificationContext) => void) {
    GetSocialEventEmitter.addListener('onNotificationClicked', (result) => {
      if (Platform.OS === 'ios') {
        const obj = JSON.parse(result);
        const notification = new Notification(JSON.parse(obj['notification']));
        const context = new NotificationContext(JSON.parse(obj['context']));
        onNotificationClicked(notification, context);
      }
      if (Platform.OS === 'android') {
        const obj = JSON.parse(result);
        const notification = new Notification(obj['notification']);
        const context = new NotificationContext(obj['context']);
        onNotificationClicked(notification, context);
      }
    });
  }


  static setOnTokenReceivedListener(listener: (token: string) => void) {
    GetSocialEventEmitter.addListener('onTokenReceived', (result) => {
      listener(JSON.parse(result)['result']);
    });
  }

  static arePushNotificationsEnabled(): Promise<boolean> {
    return RNGetSocial.callAsync('Notifications.areEnabled', '').then((result) => {
      const parsedResult = JSON.parse(result)['result'];
      return (parsedResult === true);
    });
  }

  static setPushNotificationsEnabled(enabled: boolean): Promise<void> {
    return RNGetSocial.callAsync('Notifications.setEnabled', enabled.toString());
  }

  static getNotifications(query: PagingQuery<NotificationsQuery>): Promise<PagingResult<Notification>> {
    return RNGetSocial.callAsync('Notifications.get', query.toJSON()).then((result) => {
      return new PagingResult<Notification>(result, (notificationJson) => {
        return new Notification(notificationJson);
      });
    });
  }

  static getNotificationsCount(query: NotificationsQuery): Promise<number> {
    return RNGetSocial.callAsync('Notifications.count', query.toJSON()).then((result) => {
      return JSON.parse(result)['result'];
    });
  }

  static sendNotification(content: NotificationContent, target: SendNotificationTarget): Promise<void> {
    const sendNotificationBody = '{' +
      '"target": ' + target.toJSON() + ',' +
      '"content": ' + content.toJSON() +
    '}';
    return RNGetSocial.callAsync('Notifications.send', sendNotificationBody);
  }

  static setNotificationsStatus(status: string, notificationIds: [string]): Promise<void> {
    const setStatusBody = {
      'status': status,
      'notificationIds': notificationIds,
    };
    return RNGetSocial.callAsync('Notifications.setStatus', JSON.stringify(setStatusBody));
  }

  static createPromoCode(content: PromoCodeContent): Promise<PromoCode> {
    return RNGetSocial.callAsync('PromoCodes.create', content.toJSON()).then((result) => {
      const object = JSON.parse(result);
      return new PromoCode(object);
    });
  }

  static getPromoCode(code: string): Promise<PromoCode> {
    const promoCode = code == null ? '' : code;
    return RNGetSocial.callAsync('PromoCodes.get', promoCode).then((result) => {
      return new PromoCode(JSON.parse(result));
    });
  }

  static claimPromoCode(code: string): Promise<PromoCode> {
    const promoCode = code == null ? '' : code;
    return RNGetSocial.callAsync('PromoCodes.claim', promoCode).then((result) => {
      return new PromoCode(JSON.parse(result));
    });
  }

  static closeView(saveState: boolean) {
    RNGetSocial.callAsyncUI('closeView', saveState);
  }

  static restoreView() {
    RNGetSocial.callAsyncUI('restoreView', '');
  }

  static loadDefaultConfiguration(): Promise<void> {
    return RNGetSocial.callAsyncUI('loadDefaultConfiguration', '');
  }

  static loadConfiguration(path: string): Promise<void> {
    return RNGetSocial.callAsyncUI('loadConfiguration', path);
  }
}
