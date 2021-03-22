// @flow

/**
 * MemberStatus object.
 */
export default class MemberStatus {
  /** User is not approved yet */
  static ApprovalPending = 0;
  /** User has not accepted the invitation yet */
  static InvitationPending = 1;
  /** Member */
  static Member = 2;

  // eslint-disable-next-line require-jsdoc
  static valueToName(value: number): string {
      switch (value) {
      case 0:
          return 'approval pending';
      case 1:
          return 'invitation pending';
      case 2:
          return 'member';
      }
  }
}
