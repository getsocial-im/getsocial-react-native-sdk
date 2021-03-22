// @flow

/**
 * NotificationContext object.
 */
export default class NotificationContext {
    action: ?string

    // eslint-disable-next-line require-jsdoc
    constructor(map: any) {
        this.action = map['action'];
    }
}
