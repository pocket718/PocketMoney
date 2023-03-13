import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  LogBox,
} from 'react-native';
import React, { useState } from 'react';
import { Badge } from '@rneui/themed';
import { Avatar, Icon, withBadge } from '@rneui/themed';
import { connect } from 'react-redux';
import * as actionCreator from '../../../redux/action';
import { DateFormatter } from '../../../utils/helpers';
import { isTaskActive } from '../../../utils/timeMethods';
import { constant } from '../../../utils/constant';
import { useNavigation } from '@react-navigation/native';
import { getFilteredData } from '../../../utils/utility';
import Home from '../../../assets/svgImages/HomeButton';
// import CogIcon2 from '../../../assets/svgImages/cogIcon2';
import CogIcon1 from '../../../assets/svgImages/cogIcon1';
import CelebrationIcon from '../../../assets/svgImages/celebration';
import moment from 'moment';
import RewardsComponent from '../../../components/Parent/RewardsComponent';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import MyCalendar from '../../../components/MonthCalendar';
import Dropdown from '../../../components/Dropdown';
import CustomDropDown from '../../../components/CustomDropwDown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

LogBox.ignoreAllLogs();

const BadgedIcon = withBadge(15)(Icon);

const Item = ({ taskName, deadline, rewardData, taskTimeStamp, status }) => {
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
    <View style={styles.item}>
      <View
        style={{
          flex: 1,
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}>
        <View style={{ flex: 1 }}>
          <CogIcon1 />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={styles.taskName}>{taskName}</Text>
          {/* <Text style={styles.name}>Due: {DateFormatter(deadline)}</Text> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1.3,
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontWeight: '600',
              color: '#fff',
              fontSize: 10,
              alignSelf: 'center',
              backgroundColor: 'red',
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            {rewardData?.frequency === 'once'
              ? moment(rewardData?.taskHistory[0].taskTimeStamp).format(
                  'MMM DD, yyyy',
                )
              : moment(rewardData?.startDate).format('MMM DD, yyyy')}
          </Text>
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
        </View>
      </View>
    </View>
  );
};

const ParentDashboard = props => {
  const {
    getChildrenRequest,
    getChildList,
    childList,
    getTaskList,
    allTasks,
    profile,
    rewards,
    getRewards,
    route,
  } = props;

  // const { childName, profilePic, childId } = route?.params;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  // console.log('childList>>', childList);

  // console.log('profile', profile);

  // console.log('rewards >>', rewards);

  const [taskList, setTaskList] = React.useState(null);
  const navigation = useNavigation();

  const [selectedChild, setSelectedChild] = React.useState();
  const [selectedMonth, setSelectedMonth] = React.useState(
    (new Date().getMonth() + 1).toString(),
  );
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear().toString(),
  );

  const [startDate, setStartDate] = React.useState(new Date());
  const [sum, setSum] = React.useState(0);

  const [customList, setCustomList] = React.useState([]);

  const monthData = [
    { label: 'Jan', value: '1' },
    { label: 'Feb', value: '2' },
    { label: 'Mar', value: '3' },
    { label: 'Apr', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'Aug', value: '8' },
    { label: 'Sept', value: '9' },
    { label: 'Oct', value: '10' },
    { label: 'Nov', value: '11' },
    { label: 'Dec', value: '12' },
  ];

  const yearData = [
    { label: '1990', value: '1990' },
    { label: '1991', value: '1991' },
    { label: '1992', value: '1992' },
    { label: '1993', value: '1993' },
    { label: '1994', value: '1994' },
    { label: '1995', value: '1995' },
    { label: '1996', value: '1996' },
    { label: '1997', value: '1997' },
    { label: '1998', value: '1998' },
    { label: '1999', value: '1999' },
    { label: '2000', value: '2000' },
    { label: '2001', value: '2001' },
    { label: '2002', value: '2002' },
    { label: '2003', value: '2003' },
    { label: '2004', value: '2004' },
    { label: '2005', value: '2005' },
    { label: '2006', value: '2006' },
    { label: '2007', value: '2007' },
    { label: '2008', value: '2008' },
    { label: '2009', value: '2009' },
    { label: '2010', value: '2010' },
    { label: '2011', value: '2011' },
    { label: '2012', value: '2012' },
    { label: '2013', value: '2013' },
    { label: '2014', value: '2014' },
    { label: '2015', value: '2015' },
    { label: '2016', value: '2016' },
    { label: '2017', value: '2017' },
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
  ];
  React.useEffect(() => {
    if (
      selectedChild &&
      startDate &&
      startDate?.getMonth() + 1 &&
      startDate?.getFullYear()
    ) {
      console.log('ck>>', selectedChild?._id, selectedMonth, selectedYear);
      getRewards({
        // childId: selectedChild._id,
        // month: startDate.getMonth() + 1,
        // year: startDate.getFullYear(),
        childId: selectedChild?._id,
        month: Number(selectedMonth),
        year: Number(selectedYear),
      });
    } else if (childList?.length) {
      setSelectedChild(childList[0]);
    }
  }, [childList, startDate, selectedChild, selectedMonth, selectedYear]);

  React.useEffect(() => {
    console.log('rewards >>', rewards);
    let sum = 0;
    rewards?.map(data => {
      sum += data?.total_reward || 0;
    });
    setSum(sum);
  }, [rewards]);

  React.useEffect(() => {
    // getChildrenRequest();
    getChildList();
    // getTaskList();
    //firstLoad.current = false;
  }, []);

  React.useEffect(() => {
    if (childList) {
      setCustomList(
        childList?.map((child, index) => {
          return { label: child.firstName, value: child };
        }),
      );
    }
  }, [childList]);

  return (
    <View style={{ flex: 1, backgroundColor: '#8AD3E3' }}>
      <SafeAreaView />
      <View style={{ flex: 1.5 }}>
        <View
          style={{
            flex: 1,
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
            <Text
              adjustsFontSizeToFit={true}
              style={{ fontWeight: '700', fontSize: 30, color: '#FFFFFF' }}>
              Rewards
            </Text>
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
        </View>
      </View>
      <View
        style={{
          flex: 7,
          backgroundColor: '#FCF7F0',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View
          style={{ flex: 1.4, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ height: '100%', width: '90%', flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
                width: '45%',
                marginTop: 25,
                backgroundColor: '#fff',
                overflow: 'hidden',
                borderRadius: 15,
                marginBottom: 10,
                elevation: 5,
                shadowColor: '#000000',
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}>
              <View style={{ flex: 0.3, alignItems: 'center' }}>
                <CogIcon1 width={80} height={80} />
              </View>
              <View style={{ flex: 0.5 }}>
                <Text
                  style={{ fontSize: 18, color: '#BABABA', fontWeight: '800' }}>
                  Total Rewards
                </Text>
                <Text
                  style={{ fontSize: 30, color: '#FFCB5B', fontWeight: '800' }}>
                  {`${sum.toFixed(2)} COG`}
                </Text>
              </View>
              <View style={{ flex: 0.2, marginBottom: 20 }}>
                <CelebrationIcon />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 0.6,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <CustomDropDown
            dropdownLabel={'Month'}
            data={monthData}
            toSelectFn={setSelectedMonth}
            val={selectedMonth}
          />
          <CustomDropDown
            dropdownLabel={'Year'}
            data={yearData}
            toSelectFn={setSelectedYear}
            val={selectedYear}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Dropdown
            data={customList ? customList : []}
            dropdownLabel={'Children'}
            width={'95%'}
            toSelectFn={setSelectedChild}
            endIcon={
              <MaterialCommunityIcons
                name="account"
                size={30}
                color="#BA8357"
                style={{ marginRight: 10 }}
              />
            }
          />
        </View>

        {/* rewards */}
        <View
          style={{
            flex: 3,
            marginBottom: 10,
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {rewards?.length > 0 ? (
            <FlatList
              data={rewards}
              numColumns={3}
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                // marginHorizontal: 10,
              }}
              // data={allTasks?.task}
              renderItem={({ item }) => {
                return (
                  // <Item
                  //   taskName={item?.taskTitle}
                  //   deadline={item?.deadline}
                  //   status={item?.status}
                  //   taskTimeStamp={item?.taskTimeStamp}
                  // />

                  <RewardsComponent
                    // taskName={item?.taskTitle}
                    // deadline={item?.deadline}
                    // status={item?.status}
                    // taskTimeStamp={item?.taskTimeStamp}
                    rewardData={item}
                    childList={childList}
                  />
                );
              }}
              // keyExtractor={item => item.endDate}
              indicatorStyle
            />
          ) : (
            <View
              style={{
                // flex: 4,
                width: '90%',
                height: '80%',
              }}>
              <Image
                source={require('../../../assets/images/no_rewards.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
              <Text style={styles.bottomText}>
                Uh oh, looks like{' '}
                <Text style={{ color: '#ff7300' }}>
                  {selectedChild?.firstName}
                </Text>{' '}
                doesn’t have any rewards for now. Help them earn{' '}
                <Text style={{ color: '#ff7300' }}>COGs</Text> by creating a
                task.
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
    childList: userReducer.childList,
    rewards: userReducer.rewards,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChildList: () => {
      dispatch(actionCreator.getChildList());
    },
    getRewards: data => dispatch(actionCreator.getRewardsParent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParentDashboard);
//export default ParentDashboard

const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#C9E5EC',
    backgroundColor: 'pink',
    marginHorizontal: 6,
    borderRadius: 15,
    alignSelf: 'center',
    //height:'90%',
    width: '30%',
    padding: 15,
    marginVertical: 6,
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
  bottomText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
  },
});
