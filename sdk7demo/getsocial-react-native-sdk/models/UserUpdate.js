/* eslint-disable max-len */
// @flow

/**
 * UserUpdate object.
 */
export default class UserUpdate {
    displayName: ?string;
    avatarUrl: ?string;
    avatar: ?string;
    publicProperties: {[key: string] : string} = {};
    privateProperties: {[key: string] : string} = {};

    /**
    * Generates JSON string.
    * @return {string} object as json.
    */
    toJSON() {
        return {avatar: this.avatar ?? null, avatarUrl: this.avatarUrl ?? null, displayName: this.displayName ?? null,
            privateProperties: this.privateProperties, publicProperties: this.publicProperties};
    }
}
