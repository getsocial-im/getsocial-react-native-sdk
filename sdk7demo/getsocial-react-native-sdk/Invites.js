/* eslint-disable max-len */
// @flow
import JSONBridge from './utils/JSONBridge.js';
import InviteChannel from './models/invites/InviteChannel.js';
import Invite from './models/invites/Invite.js';
import InviteContent from './models/invites/InviteContent.js';
import ReferralData from './models/invites/ReferralData.js';
import ReferralUser from './models/invites/ReferralUser.js';
import ReferralUsersQuery from './models/invites/ReferralUsersQuery.js';
import PagingQuery from './models/PagingQuery.js';
import PagingResult from './models/PagingResult.js';
import UserId from './models/UserId.js';

/**
 * Invites interface of GetSocial plugin.
 */
export default class Invites {
    /**
     * Get the list of available invite channels. Contains only channels enabled on the Dashboard and available on the device.
     *
     * @return {[InviteChannel]} called with a list of available invite channels.
     */
    static getAvailableChannels(): Promise<[InviteChannel]> {
        return JSONBridge.getAvailableChannels();
    }

    /**
     * Creates a Smart Link with user referral data attached used for Smart Invites.
     *
     * @param {Map<string, string>} linkParams Link customization parameters. More info @see <a href="https://docs.getsocial.im/guides/smart-links/parameters/">here</a>
     * @return {Promise<string>} Smart invite url.
     */
    static createURL(linkParams: ?Map<string, string>): Promise<string> {
        return JSONBridge.createURL(linkParams);
    }

    /**
     * Invite friends via a specified invite channel.
     *
     * @param {InviteContent} inviteContent Custom content to override the default content provided from the Dashboard.
     * @param {string} channelId The channel through which the invite will be sent, one of the constants defined in {@link InviteChannelIds}.
     * @param {function()} onComplete called when an invite was sent.
     * @param {function()} onCancel called when an invite sending was canceled.
     * @param {function(string)} onError called when an error occured during sending an invite.
     * @return {void} Method simply returns after invoking, check the callbacks for result.
     */
    static send(inviteContent: ?InviteContent, channelId: string,
        onComplete: (() => void), onCancel: (() => void), onError: (error: string) => void): void {
        return JSONBridge.sendInvite(inviteContent, channelId, onComplete, onCancel, onError);
    }

    /**
     * Invite friends via a specified invite channel.
     *
     * @param {InviteContent} inviteContent Custom content to override the default content provided from the Dashboard.
     * @return {void} Method simply returns after invoking, check the callbacks for result.
     */
    static create(inviteContent: ?InviteContent): Promise<Invite> {
        return JSONBridge.createInvite(inviteContent);
    }

    /**
     * Set listener to receive referral data if there is any.
     *
     * @param {function} onReferralDataReceived to be called with a new referral data.
     */
    static setOnReferralDataReceivedListener(onReferralDataReceived: (referralData: ReferralData) => void) {
        JSONBridge.setOnReferralDataReceivedListener(onReferralDataReceived);
    }

    /**
     * Returns list of users who were referred by this user for a specific event.
     *
     * @param {PagingQuery<ReferralUsersQuery>} query Users query.
     * @return {PagingResult<ReferralUser>} Called with list of referred users. If there is no referred user, the list is empty.
     */
    static getReferredUsers(query: PagingQuery<ReferralUsersQuery>) : Promise<PagingResult<ReferralUser>> {
        return JSONBridge.getReferredUsers(query);
    }

    /**
     * Returns list of users who are referrers for this user for a specific event.
     *
     * @param {PagingQuery<ReferralUsersQuery>} query Users query.
     * @return {PagingResult<ReferralUser>} Called with list of referred users. If there is no referred user, the list is empty.
     */
    static getReferrerUsers(query: PagingQuery<ReferralUsersQuery>) : Promise<PagingResult<ReferralUser>> {
        return JSONBridge.getReferrerUsers(query);
    }

    /**
     * Sets referrer id for current user.
     *
     * @param {UserId} userId Id of referrer user.
     * @param {string} event Referrer event.
     * @param {Map<string, string>} eventData Custom key-value pairs.
     * @return {void}   Called when the referrer setting is finished.
     */
    static setReferrer(userId: UserId, event: string, eventData: Map<string, string>) : Promise<void> {
        return JSONBridge.setReferrer(userId, event, eventData);
    }
}
