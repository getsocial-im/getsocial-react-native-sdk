// @flow
import User from './User.js';

/**
 * UserReactions object.
 */
export default class UserReactions {
  user: User
  reactions: Array<String> = []

  /**
   * Creates a new UserReactions instance from the provider parameters.
   * @param {any} reactionsMap reaction parameters
   */
  constructor(reactionsMap: any) {
      const rawUser = reactionsMap['user'];
      if (rawUser !== undefined && rawUser != null) {
          this.user = new User(rawUser);
      }
      this.reactions = reactionsMap['reactions'];

      Object.freeze(this);
  }
}
