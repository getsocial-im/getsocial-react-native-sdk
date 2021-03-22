// @flow

/**
 * Role object.
 */
export default class Role {
  static Owner = 0;
  static Admin = 1;
  static Member = 3;
  static Follower = 4;
  static Everyone = 5;

  // eslint-disable-next-line require-jsdoc
  static valueToName(value: number): string {
      switch (value) {
      case 0:
          return 'owner';
      case 1:
          return 'admin';
      case 3:
          return 'member';
      case 4:
          return 'follower';
      case 5:
          return 'everyone';
      }
  }
}
