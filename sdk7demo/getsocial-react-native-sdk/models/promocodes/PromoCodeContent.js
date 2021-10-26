/* eslint-disable max-len */
// @flow

/**
 * PromoCodeContent object.
 */
export default class PromoCodeContent {
  #code: ?string
  #startDate: ?number
  #endDate: ?number
  properties: {[key: string] : string} = {};
  maxClaims: number = 0;

  /**
   * Create a Promo Code with a random code.
   * @return {PromoCodeContent} new promo code content instance.
   */
  static withRandomCode(): PromoCodeContent {
      return new PromoCodeContent();
  }

  /**
   * Create a Promo Code with defined code.
   * @param {string} code code to be used as promo code.
   * @return {PromoCodeContent} new promo code content instance.
   */
  static withCode(code: string): PromoCodeContent {
      const obj = new PromoCodeContent();
      obj.#code = code;
      return obj;
  }

  /**
   * Set the time range when this Promo Code is available.
   * If not set - will be available from the creation moment and until manually disabled on the Dashboard.
   * @param {number} startDate date when the Promo Code should become available.
   * @param {number} endDate   date when the Promo Code should not be available anymore.
   */
  setTimeLimit(startDate: number, endDate: number) {
      this.#startDate = startDate;
      this.#endDate = endDate;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON() {
      return {code: this.#code ?? null, data: this.properties, endDate: this.#endDate ?? 0, maxClaimCount: this.maxClaims, startDate: this.#startDate ?? 0};
  }
}
