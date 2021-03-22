// @flow

/**
 * Describes as Invite channel and it's default invite content.
 */
export default class InviteChannel {
  /** Id of provider. */
  channelId: string;
  /** Name of provider. */
  name: string;
  /** Url of provider's icon. */
  iconUrl: string;
  /** Display order of provider. */
  displayOrder: number;

  /**
   * Creates a new InviteChannel instance from the provider parameters.
   * @param {any} channelObject invite channel parameters
   */
  constructor(channelObject: any) {
      this.channelId = channelObject['id'];
      this.name = channelObject['name'];
      this.iconUrl = channelObject['iconImageUrl'];
      this.displayOrder = channelObject['displayOrder'];
      Object.freeze(this);
  }
}
