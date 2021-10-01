import CommunitiesSettings from './CommunitiesSettings.js';
import Membership from './Membership.js';

/**
 * Group object.
 */
export default class Group {
  id: string;
  title: ?string;
  description: ?string;
  avatarUrl: ?string;
  createdAt: number;
  updatedAt: number;
  settings: CommunitiesSettings;
  followersCount: number;
  membersCount: number;
  membership: ?Membership;
  isFollowedByMe: boolean;
  popularity: number;

  /**
   * Creates a new Group instance from the provided parameters.
   * @param {any} groupMap activity parameters
   */
  constructor(groupMap: any) {
      this.id = groupMap['id'];
      this.title = groupMap['title'];
      this.description = groupMap['description'];
      this.avatarUrl = groupMap['avatarUrl'];
      this.createdAt = groupMap['createdAt'];
      this.updatedAt = groupMap['updatedAt'];
      this.settings = new CommunitiesSettings(groupMap['settings']);
      this.followersCount = groupMap['followersCount'];
      this.isFollowedByMe = groupMap['isFollowedByMe'] === true;
      this.membersCount = groupMap['membersCount'];
      const rawMembership = groupMap['membership'];
      if (rawMembership !== undefined && rawMembership != null) {
          const membership = new Membership(rawMembership);
          this.membership = membership;
      }
      const rawPopularity = groupMap['popularity'];
      if (rawPopularity !== undefined && rawPopularity != null) {
          this.popularity = rawPopularity;
      } else {
          this.popularity = 0.0;
      }
      Object.freeze(this);
  }
}
