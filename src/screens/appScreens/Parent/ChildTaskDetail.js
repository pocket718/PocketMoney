import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { Badge } from '@rneui/themed';
import { Avatar, Icon, withBadge } from '@rneui/themed';
import GiftIcon from '../../../assets/svgImages/giftIcon';
import IndicatorIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as actionCreator from '../../../redux/action';
import { DateFormatter } from '../../../utils/helpers';
import { isTaskActive } from '../../../utils/timeMethods';
import { constant } from '../../../utils/constant';
import { useNavigation } from '@react-navigation/native';
import { getFilteredData } from '../../../utils/utility';
import Home from '../../../assets/svgImages/HomeButton';

const BadgedIcon = withBadge(15)(Icon);

const Item = ({ taskName, deadline, status, taskTimeStamp, profilePic }) => {
  const taskStatus =
    status == constant.parentApprovedStatus
      ? 'Completed'
      : status == constant.childApprovedStatus
      ? 'Submitted'
      : status == constant.createdStatus
      ? isTaskActive(taskTimeStamp)
        ? 'Ongoing'
        : 'Scheduled'
      : '';

  const bgColor =
    taskStatus == 'Completed'
      ? 'green'
      : taskStatus == 'Submitted'
      ? '#ff7300'
      : taskStatus == 'Ongoing'
      ? 'red'
      : 'gray';

  return (
    <View style={styles.item}>
      <View style={{ flex: 0.2 }}>
        <Image
          source={{
            uri: profilePic
              ? 'https://cogito.sgp1.cdn.digitaloceanspaces.com' +
                '/' +
                profilePic
              : 'https://cogito.sgp1.cdn.digitaloceanspaces.com/assets%2Fuser.png',
          }}
          style={{ width: 30, height: 30 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{ flex: 4 }}>
          <Text style={styles.taskName}>{taskName}</Text>
          <Text style={styles.name}>Due: {DateFormatter(deadline)}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1.4,
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontWeight: '600',
              color: '#fff',
              fontSize: 10,
              alignSelf: 'center',
              backgroundColor: bgColor,
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            {taskStatus}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ParentDashboard = props => {
  const {
    getChildrenRequest,
    getChildList,
    guardianRequest,
    paginationCompletedTaskList,
    paginationAllTaskList,
    setAllTaskPaginationPage,
    setCompletedTaskPaginationPage,
    childList,
    getTaskList,
    allTasks,
    profile,
    route,
  } = props;

  const { childName, profilePic, childId } = route?.params;

  // console.log('childList', childList);
  // console.log('profile', profile);
  console.log('allTasks', allTasks?.task);

  const [taskList, setTaskList] = React.useState(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    getChildrenRequest();
    getChildList();
    getTaskList();
    //firstLoad.current = false;
  }, []);

  React.useEffect(() => {
    setTaskList(getFilteredData(allTasks?.task, 'childId', childId.toString()));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#8AD3E3' }}>
      <SafeAreaView />
      <View style={{ flex: 1.5 }}>
        <View
          style={{
            flex: 0.6,
            justifyContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '85%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Avatar
                rounded
                source={{
                  uri:
                    'https://cogito.sgp1.cdn.digitaloceanspaces.com' +
                    '/' +
                    profile.profile_pic,
                }}
                size={60}
              />
              <Badge
                value={0}
                status="success"
                containerStyle={{ position: 'absolute', top: 5, left: 50 }}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ParentDashboard')}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Home />
              </View>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '85%',
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flex: 0.5 }}>
              <Text
                adjustsFontSizeToFit={true}
                style={{ fontWeight: '700', fontSize: 30, color: '#FFFFFF' }}>
                Tasks
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: 'flex-end',
              }}>
              <Text
                adjustsFontSizeToFit={true}
                onPress={() => navigation.goBack()}
                style={{ fontWeight: '800', fontSize: 20, color: '#FFFFFF' }}>
                {`<<Back`}
              </Text>
            </View>
          </View>
          <View></View>
        </View>
      </View>
      <View
        style={{
          flex: 4,
          backgroundColor: '#FCF7F0',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View
          style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ height: '100%', width: '85%', flexDirection: 'row' }}>
            <View
              style={{
                // flex: 1.2,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width: '45%',
              }}>
              <Image
                source={{
                  uri: profilePic
                    ? 'https://cogito.sgp1.cdn.digitaloceanspaces.com' +
                      '/' +
                      profilePic
                    : 'https://cogito.sgp1.cdn.digitaloceanspaces.com/assets%2Fuser.png',
                }}
                resizeMode="stretch"
                style={{ width: 70, height: 70, borderRadius: 400 / 2 }}
              />
              <Text
                style={{ fontSize: 20, color: '#6FC1D4', fontWeight: '800' }}>
                {childName}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 4, marginBottom: 50 }}>
          {console.log(allTasks?.task?.length, allTasks?.task)}
          {taskList?.length > 0 ? (
            <FlatList
              data={taskList}
              // data={allTasks?.task}
              renderItem={({ item }) => {
                return (
                  <Item
                    taskName={item?.taskTitle}
                    deadline={item?.deadline}
                    status={item?.status}
                    taskTimeStamp={item?.taskTimeStamp}
                    profilePic={profilePic}
                  />
                );
              }}
              // keyExtractor={item => item.endDate}
              indicatorStyle
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 22, color: 'red', fontWeight: '800' }}>
                No tasks to display
              </Text>
            </View>
          )}
        </View>

        {/* <View style={{ flex: 2 }}>
          <View style={{ flex: 0.7, justifyContent: 'center' }}>
            <Pressable
              style={{
                height: '60%',
                width: '85%',
                backgroundColor: '#FFE0C6',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 11,
              }}>
              <Text
                style={{
                  color: '#FF9D4C',
                }}>
                View Tasks
              </Text>
            </Pressable>
          </View>
        </View> */}
      </View>
    </View>
  );
};

const mapStateToProps = ({ userReducer, authReducer, paginationReducer }) => {
  return {
    profile: userReducer.profile,
    isParentLoggedIn: authReducer.isParentLoggedIn,
    isChildrenLoggedIn: authReducer.isChildrenLoggedIn,
    guardianRequest: userReducer.guardianRequest,
    paginationAllTaskList: paginationReducer.paginationAllTask,
    paginationCompletedTaskList: paginationReducer.paginationCompleteTask,
    childList: userReducer.childList,
    allTasks: userReducer.allTasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChildrenRequest: () => {
      dispatch(actionCreator.getChildrenRequest());
    },
    getChildList: () => {
      dispatch(actionCreator.getChildList());
    },
    setAllTaskPaginationPage: data => {
      dispatch(actionCreator.setAllTaskPaginationPage(data));
    },
    setCompletedTaskPaginationPage: data => {
      dispatch(actionCreator.setCompletedTaskPaginationPage(data));
    },
    getTaskList: data => {
      dispatch(actionCreator.getTaskList(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParentDashboard);
//export default ParentDashboard

const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#C9E5EC',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignSelf: 'center',
    //height:'90%',
    width: '85%',
    padding: 15,
    marginVertical: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskName: {
    fontSize: 13,
    color: '#6E6E6E',
    fontWeight: '800',
  },
  name: {
    fontSize: 12,
    color: '#6FC1D4',
  },
});
