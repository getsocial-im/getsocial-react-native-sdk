/* eslint-disable max-len */
// @flow
import {NativeModules} from 'react-native';
const {RNGetSocial} = NativeModules;

/**
 * Media attachment class.
 */
export default class MediaAttachment {
  #imageUrl = null;
  #base64Image = null;
  #videoUrl = null;
  #base64Video = null;

  /**
   * Creates media attachment instance with image url.
   * @param {string} imageUrl Url of the image.
   * @return {MediaAttachment} Created media attachment instance.
   */
  static withImageUrl(imageUrl: string): MediaAttachment {
      const ma = new MediaAttachment();
      ma.#imageUrl = imageUrl;
      return ma;
  }

  /**
   * Creates media attachment instance with video url.
   * @param {string} videoUrl Url of the video.
   * @return {MediaAttachment} Created media attachment instance.
   */
  static withVideoUrl(videoUrl: string): MediaAttachment {
      const ma = new MediaAttachment();
      ma.#videoUrl = videoUrl;
      return ma;
  }

  /**
   * Creates media attachment instance with base64 image.
   * @param {string} image Uri of the image.
   * @return {MediaAttachment} Created media attachment instance.
   */
  static withBase64Image(image: string): MediaAttachment {
      const ma = new MediaAttachment();
      ma.#base64Image = image.replace(/\r\n/g, '');
      return ma;
  }

  /**
   * Creates media attachment instance with Base64 video.
   * @param {string} video Uri of the video.
   * @return {MediaAttachment} Created media attachment instance.
   */
  static withBase64Video(video: string): MediaAttachment {
      const ma = new MediaAttachment();
      ma.#base64Video = video.replace(/\r\n/g, '');
      return ma;
  }

  // eslint-disable-next-line require-jsdoc
  static loadLocalResource(uri: string): Promise<string> {
      return RNGetSocial.loadLocalResource(uri);
  }

  /**
   * Returns image url.
   * @return {string} Image url.
   */
  getImageUrl(): ?string {
      return this.#imageUrl;
  }

  /**
   * Returns video url.
   * @return {string} Video url.
   */
  getVideoUrl(): ?string {
      return this.#videoUrl;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON() {
      return {gifUrl: null, image: this.#base64Image ?? null, imageUrl: this.#imageUrl ?? null, video: this.#base64Video ?? null, videoUrl: this.#videoUrl ?? null};
  }

  // eslint-disable-next-line require-jsdoc
  constructor(attachmentMap: any) {
      this.#imageUrl = attachmentMap == null ? null : attachmentMap['imageUrl'];
      this.#videoUrl = attachmentMap == null ? null :attachmentMap['videoUrl'];
  }
}
