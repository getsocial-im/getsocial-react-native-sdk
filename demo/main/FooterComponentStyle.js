// @flow

import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const FooterComponentStyle = StyleSheet.create({
  footerComponent: {
    flex: 0,
    height: 18,
    width: width,
    backgroundColor: 'grey',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
