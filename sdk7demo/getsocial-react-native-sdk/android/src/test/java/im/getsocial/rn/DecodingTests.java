package im.getsocial.rn;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import im.getsocial.sdk.actions.Action;
import im.getsocial.sdk.communities.ActivitiesQuery;
import im.getsocial.sdk.communities.ActivityButton;
import im.getsocial.sdk.communities.ActivityContent;
import im.getsocial.sdk.communities.AddGroupMembersQuery;
import im.getsocial.sdk.communities.AnnouncementsQuery;
import im.getsocial.sdk.communities.ChatId;
import im.getsocial.sdk.communities.ChatMessageContent;
import im.getsocial.sdk.communities.ChatMessagesPagingQuery;
import im.getsocial.sdk.communities.ChatMessagesQuery;
import im.getsocial.sdk.communities.FollowQuery;
import im.getsocial.sdk.communities.FollowersQuery;
import im.getsocial.sdk.communities.FriendsQuery;
import im.getsocial.sdk.communities.GroupContent;
import im.getsocial.sdk.communities.GroupsQuery;
import im.getsocial.sdk.communities.Identity;
import im.getsocial.sdk.communities.JoinGroupQuery;
import im.getsocial.sdk.communities.MembersQuery;
import im.getsocial.sdk.communities.PollContent;
import im.getsocial.sdk.communities.PollOptionContent;
import im.getsocial.sdk.communities.PostActivityTarget;
import im.getsocial.sdk.communities.ReactionsQuery;
import im.getsocial.sdk.communities.RemoveActivitiesQuery;
import im.getsocial.sdk.communities.RemoveGroupMembersQuery;
import im.getsocial.sdk.communities.TagsQuery;
import im.getsocial.sdk.communities.TopicsQuery;
import im.getsocial.sdk.communities.UserId;
import im.getsocial.sdk.communities.UserIdList;
import im.getsocial.sdk.communities.UserUpdate;
import im.getsocial.sdk.communities.UsersQuery;
import im.getsocial.sdk.communities.VotesQuery;
import im.getsocial.sdk.iap.PurchaseData;
import im.getsocial.sdk.invites.InviteContent;
import im.getsocial.sdk.invites.ReferralUsersQuery;
import im.getsocial.sdk.json.GetSocialJson;
import im.getsocial.sdk.media.MediaAttachment;
import im.getsocial.sdk.notifications.NotificationContent;
import im.getsocial.sdk.notifications.NotificationCustomization;
import im.getsocial.sdk.notifications.NotificationsQuery;
import im.getsocial.sdk.notifications.SendNotificationTarget;
import im.getsocial.sdk.promocodes.PromoCodeContent;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class DecodingTests {

    @Test
    public void test_Action() throws FileNotFoundException {
        assertTrue(execute("action", Action.class));
    }

    @Test
    public void test_ActivitiesQuery() throws FileNotFoundException {
        assertTrue(execute("activitiesquery", ActivitiesQuery.class));
    }

    @Test
    public void test_ActivityButton() throws FileNotFoundException {
        assertTrue(execute("activitybutton", ActivityButton.class));
    }

    @Test
    public void test_ActivityContent() throws FileNotFoundException {
        assertTrue(execute("activitycontent", ActivityContent.class));
    }

    @Test
    public void test_AddGroupMembersQuery() throws FileNotFoundException {
        assertTrue(execute("addgroupmembersquery", AddGroupMembersQuery.class));
    }

    @Test
    public void test_AnnouncementsQuery() throws FileNotFoundException {
        assertTrue(execute("announcementsquery", AnnouncementsQuery.class));
    }
    @Test
    public void test_ChatId() throws FileNotFoundException {
        assertTrue(execute("chatid", ChatId.class));
    }
    @Test
    public void test_ChatMessageContent() throws FileNotFoundException {
        assertTrue(execute("chatmessagecontent", ChatMessageContent.class));
    }
    @Test
    public void test_ChatMessagesPagingQuery() throws FileNotFoundException {
        assertTrue(execute("chatmessagespagingquery", ChatMessagesPagingQuery.class));
    }
    @Test
    public void test_ChatMessagesQuery() throws FileNotFoundException {
        assertTrue(execute("chatmessagesquery", ChatMessagesQuery.class));
    }
    @Test
    public void test_FollowersQuery() throws FileNotFoundException {
        assertTrue(execute("followersquery", FollowersQuery.class));
    }
    @Test
    public void test_FollowQuery() throws FileNotFoundException {
        assertTrue(execute("followquery", FollowQuery.class));
    }
    @Test
    public void test_FriendsQuery() throws FileNotFoundException {
        assertTrue(execute("friendsquery", FriendsQuery.class));
    }
    @Test
    public void test_GroupContent() throws FileNotFoundException {
        assertTrue(execute("groupcontent", GroupContent.class));
    }
    @Test
    public void test_GroupsQuery() throws FileNotFoundException {
        assertTrue(execute("groupsquery", GroupsQuery.class));
    }
    @Test
    public void test_Identity() throws FileNotFoundException {
        assertTrue(execute("identity", Identity.class));
    }
    @Test
    public void test_JoinGroupQuery() throws FileNotFoundException {
        assertTrue(execute("joingroupquery", JoinGroupQuery.class));
    }
    @Test
    public void test_MediaAttachment() throws FileNotFoundException {
        assertTrue(execute("mediaattachment", MediaAttachment.class));
    }
    @Test
    public void test_MembersQuery() throws FileNotFoundException {
        assertTrue(execute("membersquery", MembersQuery.class));
    }

    @Test
    public void test_PollContent() throws FileNotFoundException {
        assertTrue(execute("pollcontent", PollContent.class));
    }

    @Test
    public void test_PollOptionContent() throws FileNotFoundException {
        assertTrue(execute("polloptioncontent", PollOptionContent.class));
    }

    @Test
    public void test_PostActivityTarget() throws FileNotFoundException {
        assertTrue(execute("postactivitytarget", PostActivityTarget.class));
    }
    @Test
    public void test_PurchaseData() throws FileNotFoundException {
        assertTrue(execute("purchasedata", PurchaseData.class));
    }
    @Test
    public void test_ReactionsQuery() throws FileNotFoundException {
        assertTrue(execute("reactionsquery", ReactionsQuery.class));
    }
    @Test
    public void test_RemoveActivitiesQuery() throws FileNotFoundException {
        assertTrue(execute("removeactivitiesquery", RemoveActivitiesQuery.class));
    }
    @Test
    public void test_RemoveGroupMembersQuery() throws FileNotFoundException {
        assertTrue(execute("removegroupmembersquery", RemoveGroupMembersQuery.class));
    }
    @Test
    public void test_TagsQuery() throws FileNotFoundException {
        assertTrue(execute("tagsquery", TagsQuery.class));
    }
    @Test
    public void test_TopicsQuery() throws FileNotFoundException {
        assertTrue(execute("topicsquery", TopicsQuery.class));
    }
    @Test
    public void test_UsersQuery() throws FileNotFoundException {
        assertTrue(execute("usersquery", UsersQuery.class));
    }
    @Test
    public void test_UserId() throws FileNotFoundException {
        assertTrue(execute("userid", UserId.class));
    }
    @Test
    public void test_UserIdList() throws FileNotFoundException {
        assertTrue(execute("useridlist", UserIdList.class));
    }
    @Test
    public void test_UserUpdate() throws FileNotFoundException {
        assertTrue(execute("userupdate", UserUpdate.class));
    }
    @Test
    public void test_InviteContent() throws FileNotFoundException {
        assertTrue(execute("invitecontent", InviteContent.class));
    }
    @Test
    public void test_NotificationBadge() throws FileNotFoundException {
        assertTrue(execute("notificationbadge", NotificationContent.Badge.class));
    }
    @Test
    public void test_NotificationCustomization() throws FileNotFoundException {
        assertTrue(execute("notificationcustomization", NotificationCustomization.class));
    }
    @Test
    public void test_NotificationsQuery() throws FileNotFoundException {
        assertTrue(execute("notificationsquery", NotificationsQuery.class));
    }
    @Test
    public void test_SendNotificationTarget() throws FileNotFoundException {
        assertTrue(execute("sendnotificationtarget", SendNotificationTarget.class));
    }
    @Test
    public void test_ReferralUsersQuery() throws FileNotFoundException {
        assertTrue(execute("referralusersquery", ReferralUsersQuery.class));
    }

    @Test
    public void test_PromoCodeContent() throws FileNotFoundException {
        assertTrue(execute("promocodecontent", PromoCodeContent.class));
    }

    @Test
    public void test_VotesQuery() throws FileNotFoundException {
        assertTrue(execute("votesquery", VotesQuery.class));
    }

    // region Private
    private <T> boolean execute(String directory, Class<T> clazz) throws FileNotFoundException {
        File[] testFiles = getTestFiles(directory);
        if (testFiles.length == 0) {
            throw new FileNotFoundException();
        }
        boolean isValid = false;
        for (File file: testFiles) {
            String testData = getTestFileContent(file);
            isValid = GetSocialJson.parse(testData, clazz) != null;
        }
        return isValid;
    }

    private File[] getTestFiles(String directory) throws FileNotFoundException {
        File file = new File("./../../../jsonbridge-testdata/wrapper_to_native/" + directory);
        if (file.isDirectory()) {
            return file.listFiles();
        }
        throw new FileNotFoundException();

    }
    private String getTestFileContent(File file) throws FileNotFoundException {
        String fileContent = "";
        if (file.exists()) {
            FileInputStream fin = null;
            byte[] byteContent = null;
            try {
                fin = new FileInputStream(file);
                byteContent = new byte[(int) file.length()];
                fin.read(byteContent);
            } catch (Exception ioe) {
                throw new FileNotFoundException();
            } finally {
                // close the streams using close method
                try {
                    if (fin != null) {
                        fin.close();
                    }
                } catch (IOException ioe) {
                    System.out.println("Error while closing stream: " + ioe);
                }
            }
            fileContent = new String(byteContent);
        }
        return fileContent;
    }
}
