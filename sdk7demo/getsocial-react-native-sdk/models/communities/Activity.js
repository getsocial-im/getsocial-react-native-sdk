// @flow
import User from './User.js';
import MediaAttachment from './../MediaAttachment.js';
import ActivityButton from './ActivityButton.js';
import UserReactions from './UserReactions.js';
import Mention from './Mention.js';
import CommunitiesEntity from './CommunitiesEntity.js';

/**
 * Activity object.
 */
export default class Activity {
    id: string;
    text: ?string;
    author: User;
    mediaAttachments: Array<MediaAttachment> = [];
    button: ?ActivityButton;
    type: ?string;
    isAnnouncement: boolean = false;
    commentsCount: number = 0;
    reactionsCount: {[key: string] : number} = {};
    myReactions: Array<string> = [];
    reactions: Array<UserReactions> = [];
    commenters: Array<User> = [];
    properties: {[key: string] : string} = {};
    createdAt: number = 0;
    mentions: Array<Mention> = [];
    viewCount: number = 0;
    source: ?CommunitiesEntity;

    /**
    * Creates a new Activity instance from the provider parameters.
    * @param {any} activityMap activity parameters
    */
    constructor(activityMap: any) {
      this.id = activityMap['id'];
      this.text = activityMap['text'];
      const rawAuthor = activityMap['author'];
      if (rawAuthor !== undefined && rawAuthor != null) {
        this.author = new User(rawAuthor);
      }
      const rawAttachments = activityMap['attachments'];
      if (rawAttachments !== undefined && rawAttachments != null) {
        rawAttachments.forEach((attachmentMap) => {
          const attachment = new MediaAttachment(attachmentMap);
          this.mediaAttachments.push(attachment);
        });
      }
      const rawButton = activityMap['button'];
      if (rawButton != null) {
        this.button = new ActivityButton(rawButton);
      }
      this.type = activityMap['type'];
      this.isAnnouncement = activityMap['announcement'];
      this.commentsCount = activityMap['commentsCount'];
      this.reactionsCount = activityMap['reactionsCount'];
      this.myReactions = activityMap['myReactions'];
      const rawReactions = activityMap['reactions'];
      if (rawReactions !== undefined && rawReactions != null) {
        rawReactions.forEach((reactionMap) => {
          const reaction = new UserReactions(reactionMap);
          this.reactions.push(reaction);
        });
      }
      const rawCommenters = activityMap['commenters'];
      if (rawCommenters !== undefined && rawCommenters != null) {
        rawCommenters.forEach((commenter) => {
          const user = new User(commenter);
          this.commenters.push(user);
        });
      }
      this.properties = activityMap['properties'];
      this.createdAt = activityMap['createdAt'];
      const rawMentions = activityMap['mentions'];
      if (rawMentions !== undefined && rawMentions != null) {
        rawMentions.forEach((mentionMap) => {
          const mention = new Mention(mentionMap);
          this.mentions.push(mention);
        });
      }
      this.viewCount = activityMap['viewCount'];
      const rawSource = activityMap['source'];
      if (rawSource !== undefined && rawSource != null) {
        this.source = new CommunitiesEntity(rawSource);
      }
      Object.freeze(this);
    }
}
