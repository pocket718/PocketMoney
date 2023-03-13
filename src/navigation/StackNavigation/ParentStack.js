import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ParentDashboard from '../../screens/appScreens/Parent/ParentDashboard';
import Rewards from '../../screens/appScreens/Parent/Rewards';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskList from '../../screens/appScreens/Parent/TaskList';
import ChildTaskDetail from '../../screens/appScreens/Parent/ChildTaskDetail';
import CreateTask from '../../screens/appScreens/Parent/CreateTask';
import FamilyMembers from '../../screens/appScreens/Parent/FamilyMembers';

const Stack = createNativeStackNavigator();

const ParentStack = () => {
  return (
    <Stack.Navigator
    //initialRouteName="ParentDashboard"
    >
      <Stack.Screen
        name="ParentDashboard"
        component={ParentDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChildTaskDetail"
        component={ChildTaskDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rewards"
        component={Rewards}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaskList"
        component={TaskList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FamilyMembers"
        component={FamilyMembers}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ParentStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
