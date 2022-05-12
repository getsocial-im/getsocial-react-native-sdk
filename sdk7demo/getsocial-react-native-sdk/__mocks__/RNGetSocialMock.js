/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {NativeModules} from 'react-native';
const fs = require('fs');

NativeModules.RNGetSocial = {
    callSync: jest.fn().mockImplementation((method, body) => {
        // console.log('[SYNC] method: ' + method);
        // console.log('[SYNC] body: ' + body);
        if (method == 'GetSocial.isInitialized') {
            return Promise.resolve('{"result":true}');
        }
        if (method == 'GetSocial.getLanguage') {
            return Promise.resolve('{"result":"hu"}');
        }
        if (method == 'GetSocial.isTestDevice') {
            return Promise.resolve('{"result":true}');
        }
        if (method == 'GetSocial.getDeviceIdentifier') {
            return Promise.resolve('{"result":"device12345"}');
        }
        if (method == 'GetSocial.getSdkVersion') {
            return Promise.resolve('{"result":"7.3.3"}');
        }
        if (method == 'GetSocial.getCurrentUser') {
            return Promise.resolve(readObjectToDecode('privateuser.json'));
        }
        if (method == 'Analytics.trackPurchase') {
            if (body == '{"price":1,"priceCurrency":"priceCurrency","productId":"productId","productTitle":"productTitle","productType":0,"purchaseDate":2,"purchaseId":"transactionIdentifier"}') {
                return Promise.resolve('{"result": true}');
            } else {
                return Promise.reject(new Error());
            }
        }
        if (method == 'Analytics.trackCustomEvent') {
            if (body == '{"eventName":"testEvent","eventData":{"eventkey":"eventvalue"}}') {
                return Promise.resolve('{"result": true}');
            } else {
                return Promise.reject(new Error());
            }
        }
    }),
    callAsync: jest.fn().mockImplementation((method, body) => {
        // console.log('[ASYNC] method: ' + method);
        // console.log('[ASYNC] body: ' + body);
        if (method == 'Communities.addFriends') {
            if (body == '{"ids":["bob","jay"],"provider":null}') {
                return Promise.resolve('{"result": 3}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.removeFriends') {
            if (body == '{"ids":["bob","jay"],"provider":null}') {
                return Promise.resolve('{"result": 4}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.areFriends') {
            if (body == '{"ids":["bob","jay"],"provider":null}') {
                return Promise.resolve('{"bob": true, "jay": false}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.isFriend') {
            if (body == '{"provider":null,"userId":"john"}') {
                return Promise.resolve('{"result": true}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getFriendsCount') {
            if (body == '{"userId":{"provider":null,"userId":"john"}}') {
                return Promise.resolve('{"result": 23}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getFriends') {
            if (body == '{"limit":20,"query":{"userId":{"provider":null,"userId":"john"}}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('user.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getSuggestedFriends') {
            if (body == '{"limit":20}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('suggestedfriend.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.setFriends') {
            if (body == '{"ids":["bob","jay"],"provider":null}') {
                return Promise.resolve('{"result": 9}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getUsers') {
            if (body == '{"limit":20,"query":{"followedBy":null,"query":"best","suggested":false}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('user.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getUsersByIds') {
            if (body == '{"ids":["bob","jay"],"provider":null}') {
                return Promise.resolve('{"bob": ' + readObjectToDecode('user.json') + ' , "jay": null}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getUserById') {
            if (body == '{"provider":null,"userId":"john"}') {
                return Promise.resolve(readObjectToDecode('user.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getUsersCount') {
            if (body == '{"followedBy":null,"query":"best","suggested":false}') {
                return Promise.resolve('{"result": 123}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.follow') {
            if (body == '{"ids":{"ids":["topic1","topic2"],"type":2}}') {
                return Promise.resolve('{"result": 10}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.unfollow') {
            if (body == '{"ids":{"ids":["user1","user2"],"type":4}}') {
                return Promise.resolve('{"result": 5}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.isFollowing') {
            if (body == '{"userId":{"provider":null,"userId":"bob"},"query":{"ids":{"ids":["topic1","topic2"],"type":2}}}') {
                return Promise.resolve('{"topic1": true, "topic2": false}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getFollowers') {
            if (body == '{"limit":20,"query":{"ids":{"ids":["sometopic"],"type":2}}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('user.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getFollowersCount') {
            if (body == '{"ids":{"ids":["somegroup"],"type":3}}') {
                return Promise.resolve('{"result": 200}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getAnnouncements') {
            if (body == '{"ids":{"ids":["topic"],"type":2},"pollStatus":0}') {
                return Promise.resolve('[' + readObjectToDecode('activity.json') + ']');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getActivities') {
            if (body == '{"limit":20,"query":{"author":null,"ids":{"ids":["timeline"],"type":1},"labels":[],"mentions":[],"pollStatus":0,"properties":{},"reactions":[],"reactionGroup":null,"searchTerm":null,"tag":null,"trending":false}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('activity.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getActivity') {
            if (body == 'randomactivity') {
                return Promise.resolve(readObjectToDecode('activity.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.postActivity') {
            if (body == '{"target":{"ids":{"ids":["group"],"type":3}},"content":{"attachments":[],"button":null,"labels":[],"poll":null,"properties":{},"text":"hello"}}') {
                return Promise.resolve(readObjectToDecode('activity.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.updateActivity') {
            if (body == '{"target":"oldid","content":{"attachments":[],"button":null,"labels":[],"poll":null,"properties":{},"text":"hi there"}}') {
                return Promise.resolve(readObjectToDecode('activity.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.addReaction') {
            if (body == '{"activityId":"activityId","reaction":"love"}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.setReaction') {
            if (body == '{"activityId":"activityId","reaction":"love"}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.removeReaction') {
            if (body == '{"activityId":"activityId","reaction":"hate"}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getReactions') {
            if (body == '{"limit":20,"query":{"ids":{"ids":["activity"],"type":6}}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('userreactions.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.addVotes') {
            if (body == '{"activityId":"activityId","pollOptionIds":["love","hate"]}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.setVotes') {
            if (body == '{"activityId":"activityId","pollOptionIds":["love","hate"]}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.removeVotes') {
            if (body == '{"activityId":"activityId","pollOptionIds":["love","hate"]}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getVotes') {
            if (body == '{"limit":20,"query":{"ids":{"ids":["activity"],"type":6},"pollOptionId":null}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('uservotes.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.reportActivity') {
            if (body == '{"activityId":"activityid","reason":"spam","explanation":"explanation"}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.removeActivities') {
            if (body == '{"ids":["activityid","activityid2"]}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getTags') {
            if (body == '{"followerId":null,"query":"tag","target":null,"trending":false}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('tag.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getTopic') {
            if (body == 'topicid') {
                return Promise.resolve(readObjectToDecode('topic.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getTopics') {
            if (body == '{"limit":20,"query":{"followerId":null,"labels":[],"properties":{},"searchTerm":"","trending":false}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('topic.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getTopicsCount') {
            if (body == '{"followerId":null,"labels":[],"properties":{},"searchTerm":"rn","trending":false}') {
                return Promise.resolve('{"result": 0}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.getAvailableChannels') {
            if (body == '') {
                return Promise.resolve('[' + readObjectToDecode('invitechannel.json') + ']');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.createLink') {
            if (body == '{"linkParams":{"link":"param"},"mediaAttachment":null,"subject":null,"text":null}') {
                return Promise.resolve('{"result": "https://google.com"}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.send') {
            if (body == '{"content":null,"channelId":"cancel"}') {
                return Promise.resolve('{"result": "cancel"}');
            }
            if (body == '{"content":{"linkParams":{},"mediaAttachment":null,"subject":null,"text":"text"},"channelId":"cancel"}') {
                return Promise.resolve('{"result": ""}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.create') {
            if (body == null) {
                return Promise.resolve(readObjectToDecode('invite.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.getReferredUsers') {
            if (body == '{"limit":20,"query":{"eventName":""}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('referraluser.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.getReferrerUsers') {
            if (body == '{"limit":20,"query":{"eventName":"hello"}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('referraluser.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.setReferrer') {
            if (body == '{"userId":{"provider":null,"userId":"bob"},"eventName":"app_delete","customData":{"key":"value"}}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Notifications.areEnabled') {
            if (body == '') {
                return Promise.resolve('{"result": true}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Notifications.setEnabled') {
            if (body == 'true') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Notifications.get') {
            if (body == '{"limit":20,"query":{"actions":[],"statuses":[],"types":[]}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('notification.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Notifications.count') {
            if (body == '{"actions":[],"statuses":[],"types":[]}') {
                return Promise.resolve('{"result": 30}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Notifications.send') {
            if (body == '{"target":{"placeholderIds":["placeholder"],"userIdList":null},"content":{"text":"text","templatePlaceholders":{},"actionButtons":[]}}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Notifications.setStatus') {
            if (body == '{"status":"status","notificationIds":["id1","id2"]}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'PromoCodes.create') {
            if (body == '{"code":"secretcode","data":{},"endDate":0,"maxClaimCount":0,"startDate":0}') {
                return Promise.resolve(readObjectToDecode('promocode.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'PromoCodes.claim') {
            if (body == 'code') {
                return Promise.resolve(readObjectToDecode('promocode.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'PromoCodes.get') {
            if (body == 'code') {
                return Promise.resolve(readObjectToDecode('promocode.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.createGroup') {
            if (body == '{"avatar":null,"description":null,"id":"groupid","isDiscoverable":false,"isPrivate":false,"labels":[],"permissions":{},"properties":{},"title":null}') {
                return Promise.resolve(readObjectToDecode('group.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.updateGroup') {
            if (body == '{"groupId":"oldgroupid","content":{"avatar":null,"description":null,"id":"groupid","isDiscoverable":false,"isPrivate":false,"labels":[],"permissions":{},"properties":{},"title":null}}') {
                return Promise.resolve(readObjectToDecode('group.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.removeGroups') {
            if (body == '["oldgroupid","newgroupid"]') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getGroup') {
            if (body == 'oldgroupid') {
                return Promise.resolve(readObjectToDecode('group.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getGroups') {
            if (body == '{"limit":40,"query":{"followerId":null,"labels":[],"memberId":null,"properties":{},"searchTerm":"searchTerm","trending":false}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('group.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getGroupsCount') {
            if (body == '{"followerId":null,"labels":[],"memberId":null,"properties":{},"searchTerm":"searchTerm","trending":false}') {
                return Promise.resolve('{"result": 40}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.addGroupMembers') {
            if (body == '{"internalQuery":{"groupId":"groupId","invitationToken":"token","role":3,"status":0,"userIdList":{"ids":["GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42"],"provider":null}}}') {
                return Promise.resolve('[' + readObjectToDecode('groupmember.json') + ']');
            }
            if (body == '{"internalQuery":{"groupId":"groupId","invitationToken":null,"role":0,"status":2,"userIdList":{"ids":["userid1","userid2"],"provider":null}}}') {
                return Promise.resolve('[' + readObjectToDecode('groupmember.json') + ']');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.updateGroupMembers') {
            if (body == '{"role":0,"status":2,"groupId":"groupId","userIdList":{"ids":["userid1","userid2"],"provider":null}}') {
                return Promise.resolve('[' + readObjectToDecode('groupmember.json') + ']');
            }
            if (body == '{"role":3,"status":0,"groupId":"groupId","userIdList":{"ids":["GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42"],"provider":null},"invitationToken":"token"}') {
                return Promise.resolve('[' + readObjectToDecode('groupmember.json') + ']');
            }
            if (body == '{"groupId":"groupId","invitationToken":null,"role":1,"status":2,"userIdList":{"ids":["id1","id2"],"provider":null}}') {
                return Promise.resolve('[' + readObjectToDecode('groupmember.json') + ']');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.removeGroupMembers') {
            if (body == '{"groupId":"groupId","userIdList":{"ids":["id1","id2"],"provider":null}}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getGroupMembers') {
            if (body == '{"limit":20,"query":{"groupId":"groupId","role":null,"status":null}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('groupmember.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.areGroupMembers') {
            if (body == '{"groupId":"groupId","userIdList":{"ids":["jane","john"],"provider":null}}') {
                return Promise.resolve('{"jane": ' + readObjectToDecode('membership.json') + ', "john": null}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.sendChatMessage') {
            if (body == '{"target":{"id":"id","userId":null},"content":{"attachments":[],"properties":{},"text":"hello"}}') {
                return Promise.resolve(readObjectToDecode('chatmessage.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getChatMessages') {
            if (body == '{"limit":20,"query":{"chatId":{"id":"id","userId":null}}}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('chatmessage.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getChats') {
            if (body == '{"limit":20}') {
                return Promise.resolve(createPagingResult(readObjectToDecode('chat.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getChat') {
            if (body == '{"id":null,"userId":{"provider":null,"userId":"hey"}}') {
                return Promise.resolve(readObjectToDecode('chat.json'));
            }
            return Promise.reject(new Error());
        }
    }),
};

function createPagingResult(entry) {
    return '{"next": "123", "entries": [' + entry + ']}';
}

function readObjectToDecode(filename) {
    const filePath = './../../jsonbridge-testdata/native_to_wrapper/' + filename;
    return fs.readFileSync(filePath, 'utf8');
}
