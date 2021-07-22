/* eslint-disable max-len */
// @flow

import InviteContent from './InviteContent.js';
import {GetSocialEventEmitter} from '../../GetSocialEventEmitter.js';
import {NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

/**
  Invites view.
 */
export default class InvitesView {
  windowTitle: ?string;
  customInviteContent: ?InviteContent;
  onOpenListener: ?(() => void);
  onCloseListener: ?(() => void);
  onInviteSentListener: ?((channelId: string) => void);
  onInviteCancelledListener: ?((channelId: string) => void);
  onInviteErrorListener: ?((channelId: string, error: string) => void);

  /**
   * Shows the invites view.
   * @return {void} void.
   */
  show(): void {
      const parameters = {windowTitle: (this.windowTitle == null ? null : this.windowTitle), inviteContent: (this.customInviteContent == null ? null : JSON.stringify(this.customInviteContent))};
      GetSocialEventEmitter.removeAllListeners('view_open');
      GetSocialEventEmitter.addListener('view_open', (result) => {
          if (this.onOpenListener != undefined) {
              this.onOpenListener();
          }
      });
      GetSocialEventEmitter.removeAllListeners('view_close');
      GetSocialEventEmitter.addListener('view_close', (result) => {
          if (this.onCloseListener != undefined) {
              this.onCloseListener();
          }
      });
      GetSocialEventEmitter.removeAllListeners('inviteview_invitesent');
      GetSocialEventEmitter.addListener('inviteview_invitesent', (result) => {
          if (this.onInviteSentListener != undefined) {
              this.onInviteSentListener(result['channelId']);
          }
      });
      GetSocialEventEmitter.removeAllListeners('inviteview_invitecancelled');
      GetSocialEventEmitter.addListener('inviteview_invitecancelled', (result) => {
          if (this.onInviteCancelledListener != undefined) {
              this.onInviteCancelledListener(result['channelId']);
          }
      });
      GetSocialEventEmitter.removeAllListeners('inviteview_inviteerror');
      GetSocialEventEmitter.addListener('inviteview_inviteerror', (result) => {
          if (this.onInviteErrorListener != undefined) {
              this.onInviteErrorListener(result['channelId'], result['error']);
          }
      });
      RNGetSocial.showView('invitesView', parameters);
  }
}
