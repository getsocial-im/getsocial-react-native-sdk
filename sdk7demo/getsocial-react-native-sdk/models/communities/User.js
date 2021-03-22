// @flow

/**
 * Immutable properties for a user.
 */
export default class User {
  /** GetSocial User id. */
  userId: string
  /** Display name. */
  displayName: string
  /** Display name. */
  avatarUrl: ?string
  /** Returns all identities added to the user. */
  identities: {[key: string] : string}
  /** All public properties of user. */
  publicProperties: {[key: string] : string}
  /** User is verified. */
  isVerified: boolean

  /**
   * Creates a new User instance from the provider parameters.
   * @param {any} userMap public user parameters
   */
  constructor(userMap: any) {
      this.userId = userMap['userId'];
      this.displayName = userMap['displayName'];
      this.avatarUrl = userMap['avatarUrl'];
      this.identities = userMap['identities'];
      this.publicProperties = userMap['publicProperties'];
      this.isVerified = userMap['verified'];
  }
}
