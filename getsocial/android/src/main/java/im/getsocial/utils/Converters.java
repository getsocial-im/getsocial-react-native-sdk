package im.getsocial.utils;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import im.getsocial.sdk.invites.ReferralData;
import im.getsocial.sdk.invites.ReferredUser;
import im.getsocial.sdk.usermanagement.PublicUser;

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

	public static WritableMap convertReferredUser(final ReferredUser referredUser) {
		WritableMap writableMap = convertPublicUser(referredUser);
		writableMap.putDouble("INSTALLATION_DATE", referredUser.getInstallationDate());
		writableMap.putString("INSTALLATION_CHANNEL", referredUser.getInstallationChannel());
		writableMap.putString("INSTALL_PLATFORM", referredUser.getInstallPlatform());
		writableMap.putBoolean("IS_REINSTALL", referredUser.isReinstall());
		writableMap.putBoolean("IS_INSTALL_SUSPICIOUS", referredUser.isInstallSuspicious());
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

	public static WritableMap convertMap(Map<String, String> sourceMap) {
		WritableMap writableMap = new WritableNativeMap();
		for (String key : sourceMap.keySet()) {
			String value = sourceMap.get(key);
			writableMap.putString(key, value);
		}
		return writableMap;
	}

}
