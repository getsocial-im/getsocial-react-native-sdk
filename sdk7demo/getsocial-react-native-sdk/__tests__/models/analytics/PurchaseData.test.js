/* eslint-disable max-len */
/* eslint-disable no-undef */
import PurchaseData from './../../../models/analytics/PurchaseData.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

const purchaseData = new PurchaseData();
purchaseData.productId = 'productId';
purchaseData.productTitle = 'productTitle';
purchaseData.productType = 0;
purchaseData.price = 1;
purchaseData.priceCurrency = 'priceCurrency';
purchaseData.purchaseDate = 2;
purchaseData.transactionIdentifier = 'transactionIdentifier';

const jsonResult = '{"productId":"productId","productTitle":"productTitle","productType":0,"price":1,"priceCurrency":"priceCurrency","purchaseDate":2,"purchaseId":"transactionIdentifier"}';
const json = JSON.stringify(purchaseData);
test('purchaseData.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('purchasedata', 'purchase_data.json', json);
});
