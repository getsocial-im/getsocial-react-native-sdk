// @flow

/**
 * CommunitiesAction object.
 */
export default class CommunitiesAction {
  static Post: number = 0;
  static React: number = 1;
  static Comment: number = 2;

  // eslint-disable-next-line require-jsdoc
  static valueToName(value: string): string {
      switch (value) {
      case '0':
          return 'Post';
      case '1':
          return 'React';
      case '2':
          return 'Comment';
      }
  }
}
