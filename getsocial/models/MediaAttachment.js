// @flow

/**
 * Media attachment class.
 */
export default class MediaAttachment {
  #imageUrl = null;
  #imageUri = null;
  #videoUrl = null;
  #videoUri = null;

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
   * @param {string} imageUri Uri of the image.
   * Creates media attachment instance with local image uri.
   * @return {MediaAttachment} Created media attachment instance.
   */
  static withLocalImageUri(imageUri: string): MediaAttachment {
    const ma = new MediaAttachment();
    ma.#imageUri = imageUri;
    return ma;
  }

  /**
   * Creates media attachment instance with local video uri.
   * @param {string} videoUri Uri of the video.
   * @return {MediaAttachment} Created media attachment instance.
   */
  static withLocalVideoUri(videoUri: string): MediaAttachment {
    const ma = new MediaAttachment();
    ma.#videoUri = videoUri;
    return ma;
  }

  /**
   * Generates JSON string.
   * @return {string} object as json.
   */
  toJSON(): string {
    return JSON.stringify({
      'imageUrl': this.#imageUrl,
      'imageUri': this.#imageUri,
      'videoUrl': this.#videoUrl,
      'videoUri': this.#videoUri,
    });
  }
}
