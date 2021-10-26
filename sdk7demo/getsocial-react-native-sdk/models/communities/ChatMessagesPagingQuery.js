/* eslint-disable max-len */
import ChatMessagesQuery from './ChatMessagesQuery.js';

/**
 * ChatMessagesPagingQuery object.
 */
export default class ChatMessagesPagingQuery {
  static DefaultLimit = 50;

  query: ChatMessagesQuery

  limit: number = ChatMessagesPagingQuery.DefaultLimit;
  next: ?string
  previous: ?string

  // eslint-disable-next-line require-jsdoc
  constructor(query: ChatMessagesQuery) {
      this.query = query;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {limit: this.limit, nextMessages: this.next ?? null, previousMessages: this.previous ?? null, query: this.query};
  }
}
