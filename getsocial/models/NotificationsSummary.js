// @flow

/**
 * Notification Summary class.
 */
export default class NotificationsSummary {
  successfullySentCount: number;

  /**
   * Creates a new NotificationsSummary instance.
   * @param {any} successfullySentMap map with parameters.
   */
  constructor(successfullySentMap: any) {
    this.successfullySentCount = successfullySentMap['SUCCESSFULLY_SENT_COUNT'];
  }
}
