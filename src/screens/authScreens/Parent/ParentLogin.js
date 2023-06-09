import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useSyncExternalStore } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { AsyncStorageKeys, getAsyncStorage } from '../../../utils/helpers';
import * as actionCreator from '../../../redux/action/index';
import { connect, useDispatch } from 'react-redux';
import { Colors, Fonts } from '../../../theme';
import { AuthLoader } from '../../../components';

const ParentLogin = props => {
  const {
    loading,
    errorMessage,
    successMessage,
    setStatus,
    navigation,
    parentLoginAction,
  } = props;
  //const navigation = useNavigation();
  const dispatch = useDispatch();
  //const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const getToken = async () => {
    let authToken = (await getAsyncStorage(AsyncStorageKeys.AUTH_TOKEN)) || '';
    //console.log({ authToken })
    setToken(authToken);
  };

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

  //const state = useSelector(state => state)
  const [showPassword, setShowPassword] = useState(true);
  const handlelogin = (id, password) => {
    const user = { id, password };
    parentLoginAction(user, navigation);

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
            onChangeText={text => {
              setUsername(text);
              dispatch(
                setStatus({
                  error: '',
                  errorMessage: '',
                }),
              );
            }}
            placeholder="Email"
            placeholderTextColor={'#6E6E6E'}
            style={styles.textInputContainer}
          />
          <View
            style={{
              justifyContent: 'center',
            }}>
            <TextInput
              onChangeText={text => {
                dispatch(
                  setStatus({
                    error: '',
                    errorMessage: '',
                  }),
                );
                setPassword(text);
              }}
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
      <AuthLoader loading={loading} />
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
    parentLoginAction: (data, navigation) =>
      dispatch(actionCreator.parentLoginAction(data, navigation)),
    //ResetErrors: () => dispatch(actionCreator.ResetErrors()),
    setStatus: data => dispatch(actionCreator.setStatus(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ParentLogin);

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
    paddingVertical: Platform.OS === 'ios' ? 10 : 10,
  },
  loaderContainer: {
    backgroundColor: 'red',
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: Colors.red,
    fontSize: Fonts.size.f12,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
