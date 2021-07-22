/* eslint-disable max-len */
// @flow
import CommunitiesEntityType from './CommunitiesEntityType.js';

/**
 * CommunitiesEntity object.
 */
export default class CommunitiesEntity {
  id: string;
  type: CommunitiesEntityType;
  title: ?string;
  avatarUrl: ?string;
  followersCount: number = 0;
  isFollowedByMe: boolean = false;
  allowedActions: {[key: number] : boolean} = {}; // key is value from CommunitiesAction

  /**
   * Check if current user is allowed to perform a certain action.
   *
   * @param {number} action action to be checked.
   * @return {boolean} true, if current user is allowed to perform action, false otherwise.
   */
  isActionAllowed(action: number): boolean {
      return this.allowedActions[action] === true;
  }

  /**
   * Creates a new CommunitiesEntity instance from the provider parameters.
   * @param {any} entityMap entity parameters
   */
  constructor(entityMap: any) {
      this.id = entityMap['id'];
      this.type = entityMap['type'];
      this.title = entityMap['title'];
      this.avatarUrl = entityMap['avatarUrl'];
      this.followersCount = entityMap['followersCount'];
      this.isFollowedByMe = entityMap['isFollower'] === true;
      this.allowedActions = entityMap['availableActions'];
      Object.freeze(this);
  }
}
