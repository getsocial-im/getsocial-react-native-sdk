// @flow

/**
 * Media attachment class.
 */
export default class MediaAttachment {
  #imageUrl = null;
  #videoUrl = null;

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
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    return JSON.stringify({
      'imageUrl': this.#imageUrl,
      'videoUrl': this.#videoUrl,
    });
  }
}
