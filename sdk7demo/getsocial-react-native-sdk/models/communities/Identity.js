/* eslint-disable max-len */
// @flow

/**
 * Authentication Identity class.
 */
export default class Identity {
  #providerUserId = null;
  #accessToken = null;
  #providerId = null;
  #trusted = false;

  /**
   * Creates a Facebook identity with specified access token.
   *
   * @param {string} accessToken Token of Facebook user returned from FB SDK.
   * @return {Identity} New instance for Facebook user with specified access token.
  */
  static createFacebookIdentity(accessToken: string): Identity {
      const ai = new Identity();
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
   * @return {Identity} Instance for your custom provider.
  */
  static createCustomIdentity(customProviderName: string, userId: string, accessToken: string): Identity {
      const ai = new Identity();
      ai.#providerId = customProviderName;
      ai.#providerUserId = userId;
      ai.#accessToken = accessToken;
      return ai;
  }

  /**
   * Create trusted identity.
   *
   * @param {string} trustedProviderName Your trusted provider name.
   * @param {string} accessToken        Access token for your trusted provider.
   * @return {Identity} Instance for your trusted provider.
  */
  static createTrustedIdentity(trustedProviderName: string, accessToken: string): Identity {
      const ai = new Identity();
      ai.#providerId = trustedProviderName;
      ai.#accessToken = accessToken;
      ai.#trusted = true;
      return ai;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON() {
      return {accessToken: this.#accessToken, provider: this.#providerId.toLowerCase(), trusted: this.#trusted, userId: this.#providerUserId ?? null};
  }
}
