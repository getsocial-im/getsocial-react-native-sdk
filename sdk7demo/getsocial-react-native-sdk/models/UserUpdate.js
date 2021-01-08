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
      return '{' +
            '"displayName": ' + ((this.displayName === undefined || this.displayName == null) ? 'null' : '"' + this.displayName + '"') + ',' +
            '"avatarUrl": ' + ((this.avatarUrl === undefined || this.avatarUrl == null) ? 'null' : '"' + this.avatarUrl + '"') + ',' +
            '"avatar": ' + ((this.avatar === undefined || this.avatar == null) ? 'null' : '"' + this.avatar + '"') + ',' +
            '"publicProperties": ' + (this.publicProperties === undefined ? 'null' : JSON.stringify(this.publicProperties)) + ',' +
            '"privateProperties": ' + (this.privateProperties === undefined ? 'null' : JSON.stringify(this.privateProperties)) +
        '}';
    }
}
