/* eslint-disable max-len */
/* eslint-disable no-undef */
import RemoveActivitiesQuery from './../../../models/communities/RemoveActivitiesQuery.js';
const {readEncodedObject} = require('./../../utils/TestUtils.test.js');

// Test
const query = RemoveActivitiesQuery.activityIds(['activityid', 'activityid2']);
const json = JSON.stringify(query);
const jsonResult = readEncodedObject('removeactivitiesquery', 'removeactivitiesquery.json');
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
});
