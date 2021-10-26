/**
 * UserId object.
 */
export default class UserId {
  #id: string
  #providerId: ?string

  /**
   * Create a single GetSocial user identifier.
   *
   * @param {string} id GetSocial user ID.
   * @return {UserId} new identifier.
   */
  static create(id: string): UserId {
      const userId = new UserId();
      userId.#id = id;
      return userId;
  }

  /**
   * Create a single identity user identifier for giver provider ID.
   *
   * @param {string} providerId custom identity provider ID.
   * @param {string} id identity user ID.
   * @return {UserId} new identifier.
   */
  static createWithProvider(providerId: string, id: string): UserId {
      const userId = new UserId();
      userId.#id = id;
      userId.#providerId = providerId;
      return userId;
  }

  /**
   * @return {UserId} for a current user.
   */
  static currentUser(): UserId {
      const userId = new UserId();
      userId.#id = 'GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42';
      return userId;
  }

  // eslint-disable-next-line require-jsdoc
  toString() :string {
      if (this.#providerId == undefined) {
          return this.#id;
      }
      return this.#providerId + ':' + this.#id;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {provider: this.#providerId ?? null, userId: this.#id};
  }
}
