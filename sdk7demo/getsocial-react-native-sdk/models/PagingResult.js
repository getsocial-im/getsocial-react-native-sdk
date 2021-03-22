/* eslint-disable max-len */

/**
 * PagingResult object.
 */
export default class PagingResult<Entry> {
  entries: [Entry] = [];
  next: ?string

  // eslint-disable-next-line require-jsdoc
  constructor(resultJSON: string, mapper: ((entryMap: Map<string, string>) => any)) {
      const objectResult = JSON.parse(resultJSON);
      this.next = objectResult['next'];
      objectResult['entries'].forEach((element) => {
          this.entries.push(mapper(element));
      });
  }

  /**
   * Check if there are more entries to load.
   * @return {boolean} true, if there are no more entries, otherwise false.
   */
  isLastPage(): boolean {
      return this.next == null || this.next.isEmpty();
  }
}
