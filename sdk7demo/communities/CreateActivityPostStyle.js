
// @flow

import {StyleSheet} from 'react-native';

export const CreateActivityPostStyle = StyleSheet.create({
  sectionTitleRow: {
    flex: 0,
    flexDirection: 'row',
    height: 40,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  formEntryRow: {
    flex: 0,
    flexDirection: 'row',
    height: 50,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formEntryPickerContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  pickerStyle: {
    height: 44,
  },
});
