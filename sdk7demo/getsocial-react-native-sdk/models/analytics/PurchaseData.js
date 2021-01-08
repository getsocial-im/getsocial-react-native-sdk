// @flow
/**
 * Purchase data object.
 */
export default class PurchaseData {
  productId: String;
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
  toJSON(): string {
    return JSON.stringify({
      'productId': this.productId,
      'productTitle': this.productTitle,
      'productType': this.productType,
      'price': this.price,
      'priceCurrency': this.priceCurrency,
      'purchaseDate': this.purchaseDate,
      'transactionIdentifier': this.transactionIdentifier,
    });
  }
}

