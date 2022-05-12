/* eslint-disable max-len */
// @flow
import PagingResult from '../PagingResult';
import Topic from './Topic';
import Group from './Group';
import User from './User';
import Activity from './Activity';
import Label from './Label';
import Tag from './Tag';

/**
 * SearchResult object.
 */
export default class SearchResult {
  topics: ?PagingResult<Topic[]>;
  groups: ?PagingResult<Group[]>;
  users: ?PagingResult<User[]>;
  activities: ?PagingResult<Activity[]>;
  labels: ?PagingResult<Label[]>;
  tags: ?PagingResult<Tag[]>;

  // eslint-disable-next-line require-jsdoc
  constructor(resultMap: Object) {
      this.topics = resultMap.topics;
      this.groups = resultMap.groups;
      this.users = resultMap.users;
      this.activities = resultMap.activities;
      this.labels = resultMap.labels;
      this.tags = resultMap.tags;

      Object.freeze(this);
  }
}
