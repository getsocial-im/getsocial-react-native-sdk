// @flow
import ChatId from './ChatId.js';

/**
 * ChatMessagesQuery object.
 */
export default class ChatMessagesQuery {
  chatId: ChatId;

  // eslint-disable-next-line require-jsdoc
  constructor(chatId: ChatId) {
      this.chatId = chatId;
  }

  /**
     * Get messages in a chat.
     *
     * @param {ChatId}  id Id of chat.
     * @return {ChatMessagesQuery}   new query.
     */
  static messagesInChat(id: ChatId): ChatMessagesQuery {
      return new ChatMessagesQuery(id);
  }
}
