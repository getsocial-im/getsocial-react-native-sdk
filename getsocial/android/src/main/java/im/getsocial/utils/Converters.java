package im.getsocial.utils;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import im.getsocial.sdk.invites.InviteChannel;
import im.getsocial.sdk.invites.ReferralData;
import im.getsocial.sdk.invites.ReferredUser;
import im.getsocial.sdk.socialgraph.SuggestedFriend;
import im.getsocial.sdk.usermanagement.ConflictUser;
import im.getsocial.sdk.usermanagement.PublicUser;
import im.getsocial.sdk.usermanagement.UserReference;

import java.util.List;
import java.util.Map;

public class Converters {

	public static ReadableMap convertReferralData(final ReferralData referralData) {
		WritableMap writableMap = new WritableNativeMap();
		writableMap.putString("TOKEN", referralData.getToken());
		if (referralData.getReferrerUserId() != null) {
			writableMap.putString("REFERRER_USER_ID", referralData.getReferrerUserId());
		} else {
			writableMap.putNull("REFERRER_USER_ID");
		}
		if (referralData.getReferrerChannelId() != null) {
			writableMap.putString("REFERRER_CHANNEL_ID", referralData.getReferrerChannelId());
		} else {
			writableMap.putNull("REFERRER_CHANNEL_ID");
		}
		writableMap.putBoolean("IS_FIRST_MATCH", referralData.isFirstMatch());
		writableMap.putBoolean("IS_GUARANTEED_MATCH", referralData.isGuaranteedMatch());
		writableMap.putBoolean("IS_REINSTALL", referralData.isReinstall());
		writableMap.putBoolean("IS_FIRST_MATCH_LINK", referralData.isFirstMatchLink());
		writableMap.putMap("REFERRAL_LINK_PARAMS", convertMap(referralData.getReferralLinkParams()));
		writableMap.putMap("ORIGINAL_REFERRAL_LINK_PARAMS", convertMap(referralData.getOriginalReferralLinkParams()));
		return writableMap;
	}

	public static WritableArray convertReferredUsers(final List<ReferredUser> referredUsers) {
		WritableArray writableArray = new WritableNativeArray();
		for (ReferredUser referredUser : referredUsers) {
			writableArray.pushMap(convertReferredUser(referredUser));
		}
		return writableArray;
	}

	public static WritableArray convertPublicUsers(final List<PublicUser> publicUsers) {
		WritableArray writableArray = new WritableNativeArray();
		for (PublicUser publicUser : publicUsers) {
			writableArray.pushMap(convertPublicUser(publicUser));
		}
		return writableArray;
	}

	public static WritableArray convertUserReferences(final List<UserReference> userReferences) {
		WritableArray writableArray = new WritableNativeArray();
		for (UserReference userReference : userReferences) {
			writableArray.pushMap(convertUserReference(userReference));
		}
		return writableArray;
	}


	public static WritableMap convertPublicUsersMap(final Map<String, PublicUser> publicUsersMap) {
		WritableMap writableMap = new WritableNativeMap();
		for (Map.Entry<String, PublicUser> publicUserEntry : publicUsersMap.entrySet()) {
			writableMap.putMap(publicUserEntry.getKey(), convertPublicUser(publicUserEntry.getValue()));
		}
		return writableMap;
	}

	public static WritableArray convertSuggestedFriends(final List<SuggestedFriend> suggestedFriends) {
		WritableArray writableArray = new WritableNativeArray();
		for (SuggestedFriend suggestedFriend : suggestedFriends) {
			writableArray.pushMap(convertSuggestedFriend(suggestedFriend));
		}
		return writableArray;
	}

	public static WritableMap convertAuthIdentities(final Map<String, String> identities) {
		WritableMap writableMap = new WritableNativeMap();
		for(Map.Entry<String, String> entry : identities.entrySet()) {
			writableMap.putString(entry.getKey(), entry.getValue());
		}
		return writableMap;
	}

	public static WritableArray convertInviteChannels(final List<InviteChannel> inviteChannels) {
		WritableArray writableArray = new WritableNativeArray();
		for (InviteChannel inviteChannel : inviteChannels) {
			writableArray.pushMap(convertInviteChannel(inviteChannel));
		}
		return writableArray;
	}

	private static WritableMap convertInviteChannel(final InviteChannel inviteChannel) {
		WritableMap writableMap = new WritableNativeMap();
		writableMap.putString("ID", inviteChannel.getChannelId());
		writableMap.putString("NAME", inviteChannel.getChannelName());
		writableMap.putString("ICON_IMAGE_URL", inviteChannel.getIconImageUrl());
		writableMap.putInt("DISPLAY_ORDER", inviteChannel.getDisplayOrder());
		writableMap.putBoolean("IS_ENABLED", inviteChannel.isEnabled());
		return writableMap;
	}

	private static WritableMap convertSuggestedFriend(final SuggestedFriend suggestedFriend) {
		WritableMap writableMap = convertPublicUser(suggestedFriend);
		writableMap.putDouble("MUTUAL_FRIENDS_COUNT", suggestedFriend.getMutualFriendsCount());
		return writableMap;
	}

	private static WritableMap convertReferredUser(final ReferredUser referredUser) {
		WritableMap writableMap = convertPublicUser(referredUser);
		writableMap.putDouble("INSTALLATION_DATE", referredUser.getInstallationDate());
		writableMap.putString("INSTALLATION_CHANNEL", referredUser.getInstallationChannel());
		writableMap.putString("INSTALL_PLATFORM", referredUser.getInstallPlatform());
		writableMap.putBoolean("IS_REINSTALL", referredUser.isReinstall());
		writableMap.putBoolean("IS_INSTALL_SUSPICIOUS", referredUser.isInstallSuspicious());
		return writableMap;
	}

	public static WritableMap convertUserReference(final UserReference userReference) {
		WritableMap writableMap = new WritableNativeMap();
		writableMap.putString("USER_ID", userReference.getId());
		writableMap.putString("DISPLAY_NAME", userReference.getDisplayName());
		if (userReference.getAvatarUrl() != null) {
			writableMap.putString("AVATAR_URL", userReference.getAvatarUrl());
		} else {
			writableMap.putNull("AVATAR_URL");
		}
		return writableMap;
	}

	public static WritableMap convertPublicUser(final PublicUser publicUser) {
		WritableMap writableMap = new WritableNativeMap();
		writableMap.putString("USER_ID", publicUser.getId());
		writableMap.putString("DISPLAY_NAME", publicUser.getDisplayName());
		if (publicUser.getAvatarUrl() != null) {
			writableMap.putString("AVATAR_URL", publicUser.getAvatarUrl());
		} else {
			writableMap.putNull("AVATAR_URL");
		}
		writableMap.putMap("IDENTITIES", convertMap(publicUser.getAuthIdentities()));
		writableMap.putMap("PUBLIC_PROPERTIES", convertMap(publicUser.getAllPublicProperties()));
		return writableMap;
	}

	public static WritableMap convertConflictUser(final ConflictUser conflictUser) {
		return convertPublicUser(conflictUser);
	}

	private static WritableMap convertMap(Map<String, String> sourceMap) {
		WritableMap writableMap = new WritableNativeMap();
		for (Map.Entry<String, String> entry : sourceMap.entrySet()) {
			writableMap.putString(entry.getKey(), entry.getValue());
		}
		return writableMap;
	}

}
