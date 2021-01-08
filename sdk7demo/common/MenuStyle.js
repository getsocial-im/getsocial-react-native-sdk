// @flow

import {StyleSheet, Platform, Dimensions} from 'react-native';
import { ScreenStackHeaderRightView } from 'react-native-screens';

const {width} = Dimensions.get('window');

export const MenuStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#F5FCFF',
  },
  footer: {
    flex: 1,
    height: 20,
    width: width,
    justifyContent: 'flex-end',
    backgroundColor: 'grey',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
  },
  listitem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 40,
    width: width,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  listitemWithCheckbox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 60,
    width: width,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  menuitem: {
    fontSize: 18,
    textAlign: 'left',
    margin: 6,
  },
  rowEndContainer: {
    flex: 1,
    width: 100,
    alignItems: 'flex-end',
  },

});
