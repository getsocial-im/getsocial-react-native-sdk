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
import VotesQuery from './../models/communities/VotesQuery.js';
import TagsQuery from './../models/communities/TagsQuery.js';
import UserReactions from './../models/communities/UserReactions.js';
import UserVotes from './../models/communities/UserVotes.js';
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
import Group from './../models/communities/Group.js';
import GroupContent from './../models/communities/GroupContent.js';
import AddGroupMembersQuery from './../models/communities/AddGroupMembersQuery.js';
import GroupMember from './../models/communities/GroupMember.js';
import GroupsQuery from './../models/communities/GroupsQuery.js';
import JoinGroupQuery from './../models/communities/JoinGroupQuery.js';
import MembersQuery from './../models/communities/MembersQuery.js';
import Membership from './../models/communities/Membership.js';
import RemoveGroupMembersQuery from './../models/communities/RemoveGroupMembersQuery.js';
import UpdateGroupMembersQuery from './../models/communities/UpdateGroupMembersQuery.js';
import Chat from './../models/communities/Chat.js';
import ChatId from './../models/communities/ChatId.js';
import ChatMessage from './../models/communities/ChatMessage.js';
import ChatMessageContent from './../models/communities/ChatMessageContent.js';
import ChatMessagesPagingQuery from './../models/communities/ChatMessagesPagingQuery.js';
import ChatMessagesPagingResult from './../models/communities/ChatMessagesPagingResult.js';

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

    static initWithIdentity(identity: Identity): Promise<void> {
        return RNGetSocial.callAsync('GetSocial.initWithIdentity', JSON.stringify(identity));
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
        return RNGetSocial.callSync('GetSocial.handleAction', JSON.stringify(action));
    }

    static resetUser(): Promise<void> {
        return RNGetSocial.callAsync('GetSocial.resetUser', '');
    }

    static reset(): Promise<void> {
        return RNGetSocial.callAsync('GetSocial.resetUserWithoutInit', '');
    }

    static switchUser(identity: Identity) {
        return RNGetSocial.callAsync('GetSocial.switchUser', JSON.stringify(identity));
    }

    static trackPurchase(purchaseData: PurchaseData): Promise<boolean> {
        return RNGetSocial.callSync('Analytics.trackPurchase', JSON.stringify(purchaseData)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static trackCustomEvent(eventName: string, eventProperties: Map<string, string>): Promise<boolean> {
        const trackCustomEventBody = {
            eventName: eventName,
            eventData: eventProperties,
        };
        return RNGetSocial.callSync('Analytics.trackCustomEvent', JSON.stringify(trackCustomEventBody)).then((result) => {
            return JSON.parse(result)['result'] === true;
        });
    }

    static addFriends(ids: UserIdList): Promise<number> {
        return RNGetSocial.callAsync('Communities.addFriends', JSON.stringify(ids)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static removeFriends(ids: UserIdList): Promise<number> {
        return RNGetSocial.callAsync('Communities.removeFriends', JSON.stringify(ids)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static areFriends(ids: UserIdList): Promise<Map<string, boolean>> {
        return RNGetSocial.callAsync('Communities.areFriends', JSON.stringify(ids)).then((result) => {
            return JSON.parse(result);
        });
    }

    static isFriend(id: UserId): Promise<boolean> {
        return RNGetSocial.callAsync('Communities.isFriend', JSON.stringify(id)).then((result) => {
            return JSON.parse(result)['result'] === true;
        });
    }

    static getFriendsCount(query: FriendsQuery): Promise<number> {
        return RNGetSocial.callAsync('Communities.getFriendsCount', JSON.stringify(query)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static getFriends(query: PagingQuery<FriendsQuery>): Promise<PagingResult<User>> {
        return RNGetSocial.callAsync('Communities.getFriends', JSON.stringify(query)).then((result) => {
            return new PagingResult<User>(result, (userJson) => {
                return new User(userJson);
            });
        });
    }

    static getSuggestedFriends(query: PagingQuery): Promise<PagingResult<SuggestedFriend>> {
        return RNGetSocial.callAsync('Communities.getSuggestedFriends', JSON.stringify(query)).then((result) => {
            return new PagingResult<SuggestedFriend>(result, (jsonString) => {
                return new SuggestedFriend(jsonString);
            });
        });
    }

    static setFriends(ids: UserIdList): Promise<number> {
        return RNGetSocial.callAsync('Communities.setFriends', JSON.stringify(ids)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static getUsers(query: PagingQuery<UsersQuery>): Promise<PagingResult<User>> {
        return RNGetSocial.callAsync('Communities.getUsers', JSON.stringify(query)).then((result) => {
            return new PagingResult<User>(result, (userJson) => {
                return new User(userJson);
            });
        });
    }

    static getUsersByIds(ids: UserIdList): Promise<Map<string, User>> {
        return RNGetSocial.callAsync('Communities.getUsersByIds', JSON.stringify(ids)).then((result) => {
            const jsonMap = JSON.parse(result);
            const entries = new Map();
            Object.keys(jsonMap).forEach(function(key) {
                const value = jsonMap[key];
                if (value !== null && value !== undefined) {
                    entries[key] = new User(value);
                } else {
                    entries[key] = null;
                }
            });
            return entries;
        });
    }

    static getUser(id: UserId): Promise<User> {
        return RNGetSocial.callAsync('Communities.getUserById', JSON.stringify(id)).then((result) => {
            return new User(JSON.parse(result));
        });
    }

    static getUsersCount(query: UsersQuery): Promise<number> {
        return RNGetSocial.callAsync('Communities.getUsersCount', JSON.stringify(query)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static follow(query: FollowQuery): Promise<number> {
        return RNGetSocial.callAsync('Communities.follow', JSON.stringify(query)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static unfollow(query: FollowQuery): Promise<number> {
        return RNGetSocial.callAsync('Communities.unfollow', JSON.stringify(query)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static isFollowing(id: UserId, query: FollowQuery): Promise<Map<string, boolean>> {
        const isFollowingBody = {userId: id, query: query};
        return RNGetSocial.callAsync('Communities.isFollowing', JSON.stringify(isFollowingBody)).then((result) => {
            return JSON.parse(result);
        });
    }

    static getFollowers(query: PagingQuery<FollowersQuery>): Promise<PagingResult<User>> {
        return RNGetSocial.callAsync('Communities.getFollowers', JSON.stringify(query)).then((result) => {
            return new PagingResult<User>(result, (userJson) => {
                return new User(userJson);
            });
        });
    }

    static getFollowersCount(query: FollowersQuery): Promise<number> {
        return RNGetSocial.callAsync('Communities.getFollowersCount', JSON.stringify(query)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static getAnnouncements(query: AnnouncementsQuery): Promise<[Activity]> {
        return RNGetSocial.callAsync('Communities.getAnnouncements', JSON.stringify(query)).then((result) => {
            const objectResult = JSON.parse(result);
            const entries: [Activity] = [];
            objectResult.forEach((element) => {
                entries.push(new Activity(element));
            });
            return entries;
        });
    }

    static getActivities(query: PagingQuery<ActivitiesQuery>): Promise<PagingResult<Activity>> {
        return RNGetSocial.callAsync('Communities.getActivities', JSON.stringify(query)).then((result) => {
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
        const postActivityTargetBody = {target: target, content: content};
        return RNGetSocial.callAsync('Communities.postActivity', JSON.stringify(postActivityTargetBody)).then((result) => {
            return new Activity(JSON.parse(result));
        });
    }

    static updateActivity(id: string, content: ActivityContent): Promise<Activity> {
        const updateActivityTargetBody = {target: id, content: content};
        return RNGetSocial.callAsync('Communities.updateActivity', JSON.stringify(updateActivityTargetBody)).then((result) => {
            return new Activity(JSON.parse(result));
        });
    }

    static addReaction(reaction: string, activityId: string): Promise<void> {
        const addReactionBody = {activityId: activityId, reaction: reaction};
        return RNGetSocial.callAsync('Communities.addReaction', JSON.stringify(addReactionBody));
    }

    static setReaction(reaction: string, activityId: string): Promise<void> {
        const addReactionBody = {activityId: activityId, reaction: reaction};
        return RNGetSocial.callAsync('Communities.setReaction', JSON.stringify(addReactionBody));
    }

    static removeReaction(reaction: string, activityId: string): Promise<void> {
        const removeReactionBody = {activityId: activityId, reaction: reaction};
        return RNGetSocial.callAsync('Communities.removeReaction', JSON.stringify(removeReactionBody));
    }

    static getReactions(query: PagingQuery<ReactionsQuery>): Promise<PagingResult<UserReactions>> {
        return RNGetSocial.callAsync('Communities.getReactions', JSON.stringify(query)).then((result) => {
            return new PagingResult<UserReactions>(result, (reactionJson) => {
                return new UserReactions(reactionJson);
            });
        });
    }

    static addVotes(votes: Array<string>, activityId: string): Promise<void> {
        const addVotesBody = {activityId: activityId, pollOptionIds: votes};
        return RNGetSocial.callAsync('Communities.addVotes', JSON.stringify(addVotesBody));
    }

    static setVotes(votes: Array<string>, activityId: string): Promise<void> {
        const addVotesBody = {activityId: activityId, pollOptionIds: votes};
        return RNGetSocial.callAsync('Communities.setVotes', JSON.stringify(addVotesBody));
    }

    static removeVotes(votes: Array<string>, activityId: string): Promise<void> {
        const addVotesBody = {activityId: activityId, pollOptionIds: votes};
        return RNGetSocial.callAsync('Communities.removeVotes', JSON.stringify(addVotesBody));
    }

    static getVotes(query: PagingQuery<VotesQuery>): Promise<PagingResult<UserVotes>> {
        return RNGetSocial.callAsync('Communities.getVotes', JSON.stringify(query)).then((result) => {
            return new PagingResult<UserVotes>(result, (voteJson) => {
                return new UserVotes(voteJson);
            });
        });
    }

    static reportActivity(id: string, reason: number, explanation: ?string): Promise<void> {
        const reportActivityBody = {activityId: id, reason: reason, explanation: explanation};
        return RNGetSocial.callAsync('Communities.reportActivity', JSON.stringify(reportActivityBody));
    }

    static removeActivities(query: RemoveActivitiesQuery): Promise<void> {
        return RNGetSocial.callAsync('Communities.removeActivities', JSON.stringify(query));
    }

    static getTags(query: TagsQuery): Promise<[string]> {
        return RNGetSocial.callAsync('Communities.getTags', JSON.stringify(query)).then((result) => {
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
        return RNGetSocial.callAsync('Communities.getTopics', JSON.stringify(query)).then((result) => {
            return new PagingResult<Topic>(result, (topicJson) => {
                return new Topic(topicJson);
            });
        });
    }

    static getTopicsCount(query: TopicsQuery): Promise<number> {
        return RNGetSocial.callAsync('Communities.getTopicsCount', JSON.stringify(query)).then((result) => {
            return JSON.parse(result)['result'];
        });
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
        if (Platform.OS === 'ios') {
            const content = new InviteContent();
            content.linkParams = linkParams;
            return RNGetSocial.callAsync('Invites.createLink', JSON.stringify(content)).then((result) => {
                return JSON.parse(result)['result'];
            });
        } else {
            return RNGetSocial.callAsync('Invites.createLink', linkParams === undefined ? '' : JSON.stringify(linkParams)).then((result) => {
                return JSON.parse(result)['result'];
            });
        }
    }

    static sendInvite(inviteContent: ?InviteContent, channelId: string,
        onComplete: (() => void), onCancel: (() => void), onError: (error: string) => void): void {
        const sendInviteBody = {content: inviteContent, channelId: channelId};
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
        return RNGetSocial.callAsync('Invites.create', inviteContent == null ? null : JSON.stringify(inviteContent)).then((result) => {
            return new Invite(JSON.parse(result));
        });
    }

    static setOnReferralDataReceivedListener(onReferralDataReceived: (referralData: ReferralData) => void) {
        GetSocialEventEmitter.addListener('onReferralDataReceived', (result) => {
            onReferralDataReceived(new ReferralData(JSON.parse(result)));
        });
        if (Platform.OS === 'android') {
            RNGetSocial.registerListener('onReferralDataReceived');
        }
    }

    static getReferredUsers(query: PagingQuery<ReferralUsersQuery>) : Promise<PagingResult<ReferralUser>> {
        return RNGetSocial.callAsync('Invites.getReferredUsers', JSON.stringify(query)).then((result) => {
            return new PagingResult<ReferralUser>(result, (userJson) => {
                return new ReferralUser(userJson);
            });
        });
    }

    static getReferrerUsers(query: PagingQuery<ReferralUsersQuery>) : Promise<PagingResult<ReferralUser>> {
        return RNGetSocial.callAsync('Invites.getReferrerUsers', JSON.stringify(query)).then((result) => {
            return new PagingResult<ReferralUser>(result, (userJson) => {
                return new ReferralUser(userJson);
            });
        });
    }

    static setReferrer(userId: UserId, event: string, eventData: Map<string, string>) : Promise<void> {
        const setReferrerBody = {userId: userId, eventName: event, customData: eventData};
        return RNGetSocial.callAsync('Invites.setReferrer', JSON.stringify(setReferrerBody));
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
                const notification = new Notification(obj['notification']);
                const context = new NotificationContext(obj['context']);
                onNotificationClicked(notification, context);
            }
            if (Platform.OS === 'android') {
                const obj = JSON.parse(result);
                const notification = new Notification(obj['notification']);
                const context = new NotificationContext(obj['context']);
                onNotificationClicked(notification, context);
            }
        });
        if (Platform.OS === 'android') {
            RNGetSocial.registerListener('onNotificationClicked');
        }
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
        return RNGetSocial.callAsync('Notifications.get', JSON.stringify(query)).then((result) => {
            return new PagingResult<Notification>(result, (notificationJson) => {
                return new Notification(notificationJson);
            });
        });
    }

    static getNotificationsCount(query: NotificationsQuery): Promise<number> {
        return RNGetSocial.callAsync('Notifications.count', JSON.stringify(query)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static sendNotification(content: NotificationContent, target: SendNotificationTarget): Promise<void> {
        const sendNotificationBody = {target: target, content: content};
        return RNGetSocial.callAsync('Notifications.send', JSON.stringify(sendNotificationBody));
    }

    static setNotificationsStatus(status: string, notificationIds: [string]): Promise<void> {
        const setStatusBody = {status: status, notificationIds: notificationIds};
        return RNGetSocial.callAsync('Notifications.setStatus', JSON.stringify(setStatusBody));
    }

    static createPromoCode(content: PromoCodeContent): Promise<PromoCode> {
        return RNGetSocial.callAsync('PromoCodes.create', JSON.stringify(content)).then((result) => {
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

    // groups
    static createGroup(groupContent: GroupContent): Promise<Group> {
        return RNGetSocial.callAsync('Communities.createGroup', JSON.stringify(groupContent)).then((result) => {
            return new Group(JSON.parse(result));
        });
    }

    static updateGroup(groupId: string, groupContent: GroupContent): Promise<Group> {
        const updateGroupBody = {groupId: groupId, content: groupContent};
        return RNGetSocial.callAsync('Communities.updateGroup', JSON.stringify(updateGroupBody)).then((result) => {
            return new Group(JSON.parse(result));
        });
    }

    static removeGroups(groupIds: [string]): Promise<void> {
        return RNGetSocial.callAsync('Communities.removeGroups', JSON.stringify(groupIds));
    }

    static getGroup(groupId: string): Promise<Group> {
        return RNGetSocial.callAsync('Communities.getGroup', groupId).then((result) => {
            return new Group(JSON.parse(result));
        });
    }

    static getGroups(query: PagingQuery<GroupsQuery>): Promise<PagingResult<Group>> {
        return RNGetSocial.callAsync('Communities.getGroups', JSON.stringify(query)).then((result) => {
            return new PagingResult<Group>(result, (groupJson) => {
                return new Group(groupJson);
            });
        });
    }

    static getGroupsCount(query: GroupsQuery): Promise<number> {
        return RNGetSocial.callAsync('Communities.getGroupsCount', JSON.stringify(query)).then((result) => {
            return JSON.parse(result)['result'];
        });
    }

    static addGroupMembers(query: AddGroupMembersQuery): Promise<[GroupMember]> {
        return RNGetSocial.callAsync('Communities.updateGroupMembers', JSON.stringify(query)).then((result) => {
            const jsonArray = JSON.parse(result);
            const memberResult: GroupMember[] = [];
            jsonArray.forEach((rawMember) => {
                const member = new GroupMember(rawMember);
                memberResult.push(member);
            });
            return memberResult;
        });
    }

    static joinGroup(query: JoinGroupQuery): Promise<GroupMember> {
        return RNGetSocial.callAsync('Communities.updateGroupMembers', JSON.stringify(query)).then((result) => {
            const jsonArray = JSON.parse(result);
            const memberResult: GroupMember[] = [];
            jsonArray.forEach((rawMember) => {
                const member = new GroupMember(rawMember);
                memberResult.push(member);
            });
            return memberResult[0];
        });
    }

    static updateGroupMembers(query: UpdateGroupMembersQuery): Promise<[GroupMember]> {
        return RNGetSocial.callAsync('Communities.updateGroupMembers', JSON.stringify(query)).then((result) => {
            const jsonArray = JSON.parse(result);
            const memberResult: GroupMember[] = [];
            jsonArray.forEach((rawMember) => {
                const member = new GroupMember(rawMember);
                memberResult.push(member);
            });
            return memberResult;
        });
    }

    static removeGroupMembers(query: RemoveGroupMembersQuery): Promise<void> {
        return RNGetSocial.callAsync('Communities.removeGroupMembers', JSON.stringify(query));
    }

    static getGroupMembers(query: PagingQuery<MembersQuery>): Promise<PagingResult<GroupMember>> {
        return RNGetSocial.callAsync('Communities.getGroupMembers', JSON.stringify(query)).then((result) => {
            return new PagingResult<GroupMember>(result, (memberJson) => {
                return new GroupMember(memberJson);
            });
        });
    }

    static areGroupMembers(groupId: string, userIds: UserIdList): Promise<Map<string, Membership>> {
        const areGroupMembersBody = {groupId: groupId, userIdList: userIds};
        return RNGetSocial.callAsync('Communities.areGroupMembers', JSON.stringify(areGroupMembersBody)).then((result) => {
            const jsonMap = JSON.parse(result);
            const resultMap: Map<string, Membership> = new Map();
            Object.keys(jsonMap).forEach(function(key) {
                const value = jsonMap[key];
                if (value !== null && value !== undefined) {
                    resultMap[key] = new Membership(value);
                } else {
                    resultMap[key] = null;
                }
            });
            return resultMap;
        });
    }

    static sendChatMessage(content: ChatMessageContent, target: ChatId): Promise<ChatMessage> {
        const sendChatMessageBody = {target: target, content: content};
        return RNGetSocial.callAsync('Communities.sendChatMessage', JSON.stringify(sendChatMessageBody)).then((result) => {
            return new ChatMessage(JSON.parse(result));
        });
    }

    static getChatMessages(query: ChatMessagesPagingQuery): Promise<ChatMessagesPagingResult> {
        return RNGetSocial.callAsync('Communities.getChatMessages', JSON.stringify(query)).then((result) => {
            return new ChatMessagesPagingResult(JSON.parse(result));
        });
    }

    static getChats(query: PagingQuery): Promise<PagingResult<Chat>> {
        return RNGetSocial.callAsync('Communities.getChats', JSON.stringify(query)).then((result) => {
            return new PagingResult<Chat>(result, (chatJson) => {
                return new Chat(chatJson);
            });
        });
    }

    static getChat(chatId: ChatId): Promise<Chat> {
        return RNGetSocial.callAsync('Communities.getChat', JSON.stringify(chatId)).then((result) => {
            return new Chat(JSON.parse(result));
        });
    }
}
