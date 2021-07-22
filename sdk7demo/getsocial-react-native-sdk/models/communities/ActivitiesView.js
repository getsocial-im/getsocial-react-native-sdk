/* eslint-disable max-len */
// @flow

import ActivitiesQuery from './ActivitiesQuery';
import Action from '../actions/Action.js';
import User from './User.js';
import GetSocial from '../../GetSocial.js';
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
        const parameters = {windowTitle: (this.windowTitle == null ? null : this.windowTitle), query: JSON.stringify(this.query)};
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
        GetSocialEventEmitter.removeAllListeners('activityview_action');
        GetSocialEventEmitter.addListener('activityview_action', (result) => {
            const action = new Action(JSON.parse(result));
            if (this.onActionButtonClickListener != undefined) {
                if (action != null && this.onActionButtonClickListener != null) {
                    this.onActionButtonClickListener(action);
                }
            } else {
                GetSocial.handleAction(action);
            }
        });
        GetSocialEventEmitter.removeAllListeners('activityview_mentionclick');
        GetSocialEventEmitter.addListener('activityview_mentionclick', (result) => {
            if (this.onMentionClickListener != undefined) {
                this.onMentionClickListener(result);
            }
        });
        GetSocialEventEmitter.removeAllListeners('activityview_tagclick');
        GetSocialEventEmitter.addListener('activityview_tagclick', (result) => {
            if (this.onTagClickListener != undefined) {
                this.onTagClickListener(result);
            }
        });
        GetSocialEventEmitter.removeAllListeners('activityview_avatarclick');
        GetSocialEventEmitter.addListener('activityview_avatarclick', (result) => {
            const user = new User(JSON.parse(result));
            if (user != null && this.onAvatarClickListener != null) {
                this.onAvatarClickListener(user);
            }
        });
        RNGetSocial.showView('activitiesView', parameters);
    }
}
