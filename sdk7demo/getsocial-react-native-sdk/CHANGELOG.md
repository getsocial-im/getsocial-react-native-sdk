## v7.12.4 - Oct 7, 2022

+ New: Search for Topic/Group/Label/Hashtag/User followers and group members by name
+ New: Rejected status for Group Members

## v7.12.3 - Sep 16, 2022

+ Expose ActivityButton, Tag, NotificationContext and others.

## v7.12.2 - Sep 7, 2022

+ Overall improvements.

## v7.12.1 - Aug 18, 2022

- Fix: Map returned by getUsersByIds and areGroupMembers methods

## v7.12.0 - Jul 27, 2022

- New: Support for blocked users

## v7.11.0 - Jun 21, 2022

+ New: support for verified users
+ Overall improvements.

## v7.10.0 - May 12, 2022

+ New: Global search (beta) for activities, labels, hashtags, users, groups and topics

## v7.9.2 - Apr 19, 2022

- Fixed: AddGroupMembersQuery is now correctly parsed.
- Fixed: addGroupMembers was calling the wrong method.
- Fixed: JoinGroupQuery is now correctly parsed.
- Fixed: joinGroup was calling the wrong method.

## v7.9.1 - Mar 24, 2022

+ Fixed: make use of HTTPS for maven repository.
+ Fixed: remove warnings.

## v7.9.0 - Feb 17, 2022

+ New: improved find for labels and hashtags.
+ New: find topics and groups by labels and properties.
+ New: find activities by content, labels and properties
+ New: get suggested users based on user connections and trending users
+ New: follow labels and tags to see related content in the user’s timeline.
+ New: bookmark activities and get all the bookmarked activities from the user.
+ New: get reacted or voted activities from the user.
+ New: filter activities by mentions of a user or the app.
+ Fixed: added missing PendingIntent.FLAG_IMMUTABLE flag to which caused crash on Android 12.
+ Fixed: isBanned() is now correctly updated if the ban expiration happens while the user is using the app.
+ Fixed: Push Notifications were not opening the app on Android 12.
+ Fixed: error when trying to open Native Share option on Android 12.
+ Fixed: Push Notifications listeners not working correctly on Android 12.
+ Overall improvements.

## v7.3.2 - Oct 26, 2021

+ New: added `BanInfo` to `CurrentUser`.

## v7.3.1 - Oct 14, 2021

+ Overall improvements.

## v7.3.0 - Oct 1, 2021

+ New: added support for trusted identities. [read more](https://docs.getsocial.im/guides/user-management/identify-users/#add-trusted-identity).
+ New: added possibility to filter for trending activities, topics and groups.

## v7.2.3 - Sep 23, 2021

+ Fix issue with not invoked Push Notification listener.

## v7.2.2 - Sep 17, 2021

+ Fix issue with limit parameter when fetching chat objects.

## v7.2.1 - Aug 12, 2021

+ Fix issue with incorrect Android SDK version.

## v7.2.0 - Jul 21, 2021

+ Polls feature: [read more](https://docs.getsocial.im/guides/communities/feeds/polls/).

## v7.1.5 - May 18, 2021

+ Fix link parameters issue when creating invite URL on iOS.

## v7.1.4 - Mar 25, 2021

+ Fix `providerId` casing issue when adding an identity.

## v7.1.3 - Mar 22, 2021

+ Added new method to refresh current user.
+ Overall improvements.

## v7.1.2 - Mar 17, 2021

+ Fix issue when creating invite content.

## v7.1.1 - Feb 12, 2021

+ Fix issue when posting Activity

## v7.1.0 - Feb 12, 2021

+ Added [Groups](https://docs.getsocial.im/guides/communities/groups/) and [Chat](https://docs.getsocial.im/guides/communities/chats/) features.
+ Fix issue with AnnouncementsQuery.

## v7.0.15 - Feb 10, 2021

+ Fix issue with background mode on iOS.

## v7.0.14 - Feb 10, 2021

+ Fix incorrect result of isAnonymous() call.

## v7.0.13 - Feb 8, 2021

+ Fix issue with removing Activities on Android.

## v7.0.12 - Feb 8, 2021

+ Fix issue with removing Activities on iOS.

## v7.0.11 - Feb 1, 2021

+ Fix issues with adding - removing reactions.

## v7.0.10 - Feb 1, 2021

+ Fix Referral data edge case issue on Android.

## v7.0.9 - Jan 22, 2021

+ Fix `Bridge is not set` issue on iOS when reloading JS content.

## v7.0.8 - Jan 18, 2021

+ Fix issue when sending custom invite content without default UI.

## v7.0.7 - Dec 29, 2020

+ Fix issue when phone number used as identity access token.

## v7.0.6 - Dec 16, 2020

+ Fix issue with referral data listener on Android.

## v7.0.5 - Dec 9, 2020

+ Fix issue with referral data listener on iOS.

## v7.0.4 - Dec 1, 2020

+ Fix typo in Podspec.

## v7.0.3 - Dec 1, 2020

+ Fix issue with referral data listener.

## v7.0.2 - Dec 1, 2020

+ Overall improvements.
