import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreator from '../redux/action';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './StackNavigation/AuthStack';
import AppStack from './StackNavigation/AppStack';

const Stack = createNativeStackNavigator();

const Root = props => {
  //const [isLoggedIn,setIsLOggedIn] = useState(false)
  const {
    ResetErrors,
    IsLogInAsync,
    isParentLoggedIn,
    checking,
    loading,
    profile,
  } = props;
  //console.log("profile",profile)
  //console.log("isParentlogin",isParentLoggedIn)

  useEffect(() => {
    if (!isParentLoggedIn) {
      console.log('called isloginasync');
      // isBiometricSupport();
      //console.log('useeffect Isloginasync')
      IsLogInAsync();
    }
    // return () => {
    //     ResetErrors();
    // };
  }, [IsLogInAsync]);

  useEffect(() => {
    console.log(isParentLoggedIn);
  }, [isParentLoggedIn]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
    </Stack.Navigator>
  );

  // return <>{isParentLoggedIn ? <AppStack /> : <AuthStack />}</>;
};

const mapStateToProps = ({ authReducer, userReducer }) => {
  return {
    profile: userReducer.profile,
    isParentLoggedIn: authReducer.isParentLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    IsLogInAsync: () => dispatch(actionCreator.isLogInAsync()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Root);
// export default Root;
