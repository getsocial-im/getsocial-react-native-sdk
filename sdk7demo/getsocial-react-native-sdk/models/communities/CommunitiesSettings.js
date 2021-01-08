/* eslint-disable max-len */
// @flow
/**
 * CommunitiesSettings object.
 */
export default class CommunitiesSettings {
    allowedActions: {[key: string] : string} = {};
    properties: {[key: string] : string} = {};

    /**
    * Check if current user is allowed to perform a certain action.
    *
    * @param {number} action action to be checked.
    * @return {boolean} true, if current user is allowed to perform action, false otherwise.
    */
    isActionAllowed(action: number): boolean {
      const isAllowed = this.allowedActions['' + action];
      return isAllowed === true;
    }

    // eslint-disable-next-line require-jsdoc
    constructor(settingsMap: any) {
      this.allowedActions = settingsMap['allowedActions'];
      this.properties = settingsMap['properties'];
      Object.freeze(this);
    }
}
