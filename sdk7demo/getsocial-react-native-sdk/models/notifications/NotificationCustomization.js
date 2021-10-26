/* eslint-disable max-len */
// @flow

/**
 * NotificationCustomization object.
 */
export default class NotificationCustomization {
  backgroundImage: ?string
  titleColor: ?string
  textColor: ?string

  // eslint-disable-next-line require-jsdoc
  static create(): NotificationCustomization {
      const ins = new NotificationCustomization([]);
      return ins;
  }

  /**
   * Creates a new NotificationCustomization instance from the provider parameters.
   * @param {any} customizationMap customization parameters
   */
  constructor(customizationMap: any) {
      this.backgroundImage = customizationMap['backgroundImage'];
      this.titleColor = customizationMap['titleColor'];
      this.textColor = customizationMap['textColor'];
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {backgroundImage: this.backgroundImage, textColor: this.textColor, titleColor: this.titleColor};
  }
}
