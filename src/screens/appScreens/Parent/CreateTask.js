import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import ScrollViewIndicator from '../../../components/CustomViewIndicator';
import { Colors } from '../../../theme';
import { StackActions } from '@react-navigation/native';
import { AuthLoader } from '../../../components';
const { width, height } = Dimensions.get('window');

const assignee = [
  {
    age: '0 to 5yr',
    children: [
      {
        name: 'Naga',
        avtar: require('../../../assets/themeImages/avatar1.png'),
        selected: false,
      },
      {
        name: 'Ritu',
        avtar: require('../../../assets/themeImages/avatar1.png'),
        selected: false,
      },
    ],
  },
  {
    age: '6 to 10yr',
    children: [
      {
        name: 'Neha',
        avtar: require('../../../assets/themeImages/avatar3.png'),
        selected: false,
      },
    ],
  },
  {
    age: '11 to 16yr',
    children: [
      {
        name: 'Hinata',
        avtar: require('../../../assets/themeImages/avatar3.png'),
        selected: false,
      },
      {
        name: 'Rajesh',
        avtar: require('../../../assets/themeImages/avatar1.png'),
        selected: false,
      },
      {
        name: 'Rajesh1',
        avtar: require('../../../assets/themeImages/avatar1.png'),
        selected: false,
      },
      {
        name: 'Rajesh2',
        avtar: require('../../../assets/themeImages/avatar1.png'),
        selected: false,
      },
      {
        name: 'Rajesh3',
        avtar: require('../../../assets/themeImages/avatar1.png'),
        selected: false,
      },
      {
        name: 'Rajesh4',
        avtar: require('../../../assets/themeImages/avatar1.png'),
        selected: false,
      },
    ],
  },
];

const schedules = [
  { label: 'Daily', value: '1' },
  { label: 'Once', value: '2' },
  { label: 'Weekly', value: '3' },
  { label: 'Monthly', value: '4' },
];

const tasks = [
  { label: 'Wash face', value: '1' },
  { label: 'Brush teeth', value: '2' },
  { label: 'Put dirty clothes in the hamper', value: '3' },
  { label: 'Read a book', value: '4' },
  { label: 'Complete a puzzle', value: '5' },
  { label: 'Put toys away after play', value: '6' },
  { label: 'Take your plate to the dish washer or bench', value: '7' },
];

const CreateTask = props => {
  const { navigation } = props;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [task, setTask] = useState(null);
  const [show, setShow] = useState(false);
  const [age, setAge] = useState(null);
  const [ind, setInd] = useState(null);
  const [choosen, setChoosen] = useState(null);
  const [selectStart, setSelectStart] = useState(null);
  const [selectEnd, setSelectEnd] = useState(null);
  const [selectedAssigns, setSelectedAssigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const color = '#cfc5b9';
  const startDate = selectStart
    ? moment(selectStart.toString()).format('YYYY/MM/DD')
    : '';
  const endDate = selectEnd
    ? moment(selectEnd.toString()).format('YYYY/MM/DD')
    : '';

  function onDateChange(date, type) {
    if (type === 'END_DATE') {
      setSelectEnd(date);
      console.log(date, type);
    } else {
      setSelectStart(date);
      setSelectEnd(null);
      console.log(date);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#8ad3e3' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width * 0.9,
          marginVertical: 55,
          marginLeft: 15,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ImageBackground
            imageStyle={{
              borderWidth: 1.5,
              borderColor: 'white',
              borderRadius: 100,
            }}
            source={require('../../../assets/themeImages/avatar4.png')}
            style={{
              width: 40,
              aspectRatio: 1,
              marginHorizontal: 5,
            }}>
            <View
              style={{
                width: 10,
                aspectRatio: 1,
                borderRadius: 100,
                backgroundColor: 'green',
                position: 'absolute',
                top: 0,
                right: 3,
                borderWidth: 1,
                borderColor: 'white',
                elevation: 3,
              }}
            />
          </ImageBackground>
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>
            Task List
          </Text>
        </View>
        <MaterialIcons
          name="home-filled"
          size={35}
          color="white"
          style={{ elevation: 2 }}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              navigation.navigate('AppStack');
              // navigation.dispatch(StackActions.replace('AppStack'));
            }, 1000);
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fcf7f0',
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ marginTop: 30, marginBottom: 10, marginHorizontal: 25 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: color }}>
              Assign to
            </Text>
            <ScrollViewIndicator
              scrollIndicatorContainerStyle={{ backgroundColor: '#BDA582' }}
              horizontal={true}>
              {assignee.map((item, index) => {
                const ageGroup = item.age;
                const i = index;
                return (
                  <View key={index} style={{ minWidth: 80 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: color,
                          marginVertical: 11,
                          marginLeft: 10,
                        }}>
                        {item.age}
                      </Text>
                      {/* <View
                        style={{
                          backgroundColor: 'black',
                          width: 1,
                          height: 10,
                          marginRight: 15,
                        }}
                      /> */}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      {item.children.map((e, index) => {
                        const checkIsSelected = selectedAssigns.findIndex(
                          x => x.age === item.age,
                        );
                        let selected = false;
                        if (checkIsSelected !== -1) {
                          const check = selectedAssigns[
                            checkIsSelected
                          ].children.findIndex(x => {
                            return x.name === e.name;
                          });
                          if (check !== -1) {
                            selected = true;
                          }
                        }
                        return (
                          <>
                            <Pressable
                              onPress={() => {
                                let temp = [...selectedAssigns];
                                const findIndex = selectedAssigns.findIndex(
                                  x => item.age === x.age,
                                );
                                if (findIndex === -1) {
                                  const obj = {
                                    age: item.age,
                                    children: [item.children[index]],
                                  };
                                  temp = [obj];
                                } else {
                                  const check = temp[
                                    findIndex
                                  ].children.findIndex(x => {
                                    return x.name === e.name;
                                  });
                                  let obj = {
                                    age: item.age,
                                    children: temp[findIndex].children,
                                  };
                                  if (check === -1) {
                                    obj = {
                                      age: item.age,
                                      children: [
                                        ...temp[findIndex].children,
                                        item.children[index],
                                      ],
                                    };
                                  }
                                  temp = [obj];
                                }
                                setSelectedAssigns(temp);
                                // setInd(i);
                                // setChoosen(index);
                                setAge(ageGroup);
                              }}
                              key={index}
                              style={{
                                alignItems: 'center',
                                marginHorizontal: 5,
                                position: 'relative',
                                width: 40,
                                opacity: selected ? 1 : 0.4,
                              }}>
                              {selected && (
                                <View
                                  style={{
                                    width: 10,
                                    aspectRatio: 1,
                                    borderWidth: 0.5,
                                    borderColor: 'white',
                                    position: 'absolute',
                                    backgroundColor: '#EDD5B2',
                                    top: 0,
                                    right: 5,
                                    zIndex: 2,
                                    borderRadius: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <IonIcon
                                    name="close-sharp"
                                    size={8}
                                    color={'#BDA582'}
                                    style={{
                                      position: 'absolute',
                                      right: 0.1,
                                    }}
                                  />
                                </View>
                              )}
                              <Image
                                source={e.avtar}
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: 100,
                                }}
                              />

                              <Text style={{ fontSize: 10, fontWeight: '700' }}>
                                {e.name}
                              </Text>
                            </Pressable>
                            {item.children.length - 1 === index && (
                              <View style={styles.groupSeprator} />
                            )}
                          </>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </ScrollViewIndicator>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 12,
              marginHorizontal: 25,
              marginTop: 16,
            }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.labelStyle}>Age Group</Text>
              <TextInput
                editable={false}
                style={[styles.inputStyle]}
                value={age}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.labelStyle}>Schedule</Text>
              <Dropdown
                containerStyle={{
                  backgroundColor: '#CB8F6E',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
                style={[styles.dropdown]}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={schedules}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={schedule}
                placeholder=""
                activeColor="#F7CBBC"
                itemTextStyle={{ color: 'white', marginVertical: -10 }}
                onChange={item => {
                  setSchedule(item.value);
                }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 12, marginHorizontal: 25 }}>
            <Text style={styles.labelStyle}>Task</Text>
            <Dropdown
              search
              inputSearchStyle={{
                borderRadius: 10,
                color: Colors.white,
              }}
              containerStyle={{
                backgroundColor: '#CB8F6E',
                borderRadius: 10,
                overflow: 'hidden',
              }}
              style={[styles.dropdown]}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={tasks}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={task}
              placeholder=""
              activeColor="#F7CBBC"
              itemTextStyle={{ color: 'white', marginVertical: -10 }}
              showsVerticalScrollIndicator={false}
              onChange={item => {
                setTask(item.value);
              }}
            />
          </View>
          <View
            style={{
              marginVertical: 12,
              overflow: 'visible',
              marginHorizontal: 25,
            }}>
            <Text style={styles.labelStyle}>Date Range</Text>
            <View
              style={[
                styles.inputStyle,
                { flexDirection: 'row', alignItems: 'center' },
              ]}>
              <TextInput
                onPressIn={() => setShow(true)}
                style={[
                  { flex: 1, padding: 0, color: '#A19481', fontSize: 14 },
                ]}
                editable={false}
                value={startDate ? `${startDate} - ${endDate}` : ''}
              />
              <IonIcon
                name="calendar-outline"
                size={25}
                color="black"
                onPress={() => setShow(!show)}
              />
            </View>
            {show && (
              <View
                style={{
                  elevation: 5,
                  backgroundColor: 'white',
                  width: '99%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderRadius: 10,
                  alignSelf: 'center',
                  paddingTop: 10,
                  borderWidth: 1,
                  borderColor: '#CB8F6E',
                  zIndex: 1000,
                }}>
                <CalendarPicker
                  startFromMonday={true}
                  allowRangeSelection={true}
                  minDate={Date.now()}
                  todayBackgroundColor="#CB8F6E"
                  selectedDayColor="#CB8F6E"
                  selectedDayTextColor="#FFFFFF"
                  onDateChange={onDateChange}
                  width={0.7 * (width * 0.9)}
                  height={400}
                  monthTitleStyle={{ fontSize: 15 }}
                  yearTitleStyle={{ fontSize: 15 }}
                  nextComponent={
                    <IonIcon name="chevron-forward-circle-outline" size={25} />
                  }
                  previousComponent={
                    <IonIcon name="chevron-back-circle-outline" size={25} />
                  }
                />
                <View
                  style={{
                    flex: 1,
                    borderLeftWidth: 1,
                    borderColor: '#CB8F6E',
                    height: '100%',
                    alignItems: 'center',
                    marginTop: -10,
                  }}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 15,
                      color: 'black',
                      fontWeight: '600',
                    }}>
                    Dates
                  </Text>
                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        marginVertical: 5,
                        backgroundColor: startDate ? '#CB8F6E' : 'white',
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                        borderRadius: 100,
                        color: 'white',
                      }}>
                      {startDate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        marginVertical: 5,
                        backgroundColor: endDate ? '#CB8F6E' : 'white',
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                        borderRadius: 100,
                        color: 'white',
                      }}>
                      {endDate}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 12,
              marginHorizontal: 25,
            }}>
            <CheckBox
              disabled={false}
              value={checkBox}
              onValueChange={value => setCheckBox(value)}
            />
            <Text
              style={{ fontSize: 14, color: '#CFC5B9', marginHorizontal: 5 }}>
              Anytime in the selected day
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 12,
              marginHorizontal: 25,
              opacity: checkBox ? 0.4 : 1,
            }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.labelStyle}>Start Time</Text>
              <View style={[styles.inputStyle, { flexDirection: 'row' }]}>
                <TextInput
                  value={
                    date ? moment(date?.toString()).format('hh:mm A') : '--:--'
                  }
                  editable={!checkBox}
                  style={{
                    padding: 0,
                    flex: 1,
                    color: '#A19481',
                    fontSize: 14,
                  }}
                />
                <IonIcon
                  disabled={checkBox}
                  name="time-outline"
                  size={25}
                  color={'black'}
                  onPress={() => setOpen(true)}
                />
                <DatePicker
                  modal={true}
                  open={open}
                  onCancel={() => setOpen(false)}
                  date={new Date()}
                  onConfirm={date => {
                    setDate(date);
                    setOpen(false);
                  }}
                  onDateChange={setDate}
                  mode="time"
                  is24hourSource="device"
                />
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.labelStyle}>
                Duration <Text style={{ fontWeight: '400' }}>(in Minutes)</Text>
              </Text>
              <TextInput
                editable={!checkBox}
                keyboardType="number-pad"
                style={[
                  styles.inputStyle,
                  Platform.OS === 'ios' && { paddingVertical: 15.5 },
                ]}
              />
            </View>
          </View>
          <View style={{ marginVertical: 12, marginHorizontal: 25 }}>
            <Text style={styles.labelStyle}>Details</Text>
            <TextInput style={styles.inputStyle} />
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: '#FF9D4C',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginVertical: 12,
            }}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: '600' }}>
              Create Task
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <AuthLoader loading={loading} />
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: '#BDA582',
    borderBottomWidth: 2,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#A19481',
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginBottom: -10,
  },
  labelStyle: { fontSize: 14, fontWeight: '700', color: '#cfc5b9' },
  inputStyle: {
    borderBottomWidth: 2,
    borderColor: '#BDA582',
    paddingVertical: 5,
    color: '#A19481',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: Platform.OS === 'android' ? 5 : 10.5,
    textAlignVertical: 'center',
  },
  groupSeprator: {
    backgroundColor: Colors.border,
    width: 2,
    marginRight: 15,
  },
});
