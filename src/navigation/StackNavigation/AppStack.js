import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
// import * as actionCreator from '../Redux/action';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import KidStack from './KidStack';
import CustomDrawer from '../../components/CustomDrawer';
import ParentStack from './ParentStack';
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        //drawerActiveBackgroundColor: '#aa18ea',
        //drawerActiveTintColor: '#fff',
        //drawerInactiveTintColor: '#333',
        // drawerLabelStyle: {
        //   //marginLeft: -25,
        //   //fontFamily: 'Roboto-Medium',
        //   fontSize: 15,
        // },
      }}>
      <Drawer.Screen
        name="ParentStack"
        component={ParentStack}
        // options={{
        //   drawerIcon: ({color}) => (
        //     <Ionicons name="home-outline" size={22} color={color} />
        //   ),
        // }}
      />
    </Drawer.Navigator>
  );
};

const AppStack = () => {
  const [isKid, setIsKid] = useState(false);

  return (
    // <>
    //   {isKid ? (
    //     <Stack.Navigator>
    //       <Stack.Screen
    //         name="KidStack"
    //         component={KidStack}
    //         options={{ headerShown: false }}
    //       />
    //     </Stack.Navigator>
    //   ) : (
    // <Stack.Navigator
    // //initialRouteName="ParentDashboard"
    // >
    //   <Stack.Screen
    //     name="ParentStack"
    //     component={ParentStack}
    //     options={{ headerShown: false }}
    //   />

    // </Stack.Navigator>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={DrawerStack} name="DrawerStack" />
    </Stack.Navigator>
    // )}
    // </>
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

export default AppStack;
