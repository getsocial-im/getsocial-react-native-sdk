package im.getsocial.rn;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactMethod;

import im.getsocial.sdk.Callback;
import im.getsocial.sdk.CompletionCallback;
import im.getsocial.sdk.GetSocial;
import im.getsocial.sdk.GlobalErrorListener;
import im.getsocial.sdk.invites.InviteCallback;
import im.getsocial.sdk.invites.InviteChannel;
import im.getsocial.sdk.invites.ReferredUser;
import im.getsocial.sdk.socialgraph.SuggestedFriend;
import im.getsocial.sdk.ui.GetSocialUi;
import im.getsocial.sdk.usermanagement.AddAuthIdentityCallback;
import im.getsocial.sdk.usermanagement.AuthIdentity;
import im.getsocial.sdk.usermanagement.ConflictUser;
import im.getsocial.sdk.usermanagement.OnUserChangedListener;
import im.getsocial.sdk.ui.invites.InvitesViewBuilder;
import im.getsocial.sdk.invites.FetchReferralDataCallback;
import im.getsocial.sdk.invites.ReferralData;
import im.getsocial.sdk.invites.LinkParams;
import im.getsocial.sdk.invites.InviteContent;
import im.getsocial.sdk.ui.invites.InviteUiCallback;
import im.getsocial.sdk.GetSocialException;
import im.getsocial.sdk.media.MediaAttachment;
import im.getsocial.sdk.usermanagement.PublicUser;
import im.getsocial.sdk.usermanagement.UserReference;
import im.getsocial.sdk.usermanagement.UsersQuery;
import im.getsocial.utils.Converters;

import javax.annotation.Nullable;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class RNGetSocialModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    private static final String KEY_MEDIA_ATTACHMENT = "mediaAttachment";
    private static final String KEY_MEDIA_ATTACHMENT_IMAGE_URL = "imageUrl";
    private static final String KEY_MEDIA_ATTACHMENT_VIDEO_URL = "videoUrl";
    private static final String KEY_INVITE_CONTENT_PARAMETER_CUSTOM_SUBJECT = "inviteSubject";
    private static final String KEY_INVITE_CONTENT_PARAMETER_CUSTOM_TEXT = "inviteText";

    //region setup
    public RNGetSocialModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

    }

    @Override
    public void initialize() {
        setupGetSocial();
    }

    @Override
    public String getName() {
        return "RNGetSocial";
    }

    //endregion


    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        // link params
        constants.put("KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_TITLE", LinkParams.KEY_CUSTOM_TITLE);
        constants.put("KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_DESCRIPTION", LinkParams.KEY_CUSTOM_DESCRIPTION);
        constants.put("KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_IMAGE", LinkParams.KEY_CUSTOM_IMAGE);
        constants.put("KEY_LINK_PARAMETER_LANDING_PAGE_CUSTOM_YOUTUBE_VIDEO", LinkParams.KEY_CUSTOM_YOUTUBE_VIDEO);
        return constants;
    }

    //region GetSocial

    /**
     * Get Sdk version
     */
    @ReactMethod
    public void getSdkVersion(final Promise promise) {
        promise.resolve(GetSocial.getSdkVersion());
    }

	/**
	 * Checks if SDK is initialized.
	 */
	@ReactMethod
	public void isInitialized(final Promise promise) {
		promise.resolve(GetSocial.isInitialized());
	}

	/**
     * Init
     */
    @ReactMethod
    public void init() {
        GetSocial.init();
    }

    /**
     * Init with app id.
     * @param appId app id from GetSocial Dashboard.
     */
    @ReactMethod
    public void initWithAppId(final String appId) {
        GetSocial.init(appId);
    }

    /**
     * Get language used by the sdk.
     */
    @ReactMethod
    public void getLanguage(final Promise promise) {
        promise.resolve(GetSocial.getLanguage());
    }

    /**
     * Set language to be used by the sdk.
     * @param language language code to use.
     * @param promise promise to invoke when operation finished.
     */
    @ReactMethod
    public void setLanguage(final String language, final Promise promise) {
        boolean result = GetSocial.setLanguage(language);
        promise.resolve(result);
    }

    @ReactMethod
    public void getReferralData(final Promise promise) {
        GetSocial.getReferralData(new FetchReferralDataCallback() {
            @Override
            public void onSuccess(ReferralData referralData) {
                if (referralData == null) {
                    promise.resolve(null);
                } else {
                    promise.resolve(Converters.convertReferralData(referralData));
                }
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void clearReferralData(final Promise promise) {
        GetSocial.clearReferralData();
        promise.resolve(null);
    }

    @ReactMethod
    public void getReferredUsers(final Promise promise) {
        GetSocial.getReferredUsers(new Callback<List<ReferredUser>>() {
            @Override
            public void onSuccess(List<ReferredUser> referredUsers) {
                promise.resolve(Converters.convertReferredUsers(referredUsers));
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void isInviteChannelAvailable(final String channelId, final Promise promise) {
        promise.resolve(GetSocial.isInviteChannelAvailable(channelId));
    }

    @ReactMethod
    public void getInviteChannels(final Promise promise) {
        List<InviteChannel> inviteChannels = GetSocial.getInviteChannels();
        promise.resolve(Converters.convertInviteChannels(inviteChannels));
    }

    @ReactMethod
    public void createInviteLink(final ReadableMap linkParams, final Promise promise) {
        GetSocial.createInviteLink(createLinkParams(linkParams), new Callback<String>() {
            @Override
            public void onSuccess(String inviteLink) {
                promise.resolve(inviteLink);
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void sendInvite(final String channelId, final ReadableMap inviteParameters, final ReadableMap linkParams, final Promise promise) {
        InviteContent.Builder builder = InviteContent.createBuilder();

        if (inviteParameters != null) {
            // subject and text
            String customInviteSubject = getStringOrNull(inviteParameters, KEY_INVITE_CONTENT_PARAMETER_CUSTOM_SUBJECT);
            String customInviteText = getStringOrNull(inviteParameters, KEY_INVITE_CONTENT_PARAMETER_CUSTOM_TEXT);

            builder.withSubject(customInviteSubject).withText(customInviteText);

            ReadableMap mediaAttachmentMap = getMapOrNull(inviteParameters, KEY_MEDIA_ATTACHMENT);
            if (mediaAttachmentMap != null) {
                // media attachment
                String imageUrl = getStringOrNull(mediaAttachmentMap, KEY_MEDIA_ATTACHMENT_IMAGE_URL);
                String videoUrl = getStringOrNull(mediaAttachmentMap, KEY_MEDIA_ATTACHMENT_VIDEO_URL);

                MediaAttachment mediaAttachment = null;
                if (imageUrl != null) {
                    mediaAttachment = MediaAttachment.imageUrl(imageUrl);
                }
                if (videoUrl != null) {
                    mediaAttachment = MediaAttachment.videoUrl(videoUrl);
                }
                if (mediaAttachment != null) {
                    builder.withMediaAttachment(mediaAttachment);
                }
            }
        }

        GetSocial.sendInvite(channelId, builder.build(), createLinkParams(linkParams), new InviteCallback() {
            @Override
            public void onComplete() {
                fireInvitesEvent("onComplete", null);
            }

            @Override
            public void onCancel() {
                fireInvitesEvent("onCancel", null);
            }

            @Override
            public void onError(Throwable throwable) {
                fireInvitesEvent("onError", throwable.getMessage());
            }
        });
    }

    @ReactMethod
    public void getUserById(final String userId, final Promise promise) {
        GetSocial.getUserById(userId, new Callback<PublicUser>() {
            @Override
            public void onSuccess(PublicUser publicUser) {
                promise.resolve(Converters.convertPublicUser(publicUser));
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void getUserByAuthIdentity(final String providerId, final String providerUserId, final Promise promise) {
        GetSocial.getUserByAuthIdentity(providerId, providerUserId, new Callback<PublicUser>() {
            @Override
            public void onSuccess(PublicUser publicUser) {
                promise.resolve(Converters.convertPublicUser(publicUser));
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void getUsersByAuthIdentities(final String providerId, final List<String> providerUserIds, final Promise promise) {
        GetSocial.getUsersByAuthIdentities(providerId, providerUserIds, new Callback<Map<String, PublicUser>>() {
            @Override
            public void onSuccess(Map<String, PublicUser> publicUsersMap) {
                promise.resolve(Converters.convertPublicUsersMap(publicUsersMap));
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void findUsers(final ReadableMap queryProperties, final Promise promise) {
        UsersQuery query = UsersQuery.usersByDisplayName(queryProperties.getString("query"));
        query.withLimit(queryProperties.getInt("limit"));
        GetSocial.findUsers(query, new Callback<List<UserReference>>() {
            @Override
            public void onSuccess(List<UserReference> userReferences) {
                promise.resolve(Converters.convertUserReferences(userReferences));
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }
    //endregion

    //region GetSocial.User

    /**
     * Return the active user's id.
     */
    @ReactMethod
    public void getUserId(final Promise promise) {
        promise.resolve(GetSocial.User.getId());
    }

    @ReactMethod
    public void isAnonymous(final Promise promise) {
        promise.resolve(GetSocial.User.isAnonymous());
    }

    /**
     * Return the active user's display name.
     */
    @ReactMethod
    public void getDisplayName(final Promise promise) {
        promise.resolve(GetSocial.User.getDisplayName());
    }

    /**
     * Return the active user's avatar url.
     */
    @ReactMethod
    public void getAvatarUrl(final Promise promise) {
        promise.resolve(GetSocial.User.getAvatarUrl());
    }


    @ReactMethod
    public void setDisplayName(final String displayName, final Promise promise) {
        GetSocial.User.setDisplayName(displayName, toCompletionCallback(promise));
    }

    @ReactMethod
    public void setAvatarUrl(final String avatarUrl, final Promise promise) {
        GetSocial.User.setAvatarUrl(avatarUrl, toCompletionCallback(promise));
    }

    @ReactMethod
    public void setPublicProperty(final String propertyKey, final String propertyValue, final Promise promise) {
        GetSocial.User.setPublicProperty(propertyKey, propertyValue, toCompletionCallback(promise));
    }

    @ReactMethod
    public void setPrivateProperty(final String propertyKey, final String propertyValue, final Promise promise) {
        GetSocial.User.setPrivateProperty(propertyKey, propertyValue, toCompletionCallback(promise));
    }

    @ReactMethod
    public void hasPublicProperty(final String propertyKey, final Promise promise) {
        promise.resolve(GetSocial.User.hasPublicProperty(propertyKey));
    }

    @ReactMethod
    public void hasPrivateProperty(final String propertyKey, final Promise promise) {
        promise.resolve(GetSocial.User.hasPrivateProperty(propertyKey));
    }

    @ReactMethod
    public void getPublicProperty(final String propertyKey, final Promise promise) {
        promise.resolve(GetSocial.User.getPublicProperty(propertyKey));
    }

    @ReactMethod
    public void getPrivateProperty(final String propertyKey, final Promise promise) {
        promise.resolve(GetSocial.User.getPrivateProperty(propertyKey));
    }

    @ReactMethod
    public void allPublicProperties(final Promise promise) {
        promise.resolve(GetSocial.User.getAllPublicProperties());
    }

    @ReactMethod
    public void getPrivateProperty(final Promise promise) {
        promise.resolve(GetSocial.User.getAllPrivateProperties());
    }

    @ReactMethod
    public void removePublicProperty(final String propertyKey, final Promise promise) {
        GetSocial.User.removePublicProperty(propertyKey, toCompletionCallback(promise));
    }

    @ReactMethod
    public void removePrivateProperty(final String propertyKey, final Promise promise) {
        GetSocial.User.removePrivateProperty(propertyKey, toCompletionCallback(promise));
    }

    @ReactMethod
    public void addAuthIdentity(final ReadableMap authIdentityMap, final Promise promise) {
        String providerId = getStringOrNull(authIdentityMap, "providerId");
        String providerUserId = getStringOrNull(authIdentityMap, "providerUserId");
        String accessToken = getStringOrNull(authIdentityMap, "accessToken");

        AuthIdentity authIdentity = AuthIdentity.createCustomIdentity(providerId, providerUserId, accessToken);
        GetSocial.User.addAuthIdentity(authIdentity, new AddAuthIdentityCallback() {
            @Override
            public void onComplete() {
                promise.resolve(null);
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }

            @Override
            public void onConflict(ConflictUser conflictUser) {
                promise.resolve(Converters.convertConflictUser(conflictUser));
            }
        });
    }

    @ReactMethod
    public void removeAuthIdentity(final String providerId, final Promise promise) {
        GetSocial.User.removeAuthIdentity(providerId, toCompletionCallback(promise));
    }

    @ReactMethod
    public void addFriend(final String userId, final Promise promise) {
        GetSocial.User.addFriend(userId, new Callback<Integer>() {
            @Override
            public void onSuccess(Integer integer) {
                promise.resolve(integer);
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod void addFriendsByAuthIdentities(final String providerId, final List<String> userIds, final Promise promise) {
        GetSocial.User.addFriendsByAuthIdentities(providerId, userIds, new Callback<Integer>() {
            @Override
            public void onSuccess(Integer integer) {
                promise.resolve(integer);
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void removeFriend(final String userId, final Promise promise) {
        GetSocial.User.removeFriend(userId, new Callback<Integer>() {
            @Override
            public void onSuccess(Integer integer) {
                promise.resolve(integer);
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod void removeFriendsByAuthIdentities(final String providerId, final List<String> userIds, final Promise promise) {
        GetSocial.User.removeFriendsByAuthIdentities(providerId, userIds, new Callback<Integer>() {
            @Override
            public void onSuccess(Integer integer) {
                promise.resolve(integer);
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void setFriends(final List<String> userIds, final Promise promise) {
        GetSocial.User.setFriends(userIds, toCompletionCallback(promise));
    }

    @ReactMethod
    public void setFriendsByAuthIdentities(final String providerId, final List<String> userIds, final Promise promise) {
        GetSocial.User.setFriendsByAuthIdentities(providerId, userIds, toCompletionCallback(promise));
    }

    @ReactMethod
    public void isFriend(final String userId, final Promise promise) {
        GetSocial.User.isFriend(userId, new Callback<Boolean>() {
            @Override
            public void onSuccess(Boolean isFriend) {
                promise.resolve(isFriend);
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void getFriendsCount(final Promise promise) {
        GetSocial.User.getFriendsCount(new Callback<Integer>() {
            @Override
            public void onSuccess(Integer integer) {
                promise.resolve(integer);
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void getFriends(final int offset, final int limit, final Promise promise) {
        GetSocial.User.getFriends(offset, limit, new Callback<List<PublicUser>>() {
            @Override
            public void onSuccess(List<PublicUser> publicUsers) {
                promise.resolve(Converters.convertPublicUsers(publicUsers));
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }

    @ReactMethod
    public void getSuggestedFriends(final int offset, final int limit, final Promise promise) {
        GetSocial.User.getSuggestedFriends(offset, limit, new Callback<List<SuggestedFriend>>() {
            @Override
            public void onSuccess(List<SuggestedFriend> suggestedFriends) {
                promise.resolve(Converters.convertSuggestedFriends(suggestedFriends));
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        });
    }


    @ReactMethod
    public void switchUser(final ReadableMap authIdentityMap, final Promise promise) {
        String providerId = getStringOrNull(authIdentityMap, "providerId");
        String providerUserId = getStringOrNull(authIdentityMap, "providerUserId");
        String accessToken = getStringOrNull(authIdentityMap, "accessToken");

        AuthIdentity authIdentity = AuthIdentity.createCustomIdentity(providerId, providerUserId, accessToken);
        GetSocial.User.switchUser(authIdentity, toCompletionCallback(promise));
    }

    @ReactMethod
    public void getAuthIdentities(final Promise promise) {
        promise.resolve(Converters.convertAuthIdentities(GetSocial.User.getAuthIdentities()));
    }

    @ReactMethod
    public void resetUser(final Promise promise) {
        GetSocial.User.reset(toCompletionCallback(promise));
    }
    
    //endregion


    //region GetSocial UI
    @ReactMethod
    public void closeView(final Promise promise, final boolean saveState) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                GetSocialUi.closeView(saveState);
                promise.resolve(null);
            }
        });
    }

    @ReactMethod
    public void restoreView(final Promise promise) {
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                GetSocialUi.restoreView();
                promise.resolve(null);
            }
        });
    }

    @ReactMethod
    public void showInvitesView(final String customWindowTitle, final ReadableMap inviteParameters, final ReadableMap linkParams, final Promise promise) {
        // create view
        final InvitesViewBuilder viewBuilder = GetSocialUi.createInvitesView();

        // window title
        if (customWindowTitle != null) {
            viewBuilder.setWindowTitle(customWindowTitle);
        }

        InviteContent.Builder builder = InviteContent.createBuilder();

        if (inviteParameters != null) {
            // subject and text
            String customInviteSubject = getStringOrNull(inviteParameters, KEY_INVITE_CONTENT_PARAMETER_CUSTOM_SUBJECT);
            String customInviteText = getStringOrNull(inviteParameters, KEY_INVITE_CONTENT_PARAMETER_CUSTOM_TEXT);

            builder.withSubject(customInviteSubject).withText(customInviteText);

            ReadableMap mediaAttachmentMap = getMapOrNull(inviteParameters, KEY_MEDIA_ATTACHMENT);
            if (mediaAttachmentMap != null) {
                // media attachment
                String imageUrl = getStringOrNull(mediaAttachmentMap, KEY_MEDIA_ATTACHMENT_IMAGE_URL);
                String videoUrl = getStringOrNull(mediaAttachmentMap, KEY_MEDIA_ATTACHMENT_VIDEO_URL);

                MediaAttachment mediaAttachment = null;
                if (imageUrl != null) {
                    mediaAttachment = MediaAttachment.imageUrl(imageUrl);
                }
                if (videoUrl != null) {
                    mediaAttachment = MediaAttachment.videoUrl(videoUrl);
                }
                if (mediaAttachment != null) {
                    builder.withMediaAttachment(mediaAttachment);
                }
            }
            viewBuilder.setCustomInviteContent(builder.build());

            // link params
            viewBuilder.setLinkParams(createLinkParams(linkParams));
        }
        viewBuilder.setInviteCallback(new InviteUiCallback() {
            @Override
            public void onComplete(String channelId) {
                fireInvitesUIEvent("onComplete", channelId, null);
            }

            @Override
            public void onCancel(String channelId) {
                fireInvitesUIEvent("onCancel", channelId, null);
            }

            @Override
            public void onError(String channelId, Throwable throwable) {
                fireInvitesUIEvent("onError", channelId, throwable.getMessage());
            }
        });
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                viewBuilder.show();
            }
        });
    }

    @ReactMethod
    public void loadDefaultConfiguration(final Promise promise) {
        if(GetSocialUi.loadDefaultConfiguration(reactContext.getApplicationContext())) {
            promise.resolve(null);
        } else {
            promise.reject("Could not load default configuration");
        }
    }

    @ReactMethod
    public void loadConfiguration(final String configurationPath, final Promise promise) {
        if(GetSocialUi.loadConfiguration(reactContext.getApplicationContext(), configurationPath)) {
            promise.resolve(null);
        } else {
            promise.reject("Could not load configuration at path " + configurationPath);
        }
    }

    //endregion

    //region Utils

    private CompletionCallback toCompletionCallback(final Promise promise) {
        return new CompletionCallback() {
            @Override
            public void onSuccess() {
                promise.resolve(null);
            }

            @Override
            public void onFailure(GetSocialException exception) {
                promise.reject(exception, convertThrowable(exception));
            }
        };
    }

    private void fireInvitesEvent(String status, @Nullable String errorMessage) {
        WritableMap inviteEventData = new WritableNativeMap();
        inviteEventData.putString("STATUS", status);
        if (errorMessage != null) {
            inviteEventData.putString("ERROR", errorMessage);
        }
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("InvitesEvent", inviteEventData);
    }

    private void fireInvitesUIEvent(String status, String channelId, @Nullable String errorMessage) {
        WritableMap inviteEventData = new WritableNativeMap();
        inviteEventData.putString("STATUS", status);
        inviteEventData.putString("CHANNEL_ID", channelId);
        if (errorMessage != null) {
            inviteEventData.putString("ERROR", errorMessage);
        }
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("InvitesUIEvent", inviteEventData);
    }

    private String getStringOrNull(final ReadableMap values, final String key) {
        if (values.hasKey(key)) {
            return values.getString(key);
        }
        return null;
    }

    private ReadableMap getMapOrNull(final ReadableMap values, final String key) {
        if (values.hasKey(key)) {
            return values.getMap(key);
        }
        return null;
    }

    private LinkParams createLinkParams(final ReadableMap linkParamsSource) {
        LinkParams linkParamsInternal = null;
        if (linkParamsSource != null) {
            linkParamsInternal = new LinkParams(linkParamsSource.toHashMap());
        }
        return linkParamsInternal;
    }

    private WritableMap convertThrowable(final Throwable throwable) {
        WritableMap writableMap = new WritableNativeMap();
        writableMap.putString("MESSAGE", throwable.getMessage());
        return writableMap;
    }
    //endregion

    private void setupGetSocial() {

        // listen for global errors
        GetSocial.setGlobalErrorListener(new GlobalErrorListener() {
            @Override
            public void onError(GetSocialException exception) {
                System.out.println("### ERROR HAPPENED: " + exception.getMessage());
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("onGlobalError", exception.getMessage());
            }
        });

        Runnable whenInitialized = new Runnable() {
            @Override
            public void run() {
                // notify the JS thread that the GetSocial SDK has initialized
                // so it can be cached there
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("whenInitialized", null);
            }
        };
        // listen to the library being initialized
        GetSocial.whenInitialized(whenInitialized);

        OnUserChangedListener onUserChangedListener = new OnUserChangedListener() {
            @Override
            public void onUserChanged() {
                // notify the JS thread that the GetSocial user has changed
                // so it can be cached there
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("onUserChanged", null);
            }
        };
        GetSocial.User.setOnUserChangedListener(onUserChangedListener);
    }
}