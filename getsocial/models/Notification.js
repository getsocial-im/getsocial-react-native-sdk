// @flow

import Action from './Action.js';
import ActionButton from './ActionButton.js';
import UserReference from './UserReference.js';
import {NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

/**
 * Notification class.
 */
export default class Notification {
  id: string
  status: string
  type: string
  createdAt: number
  title: string
  text: string
  action: Action
  actionButtons: ActionButton[]
  imageUrl: ?string
  videoUrl: ?string
  sender: UserReference

  /**
   * Creates a new Notification instance from the provider parameters.
   * @param {any} notificationMap notification parameters
   */
  constructor(notificationMap: any) {
    this.id = notificationMap['ID'];
    this.status = notificationMap['STATUS'];
    this.type = notificationMap['TYPE'];
    this.createdAt = notificationMap['CREATED_AT'];
    this.title = notificationMap['TITLE'];
    this.text = notificationMap['TEXT'];
    const actionMap = notificationMap['ACTION'];
    if (actionMap != null) {
      this.action = new Action(actionMap);
    }
    this.actionButtons = [];
    const actionButtonsArray = notificationMap['ACTION_BUTTONS'];
    actionButtonsArray.forEach((actionButtonMap) => {
      this.actionButtons.push(new ActionButton(actionButtonMap));
    });

    this.imageUrl = notificationMap['IMAGE_URL'];
    this.videoUrl = notificationMap['VIDEO_URL'];
    const senderMap = notificationMap['SENDER'];
    if (senderMap != null) {
      this.sender = new UserReference(senderMap);
    }
  }

  static Status = {
    READ: RNGetSocial.NOTIFICATION_STATUS_READ,
    UNREAD: RNGetSocial.NOTIFICATION_STATUS_UNREAD,
    CONSUMED: RNGetSocial.NOTIFICATION_STATUS_CONSUMED,
    IGNORED: RNGetSocial.NOTIFICATION_STATUS_IGNORED,
  }

  static Receivers = {
    FRIENDS: RNGetSocial.NOTIFICATION_RECEIVER_FRIENDS,
    REFERRED_USERS: RNGetSocial.NOTIFICATION_RECEIVER_REFERRED_USERS,
    REFERRER: RNGetSocial.NOTIFICATION_RECEIVER_REFERRER,
  }

  static Types = {
    NEW_FRIENDSHIP: RNGetSocial.NOTIFICATION_TYPE_NEW_FRIENDSHIP,
    INVITE_ACCEPTED: RNGetSocial.NOTIFICATION_TYPE_INVITE_ACCEPTED,
    TARGETING: RNGetSocial.NOTIFICATION_TYPE_TARGETING,
    DIRECT: RNGetSocial.NOTIFICATION_TYPE_DIRECT,
    SDK: RNGetSocial.NOTIFICATION_TYPE_SDK,
  }

}
