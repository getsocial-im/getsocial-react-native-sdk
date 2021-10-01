/* eslint-disable max-len */
// @flow

import JSONBridge from './utils/JSONBridge.js';
import Action from './models/actions/Action.js';
import Identity from './models/communities/Identity.js';
import CurrentUser from './CurrentUser.js';

/**
 * Main interface of GetSocial plugin.
 */
export default class GetSocial {
    // Core section

    /**
     * Initializes the SDK, App Id will be taken from .plist or .gradle files.
     * Use whenInitialized method to get notified when initialization finished.
     */
    static init() {
        JSONBridge.init();
    }

    /**
     * Initializes the SDK.
     * Use whenInitialized event with GetSocialEventEmitter to get notified when initialization finished.
     * @param {string} appid, as it is on GetSocial Dashboard.
     */
    static initWithAppId(appid: string) {
        JSONBridge.initWithAppId(appid);
    }

    /**
     * Initialize the SDK with a specific user. SDK must be uninitialized.
     * @param {Identity} identity Identity to initialize the SDK with.
     * @return {void} true, if initialized, otherwise false.
     */
    static initWithIdentity(identity: Identity): Promise<void> {
        return JSONBridge.initWithIdentity(identity);
    }

    /**
     * Notifies callers when SDK finished initialization.
     * @param {function} onInit function to be invoked.
     */
    static addOnInitializedListener(onInit: () => void) {
        JSONBridge.addOnInitializedListener(onInit);
    }

    /**
     * Returns if SDK is initialized or not.
     * @return {boolean} true, if initialized, otherwise false.
     */
    static isInitialized(): Promise<boolean> {
        return JSONBridge.isInitialized();
    }
    /**
     * Returns current language of GetSocial plugin.
     * @return {Promise<string>} currently used language.
     */
    static getLanguage(): Promise<string> {
        return JSONBridge.getLanguage();
    }

    /**
     * Sets the language of GetSocial plugin.
     * If provided value is incorrect, sets the default language.
     * @param {string} language
     * @return {Promise<void>}
     */
    static setLanguage(language: string): Promise<void> {
        return JSONBridge.setLanguage(language);
    }

    /**
     * Returns if current device is added to list of test devices.
     *
     * @return {boolean} true if is test device.
     */
    static isTestDevice(): Promise<boolean> {
        return JSONBridge.isTestDevice();
    }

    /**
     * Return IDFA.
     *
     * @return {string} device advertising ID if available.
     */
    static getDeviceIdentifier(): Promise<string> {
        return JSONBridge.getDeviceIdentifier();
    }

    /**
     * Returns version of native GetSocial Framework.
     * @return {Promise<string>} : version as string.
     */
    static getSdkVersion(): Promise<string> {
        return JSONBridge.getSdkVersion();
    }

    /**
     * Current user.
     *
     * @return {CurrentUser} current user or null if SDK is not initialized.
     */
    static getCurrentUser(): Promise<CurrentUser> {
        return JSONBridge.getCurrentUser();
    }

    /**
     * Add listener to be notified when the user was changed.
     * The listener action is executed on the main thread, so be careful with operations,
     * that you put inside.
     * Listener will be invoked when:
     * - SDK initialization is finished;
     * - {@link GetSocial#switchUser} method was called and user was successfully changed.
     *
     * @param {function} listener Listener to be notified.
     */
    static addOnCurrentUserChangedListener(listener: (newUser: CurrentUser) => void) {
        JSONBridge.addOnCurrentUserChangedListener(listener);
    }

    // Action handling

    /**
     * Handle action with default GetSocial behaviour.
     * @param {Action} action action to be processed.
     */
    static handleAction(action: Action): void {
        JSONBridge.handleAction(action);
    }

    /**
     * Reset current user and create a new anonymous one.
     *
     * @return {void} Called if successfully reset user.
     */
    static resetUser(): Promise<void> {
        return JSONBridge.resetUser();
    }

    /**
     * Reset current user and without creating a new user.
     * SDK will be uninitialized.
     *
     * @return {void} Called if successfully reset.
     */
    static reset(): Promise<void> {
        return JSONBridge.reset();
    }

    /**
     * Switches the current user with the {@link User} corresponding to the details provided.
     *
     * @param {Identity} identity Identity to be switched to.
     * @return {void} A callback to indicate if this operation was successful.
     */
    static switchUser(identity: Identity): Promise<void> {
        return JSONBridge.switchUser(identity);
    }
}
