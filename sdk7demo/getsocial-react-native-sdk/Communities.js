/* eslint-disable max-len */
// @flow

import PagingQuery from './models/PagingQuery.js';
import PagingResult from './models/PagingResult.js';
import UserId from './models/UserId.js';
import UserIdList from './models/UserIdList.js';
import JSONBridge from './utils/JSONBridge.js';
import User from './models/communities/User.js';
import FriendsQuery from './models/communities/FriendsQuery.js';
import Topic from './models/communities/Topic.js';
import TopicsQuery from './models/communities/TopicsQuery.js';
import UsersQuery from './models/communities/UsersQuery.js';
import FollowQuery from './models/communities/FollowQuery.js';
import FollowersQuery from './models/communities/FollowersQuery.js';
import Activity from './models/communities/Activity.js';
import ActivityContent from './models/communities/ActivityContent.js';
import SuggestedFriend from './models/communities/SuggestedFriend.js';
import AnnouncementsQuery from './models/communities/AnnouncementsQuery.js';
import ActivitiesQuery from './models/communities/ActivitiesQuery.js';
import PostActivityTarget from './models/communities/PostActivityTarget.js';
import ReactionsQuery from './models/communities/ReactionsQuery.js';
import TagsQuery from './models/communities/TagsQuery.js';
import UserReactions from './models/communities/UserReactions.js';
import RemoveActivitiesQuery from './models/communities/RemoveActivitiesQuery.js';
import Group from './models/communities/Group.js';
import GroupContent from './models/communities/GroupContent.js';
import AddGroupMembersQuery from './models/communities/AddGroupMembersQuery.js';
import GroupMember from './models/communities/GroupMember.js';
import GroupsQuery from './models/communities/GroupsQuery.js';
import JoinGroupQuery from './models/communities/JoinGroupQuery.js';
import MembersQuery from './models/communities/MembersQuery.js';
import Membership from './models/communities/Membership.js';
import RemoveGroupMembersQuery from './models/communities/RemoveGroupMembersQuery.js';
import UpdateGroupMembersQuery from './models/communities/UpdateGroupMembersQuery.js';
import Chat from './models/communities/Chat.js';
import ChatId from './models/communities/ChatId.js';
import ChatMessage from './models/communities/ChatMessage.js';
import ChatMessagesPagingQuery from './models/communities/ChatMessagesPagingQuery.js';
import ChatMessagesPagingResult from './models/communities/ChatMessagesPagingResult.js';
import ChatMessageContent from './models/communities/ChatMessageContent.js';
import VotesQuery from './models/communities/VotesQuery.js';
import UserVotes from './models/communities/UserVotes.js';

/**
 * Analytics interface of GetSocial plugin.
 */
export default class Communities {
    /**
     * Add users to a friend list, if operation succeed - user become friends with everyone in the list.
     * If some or all users are already in the friends list, they will be ignored.
     *
     * @param {UserIdList} ids you want to become friend with.
     * @return {number} Callback with updated number of friends.
     */
    static addFriends(ids: UserIdList): Promise<number> {
        return JSONBridge.addFriends(ids);
    }

    /**
     * Remove users from a friends list.
     * If some or all users are not in the friends list, they will be ignored.
     *
     * @param {UserIdList} ids Users identifiers you don't want to be friends anymore.
     * @return {number} Callback with updated number of friends.
     */
    static removeFriends(ids: UserIdList): Promise<number> {
        return JSONBridge.removeFriends(ids);
    }

    /**
     * Check if users are your friends.
     *
     * @param {UserIdList} ids Users identifiers.
     * @return {Map<string, boolean>} Returns a map of booleans, where key is user ID and value if boolean
     *                indicating is the user in a friends list or not.
     */
    static areFriends(ids: UserIdList): Promise<Map<string, boolean>> {
        return JSONBridge.areFriends(ids);
    }

    /**
     * Check if user is your friend.
     *
     * @param {UserId} id Unique user identifier.
     * @return {boolean} Called with true, if user is your friend, false otherwise
     */
    static isFriend(id: UserId): Promise<boolean> {
        return JSONBridge.isFriend(id);
    }

    /**
     * Get number of friends.
     *
     * @param {FriendsQuery} query Query.
     * @return {number} Called with count of friends.
     */
    static getFriendsCount(query: FriendsQuery): Promise<number> {
        return JSONBridge.getFriendsCount(query);
    }

    /**
     * Get a list of friends for current user.
     *
     * @param {PagingQuery<FriendsQuery>} query    Pagination query.
     * @return {PagingResult<User>} Called with list of users that are friends of current user.
     */
    static getFriends(query: PagingQuery<FriendsQuery>): Promise<PagingResult<User>> {
        return JSONBridge.getFriends(query);
    }

    /**
     * Get a list of suggested friends for current user.
     *
     * @param {PagingQuery} query Pagination query.
     * @return {PagingResult<SuggestedFriend>} Called with list of users that are friends of current user.
     */
    static getSuggestedFriends(query: PagingQuery): Promise<PagingResult<SuggestedFriend>> {
        return JSONBridge.getSuggestedFriends(query);
    }

    /**
     * Replace existing friends with the provided list of users.
     *
     * @param {UserIdList} ids  List of GetSocial user identifiers.
     * @return {number} A callback to indicate if this operation was successful.
     */
    static setFriends(ids: UserIdList): Promise<number> {
        return JSONBridge.setFriends(ids);
    }

    /**
     * Get users matching query. Returns a list of users and a cursor for a next query.
     * If cursor is empty string, or {@link PagingResult#isLastPage()} is true, this is a last page.
     *
     * @param {PagingQuery<UsersQuery>} query   Users query and pagination details.
     * @return {PagingResult<User>} Called with a list of results and a cursor for a next query.
     */
    static getUsers(query: PagingQuery<UsersQuery>): Promise<PagingResult<User>> {
        return JSONBridge.getUsers(query);
    }

    /**
     * Get users by their identifiers.
     *
     * @param {UserIdList} ids Users identifiers.
     * @return {Map<string, User>} Called with a map of users, where key is user ID from identifiers and value - user object.
     */
    static getUsersByIds(ids: UserIdList): Promise<Map<string, User>> {
        return JSONBridge.getUsersByIds(ids);
    }

    /**
     * Get a single user by his identifier. Returns an error if user with this ID doesn't exist.
     *
     * @param {UserId} id Single user identifier.
     * @return {User} Called with a user object.
     */
    static getUser(id: UserId): Promise<User> {
        return JSONBridge.getUser(id);
    }

    /**
     * Get total count of users matching provided query.
     *
     * @param {UsersQuery} query Users query.
     * @return {number} Called with a number of users matching the query.
     */
    static getUsersCount(query: UsersQuery): Promise<number> {
        return JSONBridge.getUsersCount(query);
    }

    /**
     * Follow users or topics.
     * If follow users, returns a number of users you are following now.
     * If follow topics, returns a number of topics you are following now.
     *
     * @param {FollowQuery} query   Topics or users to be followed.
     * @return {number} Called with a total number of users/topics you follow after the call.
     */
    static follow(query: FollowQuery): Promise<number> {
        return JSONBridge.follow(query);
    }

    /**
     * Unfollow users or topics.
     * If unfollow users, returns a number of users you are following now.
     * If unfollow topics, returns a number of topics you are following now.
     *
     * @param {FollowQuery} query   Topics or users to be followed.
     * @return {number} Called with a total number of users/topics you follow after the call.
     */
    static unfollow(query: FollowQuery): Promise<number> {
        return JSONBridge.unfollow(query);
    }

    /**
     * Check if user with given ID is following a list of entities.
     * Returns a map, where key is an id of entity. Value indicated if user follows the entity for that key.
     *
     * @param {UserId} id  ID of user to check if he follows certain entities.
     * @param {FollowQuery} query   List of entities to check.
     * @return {Map<string, boolean>} Called with a map of results.
     */
    static isFollowing(id: UserId, query: FollowQuery): Promise<Map<string, boolean>> {
        return JSONBridge.isFollowing(id, query);
    }

    /**
     * Get users who follow certain entity. Returns a list of followers and a cursor for a next query.
     * If cursor is empty string, or {@link PagingResult#isLastPage()} is true, this is a last page.
     *
     * @param {PagingQuery<FollowersQuery>} query   Followers query and pagination details.
     * @return {PagingResult<User>} Called with list of followers and a cursor for a next query.
     */
    static getFollowers(query: PagingQuery<FollowersQuery>): Promise<PagingResult<User>> {
        return JSONBridge.getFollowers(query);
    }

    /**
     * Get total count of users who follows certain entity.
     *
     * @param {FollowersQuery} query   Followers query.
     * @return {number} Called with a number of users who follows certain entity.
     */
    static getFollowersCount(query: FollowersQuery): Promise<number> {
        return JSONBridge.getFollowersCount(query);
    }

    /**
     * Get announcements matching query. Returns a list of announcements.
     *
     * @param {AnnouncementsQuery} query Announcements query and pagination details.
     * @return {[Activity]} Called with list of announcements.
     */
    static getAnnouncements(query: AnnouncementsQuery): Promise<[Activity]> {
        return JSONBridge.getAnnouncements(query);
    }

    /**
     * Get activities matching query. Returns a list of activities and a cursor for a next query.
     * If cursor is empty string, or {@link PagingResult#isLastPage()} is true, this is a last page.
     *
     * @param {PagingQuery<ActivitiesQuery>} query Activities query and pagination details.
     * @return {PagingResult<Activity>} Called with list of activities and a cursor for a next query.
     */
    static getActivities(query: PagingQuery<ActivitiesQuery>): Promise<PagingResult<Activity>> {
        return JSONBridge.getActivities(query);
    }

    /**
     * Get activity by ID. If activity doesn't exist, returns an error.
     *
     * @param {string} id ID of activity.
     * @return {Activity} Called with activity object.
     */
    static getActivity(id: string): Promise<Activity> {
        return JSONBridge.getActivity(id);
    }

    /**
     * Post activity to a specific target.
     *
     * @param {ActivityContent} content Content of activity which should be posted.
     * @param {PostActivityTarget} target A target where activity should be posted.
     * @return {Activity} Called with activity object if it was posted successfully.
     */
    static postActivity(content: ActivityContent, target: PostActivityTarget): Promise<Activity> {
        return JSONBridge.postActivity(content, target);
    }

    /**
     * Update activity with a new content. Activity is entire replaced.
     *
     * @param {string} id Id of activity to be updated.
     * @param {ActivityContent} content Content of activity which should be posted.
     * @return {Activity} Called with activity object if it was posted successfully.
     */
    static updateActivity(id: string, content: ActivityContent): Promise<Activity> {
        return JSONBridge.updateActivity(id, content);
    }

    /**
     * Set reaction to the activity. If this reaction was already added, success is called.
     * Existing reactions will be removed.
     *
     * @param {string} reaction   Type of reaction.
     * @param {string} activityId Id of activity you want to react to.
     * @return {void} Called if operation was successful.
     */
    static setReaction(reaction: string, activityId: string): Promise<void> {
        return JSONBridge.setReaction(reaction, activityId);
    }

    /**
     * Add reaction to the activity. If this reaction was already added, success is called.
     * Existing reactions will be kept.
     *
     * @param {string} reaction   Type of reaction.
     * @param {string} activityId Id of activity you want to react to.
     * @return {void} Called if operation was successful.
     */
    static addReaction(reaction: string, activityId: string): Promise<void> {
        return JSONBridge.addReaction(reaction, activityId);
    }

    /**
     * Remove reaction from the activity. If you haven't added this reaction to the activity, success is called.
     *
     * @param {string} reaction   Type of reaction.
     * @param {string} activityId Id of activity you want to remove reaction from.
     * @return {void} Called if operation was successful.
     */
    static removeReaction(reaction: string, activityId: string): Promise<void> {
        return JSONBridge.removeReaction(reaction, activityId);
    }

    /**
     * Get reactions matching query. Returns a list of reactions and a cursor for a next query.
     * If cursor is empty string, or {@link PagingResult#isLastPage()} is true, this is a last page.
     *
     * @param {PagingQuery<ReactionsQuery>} query   Reactions query and pagination details.
     * @return {PagingResult<UserReactions>} Called with list of reactions and a cursor for a next query.
     */
    static getReactions(query: PagingQuery<ReactionsQuery>): Promise<PagingResult<UserReactions>> {
        return JSONBridge.getReactions(query);
    }

    /**
     * Set votes to the activity.
     * Existing votes will be removed.
     *
     * @param {[string]} pollOptionIds   Poll option ids.
     * @param {string} activityId Id of activity you want to add set to.
     * @return {void} Called if operation was successful.
     */
    static setVotes(pollOptionIds: [string], activityId: string): Promise<void> {
        return JSONBridge.setVotes(pollOptionIds, activityId);
    }

    /**
     * Add votes to the activity.
     * Existing votes will be kept.
     *
     * @param {[string]} pollOptionIds   Poll option ids.
     * @param {string} activityId Id of activity you want to add vote to.
     * @return {void} Called if operation was successful.
     */
    static addVotes(pollOptionIds: [string], activityId: string): Promise<void> {
        return JSONBridge.addVotes(pollOptionIds, activityId);
    }

    /**
     * Remove votes from the activity.
     *
     * @param {[string]} pollOptionIds   Poll option ids.
     * @param {string} activityId Id of activity you want to remove votes from.
     * @return {void} Called if operation was successful.
     */
    static removeVotes(pollOptionIds: [string], activityId: string): Promise<void> {
        return JSONBridge.removeVotes(pollOptionIds, activityId);
    }

    /**
     * Get votes matching query. Returns a list of votes and a cursor for a next query.
     * If cursor is empty string, or {@link PagingResult#isLastPage()} is true, this is a last page.
     *
     * @param {PagingQuery<VotesQuery>} query   Votes query and pagination details.
     * @return {PagingResult<UserVotes>} Called with list of votes and a cursor for a next query.
     */
    static getVotes(query: PagingQuery<VotesQuery>): Promise<PagingResult<UserVotes>> {
        return JSONBridge.getVotes(query);
    }

    /**
     * Report activity with a specified reason.
     *
     * @param {string} id  ID of activity.
     * @param {number} reason      Reason of reporting.
     * @param {string} explanation Could be arbitrary string.
     * @return {void} Called if operation succeeded.
     */
    static reportActivity(id: string, reason: number, explanation: ?String): Promise<void> {
        return JSONBridge.reportActivity(id, reason, explanation);
    }

    /**
     * Remove all activities matching query.
     *
     * @param {RemoveActivitiesQuery} query Which activities should be removed.
     * @return {void} Called if operation succeeded.
     */
    static removeActivities(query: RemoveActivitiesQuery): Promise<void> {
        return JSONBridge.removeActivities(query);
    }

    /**
     * Get tags matching query. Returns a list of tags.
     *
     * @param {TagsQuery} query Tags query and pagination details.
     * @return {[string]} Called with list of tags.
     */
    static getTags(query: TagsQuery): Promise<[string]> {
        return JSONBridge.getTags(query);
    }

    /**
     * Get topic by ID. If topic with given ID doesn't exist, return an error.
     *
     * @param {string} id ID of topic.
     * @return {Topic} Called with a topic for a given ID.
     */
    static getTopic(id: string): Promise<Topic> {
        return JSONBridge.getTopic(id);
    }

    /**
     * Get topics matching query. Returns a list of topics and a cursor for a next query.
     * If cursor is empty string, or {@link PagingResult#isLastPage()} is true, this is a last page.
     *
     * @param {PagingQuery<TopicsQuery>} query Tags query and pagination details.
     * @return {PagingResult<Topic>} Called with list of topics and a cursor for a next query.
     */
    static getTopics(query: PagingQuery<TopicsQuery>): Promise<PagingResult<Topic>> {
        return JSONBridge.getTopics(query);
    }

    /**
     * Get total count of topics matching provided query.
     *
     * @param {TopicsQuery} query   Topics query.
     * @return {number} Called with a number of topics matching the query.
     */
    static getTopicsCount(query: TopicsQuery): Promise<number> {
        return JSONBridge.getTopicsCount(query);
    }

    // Groups

    /**
     * Create a new group.
     *
     * @param {GroupContent}  groupContent  Group content.
     * @return {Group}         Called with created group.
     */
    static createGroup(groupContent: GroupContent): Promise<Group> {
        return JSONBridge.createGroup(groupContent);
    }

    /**
     * Update an existing group.
     *
     * @param {string}        groupId       Group id to update.
     * @param {GroupContent}  groupContent  New group content.
     * @return {Group}         Called with updated group.
     */
    static updateGroup(groupId: string, groupContent: GroupContent): Promise<Group> {
        return JSONBridge.updateGroup(groupId, groupContent);
    }

    /**
     * Remove groups.
     *
     * @param {[string]} groupIds Group ids to delete.
     * @return {void} Called if operation succeeded.
     */
    static removeGroups(groupIds: [string]): Promise<void> {
        return JSONBridge.removeGroups(groupIds);
    }

    /**
     * Get a single group.
     *
     * @param {string}  groupId  Group id.
     * @return {Group}   Called if groups are removed.
     */
    static getGroup(groupId: string): Promise<Group> {
        return JSONBridge.getGroup(groupId);
    }

    /**
     * Get groups based on query parameters.
     *
     * @param {PagingQuery<GroupsQuery>} query Query parameter.
     * @return {PagingResult<Group>}       Called with groups.
     */
    static getGroups(query: PagingQuery<GroupsQuery>): Promise<PagingResult<Group>> {
        return JSONBridge.getGroups(query);
    }

    /**
     * Get number of groups based on query parameters.
     *
     * @param {GroupsQuery} query Query parameter.
     * @return {number}      Called with number of groups.
     */
    static getGroupsCount(query: GroupsQuery): Promise<number> {
        return JSONBridge.getGroupsCount(query);
    }

    /**
     * Add group members to a group.
     *
     * @param {AddGroupMembersQuery}  query Query parameter.
     * @return {[GroupMember]}         Called with new group members.
     */
    static addGroupMembers(query: AddGroupMembersQuery): Promise<[GroupMember]> {
        return JSONBridge.addGroupMembers(query);
    }

    /**
     * Current user join to group.
     *
     * @param {JoinGroupQuery}  query Query parameter.
     * @return {GroupMember}     Called with new group member.
     */
    static joinGroup(query: JoinGroupQuery): Promise<GroupMember> {
        return JSONBridge.joinGroup(query);
    }

    /**
     * Update an existing group member.
     *
     * @param {UpdateGroupMembersQuery} query Query parameter.
     * @return {[GroupMember]}           Called with updated member.
     */
    static updateGroupMembers(query: UpdateGroupMembersQuery): Promise<[GroupMember]> {
        return JSONBridge.updateGroupMembers(query);
    }

    /**
     * Remove users from a group.
     *
     * @param {RemoveGroupMembersQuery} query Query parameter.
     * @return {void} Called if operation succeeded.
     */
    static removeGroupMembers(query: RemoveGroupMembersQuery): Promise<void> {
        return JSONBridge.removeGroupMembers(query);
    }

    /**
     * Get members of a group.
     *
     * @param {PagingQuery<MembersQuery>}  query  Query parameter.
     * @return {PagingResult<GroupMember>} Called with group members.
     */
    static getGroupMembers(query: PagingQuery<MembersQuery>): Promise<PagingResult<GroupMember>> {
        return JSONBridge.getGroupMembers(query);
    }

    /**
     * Check if users are member of group.
     *
     * @param {string}  groupId           Group id.
     * @param {UserIdList}   userIds        User ids to check.
     * @return {Map<string, Membership>}  Result map.
     */
    static areGroupMembers(groupId: string, userIds: UserIdList): Promise<Map<string, Membership>> {
        return JSONBridge.areGroupMembers(groupId, userIds);
    }

    // Chats

    /**
     * Send chat message to the specified recipient.
     *
     * @param {ChatMessageContent}  content Chat message content.
     * @param {ChatId}              target  Chat message target.
     * @return {ChatMessage}         Called with the sent message.
     */
    static sendChatMessage(content: ChatMessageContent, target: ChatId): Promise<ChatMessage> {
        return JSONBridge.sendChatMessage(content, target);
    }

    /**
     * Get chat messages.
     *
     * @param {ChatMessagesPagingQuery} query Query parameter.
     * @return {PagingResult<ChatMessage>}  Called with chat messages.
     */
    static getChatMessages(query: ChatMessagesPagingQuery): Promise<ChatMessagesPagingResult> {
        return JSONBridge.getChatMessages(query);
    }

    /**
     * Get existing chats.
     *
     * @param {PagingQuery}   query Query parameter.
     * @return {PagingResult<Chat>}  Called with chats.
     */
    static getChats(query: PagingQuery): Promise<PagingResult<Chat>> {
        return JSONBridge.getChats(query);
    }

    /**
     * Get a single chat.
     *
     * @param {ChatId}    chatId  ChatId parameter.
     * @return {Chat}     Called with chat messages.
     */
    static getChat(chatId: ChatId): Promise<Chat> {
        return JSONBridge.getChat(chatId);
    }
}
