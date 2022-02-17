/**
 * Tag object.
 */
export default class Tag {
  name: string;
  followersCount: number;
  activitiesCount: number;
  isFollowedByMe: boolean;
  popularity: number = 0;

  /**
   * Creates a new Tag instance from the provider parameters.
   * @param {any} tagMap tag parameters
   */
  constructor(tagMap: any) {
      this.name = tagMap['name'];
      this.followersCount = tagMap['followersCount'];
      this.activitiesCount = tagMap['activitiesCount'];
      this.isFollowedByMe = tagMap['isFollowedByMe'] === true;
      const rawPopularity = tagMap['popularity'];
      if (rawPopularity !== undefined && rawPopularity != null) {
          this.popularity = rawPopularity;
      } else {
          this.popularity = 0.0;
      }
      Object.freeze(this);
  }
}
