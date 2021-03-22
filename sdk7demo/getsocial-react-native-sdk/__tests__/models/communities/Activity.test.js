import Activity from './../../../models/communities/Activity.js';

const {readTestData} = require('./../../utils/TestUtils.test.js');

// Test json received from bridge
const testData = readTestData('encodedobjects', 'activity.json');
const activity = new Activity(JSON.parse(testData));
test('parsed Activity object properties must match', () => {
    expect(activity.id).toBe('activityid');
    expect(activity.commentsCount).toBe(20);
    expect(activity.createdAt).toBe(100);
    expect(activity.isAnnouncement).toBe(true);
    expect(activity.text).toBe('activitytext');
    expect(activity.status).toBe('status');
    const mentions = activity.mentions;
    expect(mentions.length).toBe(2);
    const mention1 = mentions[0];
    expect(mention1.type).toBe(1);
    expect(mention1.startIndex).toBe(111);
    expect(mention1.endIndex).toBe(222);
    expect(mention1.userId).toBe('userId');

    const mention2 = mentions[1];
    expect(mention2.type).toBe(0);
    expect(mention2.startIndex).toBe(111);
    expect(mention2.endIndex).toBe(222);
    expect(mention2.userId).toBe('userId');

    const myReactions = activity.myReactions;
    expect(myReactions.length).toBe(2);
    expect(myReactions[0]).toBe('like');
    expect(myReactions[1]).toBe('wow');
    expect(activity.properties['activitykey']).toBe('activityvalue');

    const button = activity.button;
    expect(button.title).toBe('title');
    const action = button.action;
    expect(action.type).toBe('hello2');
    expect(action.data['actionKey2']).toBe('actionValue2');

    const reactionsCount = activity.reactionsCount;
    expect(reactionsCount['like']).toBe(10);
    expect(reactionsCount['wow']).toBe(5);

    const reactions = activity.reactions;
    const reaction1 = reactions[0];
    const reactionUser1 = reaction1.user;
    expect(reactionUser1.userId).toBe('userid');
    expect(reactionUser1.avatarUrl).toBe('avatarurl');
    expect(reactionUser1.displayName).toBe('testuser');
    expect(reactionUser1.identities['fb']).toBe('token');
    expect(reactionUser1.publicProperties['publickey']).toBe('publicvalue');
    expect(reactionUser1.isVerified).toBe(true);

    expect(reaction1.reactions[0]).toBe('hello');

    const reaction2 = reactions[1];
    const reactionUser2 = reaction2.user;
    expect(reactionUser2.userId).toBe('userid');
    expect(reactionUser2.avatarUrl).toBe('avatarurl');
    expect(reactionUser2.displayName).toBe('testuser');
    expect(reactionUser2.identities['fb']).toBe('token');
    expect(reactionUser2.publicProperties['publickey']).toBe('publicvalue');
    expect(reactionUser2.isVerified).toBe(true);
    expect(reaction2.reactions[0]).toBe('love');
    expect(reaction2.reactions[1]).toBe('hate');

    const entity = activity.source;
    expect(entity.avatarUrl).toBe('avatarurl');
    expect(entity.followersCount).toBe(10);
    expect(entity.id).toBe('sourceid');
    expect(entity.isFollowedByMe).toBe(true);
    expect(entity.title).toBe('sourcetitle');
    expect(entity.type).toBe(6);
    
    const commenters = activity.commenters;
    const commenter1 = commenters[0];
    expect(commenter1.userId).toBe('userid');
    expect(commenter1.avatarUrl).toBe('avatarurl');
    expect(commenter1.displayName).toBe('testuser');
    expect(commenter1.identities['fb']).toBe('token');
    expect(commenter1.publicProperties['publickey']).toBe('publicvalue');
    expect(commenter1.isVerified).toBe(true);

    const commenter2 = commenters[1];
    expect(commenter2.userId).toBe('userid');
    expect(commenter2.avatarUrl).toBe('avatarurl');
    expect(commenter2.displayName).toBe('testuser');
    expect(commenter2.identities['fb']).toBe('token');
    expect(commenter2.publicProperties['publickey']).toBe('publicvalue');
    expect(commenter2.isVerified).toBe(true);

    const attachments = activity.mediaAttachments;
    const attachment1 = attachments[0];
    expect(attachment1.getImageUrl()).toBe('imageurl');

    const attachment2 = attachments[1];
    expect(attachment2.getImageUrl()).toBe('imageurl2');

    const author = activity.author;
    expect(author.userId).toBe('userid');
    expect(author.avatarUrl).toBe('avatarurl');
    expect(author.displayName).toBe('testuser');
    expect(author.identities['fb']).toBe('token');
    expect(author.publicProperties['publickey']).toBe('publicvalue');
    expect(author.isVerified).toBe(true);
});
