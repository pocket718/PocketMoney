import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import moment from 'moment';
import CogIcon1 from '../../assets/svgImages/cogIcon1';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const RewardsComponent = props => {
  const { childList } = props;
  const { taskTitle, deadline, taskTimeStamp, status, total_reward } =
    props.rewardData;

  // console.log('propsRewardData >>', props.rewardData);
  const [childData, setChildData] = React.useState();

  React.useEffect(() => {
    childList?.map(child => {
      // console.log(77, child?._id, props.rewardData?.childId);
      if (child?._id == props.rewardData?.childId) {
        // console.log(77, child?._id, props.rewardData?.childId);
        setChildData(child);
      }
    });
  }, [props.rewardData, childList]);

  return (
    <View colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.item}>
      <View
        style={{
          flex: 1,
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}>
        <View style={{ flex: 0.5, flexDirection: 'row' }}>
          <Text style={styles.rewardsText}>{total_reward}</Text>
          <CogIcon1 width={25} height={25} />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={styles.taskName}>{taskTitle}</Text>
          {/* <Text style={styles.name}>Due: {DateFormatter(deadline)}</Text> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <EvilIcons name="calendar" size={22} color="#6F6F6F" />
          <Text
            style={{
              fontWeight: '400',
              color: '#6F6F6F',
              fontSize: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            {props.rewardData?.frequency === 'once'
              ? moment(props.rewardData?.taskHistory[0].taskTimeStamp).format(
                  'MMM DD, yyyy',
                )
              : moment(props.rewardData?.startDate).format('MMM DD, yyyy')}
          </Text>
          <Image
            style={{
              width: 23,
              height: 23,
              borderRadius: 400 / 2,
            }}
            source={{
              uri: childData?.profile_pic
                ? 'https://cogito.sgp1.cdn.digitaloceanspaces.com' +
                  '/' +
                  childData?.profile_pic
                : 'https://cogito.sgp1.cdn.digitaloceanspaces.com/assets%2Fuser.png',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RewardsComponent;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#C9E5EC',
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
    color: '#6F6F6F',
    fontWeight: '800',
    marginBottom: 5,
  },
  name: {
    fontSize: 12,
    color: '#6FC1D4',
  },
  rewardsText: {
    fontSize: 20,
    marginRight: 5,
    fontWeight: '800',
    color: '#6F6F6F',
  },
});
