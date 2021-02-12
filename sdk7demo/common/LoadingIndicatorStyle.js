// @flow

import {StyleSheet} from 'react-native';

export const LoadingIndicatorStyle = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        opacity: 0.7,
    },
});
