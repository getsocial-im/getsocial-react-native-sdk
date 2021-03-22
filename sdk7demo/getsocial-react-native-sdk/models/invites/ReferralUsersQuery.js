/* eslint-disable max-len */
// @flow

/**
 * ReferralUsersQuery object.
 */
export default class ReferralUsersQuery {
    event: ?string;

    // eslint-disable-next-line require-jsdoc
    constructor(event: ?string) {
        this.event = event;
    }

    /**
   * Creates new query to filter all the users.
   *
   * @return {ReferralUsersQuery} new ReferralUsersQuery instance.
   */
    static allUsers(): ReferralUsersQuery {
        return new ReferralUsersQuery(null);
    }

    /**
   * Creates new query to filter users for the specified event.
   *
   * @param {string} event name of event.
   * @return {ReferralUsersQuery} new ReferralUsersQuery instance.
   */
    static usersForEvent(event: string): ReferralUsersQuery {
        return new ReferralUsersQuery(event);
    }

    /**
  * Generates JSON string.
  * @return {string} object as json.
  */
    toJSON() {
        return {eventName: (this.event == null ? '' : this.event)};
    }
}
