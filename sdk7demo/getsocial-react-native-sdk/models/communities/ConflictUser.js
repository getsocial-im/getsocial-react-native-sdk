/* eslint-disable max-len */
// @flow

import User from './User.js';

/**
 * When trying to add an identity and conflict in identities happens a ConflictUser instance is returned
 * to check the details of the conflict user to see which user you want to proceed with.
 */
export default class ConflictUser extends User {
    /**
   * Creates a new ConflictUser instance from the provider parameters.
   * @param {any} conflictUserMap conflict user parameters
   */
    constructor(conflictUserMap: any) {
        super(conflictUserMap);
    }
}
