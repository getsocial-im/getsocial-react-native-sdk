/* eslint-disable max-len */
/**
 * UserIdList object.
 */
export default class UserIdList {
  #ids: [string]
  #providerId: ?string

  /**
   * Create a list of GetSocial user IDs.
   *
   * @param {[string]} ids  list of GetSocial user IDs.
   * @return {UserIdList} new identifiers.
   */
  static create(ids: [string]): UserIdList {
      const instance = new UserIdList();
      instance.#ids = ids;
      return instance;
  }

  /**
   * Create a list of user identifiers for given provider ID.
   *
   * @param {string} providerId custom identity provider ID.
   * @param {string} ids list of identity user IDs.
   * @return {UserIdList} new identifiers.
   */
  static createWithProvider(providerId: string, ids: [string]): UserIdList {
      const instance = new UserIdList();
      instance.#ids = ids;
      instance.#providerId = providerId;
      return instance;
  }

  // eslint-disable-next-line require-jsdoc
  toString() :[string] {
      if (this.#providerId == undefined) {
          return this.#ids;
      }
      const result = [];
      this.#ids.forEach((element) => {
          result.push((this.#providerId + ':' + element));
      });
      return result;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {ids: this.#ids, provider: this.#providerId ?? null};
  }
}
