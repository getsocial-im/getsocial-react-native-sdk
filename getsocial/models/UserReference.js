// @flow

/**
 *Lightweight representation of a public user.
 */
export default class UserReference {
  /** GetSocial User id. */
  userId: string
  /** Display name. */
  displayName: string
  /** Display name. */
  avatarUrl: ?string

  /**
   * Creates a new UserReference instance from the provider parameters.
   * @param {any} userReferenceMap user reference parameters
   */
  constructor(userReferenceMap: any) {
    this.userId = userReferenceMap['USER_ID'];
    this.displayName = userReferenceMap['DISPLAY_NAME'];
    this.avatarUrl = userReferenceMap['AVATAR_URL'];
  }
}


