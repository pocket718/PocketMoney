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
import React, { useEffect, useState } from 'react';
import { Avatar } from '@rneui/themed';
import GiftIcon from '../../../assets/svgImages/giftIcon';
import IndicatorIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as actionCreator from '../../../redux/action';
import ProfileIcon from 'react-native-vector-icons/Ionicons';
import AddChildButton from '../../../assets/svgImages/addChildButton';
import CustomModal from '../../../components/CustomModal';
import moment from 'moment';

const ParentDashboard = props => {
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
          reward: allTaskList?.task[j].reward,
        });
      }
    }
  }
  //console.log(combinedArray);

  const sortedTasks = combinedArray.sort((a, b) => {
    const statusOrder = [
      'CHILD APPROVED',
      'PARENT APPROVED',
      'OVERDUE',
      'IN PROGRESS',
      'CREATED',
    ];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  const Item = ({
    taskTitle,
    firstName,
    status,
    timeStamp,
    duration,
    profile_pic,
    reward,
  }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };
    const taskTimeStamp = timeStamp;
    const date = new Date(taskTimeStamp);

    const formattedDate = moment(date).format('DD-MM-YYYY');
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
    return (
      // <TouchableOpacity onPress={toggleModal} style={styles.item}>
      //   <CustomModal modalVisible={modalVisible} toggleModal={toggleModal} />
      //   <View
      //     style={{
      //       flex: 1,
      //       width: '95%',
      //       alignSelf: 'center',
      //       justifyContent: 'space-between',
      //       flexDirection: 'row',
      //     }}>
      //     <View>
      //       <Text style={styles.taskName}>{taskTitle}</Text>

      //       <Text style={styles.name}>{firstName}</Text>
      //     </View>
      //     {status === 'CHILD APPROVED' ? (
      //       <View style={{ flexDirection: 'row' }}>
      //         <Pressable
      //           style={{
      //             borderWidth: 1,
      //             borderRadius: 4,
      //             borderColor: '#359DB6',
      //             height: '90%',
      //             alignSelf: 'center',
      //             alignItems: 'center',
      //             justifyContent: 'center',
      //             paddingHorizontal: 10,
      //           }}>
      //           <Text
      //             style={{
      //               fontWeight: '600',
      //               color: '#359DB6',
      //               fontSize: 10,
      //               alignSelf: 'center',
      //             }}>
      //             Approve
      //           </Text>
      //         </Pressable>
      //       </View>
      //     ) : null}
      //   </View>
      // </TouchableOpacity>
      <>
        {status === 'CHILD APPROVED' ? (
          <TouchableOpacity onPress={toggleModal} style={styles.item}>
            <CustomModal
              modalVisible={modalVisible}
              toggleModal={toggleModal}
              label={'Update Task Status'}
              taskTitle={taskTitle}
              formattedDate={formattedDate}
              firstName={firstName}
              profile_pic={profile_pic}
              startFormattedTime={startFormattedTime}
              endFormattedTime={endFormattedTime}
              reward={reward}
            />
            <View
              style={{
                flex: 1,
                width: '95%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={styles.taskName}>{taskTitle}</Text>

                <Text style={styles.name}>{firstName}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Pressable
                  onPress={toggleModal}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: '#359DB6',
                    height: '90%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#359DB6',
                      fontSize: 10,
                      alignSelf: 'center',
                    }}>
                    Approve
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleModal} style={styles.item}>
            <CustomModal
              modalVisible={modalVisible}
              toggleModal={toggleModal}
              label={'Task Detail'}
              taskTitle={taskTitle}
              formattedDate={formattedDate}
              firstName={firstName}
              profile_pic={profile_pic}
              startFormattedTime={startFormattedTime}
              endFormattedTime={endFormattedTime}
              reward={reward}
            />
            <View
              style={{
                flex: 1,
                width: '95%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={styles.taskName}>{taskTitle}</Text>

                <Text style={styles.name}>{firstName}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const ChildListItem = ({ childName, profile_pic, childId }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChildTaskDetail', {
          childName: childName,
          profilePic: profile_pic,
          childId: childId,
        })
      }>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginHorizontal: 5,
          //flexDirection:'row'
        }}>
        <Avatar
          size={48}
          //label={childName ? childName.slice(0, 1) : 'Cg'}
          rounded
          source={{
            uri: profile_pic
              ? 'https://cogito.sgp1.cdn.digitaloceanspaces.com' +
                '/' +
                profile_pic
              : 'https://cogito.sgp1.cdn.digitaloceanspaces.com/assets%2Fuser.png',
          }}
        />

        <Text style={{ fontWeight: '600', color: '#359DB6' }}>{childName}</Text>
      </View>
    </TouchableOpacity>
  );

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

  useEffect(() => {
    getChildrenRequest();
    getChildList();
    getTaskList();
    //firstLoad.current = false;
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
              height: '55%',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable
                style={{ width: '25%' }}
                onPress={() => navigation.openDrawer()}>
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
              </Pressable>

              <View style={{ width: '25%', alignItems: 'flex-end' }}>
                <Pressable onPress={() => navigation.navigate('Rewards')}>
                  <GiftIcon />
                </Pressable>
              </View>
            </View>
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
          <View style={{ width: '85%', height: '100%' }}>
            <View style={{ flex: 0.5 }}>
              <Text
                adjustsFontSizeToFit={true}
                style={{ fontWeight: '700', fontSize: 26, color: '#FFFFFF' }}>
                Hey, {profile?.firstName} {profile?.lastName}!
              </Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text
                adjustsFontSizeToFit={true}
                style={{ fontWeight: '600', fontSize: 20, color: '#FFFFFF' }}>
                Let’s be productive today.
              </Text>
            </View>
          </View>
          <View></View>
        </View>
      </View>
      <View
        style={{
          flex: 3.5,
          backgroundColor: '#FCF7F0',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View style={{ flex: 1.5, alignItems: 'center' }}>
          <View style={{ height: '100%', width: '85%' }}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Pressable
                onPress={() => navigation.navigate('FamilyMembers')}
                style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text
                  style={{ fontWeight: '700', color: '#359DB6', fontSize: 18 }}>
                  Family
                </Text>
              </Pressable>
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text
                style={{ fontWeight: '600', color: '#6FC1D4', fontSize: 12 }}>
                You can select or add family members here.
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <View style={{ height: '100%', width: '85%', flexDirection: 'row' }}>
            <View style={{ width: '75%' }}>
              <FlatList
                data={childList}
                renderItem={({ item }) => {
                  //console.log(1, item);
                  return (
                    <ChildListItem
                      childName={item.firstName}
                      profile_pic={item.profile_pic}
                      childId={item._id}
                    />
                  );
                }}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                horizontal
              />
            </View>
            <View style={{ width: '25%' }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',

                  //flexDirection:'row'
                }}>
                {/* <AddChildButton /> */}
                <Avatar
                  size={48}
                  rounded
                  icon={{
                    name: 'plus',
                    type: 'font-awesome',
                    color: '#359DB6',
                  }}
                  containerStyle={{
                    borderColor: '#359DB6',
                    borderStyle: 'dashed',
                    borderWidth: 0.4,
                  }}
                />
                <Text style={{ fontWeight: '600', color: '#359DB6' }}></Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1.5, alignItems: 'center' }}>
          <View style={{ height: '100%', width: '85%', flexDirection: 'row' }}>
            <View style={{ flex: 1.2, justifyContent: 'space-evenly' }}>
              <Text
                style={{ fontSize: 18, color: '#359DB6', fontWeight: '700' }}>
                Tasks
              </Text>
              <Text
                style={{ fontSize: 12, color: '#6FC1D4', fontWeight: '500' }}>
                Waiting for Approval
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Pressable
                onPress={() => navigation.navigate('CreateTask')}
                style={{
                  backgroundColor: '#FF9D4C',
                  height: '65%',
                  width: '85%',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>
                  Create Task
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <FlatList
            data={sortedTasks}
            renderItem={({ item }) => (
              <Item
                taskTitle={item.task}
                firstName={item.name}
                status={item.status}
                duration={item.duration}
                timeStamp={item.timestamp}
                profile_pic={item.profile_pic}
                reward={item.reward}
              />
            )}
            //keyExtractor={item => item.OriginalTaskId}
            ListEmptyComponent={RenderEmptyList}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={{ flex: 2 }}>
          <View style={{ flex: 0.7, justifyContent: 'center' }}>
            <Pressable
              onPress={() => navigation.navigate('TaskList')}
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

export default connect(mapStateToProps, mapDispatchToProps)(ParentDashboard);
//export default ParentDashboard

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#C9E5EC',
    borderRadius: 7,
    alignSelf: 'center',
    //height:'90%',
    width: '85%',
    padding: 7.5,
    marginVertical: 3,
    //marginHorizontal: 16,
  },
  taskName: {
    fontSize: 12,
    color: '#6E6E6E',
    fontWeight: '700',
    fontSize: 12,
  },
  name: {
    fontSize: 12,
    color: '#6FC1D4',
    fontWeight: '600',
  },
});
