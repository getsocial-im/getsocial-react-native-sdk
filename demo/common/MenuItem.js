/* eslint-disable require-jsdoc */
// @flow

class MenuItem {
  key: string
  title: string
  action: ?() => {}
  navigateTo: ?string
  showStatus: boolean
}

export {MenuItem};


