// @flow

/**
 * Invite object.
 */
export default class Invite {
  text: ?string;
  subject: ?string;
  userName: ?string;
  imageURL: ?string;
  imageBase64: ?string;
  gifURL: ?string;
  videoURL: ?string;
  referralURL: ?string;
  linkParams: {[key: string] : string} = {};

  /**
   * Creates a new Invite instance from the provider parameters.
   * @param {any} inviteMap invite channel parameters
   */
  constructor(inviteMap: any) {
      this.text = inviteMap['text'];
      this.subject = inviteMap['subject'];
      this.userName = inviteMap['userName'];
      this.imageURL = inviteMap['imageUrl'];
      this.imageBase64 = inviteMap['imageBase64'];
      this.gifURL = inviteMap['gifUrl'];
      this.videoURL = inviteMap['videoUrl'];
      this.referralURL = inviteMap['referralUrl'];
      this.linkParams = inviteMap['linkParams'];
  }
}
