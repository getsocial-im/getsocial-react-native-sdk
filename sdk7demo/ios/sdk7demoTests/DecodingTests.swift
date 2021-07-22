//
//  DecodingTests.swift
//  sdk7demoTests
//
//  Created by Gábor Vass on 17/02/2021.
//

import XCTest
import GetSocialSDK

class DecodingTests: XCTestCase {

  func test_action() {
    self.execute(folder: "action", onDecode: { (result: Action?) in
      XCTAssertNotNil(result)
    })
  }

  func test_activitiesquery() {
    self.execute(folder: "activitiesquery", onDecode: { (result: ActivitiesQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_activitybutton() {
    self.execute(folder: "activitybutton", onDecode: { (result: ActivityButton?) in
      XCTAssertNotNil(result)
    })
  }

  func test_activitycontent() {
    self.execute(folder: "activitycontent", onDecode: { (result: ActivityContent?) in
      XCTAssertNotNil(result)
    })
  }

  func test_addgroupmembersquery() {
    self.execute(folder: "addgroupmembersquery", onDecode: { (result: UpdateGroupMembersQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_announcementsquery() {
    self.execute(folder: "announcementsquery", onDecode: { (result: AnnouncementsQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_chatid() {
    self.execute(folder: "chatid", onDecode: { (result: ChatId?) in
      XCTAssertNotNil(result)
    })
  }

  func test_chatmessagecontent() {
    self.execute(folder: "chatmessagecontent", onDecode: { (result: ChatMessageContent?) in
      XCTAssertNotNil(result)
    })
  }

  func test_chatmessagespagingquery() {
    self.execute(folder: "chatmessagespagingquery", onDecode: { (result: ChatMessagesPagingQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_chatmessagesquery() {
    self.execute(folder: "chatmessagesquery", onDecode: { (result: ChatMessagesQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_followersquery() {
    self.execute(folder: "followersquery", onDecode: { (result: FollowersQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_followquery() {
    self.execute(folder: "followquery", onDecode: { (result: FollowQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_friendsquery() {
    self.execute(folder: "friendsquery", onDecode: { (result: FriendsQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_groupcontent() {
    self.execute(folder: "groupcontent", onDecode: { (result: GroupContent?) in
      XCTAssertNotNil(result)
    })
  }

  func test_groupsquery() {
    self.execute(folder: "groupsquery", onDecode: { (result: GroupsQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_identity() {
    self.execute(folder: "identity", onDecode: { (result: Identity?) in
      XCTAssertNotNil(result)
    })
  }

  func test_joingroupquery() {
    self.execute(folder: "joingroupquery", onDecode: { (result: UpdateGroupMembersQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_mediaattachment() {
    self.execute(folder: "mediaattachment", onDecode: { (result: MediaAttachment?) in
      XCTAssertNotNil(result)
    })
  }

  func test_membersquery() {
    self.execute(folder: "membersquery", onDecode: { (result: MembersQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_polloptioncontent() {
    self.execute(folder: "polloptioncontent", onDecode: { (result: PollOptionContent?) in
      XCTAssertNotNil(result)
    })
  }

  func test_pollcontent() {
    self.execute(folder: "pollcontent", onDecode: { (result: PollContent?) in
      XCTAssertNotNil(result)
    })
  }

  func test_postactivitytarget() {
    self.execute(folder: "postactivitytarget", onDecode: { (result: PostActivityTarget?) in
      XCTAssertNotNil(result)
    })
  }

  // TODO: fix purchase data
  func atest_purchaseData() {
    self.execute(folder: "purchasedata", onDecode: { (result: PurchaseData?) in
      //XCTAssertNotNil(result)
    })
  }

  func test_reactionsquery() {
    self.execute(folder: "reactionsquery", onDecode: { (result: ReactionsQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_removeactivitiesquery() {
    self.execute(folder: "removeactivitiesquery", onDecode: { (result: RemoveActivitiesQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_removegroupmembersquery() {
    self.execute(folder: "removegroupmembersquery", onDecode: { (result: RemoveGroupMembersQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_tagsquery() {
    self.execute(folder: "tagsquery", onDecode: { (result: TagsQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_topicsquery() {
    self.execute(folder: "topicsquery", onDecode: { (result: TopicsQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_usersquery() {
    self.execute(folder: "usersquery", onDecode: { (result: UsersQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_votesquery() {
    self.execute(folder: "votesquery", onDecode: { (result: VotesQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_userid() {
    self.execute(folder: "userid", onDecode: { (result: UserId?) in
      XCTAssertNotNil(result)
    })
  }

  func test_useridlist() {
    self.execute(folder: "useridlist", onDecode: { (result: UserIdList?) in
      XCTAssertNotNil(result)
    })
  }

  func test_userupdate() {
    self.execute(folder: "userupdate", onDecode: { (result: UserUpdate?) in
      XCTAssertNotNil(result)
    })
  }

  func test_invitecontent() {
    self.execute(folder: "invitecontent", onDecode: { (result: InviteContent?) in
      XCTAssertNotNil(result)
    })
  }

  func test_notificationbadge() {
    self.execute(folder: "notificationbadge", onDecode: { (result: NotificationBadge?) in
      XCTAssertNotNil(result)
    })
  }

  func test_notificationcustomization() {
    self.execute(folder: "notificationcustomization", onDecode: { (result: NotificationCustomization?) in
      XCTAssertNotNil(result)
    })
  }

  func test_notificationsquery() {
    self.execute(folder: "notificationsquery", onDecode: { (result: NotificationsQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_sendnotificationtarget() {
    self.execute(folder: "sendnotificationtarget", onDecode: { (result: SendNotificationTarget?) in
      XCTAssertNotNil(result)
    })
  }

  func test_referralusersquery() {
    self.execute(folder: "referralusersquery", onDecode: { (result: ReferralUsersQuery?) in
      XCTAssertNotNil(result)
    })
  }

  func test_promocodecontent() {
    self.execute(folder: "promocodecontent", onDecode: { (result: PromoCodeContent?) in
      XCTAssertNotNil(result)
    })
  }

}
