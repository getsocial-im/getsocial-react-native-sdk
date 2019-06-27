// @flow

import PublicUser from './PublicUser.js';

/**
 * Immutable properties for a suggested friend.
 */
export default class SuggestedFriend extends PublicUser {
  /** Number of mutual friends. */
  mutualFriendsCount: number

  /**
   * Creates a new SuggestedFriend instance from the provider parameters.
   * @param {any} suggestedFriendMap suggested friend parameters
   */
  constructor(suggestedFriendMap: any) {
    super(suggestedFriendMap);
    this.mutualFriendsCount = suggestedFriendMap['MUTUAL_FRIENDS_COUNT'];
  }
}
