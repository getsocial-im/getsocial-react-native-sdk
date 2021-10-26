/* eslint-disable max-len */
// @flow
import UserId from './../UserId.js';
/**
 * Chat object.
 */
export default class ChatId {
    id: string;
    userId: UserId;

    // eslint-disable-next-line require-jsdoc
    constructor(id: ?string, userId: ?UserId) {
        if (id != undefined) {
            this.id = id;
        }
        if (userId != undefined) {
            this.userId = userId;
        }
    }

    /**
     * Create a new ChatId instance.
     * @param {string} id    Chat id.
     * @return {ChatId} new ChatId instance.
     */
    static create(id: string): ChatId {
        return new ChatId(id, null);
    }

    /**
     * Create a new ChatId instance with user id.
     * @param {UserId}  userId    User id.
     * @return {ChatId} new ChatId instance.
     */
    static createWithUserId(userId: UserId): ChatId {
        return new ChatId(null, userId);
    }

    // eslint-disable-next-line require-jsdoc
    toJSON() {
        return {id: this.id ?? null, userId: this.userId ?? null};
    }
}
