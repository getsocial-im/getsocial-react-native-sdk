// @flow
import User from './User.js';

/**
 * UserVotes object.
 */
export default class UserVotes {
  user: User
  votes: Array<String> = []

  /**
   * Creates a new UserVotes instance from the provider parameters.
   * @param {any} votesMap reaction parameters
   */
  constructor(votesMap: any) {
      const rawUser = votesMap['user'];
      if (rawUser !== undefined && rawUser != null) {
          this.user = new User(rawUser);
      }
      this.votes = votesMap['votes'];

      Object.freeze(this);
  }
}
