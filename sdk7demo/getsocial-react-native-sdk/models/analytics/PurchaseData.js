/* eslint-disable max-len */
// @flow
/**
 * Purchase data object.
 */
export default class PurchaseData {
  productId: string;
  productTitle: string;
  productType: number;
  price: number;
  priceCurrency: string;
  purchaseDate: number;
  transactionIdentifier: string;

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {price: this.price, priceCurrency: this.priceCurrency, productId: this.productId, productTitle: this.productTitle, productType: this.productType,
          purchaseDate: this.purchaseDate, purchaseId: this.transactionIdentifier};
  }
}

