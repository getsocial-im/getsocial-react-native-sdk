// @flow

/**
 * PollStatus object.
 */
export default class PollStatus {
  /** All */
  static All = 0;
  /** Activities with poll */
  static WithPoll = 1;
  /** Current user already voted */
  static VotedByMe = 2;
  /** Current user not voted */
  static NotVotedByMe = 3;
  /** Activities without poll */
  static WithoutPoll = 4;
}
