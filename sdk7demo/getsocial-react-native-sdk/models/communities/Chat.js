// @flow
import ChatMessage from './ChatMessage.js';
import User from './User.js';

/**
 * Chat object.
 */
export default class Chat {
  id: string;
  title: string;
  avatarUrl: number;
  createdAt: number;
  updatedAt: number;
  membersCount: number;
  lastMessage: ?ChatMessage;
  otherMember: ?User;

  /**
   * Creates a new Chat instance from the provider parameters.
   * @param {any} chatMap chat parameters
   */
  constructor(chatMap: any) {
      this.id = chatMap['id'];
      this.title = chatMap['title'];
      this.avatarUrl = chatMap['avatarUrl'];
      this.createdAt = chatMap['createdAt'];
      this.updatedAt = chatMap['updatedAt'];
      this.membersCount = chatMap['membersCount'];
      const rawLastMessage = chatMap['lastMessage'];
      if (rawLastMessage !== undefined && rawLastMessage != null) {
          const lastMessage = new ChatMessage(rawLastMessage);
          this.lastMessage = lastMessage;
      }
      const rawOtherMember = chatMap['otherMember'];
      if (rawOtherMember !== undefined && rawOtherMember != null) {
          const otherMember = new User(rawOtherMember);
          this.otherMember = otherMember;
      }
      Object.freeze(this);
  }
}
