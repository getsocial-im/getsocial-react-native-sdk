/* eslint-disable require-jsdoc */
// @flow
import CommunitiesEntityType from './CommunitiesEntityType.js';
import UserId from './../UserId.js';
import UserIdList from './../UserIdList.js';

export default class CommunitiesIds {
  ids: Array<string>
  type: ?number

  constructor(type: number, ids: string[]) {
    this.ids = ids;
    if (type != -1) {
      this.type = type;
    }
  }

  static topic(id: string): CommunitiesIds {
    return new CommunitiesIds(CommunitiesEntityType.Topic, [id]);
  }

  static topics(ids: string[]): CommunitiesIds {
    return new CommunitiesIds(CommunitiesEntityType.Topic, ids);
  }

  static user(id: UserId): CommunitiesIds {
    return new CommunitiesIds(CommunitiesEntityType.User, [id.toString()]);
  }

  static users(ids: UserIdList): CommunitiesIds {
    return new CommunitiesIds(CommunitiesEntityType.User, ids.toString());
  }

  static activity(id: string): CommunitiesIds {
    return new CommunitiesIds(CommunitiesEntityType.Activity, [id]);
  }

  static timeline(): CommunitiesIds {
    return new CommunitiesIds(CommunitiesEntityType.App, ['timeline']);
  }

  static everywhere(): CommunitiesIds {
    return new CommunitiesIds(-1, []);
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON(): string {
    let idsStr = '[';
    this.ids.forEach((element) => {
      idsStr += ('"' + element + '",');
    });
    if (idsStr.length > 1) {
      idsStr = idsStr.substring(0, idsStr.length - 1);
    }
    idsStr += ']';
    return '{' +
      '"ids": ' + idsStr + ',' +
      '"type": ' + ( this.type == undefined ? 'null' : this.type) +
    '}';
  }
}
