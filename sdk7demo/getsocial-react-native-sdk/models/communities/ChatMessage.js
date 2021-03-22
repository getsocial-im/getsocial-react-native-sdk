// @flow
import User from './User.js';
import MediaAttachment from './../MediaAttachment.js';

/**
 * ChatMessage object.
 */
export default class ChatMessage {
    id: string;
    text: ?string;
    author: User;
    attachments: Array<MediaAttachment> = [];
    properties: {[key: string] : string} = {};
    sentAt: number = 0;

    /**
    * Creates a new ChatMessage instance from the provider parameters.
    * @param {any} messageMap message parameters
    */
    constructor(messageMap: any) {
        this.id = messageMap['id'];
        this.text = messageMap['text'];
        const rawAuthor = messageMap['author'];
        if (rawAuthor !== undefined && rawAuthor != null) {
            this.author = new User(rawAuthor);
        }
        const rawAttachments = messageMap['attachments'];
        if (rawAttachments !== undefined && rawAttachments != null) {
            rawAttachments.forEach((attachmentMap) => {
                const attachment = new MediaAttachment(attachmentMap);
                this.attachments.push(attachment);
            });
        }
        this.properties = messageMap['properties'];
        this.sentAt = messageMap['sentAt'];
        Object.freeze(this);
    }
}
