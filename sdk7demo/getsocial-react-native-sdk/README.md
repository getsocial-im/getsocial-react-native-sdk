# GetSocial React Native SDK

Learn more about the products we build at [getsocial.im](https://www.getsocial.im).

## Getting started

### Prerequisities

To start using GetSocial, you have to [create a free account](https://dashboard.getsocial.im/#/register) and login to GetSocial Dashboard. Dashboard provides a web interface to manage all GetSocial services.

### Install React Native package

1. Run `npm install getsocial-react-native-sdk --save` in your app's root folder.

### Configure GetSocial SDK

#### Android

To start using GetSocial, you have to add and configure [GetSocial Gradle Plugin](https://plugins.gradle.org/plugin/im.getsocial) to your Android project. Plugin adds all GetSocial dependencies to the project and configures `AndroidManifest.xml`.

To add GetSocial Gradle plugin: 

1. Add repository and classpath dependency for the plugin in your top-level `build.gradle`. This file is for the entire project so it will be used for global project configurations:

    ```groovy hl_lines="5 10"
    buildscript {
        repositories {
            ...
            maven {
                url "https://plugins.gradle.org/m2/"
            }
        }
        dependencies {
            ...
            classpath "im.getsocial:plugin-v7:[1,2)"
        }
    }
    ```

1. In the Android application project `build.gradle` (this file is the module build file, so it will be used for specific module level configs) apply `im.getsocial` plugin after `com.android.application` plugin:

    ```groovy hl_lines="2 5"
    apply plugin: 'com.android.application'
    apply plugin: 'im.getsocial' // should be applied after com.android.application plugin
    ```

1. In the same `build.gradle` configure GetSocial plugin with GetSocial App id: 

    ```groovy 
    getsocial {
        appId "put-your-getsocial-app-id-here"
        ...
    }
    ```

Check the [GetSocial Gradle plugin reference](https://docs.getsocial.im/knowledge-base/gradle-plugin-reference/) for the full list of available configurations.

#### iOS

To start using GetSocial, you have to add and configure [GetSocial installer script](https://docs.getsocial.im/knowledge-base/ios-installer-reference/) to your Xcode project. The script adds GetSocial frameworks to the project and configures app entitlements, plist files, and Xcode project settings.

To add GetSocial installer script:

1. Run `pod install` to update dependencies.
1. In your Xcode project go to **Project Settings** --> select target you want to modify --> **Build Phases** tab.
1. Create new **Run Script** phase with the content:

    ```sh
    "$PROJECT_DIR/getsocial-sdk7.sh" --app-id="your-getsocial-app-id"
    ```

1. Move **Run Script** phase before the **Compile Sources** phase.
1. Build your project.

!!! tip "Project Backups"
    GetSocial installer script creates a backup of your `project.pbxproj` file every time it is executed. If something goes wrong, you can always roll back to the previous version.

!!! tip "Source Control Configuration"
    We suggest adding `.backup` files under `.xcodeproj` to ignore list to keep your version control history clean.

## Start Using GetSocial

### GetSocial UI

At this point, you should be able to start using GetSocial.

GetSocial UI library contains [easy to customize](/knowledge-base/sdk-ui/customization/introduction/) views for all GetSocial features, e.g. code below will create and show GetSocial Smart Invites view:

```javascript
import {GetSocialUI, InvitesView} from 'getsocial-react-native-sdk';
...
InvitesView().show();
```

### SDK Initialization

GetSocial SDK is auto-initialized, just provide a GetSocial App Id in the Gradle plugin on Android, or as a parameter to the iOS Installer Script on iOS, and we will do the magic.

If you want to be notified about initialization complete, you can register a listener, which will be invoked when SDK gets initialized or invoked immediately if it is already initialized:

```javascript
import {GetSocial} from 'getsocial-react-native-sdk';
...
GetSocial.addOnInitializedListener(() => {
    // GetSocial SDK is ready to use
});
```

### Send your first invite

```javascript 
import {Invites} from 'getsocial-react-native-sdk';
...

Invites.send(nil, "email", () => {
    console.log('Invitation via email was sent');
}, () => {
    console.log('Invitation via email was cancelled');
}, (error) => {
    console.log('Failed to send invitation via email failed, error: ' + error.message);
});
```
