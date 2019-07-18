// @flow

/**
 * Notifications Query class.
 */
export default class NotificationsQuery {
  static Filter = Object.freeze({
    NO_FILTER: 0,
    OLDER: 1,
    NEWER: 2});

  #limit = 20;
  #status = [];
  #types = [];
  #actions = [];
  #filterId = '';
  #filter = NotificationsQuery.Filter.NO_FILTER;

  /**
   * Creates a new notifications count query with the provided statuses.
   * @param {[string]} status statuses to filter for.
   * @return {NotificationsQuery} new query instance.
   */
  static withStatus(status: [string]): NotificationsQuery {
    const nc = new NotificationsQuery();
    nc.#status = status;
    return nc;
  }

  /**
   * Creates a new notifications count query with all the available statuses.
   * @return {NotificationsCountQuery} new query instance.
   */
  static withAllStatus(): NotificationsQuery {
    const nc = new NotificationsQuery();
    return nc;
  }

  /**
   * Sets maximum number of returned notifications.
   * @param {number} newLimit maximum number of notifications to return.
   * @return {NotificationsQuery} updated query instance.
   */
  withLimit(newLimit: number): NotificationsQuery {
    this.#limit = newLimit;
    return this;
  }

  /**
    * Load older or newer notifications.
    * @param {number} newFilter Filtering mode.
    * @param {string} notificationId Filtering notification.
    * @return {NotificationsQuery} query for method chaining.
    */
  withFilter(newFilter: number, notificationId: string): NotificationsQuery {
    this.#filter = newFilter;
    this.#filterId = notificationId;
    return this;
  }

  /**
   * Sets actions to filter for.
   * @param {[string]} newActions actions to filter for.
   * @return {NotificationsQuery} updated query instance.
   */
  withActions(newActions: [string]): NotificationsQuery {
    this.#actions = newActions;
    return this;
  }

  /**
   * Sets types to filter for.
   * @param {[string]} newTypes types to filter for.
   * @return {NotificationsQuery} updated query instance.
   */
  ofTypes(newTypes: [string]): NotificationsQuery {
    this.#types = newTypes;
    return this;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    return JSON.stringify({
      'LIMIT': this.#limit,
      'STATUS': this.#status,
      'TYPES': this.#types,
      'ACTIONS': this.#actions,
      'FILTER': {'FILTER': this.#filter, 'NOTIFICATION_ID': this.#filterId},
    });
  }
}
