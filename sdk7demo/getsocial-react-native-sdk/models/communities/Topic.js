import CommunitiesSettings from './CommunitiesSettings';

/**
 * Topic object.
 */
export default class Topic {
  id: string;
  title: ?string;
  description: ?string;
  avatarUrl: ?string;
  createdAt: number;
  updatedAt: number;
  settings: CommunitiesSettings;
  followersCount: number;
  isFollowedByMe: boolean;

  /**
   * Creates a new Topic instance from the provider parameters.
   * @param {any} topicMap activity parameters
   */
  constructor(topicMap: any) {
      this.id = topicMap['id'];
      this.title = topicMap['title'];
      this.description = topicMap['description'];
      this.avatarUrl = topicMap['avatarUrl'];
      this.createdAt = topicMap['createdAt'];
      this.updatedAt = topicMap['updatedAt'];
      this.settings = new CommunitiesSettings(topicMap['settings']);
      this.followersCount = topicMap['followersCount'];
      this.isFollowedByMe = topicMap['isFollowedByMe'] === true;

      Object.freeze(this);
  }
}
