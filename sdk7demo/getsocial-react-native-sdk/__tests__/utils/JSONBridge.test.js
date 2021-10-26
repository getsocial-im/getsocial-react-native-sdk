/* eslint-disable no-undef */
/* eslint-disable max-len */
import PurchaseData from './../../models/analytics/PurchaseData.js';
import UserIdList from './../../models/UserIdList.js';
import UserId from './../../models/UserId.js';
import PagingQuery from './../../models/PagingQuery.js';
import FriendsQuery from './../../models/communities/FriendsQuery.js';
import UsersQuery from './../../models/communities/UsersQuery.js';
import FollowQuery from './../../models/communities/FollowQuery.js';
import FollowersQuery from './../../models/communities/FollowersQuery.js';
import ActivitiesQuery from './../../models/communities/ActivitiesQuery.js';
import AnnouncementsQuery from './../../models/communities/AnnouncementsQuery.js';
import ActivityContent from './../../models/communities/ActivityContent.js';
import PostActivityTarget from './../../models/communities/PostActivityTarget.js';
import ReactionsQuery from './../../models/communities/ReactionsQuery.js';
import RemoveActivitiesQuery from './../../models/communities/RemoveActivitiesQuery.js';
import TagsQuery from './../../models/communities/TagsQuery.js';
import TopicsQuery from './../../models/communities/TopicsQuery.js';
import InviteContent from './../../models/invites/InviteContent.js';
import ReferralUsersQuery from './../../models/invites/ReferralUsersQuery.js';
import NotificationsQuery from './../../models/notifications/NotificationsQuery.js';
import NotificationContent from './../../models/notifications/NotificationContent.js';
import SendNotificationTarget from './../../models/notifications/SendNotificationTarget.js';
import PromoCodeContent from './../../models/promocodes/PromoCodeContent.js';
import GroupContent from './../../models/communities/GroupContent.js';
import Role from './../../models/communities/Role.js';
import MemberStatus from './../../models/communities/MemberStatus.js';
import AddGroupMembersQuery from './../../models/communities/AddGroupMembersQuery.js';
import JoinGroupQuery from './../../models/communities/JoinGroupQuery.js';
import RemoveGroupMembersQuery from './../../models/communities/RemoveGroupMembersQuery.js';
import UpdateGroupMembersQuery from './../../models/communities/UpdateGroupMembersQuery.js';
import GroupsQuery from './../../models/communities/GroupsQuery.js';
import MembersQuery from './../../models/communities/MembersQuery.js';
import ChatMessageContent from './../../models/communities/ChatMessageContent.js';
import ChatMessagesQuery from './../../models/communities/ChatMessagesQuery.js';
import ChatId from './../../models/communities/ChatId.js';
import VotesQuery from './../../models/communities/VotesQuery.js';


import JSONBridge from './../../utils/JSONBridge.js';

it('isInitialized', () => {
    expect.assertions(1);
    return JSONBridge.isInitialized().then((result) => {
        expect(result).toBe(true);
    });
});

it('getLanguage', () => {
    expect.assertions(1);
    return JSONBridge.getLanguage().then((result) => {
        expect(result).toBe('hu');
    });
});

it('isTestDevice', () => {
    expect.assertions(1);
    return JSONBridge.isTestDevice().then((result) => {
        expect(result).toBe(true);
    });
});

it('getDeviceIdentifier', () => {
    expect.assertions(1);
    return JSONBridge.getDeviceIdentifier().then((result) => {
        expect(result).toBe('device12345');
    });
});

it('getSDKVersion', () => {
    expect.assertions(1);
    return JSONBridge.getSdkVersion().then((result) => {
        expect(result).toBe('7.3.3');
    });
});

it('trackPurchase', () => {
    expect.assertions(1);
    const purchaseData = new PurchaseData();
    purchaseData.productId = 'productId';
    purchaseData.productTitle = 'productTitle';
    purchaseData.productType = 0;
    purchaseData.price = 1;
    purchaseData.priceCurrency = 'priceCurrency';
    purchaseData.purchaseDate = 2;
    purchaseData.transactionIdentifier = 'transactionIdentifier';
    return JSONBridge.trackPurchase(purchaseData).then((result) => {
        expect(result).toBe(true);
    });
});

it('trackCustomEvent', () => {
    expect.assertions(1);
    return JSONBridge.trackCustomEvent('testEvent', {'eventkey': 'eventvalue'}).then((result) => {
        expect(result).toBe(true);
    });
});

it('addFriends', () => {
    expect.assertions(1);
    const userIdList = UserIdList.create(['bob', 'jay']);
    return JSONBridge.addFriends(userIdList).then((result) => {
        expect(result).toBe(3);
    });
});

it('removeFriends', () => {
    expect.assertions(1);
    const userIdList = UserIdList.create(['bob', 'jay']);
    return JSONBridge.removeFriends(userIdList).then((result) => {
        expect(result).toBe(4);
    });
});

it('areFriends', () => {
    expect.assertions(2);
    const userIdList = UserIdList.create(['bob', 'jay']);
    return JSONBridge.areFriends(userIdList).then((result) => {
        expect(result['bob']).toBe(true);
        expect(result['jay']).toBe(false);
    });
});

it('isFriend', () => {
    expect.assertions(1);
    const userId = UserId.create('john');
    return JSONBridge.isFriend(userId).then((result) => {
        expect(result).toBe(true);
    });
});

it('getFriendsCount', () => {
    expect.assertions(1);
    const userId = UserId.create('john');
    const query = FriendsQuery.ofUser(userId);
    return JSONBridge.getFriendsCount(query).then((result) => {
        expect(result).toBe(23);
    });
});

it('getFriends', () => {
    expect.assertions(7);
    const userId = UserId.create('john');
    const query = FriendsQuery.ofUser(userId);
    const pagingQuery = new PagingQuery(query);
    return JSONBridge.getFriends(pagingQuery).then((result) => {
        expect(result.next).toBe('123');
        const user = result.entries[0];
        expect(user.userId).toBe('userid');
        expect(user.avatarUrl).toBe('avatarurl');
        expect(user.displayName).toBe('testuser');
        expect(user.identities['fb']).toBe('token');
        expect(user.publicProperties['publickey']).toBe('publicvalue');
        expect(user.isVerified).toBe(true);
    });
});

it('getSuggestedFriends', () => {
    expect.assertions(7);
    const pagingQuery = new PagingQuery();
    return JSONBridge.getSuggestedFriends(pagingQuery).then((result) => {
        expect(result.next).toBe('123');
        const user = result.entries[0];
        expect(user.userId).toBe('userid');
        expect(user.avatarUrl).toBe('avatarurl');
        expect(user.displayName).toBe('testuser');
        expect(user.identities['fb']).toBe('token');
        expect(user.publicProperties['publickey']).toBe('publicvalue');
        expect(user.isVerified).toBe(false);
    });
});

it('setFriends', () => {
    expect.assertions(1);
    const userIdList = UserIdList.create(['bob', 'jay']);
    return JSONBridge.setFriends(userIdList).then((result) => {
        expect(result).toBe(9);
    });
});

it('getUsers', () => {
    expect.assertions(7);
    const query = UsersQuery.find('best');
    const pagingQuery = new PagingQuery(query);
    return JSONBridge.getUsers(pagingQuery).then((result) => {
        expect(result.next).toBe('123');
        const user = result.entries[0];
        expect(user.userId).toBe('userid');
        expect(user.avatarUrl).toBe('avatarurl');
        expect(user.displayName).toBe('testuser');
        expect(user.identities['fb']).toBe('token');
        expect(user.publicProperties['publickey']).toBe('publicvalue');
        expect(user.isVerified).toBe(true);
    });
});

it('getUser', () => {
    expect.assertions(6);
    const userId = UserId.create('john');
    return JSONBridge.getUser(userId).then((result) => {
        expect(result.userId).toBe('userid');
        expect(result.avatarUrl).toBe('avatarurl');
        expect(result.displayName).toBe('testuser');
        expect(result.identities['fb']).toBe('token');
        expect(result.publicProperties['publickey']).toBe('publicvalue');
        expect(result.isVerified).toBe(true);
    });
});

it('getUsersCount', () => {
    expect.assertions(1);
    const query = UsersQuery.find('best');
    return JSONBridge.getUsersCount(query).then((result) => {
        expect(result).toBe(123);
    });
});

it('follow', () => {
    expect.assertions(1);
    const query = FollowQuery.topics(['topic1', 'topic2']);
    return JSONBridge.follow(query).then((result) => {
        expect(result).toBe(10);
    });
});

it('unfollow', () => {
    expect.assertions(1);
    const query = FollowQuery.users(UserIdList.create(['user1', 'user2']));
    return JSONBridge.unfollow(query).then((result) => {
        expect(result).toBe(5);
    });
});

it('isFollowing', () => {
    expect.assertions(2);
    const query = FollowQuery.topics(['topic1', 'topic2']);
    return JSONBridge.isFollowing(UserId.create('bob'), query).then((result) => {
        expect(result['topic1']).toBe(true);
        expect(result['topic2']).toBe(false);
    });
});

it('getFollowers', () => {
    expect.assertions(7);
    const query = FollowersQuery.ofTopic('sometopic');
    const pagingQuery = new PagingQuery(query);
    return JSONBridge.getFollowers(pagingQuery).then((result) => {
        expect(result.next).toBe('123');
        const user = result.entries[0];
        expect(user.userId).toBe('userid');
        expect(user.avatarUrl).toBe('avatarurl');
        expect(user.displayName).toBe('testuser');
        expect(user.identities['fb']).toBe('token');
        expect(user.publicProperties['publickey']).toBe('publicvalue');
        expect(user.isVerified).toBe(true);
    });
});

it('getFollowersCount', () => {
    expect.assertions(1);
    const query = FollowersQuery.ofGroup('somegroup');
    return JSONBridge.getFollowersCount(query).then((result) => {
        expect(result).toBe(200);
    });
});

it('getAnnouncements', () => {
    expect.assertions(1);
    const query = AnnouncementsQuery.inTopic('topic');
    return JSONBridge.getAnnouncements(query).then((result) => {
        const activity = result[0];
        expect(activity.id).toBe('activityid');
    });
});

it('getActivities', () => {
    expect.assertions(2);
    const query = ActivitiesQuery.timeline();
    return JSONBridge.getActivities(new PagingQuery(query)).then((result) => {
        expect(result.next).toBe('123');
        const activity = result.entries[0];
        expect(activity.id).toBe('activityid');
    });
});

it('getActivity', () => {
    expect.assertions(1);
    return JSONBridge.getActivity('randomactivity').then((result) => {
        expect(result.id).toBe('activityid');
    });
});

it('postActivity', () => {
    const content = new ActivityContent();
    content.text = 'hello';
    const target = PostActivityTarget.group('group');

    expect.assertions(1);
    return JSONBridge.postActivity(content, target).then((result) => {
        expect(result.id).toBe('activityid');
    });
});

it('updateActivity', () => {
    const content = new ActivityContent();
    content.text = 'hi there';

    expect.assertions(1);
    return JSONBridge.updateActivity('oldid', content).then((result) => {
        expect(result.id).toBe('activityid');
    });
});

it('addReaction', () => {
    expect.assertions(1);
    return JSONBridge.addReaction('love', 'activityId').then((result) => {
        expect(result).toBe(undefined);
    });
});

it('setReaction', () => {
    expect.assertions(1);
    return JSONBridge.setReaction('love', 'activityId').then((result) => {
        expect(result).toBe(undefined);
    });
});

it('removeReaction', () => {
    expect.assertions(1);
    return JSONBridge.removeReaction('hate', 'activityId').then((result) => {
        expect(result).toBe(undefined);
    });
});

it('getReactions', () => {
    expect.assertions(4);
    const query = ReactionsQuery.forActivity('activity');
    return JSONBridge.getReactions(new PagingQuery(query)).then((result) => {
        expect(result.next).toBe('123');
        const reaction = result.entries[0];
        const user = reaction.user;
        const reactions = reaction.reactions;
        expect(user.userId).toBe('userId');
        expect(reactions[0]).toBe('like');
        expect(reactions[1]).toBe('wow');
    });
});

it('addVotes', () => {
    expect.assertions(1);
    return JSONBridge.addVotes(['love', 'hate'], 'activityId').then((result) => {
        expect(result).toBe(undefined);
    });
});

it('setVotes', () => {
    expect.assertions(1);
    return JSONBridge.setVotes(['love', 'hate'], 'activityId').then((result) => {
        expect(result).toBe(undefined);
    });
});

it('removeVotes', () => {
    expect.assertions(1);
    return JSONBridge.removeVotes(['love', 'hate'], 'activityId').then((result) => {
        expect(result).toBe(undefined);
    });
});

it('getVotes', () => {
    expect.assertions(4);
    const query = VotesQuery.forActivity('activity');
    return JSONBridge.getVotes(new PagingQuery(query)).then((result) => {
        expect(result.next).toBe('123');
        const vote = result.entries[0];
        const user = vote.user;
        const votes = vote.votes;
        expect(user.userId).toBe('userId');
        expect(votes[0]).toBe('option1');
        expect(votes[1]).toBe('option2');
    });
});

it('reportActivity', () => {
    expect.assertions(1);
    return JSONBridge.reportActivity('activityid', 'spam', 'explanation').then((result) => {
        expect(result).toBe(undefined);
    });
});

it('removeActivities', () => {
    expect.assertions(1);
    return JSONBridge.removeActivities(RemoveActivitiesQuery.activityIds(['activityid', 'activityid2'])).then((result) => {
        expect(result).toBe(undefined);
    });
});

it('getTags', () => {
    expect.assertions(2);
    const query = TagsQuery.search('hell');
    return JSONBridge.getTags(query).then((result) => {
        expect(result[0]).toBe('hello');
        expect(result[1]).toBe('hell!');
    });
});

it('getTopic', () => {
    expect.assertions(1);
    return JSONBridge.getTopic('topicid').then((result) => {
        expect(result.id).toBe('topicId');
    });
});

it('getTopics', () => {
    expect.assertions(2);
    const query = TopicsQuery.all();
    return JSONBridge.getTopics(new PagingQuery(query)).then((result) => {
        expect(result.next).toBe('123');
        const topic = result.entries[0];
        expect(topic.id).toBe('topicId');
    });
});

it('getTopicsCount', () => {
    expect.assertions(1);
    const query = TopicsQuery.find('rn');
    return JSONBridge.getTopicsCount(query).then((result) => {
        expect(result).toBe(0);
    });
});

it('getAvailableChannels', () => {
    expect.assertions(1);
    return JSONBridge.getAvailableChannels().then((result) => {
        const channel = result[0];
        expect(channel.channelId).toBe('fb');
    });
});

it('createURL', () => {
    expect.assertions(1);
    return JSONBridge.createURL({'link': 'param'}).then((result) => {
        expect(result).toBe('https://google.com');
    });
});

it('sendInvite_contentisnull_cancel', () => {
    expect.assertions(1);
    return JSONBridge.sendInvite(null, 'cancel', () => {
    }, (result) => {
        expect(result).toBe(undefined);
    }, () => {});
});

it('sendInvite_content_success', () => {
    expect.assertions(1);
    const content = new InviteContent();
    content.text = 'text';

    return JSONBridge.sendInvite(content, 'cancel', (result) => {
        expect(result).toBe(undefined);
    }, () => {
    }, () => {});
});

it('createInvite', () => {
    expect.assertions(1);

    return JSONBridge.createInvite(null).then((result) => {
        expect(result.text).toBe('text');
    });
});

it('getReferredUsers', () => {
    expect.assertions(3);
    const query = ReferralUsersQuery.allUsers();
    return JSONBridge.getReferredUsers(new PagingQuery(query)).then((result) => {
        expect(result.next).toBe('123');
        const user = result.entries[0];
        expect(user.event).toBe('app_install');
        expect(user.eventDate).toBe(456);
    });
});

it('getReferrerUsers', () => {
    expect.assertions(3);
    const query = ReferralUsersQuery.allUsers();
    query.event = 'hello';
    return JSONBridge.getReferrerUsers(new PagingQuery(query)).then((result) => {
        expect(result.next).toBe('123');
        const user = result.entries[0];
        expect(user.event).toBe('app_install');
        expect(user.eventDate).toBe(456);
    });
});

it('setReferrer', () => {
    expect.assertions(1);
    const userId = UserId.create('bob');
    const event = 'app_delete';
    const data = {'key': 'value'};
    return JSONBridge.setReferrer(userId, event, data).then((result) => {
        expect(result).toBe(undefined);
    });
});

it('arePushNotificationsEnabled', () => {
    expect.assertions(1);
    return JSONBridge.arePushNotificationsEnabled().then((result) => {
        expect(result).toBe(true);
    });
});

it('setPushNotificationsEnabled', () => {
    expect.assertions(1);
    return JSONBridge.setPushNotificationsEnabled(true).then((result) => {
        expect(result).toBe(undefined);
    });
});

it('getNotifications', () => {
    expect.assertions(2);
    const query = NotificationsQuery.withAllStatus();
    return JSONBridge.getNotifications(new PagingQuery(query)).then((result) => {
        expect(result.next).toBe('123');
        const notification = result.entries[0];
        expect(notification.id).toBe('notificationid');
    });
});

it('getNotificationsCount', () => {
    expect.assertions(1);
    const query = NotificationsQuery.withAllStatus();
    return JSONBridge.getNotificationsCount(query).then((result) => {
        expect(result).toBe(30);
    });
});

it('sendNotification', () => {
    expect.assertions(1);
    const content = NotificationContent.withText('text');
    const target = SendNotificationTarget.create();
    target.addReceiverPlaceholder('placeholder');
    return JSONBridge.sendNotification(content, target).then((result) => {
        expect(result).toBe(undefined);
    });
});

it('setNotificationsStatus', () => {
    expect.assertions(1);
    return JSONBridge.setNotificationsStatus('status', ['id1', 'id2']).then((result) => {
        expect(result).toBe(undefined);
    });
});

it('createPromoCode', () => {
    expect.assertions(1);
    const content = PromoCodeContent.withCode('secretcode');
    return JSONBridge.createPromoCode(content).then((result) => {
        expect(result.code).toBe('code');
    });
});

it('createPromoCode', () => {
    expect.assertions(1);
    const content = PromoCodeContent.withCode('secretcode');
    return JSONBridge.createPromoCode(content).then((result) => {
        expect(result.code).toBe('code');
    });
});

it('getPromoCode', () => {
    expect.assertions(1);
    return JSONBridge.getPromoCode('code').then((result) => {
        expect(result.code).toBe('code');
    });
});

it('claimPromoCode', () => {
    expect.assertions(1);
    return JSONBridge.claimPromoCode('code').then((result) => {
        expect(result.code).toBe('code');
    });
});

it('createGroup', () => {
    expect.assertions(1);
    const content = new GroupContent();
    content.id = 'groupid';
    return JSONBridge.createGroup(content).then((result) => {
        expect(result.id).toBe('groupid');
    });
});

it('updateGroup', () => {
    expect.assertions(1);
    const content = new GroupContent();
    content.id = 'groupid';
    return JSONBridge.updateGroup('oldgroupid', content).then((result) => {
        expect(result.id).toBe('groupid');
    });
});

it('removeGroups', () => {
    expect.assertions(1);
    return JSONBridge.removeGroups(['oldgroupid', 'newgroupid']).then((result) => {
        expect(result).toBe(undefined);
    });
});

it('getGroup', () => {
    expect.assertions(1);
    return JSONBridge.getGroup('oldgroupid').then((result) => {
        expect(result.id).toBe('groupid');
    });
});

it('getGroups', () => {
    expect.assertions(2);
    const query = GroupsQuery.find('searchTerm');
    const pq = new PagingQuery(query);
    pq.limit = 40;
    return JSONBridge.getGroups(pq).then((result) => {
        expect(result.next).toBe('123');
        const group = result.entries[0];
        expect(group.id).toBe('groupid');
    });
});

it('getGroupsCount', () => {
    expect.assertions(1);
    const query = GroupsQuery.find('searchTerm');
    return JSONBridge.getGroupsCount(query).then((result) => {
        expect(result).toBe(40);
    });
});

it('addGroupMembers', () => {
    expect.assertions(1);
    const query = AddGroupMembersQuery.create('groupId', UserIdList.create(['userid1', 'userid2']));
    query.withMemberStatus(MemberStatus.Member);
    query.withRole(Role.Owner);
    return JSONBridge.addGroupMembers(query).then((result) => {
        expect(result[0].userId).toBe('userid');
    });
});

it('joinGroup', () => {
    expect.assertions(1);
    const query = JoinGroupQuery.create('groupId');
    query.withInvitationToken('token');
    return JSONBridge.joinGroup(query).then((result) => {
        expect(result.userId).toBe('userid');
    });
});

it('updateGroupMembers', () => {
    expect.assertions(1);
    const query = UpdateGroupMembersQuery.create('groupId', UserIdList.create(['id1', 'id2']));
    query.withMemberStatus(MemberStatus.Member);
    query.withRole(Role.Admin);
    return JSONBridge.updateGroupMembers(query).then((result) => {
        expect(result[0].userId).toBe('userid');
    });
});

it('removeGroupMembers', () => {
    expect.assertions(1);
    const query = RemoveGroupMembersQuery.create('groupId', UserIdList.create(['id1', 'id2']));
    return JSONBridge.removeGroupMembers(query).then((result) => {
        expect(result).toBe(undefined);
    });
});

it('getGroupMembers', () => {
    expect.assertions(2);
    const query = MembersQuery.ofGroup('groupId');
    const pq = new PagingQuery(query);
    return JSONBridge.getGroupMembers(pq).then((result) => {
        expect(result.next).toBe('123');
        const user = result.entries[0];
        expect(user.userId).toBe('userid');
    });
});

it('sendChatMessage', () => {
    expect.assertions(1);
    const content = new ChatMessageContent();
    content.text = 'hello';
    const target = ChatId.create('id');
    return JSONBridge.sendChatMessage(content, target).then((result) => {
        expect(result.id).toBe('messageid');
    });
});

it('getChatMessages', () => {
    expect.assertions(2);
    const target = ChatId.create('id');
    const query = ChatMessagesQuery.messagesInChat(target);
    return JSONBridge.getChatMessages(new PagingQuery(query)).then((result) => {
        expect(result.next).toBe('123');
        const message = result.entries[0];
        expect(message.id).toBe('messageid');
    });
});

it('getChats', () => {
    expect.assertions(2);
    return JSONBridge.getChats(new PagingQuery()).then((result) => {
        expect(result.next).toBe('123');
        const chat = result.entries[0];
        expect(chat.id).toBe('chatid');
    });
});

it('getChat', () => {
    expect.assertions(1);
    return JSONBridge.getChat(ChatId.createWithUserId(UserId.create('hey'))).then((result) => {
        expect(result.id).toBe('chatid');
    });
});

it('getCurrentUser', () => {
    expect.assertions(1);
    return JSONBridge.getCurrentUser().then((result) => {
        expect(result.id).toBe('userid');
    });
});

it('getUsersByIds', () => {
    expect.assertions(2);
    const userIdList = UserIdList.create(['bob', 'jay']);
    return JSONBridge.getUsersByIds(userIdList).then((result) => {
        const user = result['bob'];
        expect(user.userId).toBe('userid');
        expect(result['jay']).toBe(null);
    });
});

it('areGroupMembers', () => {
    expect.assertions(2);
    return JSONBridge.areGroupMembers('groupId', UserIdList.create(['jane', 'john'])).then((result) => {
        const membership = result['jane'];
        expect(membership.role).toBe(Role.Member);
        expect(result['john']).toBe(null);
    });
});

