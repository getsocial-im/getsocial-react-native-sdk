/* eslint-disable max-len */
// @flow
/**
 * Action class.
 */
export default class Action {
  type: string;
  data: {[key: string] : string} = {};

  /**
   * Creates a new Action instance from the provider parameters.
   * @param {any} actionMap notification parameters
   */
  constructor(actionMap: any) {
      this.type = actionMap['type'];
      this.data = actionMap['data'];
  }

  /**
   * Create an action instance..
   *
   * @param {string} type type of action.
   * @param {Map<string, string>} data Custom data.
   * @return {Action} new instance.
   */
  static create(type: string, data: Map<string, string>): Action {
      return new Action({'type': type, 'data': data});
  }
}
