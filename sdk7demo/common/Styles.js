
// @flow

import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';

export const Styles = StyleSheet.create({
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
    pickerRowFirst: {
        flex: 0,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                zIndex: 200,
            },
        }),
    },
    pickerRowSecond: {
        flex: 0,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                zIndex: 100,
            },
        }),
    },
    formEntryRow28: {
        flex: 0,
        flexDirection: 'row',
        height: 28,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 0,
    },
    formEntryRow40: {
        flex: 0,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    formEntryTitle: {
        fontSize: 18,
        textAlign: 'left',
    },
    formEntryTitle16: {
        fontSize: 16,
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
        paddingVertical: 0,
    },
    formEntryInput: {
        fontSize: 18,
        marginLeft: 20,
        textAlign: 'left',
        paddingVertical: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
