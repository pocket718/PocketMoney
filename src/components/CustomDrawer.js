import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Badge } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar, Icon, withBadge } from '@rneui/themed';
import CakeIcon from '../assets/svgImages/birthdayCakeIcon';
import { connect } from 'react-redux';
import * as actionCreator from '../redux/action';
import ProfileIcon from 'react-native-vector-icons/Ionicons';
import { DateFormatter } from '../utils/helpers';

const CustomDrawer = props => {
  const { profile, logout } = props;
  //console.log("profile",profile)

  return (
    // <View style={{flex: 1}}>
    //   <DrawerContentScrollView
    //     {...props}
    //     contentContainerStyle={{flex:1}}>
    //     <ImageBackground
    //       source={require('../assets/backgroundImages/sidebar.png')}
    //       style={{flex:1}}>
    //           {/* <View>
    //       <Avatar
    //         rounded
    //         source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
    //         size="large"
    //       />
    //         <Badge
    //           value={0}
    //           status="success"
    //           containerStyle={{ position: 'absolute', top: 10, left: 65}}
    //         />
    //         </View> */}
    //       {/* <Text
    //         style={{
    //           color: '#fff',
    //           fontSize: 18,
    //           //fontFamily: 'Roboto-Medium',
    //           marginBottom: 5,
    //         }}>
    //         John Doe
    //       </Text> */}
    //       {/* <View style={{flexDirection: 'row'}}>
    //         <Text
    //           style={{
    //             color: '#fff',
    //             fontFamily: 'Roboto-Regular',
    //             marginRight: 5,
    //           }}>
    //           280 Coins
    //         </Text>
    //         <FontAwesome5 name="coins" size={14} color="#fff" />
    //       </View> */}
    //     </ImageBackground>
    //     {/* <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
    //       <DrawerItemList {...props} />
    //     </View> */}
    //   </DrawerContentScrollView>
    //   {/* <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
    //     <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
    //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //         <Ionicons name="share-social-outline" size={22} />
    //         <Text
    //           style={{
    //             fontSize: 15,
    //             fontFamily: 'Roboto-Medium',
    //             marginLeft: 5,
    //           }}>
    //           Tell a Friend
    //         </Text>
    //       </View>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
    //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //         <Ionicons name="exit-outline" size={22} />
    //         <Text
    //           style={{
    //             fontSize: 15,
    //             fontFamily: 'Roboto-Medium',
    //             marginLeft: 5,
    //           }}>
    //           Sign Out
    //         </Text>
    //       </View>
    //     </TouchableOpacity>
    //   </View> */}
    // </View>
    <View style={{ flex: 1, borderRadius: 20 }}>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('../assets/backgroundImages/sidebar.png')}
        resizeMode="stretch">
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1.7 }}>
            <View
              style={{
                flex: 1.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: '100%',
                  justifyContent: 'center',
                }}>
                {/* <Avatar
            rounded
            source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
            size="large"
          />
            <Badge
              value={0}
              status="success"
              containerStyle={{ position: 'absolute', top: 10, left: 65}}
            /> */}
                <View
                  style={{
                    alignSelf: 'flex-start',
                    width: '40%',
                    height: '100%',
                  }}>
                  {profile?.profile_pic ? (
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 400 / 2,
                      }}
                      source={{
                        uri:
                          'https://cogito.sgp1.cdn.digitaloceanspaces.com' +
                          '/' +
                          profile.profile_pic,
                      }}
                    />
                  ) : (
                    <View style={{ width: '40%', height: '100%' }}>
                      <ProfileIcon
                        name="person-circle"
                        size={40}
                        color="#359db6"
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{ width: '80%', height: '100%' }}>
                  <View
                    style={{
                      height: '50%',
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#F89949',
                        fontWeight: '700',
                        fontSize: 12,
                      }}>
                      Parent's profile
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '50%',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        color: '#359DB6',
                        fontWeight: '700',
                        lineHeight: 24,
                        fontSize: 24,
                      }}>
                      {profile?.firstName}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 1.5, alignItems: 'center' }}>
              <View style={{ width: '80%', height: '100%' }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <CakeIcon />
                  </View>
                  <View style={{ flex: 4, justifyContent: 'center' }}>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 22,
                        color: '#6E6E6E',
                      }}>
                      {DateFormatter(profile?.dateOfBirth)}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}></View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Pressable
                onPress={() => {
                  logout();
                }}
                style={{
                  height: '80%',
                  width: '90%',
                  backgroundColor: '#E7A993',
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderLeftWidth: 1,
                  //borderWidth:1,
                  borderColor: '#000000',
                }}>
                <Text
                  style={{
                    marginLeft: 20,
                    fontWeight: '600',
                    //borderWidth:1,
                    //borderColor:'#000000',
                    color: '#FFFFFF',
                    fontSize: 16,
                    textShadowColor: '#000000',
                    textShadowRadius: 1,
                    textShadowOffset: { width: 0, height: -0.2 },
                    elevation: 5,
                  }}>
                  Logout
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = ({ authReducer, userReducer }) => {
  return {
    //loading: authReducer.loading,
    profile: userReducer.profile,
    // regUser: authReducer.regUser,
    // error: authReducer.error,
    // accounts: userReducer.accounts,
    // errorMessage: authReducer.errorMessage,
    // successMessage: authReducer.successMessage,
    // registered: authReducer.registered,
    // darkTheme: userReducer.darkTheme,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // RegisterAsync: data => dispatch(actionCreator.RegisterAsync(data)),
    // ResetErrors: () => dispatch(actionCreator.ResetErrors()),
    // getAccounts: () => dispatch(actionCreator.getAccounts()),
    // logout: () => dispatch(actionCreator.OnLogout()),
    logout: () => dispatch(actionCreator.OnLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
