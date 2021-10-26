// @flow

/**
 * NotificationBadge object.
 */
export default class NotificationBadge {
  #increase: ?number
  #badge: ?number

  /**
   * Creates badge to increase badge number.
   * @param {number} by Increase by.
   * @return {NotificationBadge} New instance.
   */
  static increase(by: number): NotificationBadge {
      const instance = new NotificationBadge();
      instance.#increase = by;
      return instance;
  }

  /**
   * Creates badge to set badge number.
   * @param {number} to Badge value.
   * @return {NotificationBadge} New instance.
   */
  static set(to: number): NotificationBadge {
      const instance = new NotificationBadge();
      instance.#badge = to;
      return instance;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {badge: this.#badge ?? 0, increase: this.#increase ?? 0};
  }
}
