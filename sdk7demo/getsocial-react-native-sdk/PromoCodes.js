/* eslint-disable max-len */
// @flow

import JSONBridge from './utils/JSONBridge.js';
import PromoCode from './models/promocodes/PromoCode.js';
import PromoCodeContent from './models/promocodes/PromoCodeContent.js';

/**
 * Analytics interface of GetSocial plugin.
 */
export default class PromoCodes {
    /**
     * Create a promo code.
     *
     * @param {PromoCodeContent} content promo code data.
     * @return {PromoCode} Callback with created promo code or error.
     */
    static create(content: PromoCodeContent): Promise<PromoCode> {
        return JSONBridge.createPromoCode(content);
    }

    /**
     * Get the promo code entity by its code.
     *
     * @param {string} code code.
     * @return {PromoCode} Called with promo code or error.
     */
    static get(code: string): Promise<PromoCode> {
        return JSONBridge.getPromoCode(code);
    }

    /**
     * Claim promo code. Will return an error if promocode is not valid, expired or already claimed.
     *
     * @param {string} code Code of promo to be claimed.
     * @return {PromoCode} Called with promocode if operation was successful.
     */
    static claim(code: string): Promise<PromoCode> {
        return JSONBridge.claimPromoCode(code);
    }
}
