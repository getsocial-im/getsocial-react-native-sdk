/* eslint-disable max-len */
// @flow

/**
 * Authentication Identity class.
 */
export default class AuthIdentity {
  #providerUserId = null;
  #accessToken = null;
  #providerId = null;

  /**
   * Creates a Facebook identity with specified access token.
   *
   * @param {string} accessToken Token of Facebook user returned from FB SDK.
   * @return {AuthIdentity} New instance for Facebook user with specified access token.
  */
  static createFacebookIdentity(accessToken: string): AuthIdentity {
    const ai = new AuthIdentity();
    ai.#providerId = 'facebook';
    ai.#accessToken = accessToken;
    return ai;
  }

  /**
   * Create custom identity.
   *
   * @param {string} customProviderName Your custom provider name.
   * @param {string} userId             Unique user identifier for your custom provider.
   * @param {string} accessToken        Password of the user for your custom provider.
   *                           It's a string, provided by the developer and it will be
   *                           required by the GetSocial SDK to validate any future
   *                           intent to add this same identity to another user.
   * @return {AuthIdentity} Instance for your custom provider.
  */
  static createCustomIdentity(customProviderName: string, userId: string, accessToken: string): AuthIdentity {
    const ai = new AuthIdentity();
    ai.#providerId = customProviderName;
    ai.#providerUserId = userId;
    ai.#accessToken = accessToken;
    return ai;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    return JSON.stringify({
      'providerId': this.#providerId,
      'providerUserId': this.#providerUserId,
      'accessToken': this.#accessToken,
    });
  }
}
