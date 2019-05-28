# GetSocial React Native SDK

Learn more about the products we build at [getsocial.im](https://www.getsocial.im).

## Getting started

### Prerequisities

To start using GetSocial, you have to [create a free account](https://dashboard.getsocial.im/#/register) and login to GetSocial Dashboard. Dashboard provides a web interface to manage all GetSocial services.

### Install React Native package

1. Run `npm install getsocial-react-native-sdk --save` in command line
1. Open `package.json` file and the following lines to `"scripts"` section:
    ```javascript
    "scripts": {
        ...
        "postinstall": "node node_modules/getsocial-react-native-sdk/scripts/download_ios_frameworks.js",
        ...
    }
    ```
1. Execute `npm install` again. This step is required because `getsocial-react-native-sdk` needs to download native frameworks for iOS.
1. Run `npm link` to link plugin to your app.

### Configure GetSocial SDK

#### Android

To start using GetSocial, you have to add and configure [GetSocial Gradle Plugin](https://plugins.gradle.org/plugin/im.getsocial) to your Android project. Plugin adds all GetSocial dependencies to the project and configures `AndroidManifest.xml`.

To add GetSocial Gradle plugin: 

1. Add repository and classpath dependency for the plugin in your top-level `build.gradle`:

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
            classpath "im.getsocial:plugin:[0,1)"
        }
    }
    ```

1. In the Android application project `build.gradle` apply `im.getsocial` plugin after `com.android.application` plugin:

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

Alternatively, you can add frameworks and modify all settings manually. Please follow the [iOS manual integration guide](https://docs.getsocial.im/knowledge-base/manual-integration/ios) for details.

To add GetSocial installer script:

1. Download and unzip [GetSocial iOS installer script](https://downloads.getsocial.im/ios-installer/releases/ios-install-script.zip).
1. Open your Xcode project folder in Finder.
1. Copy the unzipped `getsocial.sh` script to the Xcode project root folder, so you can add it to source control.
1. In your Xcode project go to **Project Settings** --> select target you want to modify --> **Build Phases** tab.
1. Create new **Run Script** phase with the content:

    ```sh
    "$PROJECT_DIR/getsocial.sh" --app-id="your-getsocial-app-id"
    ```

1. Move **Run Script** phase before the **Compile Sources** phase.
1. If you are using CocoaPods, please add GetSocial SDK pods to your `Podfile` manually:

    ```ruby
    pod "GetSocial/Core"
    pod "GetSocial/UI" # add this pod only if you plan to use GetSocial UI
    ```

    And run `pod install` to update dependencies.

1. Build your project.

GetSocial Installer script supports multiple configuration parameters, check the [iOS Installer Script Reference](https://docs.getsocial.im/knowledge-base/ios-installer-reference/#supported-configuration-parameters) for the full list of supported parameters.

!!! tip "Project Backups"
    GetSocial installer script creates a backup of your `project.pbxproj` file every time it is executed. If something goes wrong, you can always roll back to the previous version.

!!! tip "Source Control Configuration"
    We suggest adding `.backup` files under `.xcodeproj` to ignore list to keep your version control history clean.


## Start Using GetSocial

At this point, you should be able to start using GetSocial.
