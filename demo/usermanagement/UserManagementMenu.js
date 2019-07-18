// @flow
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import {MenuItem} from './../common/MenuItem';
import {MenuStyle} from './../common/MenuStyle';
// eslint-disable-next-line no-unused-vars
import {showLoading, hideLoading} from './../common/LoadingIndicator';
// eslint-disable-next-line no-unused-vars
import UserInfoComponent from './../main/UserInfoComponent';
// eslint-disable-next-line no-unused-vars
import {Alert, FlatList, Text, View, TouchableWithoutFeedback, ReactDOM} from 'react-native';
import {GetSocialUser, AuthIdentity} from 'getsocial-react-native-sdk';
import {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

type Props = { navigation: Function }
type State = {
    menu : MenuItem[]
}

const randomDisplayNames = ['Batman', 'Spiderman', 'Captain America', 'Green Lantern',
  'Wolverine', 'Catwomen', 'Iron Man', 'Superman', 'Wonder Woman', 'Aquaman'];

export default class UserManagementMenu extends Component<Props, State> {
    static navigationOptions = {title: 'User Management'};

    currentTimestamp() {
      return Math.floor(Date.now() / 1000);
    }

    generateRandomNum() {
      return this.currentTimestamp()%4;
    }

    fbLogin = async () => {
      // Attempt a login using the Facebook login dialog asking for default permissions.
      LoginManager.logInWithReadPermissions(['email', 'user_friends', 'public_profile']).then((result) => {
        if (result.isCancelled) {
          console.log('FB Login cancelled');
        } else {
          const permissions = result.grantedPermissions;
          if (permissions != null) {
            console.log('FB Login success with permissions: ' + JSON.stringify(permissions));
            this.addFBIdentity();
          }
        }
      }, (error) => {
        console.log('FB login failed with error: ' + error);
      });
    }

    setRandomDisplayName = async () => {
      const newDisplayName = randomDisplayNames[this.generateRandomNum()];
      this.changeDisplayName(newDisplayName);
    }

    changeDisplayName= async (newDisplayName: string) => {
      showLoading();
      GetSocialUser.setDisplayName(newDisplayName).then(() => {
        hideLoading();
        Alert.alert('Display name', 'Display name was changed.');
        global.userInfoComponentRef.current.setState({userDisplayName: newDisplayName});
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    setRandomAvatarUrl = async () => {
      const newAvatarUrl = 'https://api.adorable.io/avatars/200/' + this.generateRandomNum() + '.png';
      this.changeUserAvatar(newAvatarUrl);
    }

    changeUserAvatar= async (newAvatarUrl: string) => {
      showLoading();
      GetSocialUser.setAvatarUrl(newAvatarUrl).then(() => {
        hideLoading();
        Alert.alert('Avatar Url', 'Avatar Url was changed.');
        global.userInfoComponentRef.current.setState({userAvatarUrl: newAvatarUrl});
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    updateUserDetails = async () => {
      GetSocialUser.isAnonymous().then((isAnonymous) => {
        if (isAnonymous) {
          global.userInfoComponentRef.current.setState({userIdentities: 'Anonymous'});
        } else {
          GetSocialUser.getAuthIdentities().then((authIdentities: Map<string, string>) => {
            global.userInfoComponentRef.current.setState({userIdentities: JSON.stringify(authIdentities)});
          });
        }
      });
      GetSocialUser.getDisplayName().then((displayName) => {
        global.userInfoComponentRef.current.setState({userDisplayName: displayName});
      });
      GetSocialUser.getAvatarUrl().then((avatarUrl) => {
        if (avatarUrl != '') {
          global.userInfoComponentRef.current.setState({userAvatarUrl: avatarUrl});
        } else {
          global.userInfoComponentRef.current.setState({userAvatarUrl: undefined});
        }
      });
    }

    setUserProperty = async () => {
      const newValue = 'publicproperty' + this.currentTimestamp();
      showLoading();
      GetSocialUser.setPublicProperty('DEMO_PUBLIC_KEY', newValue).then(() => {
        hideLoading();
        Alert.alert('Public property', 'Property value has been set to [' + newValue + ']');
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    getUserProperty = async () => {
      showLoading();
      GetSocialUser.getPublicProperty('DEMO_PUBLIC_KEY').then((propertyValue) => {
        hideLoading();
        Alert.alert('Public property', 'Property value is [' + propertyValue + ']');
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    fetchUserProfile = async () => {
      const fetchProfileRequest = new GraphRequest('/me', {
        httpMethod: 'GET',
        version: 'v2.5',
        parameters: {
          'fields': {
            'string': 'email,name, friends, picture',
          },
        },
      }, (err, res) => {
        if (err == null && res != null) {
          this.changeDisplayName(res['name']);
          this.changeUserAvatar(res['picture']['data']['url']);
        } else {
          Alert.alert('Error', err);
        }
      });
      // Start the graph request.
      new GraphRequestManager().addRequest(fetchProfileRequest).start();
    }

    addFBIdentity = async () => {
      AccessToken.getCurrentAccessToken().then((token) => {
        if (token != null) {
          console.log('FB Token is: ' + token.accessToken);
          const fbIdentity = AuthIdentity.createFacebookIdentity(token.accessToken);
          GetSocialUser.addAuthIdentity(fbIdentity, () => {
            hideLoading();
            Alert.alert('FB Identity', 'FB Identity successfully added.');
            this.updateUserDetails();
            this.fetchUserProfile();
          }, (conflictUser) => {
            hideLoading();
            Alert.alert('FB Identity', 'User conflict with remote user', [
              {text: 'Use Remote (' + conflictUser.displayName + ')', onPress: () => {
                this.switchUser(fbIdentity, true);
              }},
              {text: 'Use Current', onPress: () => {/* use current user */}},
              {text: 'Cancel', onPress: () => {/* do nothing */}},
            ]);
          }, (error) => {
            hideLoading();
            Alert.alert('FB Add Identity Error', JSON.stringify(error));
          });
        }
      }, (error) => {
        Alert.alert('FB Error', error['code']);
      });
    }

    addCustomIdentity = async () => {
      const customIdentity = AuthIdentity.createCustomIdentity('rncustomproviderid', 'RNUSER', 'RNTOKEN');
      showLoading();
      GetSocialUser.addAuthIdentity(customIdentity, () => {
        hideLoading();
        Alert.alert('Custom Identity', 'Custom Identity successfully added.');
        this.updateUserDetails();
      }, (conflictUser) => {
        hideLoading();
        Alert.alert('Custom Identity', 'User conflict with remote user', [
          {text: 'Use Remote (' + conflictUser.displayName + ')', onPress: () => {
            this.switchUser(customIdentity, false);
          }},
          {text: 'Use Current', onPress: () => {/* use current user */}},
          {text: 'Cancel', onPress: () => {/* do nothing */}},
        ]);
      }, (error) => {
        hideLoading();
        Alert.alert('Error', JSON.stringify(error));
      });
    }

    removeFBIdentity = async () => {
      GetSocialUser.getAuthIdentities().then((identities) => {
        // $FlowFixMe
        if (identities['facebook'] != undefined) {
          showLoading();
          GetSocialUser.removeAuthIdentity('facebook').then(() => {
            hideLoading();
            Alert.alert('FB Identity', 'FB Identity successfully removed.');
            this.updateUserDetails();
          }, (error) => {
            hideLoading();
            Alert.alert('Error', error['code']);
          });
        } else {
          Alert.alert('Warning', 'User doesnt have Facebook identity');
        }
      });
    }

    removeCustomIdentity = async () => {
      GetSocialUser.getAuthIdentities().then((identities) => {
        // $FlowFixMe
        if (identities['rncustomproviderid'] != undefined) {
          showLoading();
          GetSocialUser.removeAuthIdentity('rncustomproviderid').then(() => {
            hideLoading();
            Alert.alert('Custom Identity', 'Custom Identity successfully removed.');
            this.updateUserDetails();
          }, (error) => {
            Alert.alert('Error', error['code']);
          });
        } else {
          hideLoading();
          Alert.alert('Warning', 'User doesnt have custom identity');
        }
      });
    }

    switchUser = async (customIdentity: AuthIdentity, fetchFBDetails: boolean) => {
      showLoading();
      GetSocialUser.switchUser(customIdentity).then(() => {
        hideLoading();
        Alert.alert('Switch User', 'Successfully switched user.');
        if (fetchFBDetails) {
          this.fetchUserProfile();
        } else {
          this.updateUserDetails();
        }
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    logout = async () => {
      showLoading();
      GetSocialUser.reset().then(()=> {
        hideLoading();
        Alert.alert('Logout', 'User logged out from all identities.');
      }, (error) => {
        hideLoading();
        Alert.alert('Error', error['code']);
      });
    }

    constructor(props: any) {
      super(props);

      const changeDisplayName = new MenuItem();
      changeDisplayName.key = 'changeDisplayName';
      changeDisplayName.title = 'Change Display Name';
      changeDisplayName.action = () => this.setRandomDisplayName();

      const changeUserAvatar = new MenuItem();
      changeUserAvatar.key = 'changeUserAvatar';
      changeUserAvatar.title = 'Change User Avatar';
      changeUserAvatar.action = () => this.setRandomAvatarUrl();

      const setUserProperty = new MenuItem();
      setUserProperty.key = 'setUserProperty';
      setUserProperty.title = 'Set User Property';
      setUserProperty.action = () => this.setUserProperty();

      const getUserProperty = new MenuItem();
      getUserProperty.key = 'getUserProperty';
      getUserProperty.title = 'Get User Property';
      getUserProperty.action = () => this.getUserProperty();

      const addFBIdentity = new MenuItem();
      addFBIdentity.key = 'addFBIdentity';
      addFBIdentity.title = 'Add Facebook Identity';
      addFBIdentity.action = () => this.fbLogin();

      const addCustomIdentity = new MenuItem();
      addCustomIdentity.key = 'addCustomIdentity';
      addCustomIdentity.title = 'Add Custom Identity';
      addCustomIdentity.action = () => this.addCustomIdentity();

      const removeFBIdentity = new MenuItem();
      removeFBIdentity.key = 'removeFBIdentity';
      removeFBIdentity.title = 'Remove Facebook Identity';
      removeFBIdentity.action = () => this.removeFBIdentity();

      const removeCustomIdentity = new MenuItem();
      removeCustomIdentity.key = 'removeCustomIdentity';
      removeCustomIdentity.title = 'Remove Custom Identity';
      removeCustomIdentity.action = () => this.removeCustomIdentity();

      const logout = new MenuItem();
      logout.key = 'logout';
      logout.title = 'Logout';
      logout.action = () => this.logout();

      const mainMenu = [changeDisplayName, changeUserAvatar, setUserProperty, getUserProperty,
        addFBIdentity, addCustomIdentity, removeFBIdentity, removeCustomIdentity, logout];

      this.state = {
        menu: mainMenu,
      };
    }

    menuItemSelected(menuItem : MenuItem) {
      if (menuItem.navigateTo != null) {
        this.props.navigation.navigate(menuItem.navigateTo);
      }
      if (menuItem.action != null) {
        menuItem.action();
      }
    }

    render() {
      return (
        <View style={MenuStyle.container}>
          {/* menu starts */}
          <View style={MenuStyle.menuContainer}>
            <FlatList style={{flex: 1}}
              data={this.state.menu}
              renderItem={({item}) => (
                <TouchableWithoutFeedback onPress={ () => this.menuItemSelected(item)}>
                  <View style={MenuStyle.listitem}>
                    <Text style={MenuStyle.menuitem}>{item.title}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.key}
            />
          </View>
          {/* menu ends */}
        </View>
      );
    }
}

