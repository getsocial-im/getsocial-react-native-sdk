/* eslint-disable max-len */
// @flow

import JSONBridge from './utils/JSONBridge';

// import {NativeModules} from 'react-native';
// import InvitesView from './models/InvitesView.js';
// import NotificationCenterView from './models/NotificationCenterView.js';
// const {RNGetSocial} = NativeModules;

/**
 * GetSocial UI class.
 */
export default class GetSocialUI {
    // UI section

    /**
     * Close the GetSocial View.
     * @param {boolean} saveViewState, true if the state of GetSocial view needs to be restored later by calling restoreView.
     */
    static closeView(saveViewState: boolean) {
        JSONBridge.closeView(saveViewState);
    }

    /**
     * Displays GetSocial view, which was hidden using closeView.
     */
    static restoreView() {
        JSONBridge.restoreView();
    }

    // // UI configuration section

    /**
     * Loads default UI configuration.
     * @return {Promise<void>} called when configuration was changed.
     */
    static loadDefaultConfiguration(): Promise<void> {
        return JSONBridge.loadDefaultConfiguration();
    }

    /**
     * Loads custom UI configuration.
     * @param {string} path to custom UI configuration, like 'getsocial-custom/ui-config.json'.
     * @return {Promise<void>} called when configuration was changed.
     */
    static loadConfiguration(path: string): Promise<void> {
        return JSONBridge.loadConfiguration(path);
    }
}
