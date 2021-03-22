/* eslint-disable max-len */
// @flow
import PurchaseData from './models/analytics/PurchaseData.js';
import JSONBridge from './utils/JSONBridge.js';

/**
 * Analytics interface of GetSocial plugin.
 */
export default class Analytics {
    /**
   * Reports in-app purchase to Dashboard.
   *
   * @param {PurchaseData} purchaseData Purchase data.
   * @return {boolean} True if operation was successful, otherwise false.
  */
    static trackPurchase(purchaseData: PurchaseData): Promise<boolean> {
        return JSONBridge.trackPurchase(purchaseData);
    }


    /**
  * Reports custom event to Dashboard.
  * @param {string} eventName Name of custom event.
  * @param {Map<string, string>} eventProperties Properties of custom event.
  * @return {boolean} True if operation was successful, otherwise false.
  */
    static trackCustomEvent(eventName: string, eventProperties: Map<string, string>): Promise<boolean> {
        return JSONBridge.trackCustomEvent(eventName, eventProperties);
    }
}
