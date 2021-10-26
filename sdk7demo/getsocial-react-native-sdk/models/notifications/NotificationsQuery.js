/* eslint-disable max-len */
// @flow

/**
 * Notifications Query class.
 */
export default class NotificationsQuery {
  #status: string[] = [];
  #actions: string[] = [];
  #types: string[] = [];

  /**
   * Creates a new notifications query with the provided statuses.
   * @param {[string]} status statuses to filter for.
   * @return {NotificationsQuery} new query instance.
   */
  static withStatus(status: [string]): NotificationsQuery {
      const nc = new NotificationsQuery();
      status.forEach((item) => {
          nc.#status.push(item);
      });
      return nc;
  }

  /**
   * Creates a new notifications count query with all the available statuses.
   * @return {NotificationsCountQuery} new query instance.
   */
  static withAllStatus(): NotificationsQuery {
      const nc = new NotificationsQuery();
      nc.#status = [];
      return nc;
  }

  /**
   * Sets actions to filter for.
   * @param {[string]} newActions actions to filter for.
   * @return {NotificationsQuery} updated query instance.
   */
  withActions(newActions: [string]): NotificationsQuery {
      newActions.forEach((item) => {
          this.#actions.push(item);
      });
      return this;
  }

  /**
   * Sets types to filter for.
   * @param {[string]} newTypes types to filter for.
   * @return {NotificationsQuery} updated query instance.
   */
  ofTypes(newTypes: [string]): NotificationsQuery {
      newTypes.forEach((item) => {
          this.#types.push(item);
      });
      return this;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON() {
      return {actions: this.#actions, statuses: this.#status, types: this.#types};
  }
}
