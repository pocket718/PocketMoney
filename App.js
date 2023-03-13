
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import Root from './src/navigation/Root';
import { connect, Provider } from 'react-redux';
import Store from './src/redux/store'

//console.log("store",Store)

const App = () => {
  return (
    <Provider store={Store}>
         <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer
        // theme={darkTheme ? CustomDarkTheme : CustomDefaultTheme}
        >
             <Root />
        </NavigationContainer>
   
    
      </GestureHandlerRootView>
      </Provider>
  )
}
const mapStateToProps = ({ authReducer, userReducer }) => {
  return {
    darkTheme: userReducer.darkTheme,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

//console.log("connect",connect)

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({})
