/* eslint-disable max-len */
/* eslint-disable no-undef */
import PurchaseData from './../../../models/analytics/PurchaseData.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

const purchaseData = new PurchaseData();
purchaseData.productId = 'productId';
purchaseData.productTitle = 'productTitle';
purchaseData.productType = 0;
purchaseData.price = 100;
purchaseData.priceCurrency = 'priceCurrency';
purchaseData.purchaseDate = -62135596800;
purchaseData.transactionIdentifier = 'transactionIdentifier';

const jsonResult = readEncodedObject('purchasedata', 'purchasedata.json');
const json = JSON.stringify(purchaseData);
test('purchaseData.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});
