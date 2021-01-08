// @flow

import {StyleSheet} from 'react-native';

export const UserDetailsViewStyle = StyleSheet.create({
  formEntryRow: {
    flex: 0,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formEntryTitle: {
    fontSize: 18,
    textAlign: 'left',
  },
  formEntryTitleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  formEntryInputContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  formEntryInput: {
    fontSize: 18,
    marginLeft: 20,
    textAlign: 'left',
  },
});
