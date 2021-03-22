// @flow

/**
 * RemoveActivitiesQuery object.
 */
export default class RemoveActivitiesQuery {
  ids: Array<string> = [];

  // eslint-disable-next-line require-jsdoc
  constructor(ids: string[]) {
      this.ids = ids;
  }

  /**
   * Remove activities with IDs.
   *
   * @param {[string]} ids array of activities IDs.
   * @return {RemoveActivitiesQuery} new instance.
   */
  static activityIds(ids: string[]) {
      return new RemoveActivitiesQuery(ids);
  }
}
