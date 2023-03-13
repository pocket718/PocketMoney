import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
// import * as actionCreator from '../Redux/action';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/authScreens/Login';
import ParentLogin from '../../screens/authScreens/Parent/ParentLogin';
import ParentForgotPassword from '../../screens/authScreens/Parent/ParentForgotPassword';
import ParentLoginOTP from '../../screens/authScreens/Parent/ParentLoginOTP';
import ParentResetPassword from '../../screens/authScreens/Parent/ParentResetPassword';
import KidsLogin from '../../screens/authScreens/Kid/KidsLogin';
import KidForgotPassword from '../../screens/authScreens/Kid/KidForgotPassword';
import KidResetPassword from '../../screens/authScreens/Kid/KidResetPassword';
import KidLoginOTP from '../../screens/authScreens/Kid/KidLoginOTP';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Parent Login"
        component={ParentLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Parent Forgot Password"
        component={ParentForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Parent OTP"
        component={ParentLoginOTP}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Parent New Password"
        component={ParentResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Kid Login"
        component={KidsLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Kid Forgot Password"
        component={KidForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Kid New Password"
        component={KidResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Kid OTP"
        component={KidLoginOTP}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const mapStateToProps = ({ authReducer, notifyReducer, userReducer }) => {
  return {
    // checking: authReducer.checking,
    // loading: authReducer.loading,
    // isLoggedIn: authReducer.isLoggedIn,
    // errorMessage: authReducer.errorMessage,
    // successMessage: authReducer.successMessage,
    // notifications: notifyReducer.notifications,
    // kyc: userReducer.kyc,
    // profile: userReducer.profile,
    // isMpinSet: authReducer.isMpinSet,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // IsLogInAsync: () => dispatch(actionCreator.IsLogInAsync()),
    // ResetErrors: () => dispatch(actionCreator.ResetErrors()),
    // getProfile: () => dispatch(actionCreator.getProfile()),
    // notify: (message, varient) =>
    //   dispatch(actionCreator.notify(message, varient)),
    // logout: () => dispatch(actionCreator.OnLogout()),
  };
};

export default AuthStack;
