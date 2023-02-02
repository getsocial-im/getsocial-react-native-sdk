// @flow

import {StyleSheet, Platform, Dimensions} from 'react-native';

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
    listitem3rows: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 60,
        width: width,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },
    listitem4rows: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 80,
        width: width,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },
    listitem5rows: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 100,
        width: width,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },
    listitem6rows: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 120,
        width: width,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },
    listitem7rows: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 140,
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
    menuitem14: {
        fontSize: 14,
        textAlign: 'left',
        marginLeft: 6,
        flexWrap: 'wrap',
    },
    rowEndContainer: {
        flex: 1,
        // width: '20%',
        alignItems: 'flex-end',
    },

});
