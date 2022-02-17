/**
 * Label object.
 */
export default class Label {
  name: string;
  followersCount: number;
  activitiesCount: number;
  isFollowedByMe: boolean;
  popularity: number = 0;

  /**
   * Creates a new Label instance from the provider parameters.
   * @param {any} labelMap label parameters
   */
  constructor(labelMap: any) {
      this.name = labelMap['name'];
      this.followersCount = labelMap['followersCount'];
      this.activitiesCount = labelMap['activitiesCount'];
      this.isFollowedByMe = labelMap['isFollowedByMe'] === true;
      const rawPopularity = labelMap['popularity'];
      if (rawPopularity !== undefined && rawPopularity != null) {
          this.popularity = rawPopularity;
      } else {
          this.popularity = 0.0;
      }
      Object.freeze(this);
  }
}
