import { StackActions, useNavigation } from '@react-navigation/native';
import { Overlay } from '@rneui/base';
import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
const image = { uri: 'https://ibb.co/sCM3D5J' };

const Login = props => {
  const { isParentLoggedIn } = props;

  useEffect(() => {
    if (isParentLoggedIn) {
      navigation.dispatch(StackActions.replace('AppStack'));
    }
  }, []);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/backgroundImages/prelogin_bg.png')}
        resizeMode="stretch"
        style={styles.image}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1.8 }}>
            <ImageBackground
              source={require('../../assets/backgroundImages/pocketMoney.png')}
              resizeMode="stretch"
              style={styles.image}>
              <View style={{ flex: 0.25, alignItems: 'center' }}>
                <View style={{ height: '95%', width: '17.5%' }}>
                  <Image
                    source={require('../../assets/backgroundImages/logo.png')}
                    resizeMode="stretch"
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              </View>
              <View style={{ flex: 0.53 }}></View>
              <View style={{ flex: 0.22, alignItems: 'center' }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 12.5,
                    //borderWidth:1,
                    //borderColor:'#000000',
                    textShadowColor: '#000000',
                    textShadowRadius: 1,
                    textShadowOffset: { width: 0, height: -0.2 },
                    color: '#369BB4',
                    textAlign: 'center',
                    // shadowColor: '#00000',
                    // shadowOffset: { width: 0, height: 4 },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 2,
                    elevation: 5,
                    //lineHeight:30.48,
                  }}>
                  powered by Cogito
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 1.1 }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Parent Login')}
                style={{
                  height: '72%',
                  width: '46%',
                  backgroundColor: '#FBC300',
                  alignSelf: 'center',
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 8,
                  borderColor: '#FF7181',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <View style={{flex:1,backgroundColor:'green',width:'90%',justifyContent:'center',alignItems:'center'}}> */}
                {/* <View style={{
        flex:0.9,
        backgroundColor:'#FBC300',
        width:'90%',
        //alignSelf:'center',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
       }}>
       */}
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 20,
                    color: '#FFFFFF',
                  }}>
                  i’m a parent
                </Text>
                {/* </View> */}
                {/* </View> */}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Kid Login')}
                style={{
                  height: '36%',
                  width: '46%',
                  backgroundColor: '#00B7C6',
                  alignSelf: 'center',
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 8,
                  borderColor: '#FF7181',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <View style={{flex:1,backgroundColor:'green',width:'90%',justifyContent:'center',alignItems:'center'}}> */}
                {/* <View style={{
        flex:0.9,
        backgroundColor:'#00B7C6',
        width:'90%',
        //alignSelf:'center',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
       }}> */}
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 20,
                    color: '#FFFFFF',
                  }}>
                  i’m a kid
                </Text>
                {/* </View> */}
                {/* </View> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    //justifyContent: "center",
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

const mapStateToProps = ({ authReducer, userReducer }) => {
  return {
    profile: userReducer.profile,
    isParentLoggedIn: authReducer.isParentLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    IsLogInAsync: () => dispatch(actionCreator.isLogInAsync()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
