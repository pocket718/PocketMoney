import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { childrenLoginAction } from '../../../redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Fonts } from '../../../theme';
import { AuthLoader } from '../../../components';

const KidsLogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { authReducer } = useSelector(state => state);
  const loading = authReducer.loading;
  const errorMessage = authReducer.errorMessage;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const checkValidation = () => {
    if (username === '') {
      setErrorMsg('Please Enter Email');
    } else if (password === '') {
      setErrorMsg('Please Enter Password');
    } else {
      setErrorMsg('');
      handlelogin(username, password);
    }
  };

  const handlelogin = (email, password) => {
    const user = { email, password };
    dispatch(childrenLoginAction(user, navigation));
    console.log(state);
    if (state.authReducer.isChildrenLoggedIn) {
      navigation.replace('KidStack');
    } else {
      setErrorMsg(state.authReducer.errorMessage);
      if (Platform.OS === 'android') {
        ToastAndroid.show(state.authReducer.errorMessage, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/backgroundImages/background2.png')}
      style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 50 }}>
        <Text style={[styles.text, { fontSize: 30, fontWeight: '700' }]}>
          Hi there!
        </Text>
        <Text style={[styles.text, { fontSize: 15, fontWeight: '600' }]}>
          You're now logging in as a Kid
        </Text>
        <View style={{ marginTop: 30 }}>
          <TextInput
            autoCapitalize={'none'}
            onChangeText={text => setUsername(text)}
            placeholder="Email"
            placeholderTextColor={'#6E6E6E'}
            style={styles.textInputContainer}
          />
          <View
            style={{
              justifyContent: 'center',
            }}>
            <TextInput
              onChangeText={text => setPassword(text)}
              placeholder="Password"
              secureTextEntry={showPassword}
              placeholderTextColor={'#6E6E6E'}
              style={styles.textInputContainer}
            />
            <IonIcons
              onPress={() => setShowPassword(!showPassword)}
              name={!showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              style={[styles.text, { position: 'absolute', right: 0 }]}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Kid Forgot Password')}>
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
          {(errorMsg !== '' || errorMessage !== '') && (
            <Text style={styles.errorText}>{errorMessage || errorMsg}</Text>
          )}
          <TouchableOpacity
            onPress={() => checkValidation()}
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
          <TouchableOpacity onPress={() => navigation.navigate('Parent Login')}>
            <Text
              style={[
                styles.text,
                { fontSize: 12, textAlign: 'center', marginTop: 5 },
              ]}>
              want to login as a Parent?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <AuthLoader loading={loading} />
    </ImageBackground>
  );
};

export default KidsLogin;

const styles = StyleSheet.create({
  text: {
    color: '#359DB6',
  },
  textInputContainer: {
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.secondary,
    color: Colors.secondary,
    fontSize: Fonts.size.f15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  errorText: {
    color: Colors.red,
    fontSize: Fonts.size.f12,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
