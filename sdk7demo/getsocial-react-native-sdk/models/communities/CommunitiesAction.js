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
          return 'post';
      case '1':
          return 'react';
      case '2':
          return 'comment';
      }
  }
}
