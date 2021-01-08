/* eslint-disable max-len */
// @flow

import ActivitiesQuery from './ActivitiesQuery';
import Action from '../actions/Action.js';
import User from './User.js';
import {GetSocialEventEmitter} from '../../GetSocialEventEmitter.js';
import {NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

/**
 * ActivitiesView object.
 */
export default class ActivitiesView {
    windowTitle: ?string;
    query: ActivitiesQuery;
    onOpenListener: ?(() => void);
    onCloseListener: ?(() => void);
    onActionButtonClickListener: ?((action: Action) => void);
    onAvatarClickListener: ?((user: User) => void);
    onMentionClickListener: ?((mention: string) => void);
    onTagClickListener: ?((tag: string) => void);

    /**
     * Creates ActivitiesView to show activities based on {query} parameter.
     * @param {ActivitiesQuery} query Defines which activities will be shown.
     * @return {ActivitiesView} View instance.
     */
    static create(query: ActivitiesQuery): ActivitiesView {
      const obj = new ActivitiesView();
      obj.query = query;
      return obj;
    }

    /**
     * Shows the view.
     */
    show() {
      const parameters = {
        'windowTitle': (this.windowTitle == undefined ? '' : this.windowTitle),
        'query': this.query.toJSON(),
      };
      if (this.onOpenListener != undefined) {
        GetSocialEventEmitter.removeAllListeners('view_open');
        GetSocialEventEmitter.addListener('view_open', (result) => {
          if (this.onOpenListener != undefined) {
            this.onOpenListener();
          }
        });
      }
      if (this.onCloseListener != undefined) {
        GetSocialEventEmitter.removeAllListeners('view_close');
        GetSocialEventEmitter.addListener('view_close', (result) => {
          if (this.onCloseListener != undefined) {
            this.onCloseListener();
          }
        });
      }
      if (this.onActionButtonClickListener != undefined) {
        GetSocialEventEmitter.removeAllListeners('activityview_action');
        GetSocialEventEmitter.addListener('activityview_action', (result) => {
          if (this.onActionButtonClickListener != undefined) {
            const action = new Action(JSON.parse(result));
            if (action != null && this.onActionButtonClickListener != null) {
              this.onActionButtonClickListener(action);
            }
          }
        });
      }
      if (this.onMentionClickListener != undefined) {
        GetSocialEventEmitter.removeAllListeners('activityview_mentionclick');
        GetSocialEventEmitter.addListener('activityview_mentionclick', (result) => {
          if (this.onMentionClickListener != undefined) {
            this.onMentionClickListener(result);
          }
        });
      }
      if (this.onTagClickListener != undefined) {
        GetSocialEventEmitter.removeAllListeners('activityview_tagclick');
        GetSocialEventEmitter.addListener('activityview_tagclick', (result) => {
          if (this.onTagClickListener != undefined) {
            this.onTagClickListener(result);
          }
        });
      }
      if (this.onAvatarClickListener != undefined) {
        GetSocialEventEmitter.removeAllListeners('activityview_avatarclick');
        GetSocialEventEmitter.addListener('activityview_avatarclick', (result) => {
          const user = new User(JSON.parse(result));
          if (user != null && this.onAvatarClickListener != null) {
            this.onAvatarClickListener(user);
          }
        });
      }
      RNGetSocial.showView('activitiesView', parameters);
    }
}
