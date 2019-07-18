// @flow

/**
 * Notifications Count Query class.
 */
export default class NotificationsCountQuery {
  #status = [];
  #types = [];
  #actions = [];

  /**
   * Creates a new notifications count query with the provided statuses.
   * @param {[string]} status statuses to filter for.
   * @return {NotificationsCountQuery} new query instance.
   */
  static withStatus(status: [string]): NotificationsCountQuery {
    const nc = new NotificationsCountQuery();
    nc.#status = status;
    return nc;
  }

  /**
   * Creates a new notifications count query with all the available statuses.
   * @return {NotificationsCountQuery} new query instance.
   */
  static withAllStatus(): NotificationsCountQuery {
    const nc = new NotificationsCountQuery();
    return nc;
  }

  /**
   * Sets actions to filter for.
   * @param {[string]} newActions actions to filter for.
   * @return {NotificationsCountQuery} updated query instance.
   */
  withActions(newActions: [string]): NotificationsCountQuery {
    this.#actions = newActions;
    return this;
  }

  /**
   * Sets types to filter for.
   * @param {[string]} newTypes types to filter for.
   * @return {NotificationsCountQuery} updated query instance.
   */
  ofTypes(newTypes: [string]): NotificationsCountQuery {
    this.#types = newTypes;
    return this;
  }
  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    return JSON.stringify({
      'STATUS': this.#status,
      'TYPES': this.#types,
      'ACTIONS': this.#actions,
    });
  }
}
