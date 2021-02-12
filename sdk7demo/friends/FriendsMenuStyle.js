// @flow

import {StyleSheet} from 'react-native';

export const FriendsMenuStyle = StyleSheet.create({
    inputRow: {
        flex: 0,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    suggestFriendsRow: {
        flex: 0,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputTitle: {
        fontSize: 18,
        textAlign: 'left',
    },
    inputTitleContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    inputTextContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        borderColor: 'gray',
        backgroundColor: 'white',
        borderWidth: 1,
    },
    inputText: {
        fontSize: 18,
        marginLeft: 20,
        textAlign: 'left',
    },
    inputButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    removeButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
