import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../../../redux/action';
import HomeButton from '../../../assets/svgImages/HomeButton';
import Tabs from '../../../components/CustomTabs';
import { Avatar } from '@rneui/themed';
import { isTaskActive } from '../../../utils/timeMethods';
import { constant } from '../../../utils/constant';
import CalenderIcon from '../../../assets/svgImages/calenderIcon';
import Cross from '../../../assets/svgImages/cross';
import Check from '../../../assets/svgImages/check';
import { calculateAge } from '../../../utils/helpers';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Trash from '../../../assets/svgImages/trash';

const FamilyMembers = props => {
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
    for (let j = 0; j < profile?.family?.length; j++) {
      if (childList[i]._id === profile?.family[j]._id) {
        combinedArray.push({
          childId: childList[i]._id,
          name: childList[i].firstName,
          kycStatus: childList[i]?.parentApprovedKYCStatus?.kycStatus,
          profile_pic: childList[i].profile_pic,
          relation: profile?.family[j].relation,
          email: childList[i].email,
          dob: childList[i].dateOfBirth,
        });
      }
    }
  }

  const acceptReceivedRequest = profile?.family.filter(
    req =>
      req.request_type === 'Received' && req.status === 'Waiting for Approval',
  );

  const sentRequest = profile?.family.filter(
    req => req.request_type === 'Sent' && req.status === 'Waiting for Approval',
  );

  const Item = ({
    firstName,
    lastName,
    profile_pic,
    status,
    relation,
    requestType,
  }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            height: '100%',
            flexDirection: 'row',
          }}>
          {/* <View
            style={{
              flex: 1,
              backgroundColor: 'pink',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View></View>
            <Avatar
              size={'medium'}
              rounded
              source={{
                uri: profile_pic
                  ? 'https://cogito.sgp1.cdn.digitaloceanspaces.com' +
                    '/' +
                    profile_pic
                  : 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
              }}
            />
          </View> */}
          <View
            style={{
              flex: 2,
              justifyContent: 'space-evenly',
            }}>
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.name}>Your Relation | {relation}</Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'space-evenly',
            }}>
            <Text style={styles.name}>Child Relation</Text>
            <Text style={styles.name}>Daughter ^</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 7.5,
            }}>
            <View style={styles.cancelCircle}>
              <Cross />
            </View>
            <View style={{ paddingTop: 2.5 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  lineHeight: 16,
                  textAlign: 'center',
                  color: '#699595',
                }}>
                Cancel
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 7.5,
            }}>
            <View style={styles.acceptCircle}>
              <Check />
            </View>
            <View style={{ paddingTop: 2.5 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  lineHeight: 16,
                  textAlign: 'center',
                  color: '#359DB6',
                }}>
                Accept
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const SentItem = ({
    firstName,
    lastName,
    profile_pic,
    status,
    relation,
    requestType,
  }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          borderBottomColor: '#D9D9D9',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            height: '100%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 2,
              justifyContent: 'space-evenly',
            }}>
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.name}>Your Relation | {relation}</Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'space-evenly',
            }}>
            <Text style={styles.name}>Child Relation</Text>
            <Text style={styles.name}>Daughter ^</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 7.5,
            }}>
            <View style={styles.cancelCircle}>
              <Cross />
            </View>
            <View style={{ paddingTop: 2.5 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  lineHeight: 16,
                  textAlign: 'center',
                  color: '#699595',
                }}>
                Cancel
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const [listData, setListData] = useState(combinedArray);
  let row = [];
  let prevOpenedRow;

  const KidsProfileItem = (
    { firstName, profile_pic, relation, email, dob, kycstatus, item, index },
    onClick,
  ) => {
    const closeRow = index => {
      console.log('closerow');
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX, onClick) => {
      return (
        <View
          style={{
            width: '15%',
            backgroundColor: '#359DB6',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
            marginVertical: 2,
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
          }}>
          <Trash />
        </View>
      );
    };
    var age = calculateAge(dob);

    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, onClick)
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={ref => (row[index] = ref)}
        rightOpenValue={-100}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            backgroundColor: '#DCF6FF',
            padding: 1,
            marginVertical: 2,
          }}>
          <View
            style={{
              height: '100%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Avatar
                size={'medium'}
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
            <View style={{ flex: 0.2 }} />
            <View
              style={{
                flex: 5,
                justifyContent: 'space-evenly',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.name}>{firstName}</Text>
              <Text style={styles.name}>{email}</Text>
            </View>
            <View
              style={{
                flex: 0.7,
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.name}>{age}</Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.name}>{relation}</Text>
            </View>
            <View
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 7.5,
              }}>
              <Text style={styles.name}>{`${kycstatus}`}</Text>
            </View>
          </View>
        </View>
      </Swipeable>
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
                Profile
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
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              flex: 1.2,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <View
              style={{
                height: '100%',
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  height: '30%',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#359DB6',
                }}>
                <Text
                  style={{
                    color: '#359DB6',
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: '600',
                    justifyContent: 'flex-start',
                  }}>
                  Awaiting Request
                </Text>
              </View>
              <View
                style={{
                  height: '60%',
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#D9D9D9',
                }}>
                <FlatList
                  data={acceptReceivedRequest}
                  renderItem={({ item }) => (
                    <Item
                      firstName={item.firstName}
                      status={item.status}
                      lastName={item.lastName}
                      profile_pic={item.profile_pic}
                      relation={item.yourRelation}
                    />
                  )}
                  //keyExtractor={item => item.OriginalTaskId}
                  ListEmptyComponent={RenderEmptyList}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1.5 }}>
            <View
              style={{
                height: '100%',
                width: '90%',
                alignSelf: 'center',
                //justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  height: '30%',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#359DB6',
                }}>
                <Text
                  style={{
                    color: '#359DB6',
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: '600',
                    justifyContent: 'flex-start',
                  }}>
                  Sent Request
                </Text>
              </View>
              <View
                style={{
                  height: '70%',
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#D9D9D9',
                }}>
                <FlatList
                  data={sentRequest}
                  renderItem={({ item }) => (
                    <SentItem
                      firstName={item.firstName}
                      status={item.status}
                      lastName={item.lastName}
                      profile_pic={item.profile_pic}
                      relation={item.yourRelation}
                    />
                  )}
                  //keyExtractor={item => item.OriginalTaskId}
                  ListEmptyComponent={RenderEmptyList}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <View
              style={{
                height: '100%',
                width: '90%',
                alignSelf: 'center',
                //justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  height: '15%',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#359DB6',
                }}>
                <Text
                  style={{
                    color: '#359DB6',
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: '600',
                    justifyContent: 'flex-start',
                  }}>
                  Kid's Profile
                </Text>
              </View>
              <View
                style={{
                  height: '25%',
                  flexDirection: 'row',
                }}>
                {/* <View style={{ flex: 1, backgroundColor: 'red' }}></View>
                <View style={{ flex: 0.2, backgroundColor: 'pink' }}></View> */}
                <View style={{ flex: 0.2 }} />
                <View
                  style={{
                    flex: 6,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                    }}>
                    Profile
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                    }}>
                    Age
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                    }}>
                    Relation
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                    }}>
                    KYC Status
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: '60%',
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#D9D9D9',
                }}>
                <FlatList
                  data={combinedArray}
                  renderItem={({ item }) => (
                    <KidsProfileItem
                      firstName={item.name}
                      profile_pic={item.profile_pic}
                      relation={item.relation}
                      dob={item.dob}
                      email={item.email}
                      kycstatus={item.kycStatus}
                    />
                  )}
                  //keyExtractor={item => item.OriginalTaskId}
                  ListEmptyComponent={RenderEmptyList}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '35%',
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                style={{
                  height: '80%',
                  width: '80%',
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: '#FF9D4C',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 17,
                    letterSpacing: 3,
                    textAlign: 'center',
                    color: '#FF9D4C',
                  }}>
                  Add Parent
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                height: '35%',
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                style={{
                  height: '80%',
                  width: '80%',
                  backgroundColor: '#FF9D4C',
                  borderRadius: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 17,
                    letterSpacing: 3,
                    textAlign: 'center',
                    color: '#FFFFFF',
                  }}>
                  Add Child
                </Text>
              </Pressable>
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

export default connect(mapStateToProps, mapDispatchToProps)(FamilyMembers);

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
    fontSize: 12,
    fontWeight: '600',
    color: '#303030',
    lineHeight: 16,
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
  cancelCircle: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#699595',
  },
  acceptCircle: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#359DB6',
  },
});
