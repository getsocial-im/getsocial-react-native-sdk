package im.getsocial.rn;

import android.content.Context;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONException;
import org.json.JSONObject;

import im.getsocial.sdk.Callback;
import im.getsocial.sdk.GetSocial;
import im.getsocial.sdk.GetSocialError;
import im.getsocial.sdk.Invites;
import im.getsocial.sdk.Notifications;
import im.getsocial.sdk.actions.Action;
import im.getsocial.sdk.actions.ActionListener;
import im.getsocial.sdk.communities.ActivitiesQuery;
import im.getsocial.sdk.communities.CurrentUser;
import im.getsocial.sdk.communities.OnCurrentUserChangedListener;
import im.getsocial.sdk.communities.User;
import im.getsocial.sdk.communities.UserId;
import im.getsocial.sdk.invites.InviteContent;
import im.getsocial.sdk.invites.ReferralData;
import im.getsocial.sdk.invites.ReferralDataListener;
import im.getsocial.sdk.json.GetSocialJson;
import im.getsocial.sdk.notifications.Notification;
import im.getsocial.sdk.notifications.NotificationButton;
import im.getsocial.sdk.notifications.NotificationContext;
import im.getsocial.sdk.notifications.NotificationsQuery;
import im.getsocial.sdk.notifications.OnNotificationClickedListener;
import im.getsocial.sdk.notifications.OnNotificationReceivedListener;
import im.getsocial.sdk.notifications.OnTokenReceivedListener;
import im.getsocial.sdk.ui.AvatarClickListener;
import im.getsocial.sdk.ui.GetSocialUi;
import im.getsocial.sdk.ui.MentionClickListener;
import im.getsocial.sdk.ui.TagClickListener;
import im.getsocial.sdk.ui.UiAction;
import im.getsocial.sdk.ui.UiActionListener;
import im.getsocial.sdk.ui.ViewStateListener;
import im.getsocial.sdk.ui.communities.ActivityFeedViewBuilder;
import im.getsocial.sdk.ui.invites.InviteUiCallback;
import im.getsocial.sdk.ui.invites.InvitesViewBuilder;
import im.getsocial.sdk.ui.pushnotifications.NotificationCenterViewBuilder;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.HashMap;

public class RNGetSocialModule extends ReactContextBaseJavaModule {
    private static final String TAG = "RNGetSocialModule";

    private final ReactApplicationContext reactContext;

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
    @Nonnull
    public String getName() {
        return "RNGetSocial";
    }

    //endregion


    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        return constants;
    }

    //region GetSocial
    @ReactMethod
    public void callAsync(final String method, final String parameters, final Promise promise) {
        Log.d(TAG, "Call Async [" + method + "] with [" + parameters + "]");
        String modifiedParameters = parameters;
        if (modifiedParameters != null && GetSocial.isInitialized()) {
            modifiedParameters = modifiedParameters.replaceAll("GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42", GetSocial.getCurrentUser().getId());
        }
        GetSocialJson.callAsync(method, modifiedParameters, new Callback<String>() {
            @Override
            public void onSuccess(String result) {
                Log.d(TAG, "Call [" + method + "], result [" + result + "]");
                promise.resolve(result);
            }
        }, new Callback<String>() {
            @Override
            public void onSuccess(String error) {
                callReject(promise, error);
            }
        });
    }

    @ReactMethod
    public void callSync(final String method, final String parameters, final Promise promise) {
        Log.d(TAG,"Call Sync [" + method + "] with [" + parameters + "]");
        String modifiedParameters = parameters;
        if (modifiedParameters != null && GetSocial.isInitialized()) {
            modifiedParameters = parameters.replaceAll("GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42", GetSocial.getCurrentUser().getId());
        }
        String result = GetSocialJson.callSync(method, parameters);
        Log.d(TAG,"Call [" + method + "] finished, result [" + result + "]");
        promise.resolve(result);
    }

    @ReactMethod
    public void callAsyncUI(final String method, final String parameter, final Promise promise) {
        Log.d(TAG, "Call AsyncUI [" + method + "] with parameters: [" + parameter + "]");
        if (method.equals("closeView")) {
            GetSocialUi.closeView(Boolean.parseBoolean(parameter));
        }
        if (method.equals("restoreView")) {
            GetSocialUi.restoreView();
        }
        if (method.equals("loadDefaultConfiguration")) {
            if (GetSocialUi.loadDefaultConfiguration()) {
                promise.resolve("");
            } else {
                callReject(promise, "Failed to load default UI configuration");
            }
        }
        if (method.equals("loadConfiguration")) {
            if (GetSocialUi.loadConfiguration(parameter)) {
                promise.resolve("");
            } else {
                callReject(promise, "Failed to load custom UI configuration, check logs for more information");
            }
        }
    }

    @ReactMethod
    public void registerListener(final String listener) {
        Log.d(TAG,"Call RegisterListener: [" + listener + "]");
        // only Android to avoid lifecycle issues, and lost of data
        if (listener.equalsIgnoreCase("onReferralDataReceived")) {
            Invites.setReferralDataListener(new ReferralDataListener() {
                @Override
                public void onReferralDataReceived(ReferralData referralData) {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onReferralDataReceived", GetSocialJson.toJson(referralData));
                }
            });
        } else if (listener.equalsIgnoreCase("onNotificationClicked")) {
            Notifications.setOnNotificationClickedListener(new OnNotificationClickedListener() {
                @Override
                public void onNotificationClicked(Notification notification, NotificationContext notificationContext) {
                    Map map = new HashMap();
                    map.put("notification", notification);
                    map.put("context", notificationContext);
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onNotificationClicked", GetSocialJson.toJson(map));
                }
            });
        }
    }

    @ReactMethod
    public void showView(final String method, final ReadableMap parameters, final Promise promise) {
        Log.d(TAG, "Call ShowView [" + method + "] with parameters: [" + parameters + "]");
        if (method.equalsIgnoreCase("activitiesView")) {
            showActivitiesView(parameters, promise);
        }
        if (method.equalsIgnoreCase("invitesView")) {
            showInvitesView(parameters, promise);
        }
        if (method.equalsIgnoreCase("ncView")) {
            showNotificationCenterView(parameters, promise);
        }
    }

    @ReactMethod
    public void loadLocalResource(final String uri, final Promise promise) {
        String encoded = base64Encode(getFileContent(uri));
        promise.resolve(encoded);
    }
    //endregion


    //region GetSocial UI
    @ReactMethod
    public void closeView(final boolean saveState) {
        runOnMainThread(new Runnable() {
                @Override
                public void run() {
                    GetSocialUi.closeView(saveState);
                }
            });
    }

    @ReactMethod
    public void restoreView() {
        runOnMainThread(new Runnable() {
                @Override
                public void run() {
                    GetSocialUi.restoreView();
                }
            });
    }

    private void showInvitesView(final ReadableMap parameters, final Promise promise) {
        final String windowTitle = parameters.getString("windowTitle");
        final String customContent = parameters.getString("inviteContent");
        runOnMainThread(new Runnable() {
            @Override
            public void run() {
                InvitesViewBuilder builder = InvitesViewBuilder.create();
                if (windowTitle != null && windowTitle.length() > 0) {
                    builder.setWindowTitle(windowTitle);
                }
                InviteContent content = null;
                if (customContent != null && customContent.length() > 0) {
                    content = GetSocialJson.parse(customContent, InviteContent.class);
                    builder.setCustomInviteContent(content);
                }
                builder.setInviteCallback(new InviteUiCallback() {
                    @Override
                    public void onComplete(String channelId) {
                        WritableNativeMap map = new WritableNativeMap();
                        map.putString("channelId", channelId);
                        fireEvent("inviteview_invitesent", map);
                    }

                    @Override
                    public void onCancel(String channelId) {
                        WritableNativeMap map = new WritableNativeMap();
                        map.putString("channelId", channelId);
                        fireEvent("inviteview_invitecancelled", map);
                    }

                    @Override
                    public void onError(String channelId, GetSocialError error) {
                        WritableNativeMap map = new WritableNativeMap();
                        map.putString("channelId", channelId);
                        map.putString("error", error.getMessage());
                        fireEvent("inviteview_inviteerror", map);
                    }
                });
                builder.setViewStateListener(new ViewStateListener() {
                    @Override
                    public void onOpen() {
                        fireEvent("view_open", "");
                    }

                    @Override
                    public void onClose() {
                        fireEvent("view_close", "");
                    }
                });
                builder.show();
            }
        });
    }

    private void showActivitiesView(final ReadableMap parameters, final Promise promise) {
        final String windowTitle = parameters.getString("windowTitle");
        String queryString = parameters.getString("query");
        String modifiedQueryString = queryString;
        if (modifiedQueryString != null && GetSocial.isInitialized()) {
            modifiedQueryString = queryString.replaceAll("GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42", GetSocial.getCurrentUser().getId());
        }
        final ActivitiesQuery query = GetSocialJson.parse(modifiedQueryString, ActivitiesQuery.class);
        runOnMainThread(new Runnable() {
            @Override
            public void run() {
                ActivityFeedViewBuilder builder = ActivityFeedViewBuilder.create(query);
                if (windowTitle != null && windowTitle.length() > 0) {
                    builder.setWindowTitle(windowTitle);
                }
                builder.setActionListener(new ActionListener() {
                    @Override
                    public void handleAction(Action action) {
                        fireEvent("activityview_action", GetSocialJson.toJson(action));
                    }
                });
                builder.setAvatarClickListener(new AvatarClickListener() {
                    @Override
                    public void onAvatarClicked(User user) {
                        fireEvent("activityview_avatarclick", GetSocialJson.toJson(user));
                    }
                });
                builder.setMentionClickListener(new MentionClickListener() {
                    @Override
                    public void onMentionClicked(String s) {
                        fireEvent("activityview_mentionclick", s);
                    }
                });
                builder.setTagClickListener(new TagClickListener() {
                    @Override
                    public void onTagClicked(String s) {
                        fireEvent("activityview_tagclick", s);
                    }
                });
                builder.setViewStateListener(new ViewStateListener() {
                    @Override
                    public void onOpen() {
                        fireEvent("view_open", "");
                    }

                    @Override
                    public void onClose() {
                        fireEvent("view_close", "");
                    }
                });
                builder.show();
            }
        });

    }

    @ReactMethod
    public void showNotificationCenterView(final ReadableMap parameters, final Promise promise) {
        final String windowTitle = parameters.getString("windowTitle");
        String queryString = parameters.getString("query");
        String modifiedQueryString = queryString;
        if (modifiedQueryString != null && GetSocial.isInitialized()) {
            modifiedQueryString = queryString.replaceAll("GETSOCIAL_CURRENT_USER_PLACEHOLDER_42_42", GetSocial.getCurrentUser().getId());
        }
        final NotificationsQuery query = GetSocialJson.parse(modifiedQueryString, NotificationsQuery.class);
        runOnMainThread(new Runnable() {
            @Override
            public void run() {
                final NotificationCenterViewBuilder builder = NotificationCenterViewBuilder.create(query);
                if (windowTitle != null && windowTitle.length() > 0) {
                    builder.setWindowTitle(windowTitle);
                }
                builder.setNotificationClickListener(new NotificationCenterViewBuilder.NotificationClickListener() {
                    @Override
                    public void onNotificationClicked(Notification notification, NotificationContext notificationContext) {
                        Map map = new HashMap();
                        map.put("notification", notification);
                        map.put("context", notificationContext);
                        fireEvent("ncview_notificationclick", GetSocialJson.toJson(map));
                    }
                });
                builder.setViewStateListener(new ViewStateListener() {
                    @Override
                    public void onOpen() {
                        fireEvent("view_open", "");
                    }

                    @Override
                    public void onClose() {
                        fireEvent("view_close", "");
                    }
                });
                builder.show();
            }
        });
    }

    //endregion

    //region Utils

    private void fireEvent(String event, String message) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(event, message);
    }

    private void fireEvent(String event, WritableMap map) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(event, map);
    }

    //endregion

    private void setupGetSocial() {

        // listen for global errors
        final Handler handler = new Handler(Looper.getMainLooper());
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Runnable onInitializedListener = new Runnable() {
                    @Override
                    public void run() {
                        // notify the JS thread that the GetSocial SDK has initialized
                        // so it can be cached there
                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("onInitialized", null);
                    }
                };
                // listen to the library being initialized
                GetSocial.addOnInitializeListener(onInitializedListener);

                GetSocial.addOnCurrentUserChangedListener(new OnCurrentUserChangedListener() {
                    @Override
                    public void onUserChanged(CurrentUser currentUser) {
                        // notify the JS thread that the GetSocial user has changed
                        // so it can be cached there
                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("onCurrentUserChanged", GetSocialJson.toJson(currentUser));
                    }
                });
                Notifications.setOnTokenReceivedListener(new OnTokenReceivedListener() {
                    @Override
                    public void onTokenReady(String token) {
                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("onTokenReceived", GetSocialJson.toJson(token));
                    }
                });
                Notifications.setOnNotificationReceivedListener(new OnNotificationReceivedListener() {
                    @Override
                    public void onNotificationReceived(Notification notification) {
                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("onNotificationReceived", GetSocialJson.toJson(notification));
                    }
                });
            }
        }, 2000);
    }

    private void callReject(final Promise promise, String errorObject) {
        try {
            JSONObject object = new JSONObject(errorObject);
            int errorCode = object.getInt("code");
            String errorMessage = object.getString("message");
            promise.reject("" + errorCode, errorMessage);
        } catch (JSONException e) {
            e.printStackTrace();
            promise.reject(e);
        }
    }

    private void runOnMainThread(final Runnable runnable) {
        if (getCurrentActivity() != null) {
            getCurrentActivity().runOnUiThread(runnable);
        }
    }

    private String base64Encode(byte[] data) {
        if (data == null || data.length == 0) {
            return null;
        }
        return Base64.encodeToString(data, Base64.DEFAULT);
    }

    private String getRealPathFromUri(Context context, Uri contentUri) {
        if (!("content".equalsIgnoreCase(contentUri.getScheme()))) {
            return contentUri.getPath();
        }
        Cursor cursor = null;
        try {
            String[] proj = { MediaStore.Images.Media.DATA };
            cursor = context.getContentResolver().query(contentUri, proj, null, null, null);
            if (cursor != null) {
                int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
                cursor.moveToFirst();
                return cursor.getString(column_index);
            }
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
        return "";
    }

    private byte[] getFileContent(String localUri) {
        File file = new File(getRealPathFromUri(getReactApplicationContext(), Uri.parse(localUri)));
        if (file.exists()) {
            FileInputStream fin = null;
            byte fileContent[] = null;
            try {
                fin = new FileInputStream(file);
                fileContent = new byte[(int)file.length()];
                fin.read(fileContent);
            } catch (Exception ioe) {
                Log.e(TAG,"Exception while reading file " + ioe);
            } finally {
                // close the streams using close method
                try {
                    if (fin != null) {
                        fin.close();
                    }
                } catch (IOException ioe) {
                    Log.e(TAG,"Error while closing stream: " + ioe);
                }
            }
            return fileContent;
        }
        // check in assets folder
        InputStream is = null;
        byte fileContent[] = null;
        try {
            is = getReactApplicationContext().getAssets().open(localUri);
            fileContent = new byte[(int)is.available()];
            is.read(fileContent);
            return fileContent;
        } catch (Exception ioe) {
            Log.e(TAG,"Exception while reading file " + ioe);
        } finally {
            // close the streams using close method
            try {
                if (is != null) {
                    is.close();
                }
            } catch (IOException ioe) {
                Log.e(TAG,"Error while closing stream: " + ioe);
            }
        }
        return null;
    }

}