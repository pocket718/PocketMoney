import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { parentLoginAction } from '../../../redux/action/authAction';
//import { useDispatch, useSelector } from 'react-redux';

import {
  AsyncStorageKeys,
  getAsyncStorage,
  setAsyncStorage,
} from '../../../utils/helpers';
import * as actionCreator from '../../../redux/action/index';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

const ParentLogin = props => {
  const {
    loading,
    errorMessage,
    successMessage,
    parentLoginAction,
    setStatus,
    navigation,
  } = props;
  //const navigation = useNavigation();
  //const dispatch = useDispatch()
  //const navigation = useNavigation();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState('');
  const getToken = async () => {
    let authToken = (await getAsyncStorage(AsyncStorageKeys.AUTH_TOKEN)) || '';
    //console.log({ authToken })
    setToken(authToken);
  };
  //const state = useSelector(state => state)
  const [showPassword, setShowPassword] = useState(true);
  const handlelogin = (id, password) => {
    const user = { id, password };
    console.log('parent', parentLoginAction);
    parentLoginAction(user);

    // console.log(user)
    // dispatch(parentLoginAction(user))
    //   if(state.authReducer.isParentLoggedIn){
    //     navigation.replace("ParentStack")
    //   }
    //   else
    //   // ToastAndroid.show(state.authReducer.errorMessage,ToastAndroid.SHORT)
    //   console.log("error")
  };

  return (
    <ImageBackground
      source={require('../../../assets/backgroundImages/overlay.png')}
      style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 50 }}>
        <Text style={[styles.text, { fontSize: 30, fontWeight: '700' }]}>
          Hi there!
        </Text>
        <Text style={[styles.text, { fontSize: 15, fontWeight: '600' }]}>
          You're now logging in as a parent
        </Text>
        <View style={{ marginTop: 30 }}>
          <TextInput
            autoCapitalize={'none'}
            onChangeText={text => setUsername(text)}
            placeholder="Email"
            placeholderTextColor={'#6E6E6E'}
            style={{
              width: '100%',
              borderBottomWidth: 0.5,
              borderBottomColor: 'black',
              padding: 0,
              color: '#6E6E6E',
            }}
          />
          <View
            style={{
              width: '100%',
              borderBottomWidth: 0.5,
              borderBottomColor: 'black',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TextInput
              onChangeText={text => setPassword(text)}
              placeholder="Password"
              style={{ padding: 0, color: '#6E6E6E' }}
              secureTextEntry={showPassword}
              placeholderTextColor={'#6E6E6E'}
            />
            <IonIcons
              onPress={() => setShowPassword(!showPassword)}
              name={!showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              style={[styles.text, { position: 'absolute', right: 0 }]}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Parent Forgot Password')}>
            <Text
              style={[
                styles.text,
                { fontSize: 11, fontWeight: '700', marginTop: 5 },
              ]}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: 'center', marginTop: 50 }}>
          <TouchableOpacity
            onPress={() => handlelogin(username, password)}
            style={{
              width: 150,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FBC300',
              borderRadius: 10,
            }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Kid Login')}>
            <Text
              style={[
                styles.text,
                { fontSize: 12, textAlign: 'center', marginTop: 5 },
              ]}>
              want to login as a kid?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const mapStateToProps = ({ authReducer, props }) => {
  return {
    loading: authReducer.loading,
    error: authReducer.error,
    errorMessage: authReducer.errorMessage,
    successMessage: authReducer.successMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    parentLoginAction: data => dispatch(actionCreator.parentLoginAction(data)),
    //ResetErrors: () => dispatch(actionCreator.ResetErrors()),
    setStatus: data => dispatch(actionCreator.setStatus(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ParentLogin);

const styles = StyleSheet.create({
  text: {
    color: '#359DB6',
  },
});
