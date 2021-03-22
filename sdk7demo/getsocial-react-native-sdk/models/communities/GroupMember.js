// @flow

import User from './User.js';
import Membership from './Membership.js';

/**
 * GroupMember object.
 */
export default class GroupMember extends User {
  membership: Membership;

  /**
   * Creates a new GroupMember instance from the provider parameters.
   * @param {any} memberMap suggested friend parameters
   */
  constructor(memberMap: any) {
      super(memberMap);
      this.membership = new Membership(memberMap['membership']);
      Object.freeze(this);
  }
}
