// @flow

/**
 * Immutable properties for a public user.
 */
export default class PublicUser {
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

  /**
   * Creates a new PublicUser instance from the provider parameters.
   * @param {any} publicUserMap public user parameters
   */
  constructor(publicUserMap: any) {
    this.userId = publicUserMap['USER_ID'];
    this.displayName = publicUserMap['DISPLAY_NAME'];
    this.avatarUrl = publicUserMap['AVATAR_URL'];
    this.identities = publicUserMap['IDENTITIES'];
    this.publicProperties = publicUserMap['PUBLIC_PROPERTIES'];
  }
}
