import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../../../redux/action';
import HomeButton from '../../../assets/svgImages/HomeButton';
import Tabs from '../../../components/CustomTabs';
import { Avatar } from '@rneui/themed';
import { isTaskActive } from '../../../utils/timeMethods';
import { constant } from '../../../utils/constant';
import CalenderIcon from '../../../assets/svgImages/calenderIcon';
import moment from 'moment';
import { DateFormatter } from '../../../utils/helpers';

const TaskList = props => {
  const {
    getChildrenRequest,
    getChildList,
    getTaskList,
    guardianRequest,
    paginationCompletedTaskList,
    paginationAllTaskList,
    setAllTaskPaginationPage,
    setCompletedTaskPaginationPage,
    childList,
    profile,
    navigation,
    allTaskList,
  } = props;

  const combinedArray = [];

  for (let i = 0; i < childList?.length; i++) {
    for (let j = 0; j < allTaskList?.task?.length; j++) {
      if (childList[i]._id === allTaskList?.task[j].childId) {
        combinedArray.push({
          childId: childList[i]._id,
          name: childList[i].firstName,
          task: allTaskList?.task[j].taskTitle,
          status: allTaskList?.task[j].status,
          duration: allTaskList?.task[j].duration,
          profile_pic: childList[i].profile_pic,
          timestamp: allTaskList?.task[j].taskTimeStamp,
        });
      }
    }
  }

  const approvedTasks = combinedArray?.filter(
    task => task.status === 'PARENT APPROVED',
  );

  const approvalRequiredTasks = combinedArray?.filter(
    task => task.status === 'CHILD APPROVED',
  );

  const Item = ({
    taskTitle,
    firstName,
    profile_pic,
    timestamp,
    duration,
    status,
  }) => {
    // const taskTimeStamp = timestamp;
    // const date = new Date(taskTimeStamp);

    // const formattedDate = moment(date).format('DD-MM-YYYY');
    // const formattedTime = moment(date).format('HH:mm');
    // const formattedDateTime = `${formattedDate} ${formattedTime}`;

    // const durationInMinutes = duration;
    // const startDateTime = new Date(formattedDateTime);
    // const endDateTime = new Date(
    //   startDateTime.getTime() + durationInMinutes * 60000,
    // ); // add duration in milliseconds

    // // const startFormattedDate = startDateTime.toLocaleDateString();
    // // const startFormattedTime = startDateTime.toLocaleTimeString();
    // const startFormattedDate = moment(startDateTime).format('YYYY-MM-DD');
    // const startFormattedTime = moment(startDateTime).format('HH:mm');

    // const startFormattedDateTime = `${startFormattedDate} ${startFormattedTime}`;

    // // const endFormattedDate = endDateTime.toLocaleDateString();
    // // const endFormattedTime = endDateTime.toLocaleTimeString();
    // const endFormattedDate = moment(endDateTime).format('YYYY-MM-DD');
    // const endFormattedTime = moment(endDateTime).format('HH:mm');
    // const endFormattedDateTime = `${endFormattedDate} ${endFormattedTime}`;
    const taskTimeStamp = timestamp;
    const date = new Date(taskTimeStamp);

    const formattedDate = moment(date).format('DD-MM-YYYY');

    const dateString = DateFormatter(formattedDate);

    const formattedTime = moment(date).format('HH:mm');
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    const durationInMinutes = duration;
    const startDateTime = moment(
      formattedDateTime,
      'DD-MM-YYYY HH:mm',
    ).toDate();
    const endDateTime = moment(startDateTime)
      .add(durationInMinutes, 'minutes')
      .toDate();

    const startFormattedDate = moment(startDateTime).format('YYYY-MM-DD');
    const startFormattedTime = moment(startDateTime).format('HH:mm');
    const startFormattedDateTime = `${startFormattedDate} ${startFormattedTime}`;

    const endFormattedDate = moment(endDateTime).format('YYYY-MM-DD');
    const endFormattedTime = moment(endDateTime).format('HH:mm');
    const endFormattedDateTime = `${endFormattedDate} ${endFormattedTime}`;

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

    return (
      <View
        style={{
          //backgroundColor: '#C9E5EC',
          //borderRadius: 7,
          //alignSelf: 'center',
          //height: '90%',
          //width: '100%',
          justifyContent: 'center',
          width: '100%',
          padding: 2,
          //marginVertical: 5,
        }}>
        <View
          style={{
            //height: '50%',
            backgroundColor: '#C9E5EC',
            flexDirection: 'row',
            borderRadius: 7,
            padding: 5,
          }}>
          <View
            style={{
              width: '18%',
              justifyContent: 'center',
            }}>
            <Avatar
              size={48}
              rounded
              source={{
                uri: profile_pic
                  ? 'https://cogito.sgp1.cdn.digitaloceanspaces.com' +
                    '/' +
                    profile_pic
                  : 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
              }}
            />
          </View>
          <View style={{ width: '52%' }}>
            <Text
              style={{
                color: '#333333',
                fontWeight: '600',
                lineHeight: 19,
                textAlign: 'left',
                letterSpacing: 0.2,
                fontSize: 14,
              }}>
              {taskTitle}
            </Text>
            <Text
              style={{
                color: '#333333',
                fontWeight: '400',
                lineHeight: 19,
                textAlign: 'left',
                letterSpacing: 0.2,
                fontSize: 12,
              }}>
              {firstName}
            </Text>
            <Text
              style={{
                color: '#333333',
                fontWeight: '400',
                lineHeight: 19,
                textAlign: 'left',
                letterSpacing: 0.2,
                fontSize: 12,
              }}>
              {startFormattedTime} - {endFormattedTime}
            </Text>
          </View>
          {status === 'CHILD APPROVED' ? (
            <View
              style={{
                width: '28%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Pressable
                style={{
                  padding: 4,
                  borderWidth: 1,
                  borderColor: '#359DB6',
                }}>
                <Text
                  style={{
                    color: '#359DB6',
                    fontWeight: '600',
                    lineHeight: 14,
                    textAlign: 'center',
                  }}>
                  Approve
                </Text>
              </Pressable>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CalenderIcon />
                <Text
                  style={{
                    color: '#333333',
                    fontWeight: '600',
                    lineHeight: 16,
                    textAlign: 'right',
                    letterSpacing: 0.2,
                  }}>
                  {formattedDate}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: '28%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View style={{ padding: 4 }}>
                <Text
                  style={{
                    color: '#359DB6',
                    fontWeight: '600',
                    lineHeight: 14,
                    textAlign: 'center',
                  }}>
                  {taskStatus}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CalenderIcon />
                <Text
                  style={{
                    color: '#333333',
                    fontWeight: '600',
                    lineHeight: 16,
                    textAlign: 'right',
                    letterSpacing: 0.2,
                  }}>
                  {formattedDate}
                </Text>
              </View>
            </View>
          )}
          <View style={{ width: '2%' }} />
        </View>
      </View>
    );
  };

  const RenderEmptyList = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 30,
      }}>
      <Text style={{ fontWeight: '700', color: '#359DB6', fontSize: 18 }}>
        No Task Added
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#8AD3E3' }}>
      <SafeAreaView />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.13,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '85%',
              height: '70%',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View
              style={{ width: '20%', height: '70%', justifyContent: 'center' }}>
              {profile?.profile_pic ? (
                <Image
                  style={{
                    width: '80%',
                    height: '80%',
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
                  <ProfileIcon name="person-circle" size={40} color="#359db6" />
                </View>
              )}
            </View>
            <View
              style={{ width: '30%', height: '70%', justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#FCF7F0',
                }}>
                Task List
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                height: '70%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Pressable onPress={() => navigation.navigate('ParentDashboard')}>
                <HomeButton />
              </Pressable>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.87,
            backgroundColor: '#FCF7F0',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{ height: '90%', width: '90%' }}>
            <View style={{ flex: 1 }}>
              <View style={styles.container}>
                <Tabs>
                  {/* First tab */}
                  <View title="All Task" style={styles.content}>
                    <FlatList
                      data={combinedArray}
                      renderItem={({ item }) => (
                        <Item
                          taskTitle={item.task}
                          firstName={item.name}
                          profile_pic={item.profile_pic}
                          timestamp={item.timestamp}
                          duration={item.duration}
                          status={item.status}
                        />
                      )}
                      //keyExtractor={item => item.OriginalTaskId}
                      ListEmptyComponent={RenderEmptyList}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                  {/* Second tab */}
                  <View title="Completed" style={styles.content}>
                    <FlatList
                      data={approvedTasks}
                      renderItem={({ item }) => (
                        <Item
                          taskTitle={item.task}
                          firstName={item.name}
                          profile_pic={item.profile_pic}
                          timestamp={item.timestamp}
                          duration={item.duration}
                          status={item.status}
                        />
                      )}
                      //keyExtractor={item => item.OriginalTaskId}
                      ListEmptyComponent={RenderEmptyList}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                  {/* Third tab */}
                  <View title="Approve Now" style={styles.content}>
                    <FlatList
                      data={approvalRequiredTasks}
                      renderItem={({ item }) => (
                        <Item
                          taskTitle={item.task}
                          firstName={item.name}
                          profile_pic={item.profile_pic}
                          timestamp={item.timestamp}
                          duration={item.duration}
                          status={item.status}
                        />
                      )}
                      //keyExtractor={item => item.OriginalTaskId}
                      ListEmptyComponent={RenderEmptyList}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                </Tabs>
              </View>
            </View>
          </View>
        </View>
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
    allTaskList: userReducer.allTasks,
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);

const styles = StyleSheet.create({
  // App container
  container: {
    flex: 1, // Take up all screen
    //backgroundColor: '#E91E63',         // Background color
  },
  // Tab content container
  content: {
    flex: 1, // Take up all available space
    //justifyContent: 'center',           // Center vertically
    //alignItems: 'center',               // Center horizontally
    //backgroundColor: 'grey',         // Darker background for content area
  },
  // Content header
  header: {
    margin: 10, // Add margin
    color: '#FFFFFF', // White color
    fontFamily: 'Avenir', // Change font family
    fontSize: 26, // Bigger font size
  },
  // Content text
  text: {
    //marginHorizontal: 20,               // Add horizontal margin
    color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
    //textAlign: 'center',                // Center
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  item: {
    backgroundColor: '#C9E5EC',
    borderRadius: 7,
    alignSelf: 'center',
    //height:'90%',
    width: '100%',
    padding: 13.5,
    marginVertical: 5,
    //marginHorizontal: 16,
  },
  taskName: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    lineHeight: 19,
  },
  name: {
    fontSize: 10,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 18,
  },
  status: {
    fontSize: 12,
    color: '#359DB6',
    fontWeight: '600',
    textAlign: 'right',
    lineHeight: 19,
  },
  date: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
    color: '#333333',
    lineHeight: 16,
  },
});
