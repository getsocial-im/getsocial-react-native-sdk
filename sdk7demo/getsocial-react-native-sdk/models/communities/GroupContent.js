/* eslint-disable max-len */
// @flow

import MediaAttachment from './../MediaAttachment.js';
import CommunitiesAction from './CommunitiesAction.js';

/**
 * GroupContent object.
 */
export default class GroupContent {
  id: string;
  title: string;
  description: ?string;
  properties: {[key: string] : string} = {};
  isPrivate: boolean;
  isDiscoverable: boolean;
  avatar: ?MediaAttachment;
  permissions: Map<number, number> = new Map();

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      const convertedPermissions = new Map();
      for (const key in this.permissions) {
          if (Object.prototype.hasOwnProperty.call(this.permissions, key)) {
              convertedPermissions[CommunitiesAction.valueToName(key)] = this.permissions[key];
          }
      }
      return {id: this.id, title: this.title, description: this.description, properties: this.properties, isPrivate: this.isPrivate,
          isDiscoverable: this.isDiscoverable, permissions: convertedPermissions, avatar: this.avatar};
  }
}
