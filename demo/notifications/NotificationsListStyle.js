// @flow

import {StyleSheet} from 'react-native';

export const NotificationsListStyle = StyleSheet.create({
  notificationListItem: {
    flex: 0,
    flexDirection: 'column',
    height: 170,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusRead: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    backgroundColor: 'white',
  },
  statusUnread: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    backgroundColor: 'green',
  },
});
