// @flow

import {StyleSheet} from 'react-native';

export const UserInfoComponentStyle = StyleSheet.create({
  userInfoComponent: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: '#dfe6e9',
    height: 41,
  },
  userAvatar: {
    flex: 1,
    width: 40,
    height: 40,
    padding: 10,
  },
  userDetailsContainer: {
    flex: 1,
    width: 200,
    height: 40,
  },
  username: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 6,
    marginTop: 2,
    marginRight: 6,
  },
  userinfo: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 6,
    marginRight: 6,
  },
});
