// @flow

/**
 * Describes as Invite channel and it's default invite content.
 */
export default class InviteChannel {
  /** Id of provider. */
  channelId: string
  /** Name of provider. */
  name: string
  /** Url of provider's icon. */
  iconUrl: string
  /** Status of provider. */
  isEnabled: string
  /** Display order of provider. */
  displayOrder: number

  /**
   * Creates a new InviteChannel instance from the provider parameters.
   * @param {any} inviteChannelMap invite channel parameters
   */
  constructor(inviteChannelMap: any) {
    this.channelId = inviteChannelMap['ID'];
    this.name = inviteChannelMap['NAME'];
    this.iconUrl = inviteChannelMap['ICON_URL'];
    this.displayOrder = inviteChannelMap['DISPLAY_ORDER'];
  }
}

