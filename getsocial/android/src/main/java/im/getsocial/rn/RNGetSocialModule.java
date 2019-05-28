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
import im.getsocial.sdk.GetSocial;
import im.getsocial.sdk.GlobalErrorListener;
import im.getsocial.sdk.invites.ReferredUser;
import im.getsocial.sdk.ui.GetSocialUi;
import im.getsocial.sdk.usermanagement.OnUserChangedListener;
import im.getsocial.sdk.ui.invites.InvitesViewBuilder;
import im.getsocial.sdk.invites.FetchReferralDataCallback;
import im.getsocial.sdk.invites.ReferralData;
import im.getsocial.sdk.invites.LinkParams;
import im.getsocial.sdk.invites.InviteContent;
import im.getsocial.sdk.ui.invites.InviteUiCallback;
import im.getsocial.sdk.GetSocialException;
import im.getsocial.sdk.media.MediaAttachment;
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
                promise.reject(exception);
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
                promise.reject(exception);
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
            viewBuilder.setLinkParams(new LinkParams(linkParams.toHashMap()));
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

    //endregion

    private void setupGetSocial() {

        // listen for global errors
        GetSocial.setGlobalErrorListener(new GlobalErrorListener() {
            @Override
            public void onError(GetSocialException exception) {
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("onGlobalError", exception);
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