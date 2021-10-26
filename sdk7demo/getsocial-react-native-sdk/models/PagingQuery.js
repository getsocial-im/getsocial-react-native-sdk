/* eslint-disable max-len */

/**
 * PagingQuery object.
 */
export default class PagingQuery<Query> {
  static DefaultLimit = 20;

  query: ?Query

  limit: number = PagingQuery.DefaultLimit;
  next: ?string

  // eslint-disable-next-line require-jsdoc
  constructor(query: Query) {
      this.query = query;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {limit: this.limit, next: this.next, query: this.query};
  }
}
