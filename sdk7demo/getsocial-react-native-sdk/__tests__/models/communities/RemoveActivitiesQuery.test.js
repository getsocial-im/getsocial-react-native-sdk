/* eslint-disable max-len */
/* eslint-disable no-undef */
import RemoveActivitiesQuery from './../../../models/communities/RemoveActivitiesQuery.js';
const {saveResult} = require('./../../utils/TestUtils.test.js');

// Test
const query = RemoveActivitiesQuery.activityIds(['activityid', 'activityid2']);
const json = JSON.stringify(query);
const jsonResult = '{"ids":["activityid","activityid2"]}';
test('query.toJSON() result shall be', () => {
    expect(json).toBe(jsonResult);
    saveResult('removeactivitiesquery', 'removeactivitiesquery.json', json);
});
