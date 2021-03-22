/* eslint-disable max-len */
import ChatMessage from './ChatMessage.js';

/**
 * ChatMessagesPagingResult object.
 */
export default class ChatMessagesPagingResult {
  entries: [ChatMessage] = [];
  next: ?string
  previous: ?string
  refreshCursor: ?string

  /**
    * Creates a new ChatMessagesPagingResult instance from the provider parameters.
    * @param {any} resultMap result parameters
    */
  constructor(resultMap: any) {
      this.next = resultMap['next'];
      this.previous = resultMap['previous'];
      this.refreshCursor = resultMap['refreshCursor'];
      const rawEntries = resultMap['entries'];
      if (rawEntries !== undefined && rawEntries != null) {
          rawEntries.forEach((rawEntry) => {
              const entry = new ChatMessage(rawEntry);
              this.entries.push(entry);
          });
      }
      Object.freeze(this);
  }
}
