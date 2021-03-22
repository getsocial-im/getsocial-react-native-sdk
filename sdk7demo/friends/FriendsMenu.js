// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
import {FriendsMenuStyle} from './FriendsMenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, TextInput, Button, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {Communities, User, UserId, FriendsQuery, PagingQuery, UserIdList} from './../getsocial-react-native-sdk';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[],
    newFriendGUID: string,
    friends: [User]
}

export default class FriendsMenu extends Component<Props, State> {
    static navigationOptions = {title: 'Friends'};

    loadFriends = async () => {
        showLoading();
        const friendsQuery = FriendsQuery.ofUser(UserId.currentUser());
        Communities.getFriends(new PagingQuery(friendsQuery)).then((result) => {
            hideLoading();
            this.setState({friends: result.entries});
        }, (error) => {
            hideLoading();
            Alert.alert('Error', error.message);
        });
    }

    addFriend = async () => {
        showLoading();
        const idList = UserIdList.create([this.state.newFriendGUID]);
        Communities.addFriends(idList).then((friendsNumber) => {
            hideLoading();
            Alert.alert('Friend Added', 'Number of friends: ' + friendsNumber);
            this.loadFriends();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', 'Failed to add friend.');
        });
    }

    removeFriend = async (friendId: string) => {
        showLoading();
        Communities.removeFriends(UserIdList.create([friendId])).then((friendsNumber) => {
            hideLoading();
            Alert.alert('Friend Removed', 'Number of friends: ' + friendsNumber);
            this.loadFriends();
        }, (error) => {
            hideLoading();
            Alert.alert('Error', 'Failed to remove friend');
        });
    }

    showSuggestedFriends = async () => {
        this.props.navigation.navigate('SuggestedFriends');
    }

    constructor(props: any) {
        super(props);

        const suggestFriends = new MenuItem();
        suggestFriends.key = 'suggestFriends';
        suggestFriends.title = 'Suggest Friends';

        const mainMenu = [suggestFriends];

        // $FlowFixMe
        const emptyFriends: [User]= [];
        this.state = {
            menu: mainMenu,
            newFriendGUID: '',
            friends: emptyFriends,
        };
    }

    componentDidMount() {
        this.loadFriends();
        this.props.navigation.addListener('willFocus', this.loadFriends);
    }

    render() {
        return (
            <View style={MenuStyle.container}>
                <View style={FriendsMenuStyle.inputRow}>
                    <View style={FriendsMenuStyle.inputTitleContainer}>
                        <Text style={FriendsMenuStyle.inputTitle}>Add friend: </Text>
                    </View>
                    <View style={FriendsMenuStyle.inputTextContainer}>
                        <TextInput accessibilityLabel='User GUID input' style={FriendsMenuStyle.inputText} value={this.state.newFriendGUID}
                            onChangeText={(text) => this.setState({newFriendGUID: text})} placeholder='User GUID'/>
                    </View>
                    <View style={FriendsMenuStyle.inputButtonContainer}>
                        <Button accessibilityLabel='Add friend button' style={FriendsMenuStyle.buttonStyle} title='Add' onPress={ this.addFriend }/>
                    </View>
                </View>
                <View style={FriendsMenuStyle.suggestFriendsRow}>
                    <Button accessibilityLabel='Show suggested friends button' style={FriendsMenuStyle.buttonStyle} title='Suggest Friends' onPress={ this.showSuggestedFriends }/>
                </View>
                {/* menu starts */}
                <View style={MenuStyle.menuContainer}>
                    <FlatList style={{flex: 1}}
                        data={this.state.friends}
                        renderItem={({item}) => (
                            <TouchableWithoutFeedback>
                                <View style={MenuStyle.listitem}>
                                    <Text style={MenuStyle.menuitem}>{item.displayName}</Text>
                                    <View style={FriendsMenuStyle.removeButtonContainer}>
                                        <Button title='Remove' onPress={ () => {
                                            this.removeFriend(item.userId);
                                        }}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item) => item.userId}
                    />
                </View>
                {/* menu ends */}
            </View>
        );
    }
}

