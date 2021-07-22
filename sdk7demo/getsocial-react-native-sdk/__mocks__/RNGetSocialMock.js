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
            return Promise.resolve(readTestData('encodedobjects', 'privateuser.json'));
        }
        if (method == 'Analytics.trackPurchase') {
            if (body == '{"productId":"productId","productTitle":"productTitle","productType":0,"price":1,"priceCurrency":"priceCurrency","purchaseDate":2,"purchaseId":"transactionIdentifier"}') {
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
            if (body == '{"ids":["bob","jay"]}') {
                return Promise.resolve('{"result": 3}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.removeFriends') {
            if (body == '{"ids":["bob","jay"]}') {
                return Promise.resolve('{"result": 4}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.areFriends') {
            if (body == '{"ids":["bob","jay"]}') {
                return Promise.resolve('{"bob": true, "jay": false}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.isFriend') {
            if (body == '{"userId":"john"}') {
                return Promise.resolve('{"result": true}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getFriendsCount') {
            if (body == '{"userId":{"userId":"john"}}') {
                return Promise.resolve('{"result": 23}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getFriends') {
            if (body == '{"query":{"userId":{"userId":"john"}},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'user.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getSuggestedFriends') {
            if (body == '{"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'suggestedfriend.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.setFriends') {
            if (body == '{"ids":["bob","jay"]}') {
                return Promise.resolve('{"result": 9}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getUsers') {
            if (body == '{"query":{"query":"best","followedBy":null},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'user.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getUsersByIds') {
            if (body == '{"ids":["bob","jay"]}') {
                return Promise.resolve('{"bob": ' + readTestData('encodedobjects', 'user.json') + ' , "jay": null}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getUserById') {
            if (body == '{"userId":"john"}') {
                return Promise.resolve(readTestData('encodedobjects', 'user.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getUsersCount') {
            if (body == '{"query":"best","followedBy":null}') {
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
            if (body == '{"userId":{"userId":"bob"},"query":{"ids":{"ids":["topic1","topic2"],"type":2}}}') {
                return Promise.resolve('{"topic1": true, "topic2": false}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getFollowers') {
            if (body == '{"query":{"ids":{"ids":["sometopic"],"type":2}},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'user.json')));
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
                return Promise.resolve('[' + readTestData('encodedobjects', 'activity.json') + ']');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getActivities') {
            if (body == '{"query":{"ids":{"ids":["timeline"],"type":1},"pollStatus":0},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'activity.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getActivity') {
            if (body == 'randomactivity') {
                return Promise.resolve(readTestData('encodedobjects', 'activity.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.postActivity') {
            if (body == '{"target":{"ids":{"ids":["group"],"type":3}},"content":{"attachments":[],"properties":{},"text":"hello"}}') {
                return Promise.resolve(readTestData('encodedobjects', 'activity.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.updateActivity') {
            if (body == '{"target":"oldid","content":{"attachments":[],"properties":{},"text":"hi there"}}') {
                return Promise.resolve(readTestData('encodedobjects', 'activity.json'));
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
            if (body == '{"query":{"ids":{"ids":["activity"],"type":6}},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'userreactions.json')));
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
            if (body == '{"query":{"ids":{"ids":["activity"],"type":6}},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'uservotes.json')));
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
            if (body == '{"query":"hell"}') {
                return Promise.resolve('["hello", "hell!"]');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getTopic') {
            if (body == 'topicid') {
                return Promise.resolve(readTestData('encodedobjects', 'topic.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getTopics') {
            if (body == '{"query":{},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'topic.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getTopicsCount') {
            if (body == '{"searchTerm":"rn"}') {
                return Promise.resolve('{"result": 0}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.getAvailableChannels') {
            if (body == '') {
                return Promise.resolve('[' + readTestData('encodedobjects', 'invitechannel.json') + ']');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.createLink') {
            if (body == '{"linkParams":{"link":"param"}}') {
                return Promise.resolve('{"result": "https://google.com"}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.send') {
            if (body == '{"content":null,"channelId":"cancel"}') {
                return Promise.resolve('{"result": "cancel"}');
            }
            if (body == '{"content":{"text":"text","linkParams":{}},"channelId":"cancel"}') {
                return Promise.resolve('{"result": ""}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.create') {
            if (body == null) {
                return Promise.resolve(readTestData('encodedobjects', 'invite.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.getReferredUsers') {
            if (body == '{"query":{"eventName":""},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'referraluser.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.getReferrerUsers') {
            if (body == '{"query":{"eventName":"hello"},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'referraluser.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Invites.setReferrer') {
            if (body == '{"userId":{"userId":"bob"},"eventName":"app_delete","customData":{"key":"value"}}') {
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
            if (body == '{"query":{"statuses":[],"types":[],"actions":[]},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'notification.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Notifications.count') {
            if (body == '{"statuses":[],"types":[],"actions":[]}') {
                return Promise.resolve('{"result": 30}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Notifications.send') {
            if (body == '{"target":{"placeholderIds":["placeholder"]},"content":{"text":"text","templatePlaceholders":{},"actionButtons":[]}}') {
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
            if (body == '{"code":"secretcode","data":{},"maxClaimCount":0}') {
                return Promise.resolve(readTestData('encodedobjects', 'promocode.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'PromoCodes.claim') {
            if (body == 'code') {
                return Promise.resolve(readTestData('encodedobjects', 'promocode.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'PromoCodes.get') {
            if (body == 'code') {
                return Promise.resolve(readTestData('encodedobjects', 'promocode.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.createGroup') {
            if (body == '{"id":"groupid","properties":{},"permissions":{}}') {
                return Promise.resolve(readTestData('encodedobjects', 'group.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.updateGroup') {
            if (body == '{"groupId":"oldgroupid","content":{"id":"groupid","properties":{},"permissions":{}}}') {
                return Promise.resolve(readTestData('encodedobjects', 'group.json'));
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
                return Promise.resolve(readTestData('encodedobjects', 'group.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getGroups') {
            if (body == '{"query":{"searchTerm":"searchTerm"},"limit":40}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'group.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getGroupsCount') {
            if (body == '{"searchTerm":"searchTerm"}') {
                return Promise.resolve('{"result": 40}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.updateGroupMembers') {
            if (body == '{"role":0,"status":2,"groupId":"groupId","userIdList":{"ids":["userid1","userid2"]}}') {
                return Promise.resolve('[' + readTestData('encodedobjects', 'groupmember.json') + ']');
            }
            if (body == '{"role":3,"status":0,"groupId":"groupId","userIdList":{"ids":["GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42"]},"invitationToken":"token"}') {
                return Promise.resolve('[' + readTestData('encodedobjects', 'groupmember.json') + ']');
            }
            if (body == '{"role":1,"status":2,"groupId":"groupId","userIdList":{"ids":["id1","id2"]}}') {
                return Promise.resolve('[' + readTestData('encodedobjects', 'groupmember.json') + ']');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.removeGroupMembers') {
            if (body == '{"userIdList":{"ids":["id1","id2"]},"groupId":"groupId"}') {
                return Promise.resolve();
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getGroupMembers') {
            if (body == '{"query":{"groupId":"groupId"},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'groupmember.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.areGroupMembers') {
            if (body == '{"groupId":"groupId","userIdList":{"ids":["jane","john"]}}') {
                return Promise.resolve('{"jane": ' + readTestData('encodedobjects', 'membership.json') + ', "john": null}');
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.sendChatMessage') {
            if (body == '{"target":{"id":"id"},"content":{"attachments":[],"properties":{},"text":"hello"}}') {
                return Promise.resolve(readTestData('encodedobjects', 'chatmessage.json'));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getChatMessages') {
            if (body == '{"query":{"chatId":{"id":"id"}},"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'chatmessage.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getChats') {
            if (body == '{"limit":20}') {
                return Promise.resolve(createPagingResult(readTestData('encodedobjects', 'chat.json')));
            }
            return Promise.reject(new Error());
        }
        if (method == 'Communities.getChat') {
            if (body == '{"userId":{"userId":"hey"}}') {
                return Promise.resolve(readTestData('encodedobjects', 'chat.json'));
            }
            return Promise.reject(new Error());
        }
    }),
};

function createPagingResult(entry) {
    return '{"next": "123", "entries": [' + entry + ']}';
}

function readTestData(dir, filename) {
    const filePath = './../../jsonbridge-testdata/' + dir + '/' + filename;
    return fs.readFileSync(filePath, 'utf8');
}
