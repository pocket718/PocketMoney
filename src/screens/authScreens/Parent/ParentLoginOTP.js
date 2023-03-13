import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { confirmForgotPasswordOTP } from '../../../redux/action/authAction';

const { width, height } = Dimensions.get('screen');

const ParentLoginOTP = ({ navigation, route }) => {
  const state = useSelector(state => state);
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();
  const OtpRef = useRef(null);
  const { email } = route.params;
  useEffect(() => {
    setTimeout(() => OtpRef.current.focusField(0), 250);
  }, []);
  const handleOTP = (otp, email) => {
    if (otp === '') {
      ToastAndroid.show('Please Enter OTP', ToastAndroid.SHORT);
      return;
    }
    try {
      dispatch(confirmForgotPasswordOTP({ email: email, otp: otp }));
      if (state.authReducer.otpVerified) {
        navigation.navigate('Parent New Password');
      }
    } catch (error) {
      console.log(error);
    }
    // else
    // ToastAndroid.show(state.errorMessage,ToastAndroid.SHORT)
  };
  return (
    <ImageBackground
      source={require('../../../assets/backgroundImages/overlay.png')}
      style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 50 }}>
        <Text
          style={[
            styles.text,
            { fontSize: 13, fontWeight: '600', textAlign: 'center' },
          ]}>
          Enter OTP
        </Text>
        <View style={{ marginTop: 30 }}>
          {
            <OTPInputView
              ref={OtpRef}
              onCodeChanged={code => setOtp(code)}
              pinCount={6}
              autoFocusOnLoad={false}
              style={{ height: height * 0.1 }}
              codeInputHighlightStyle={[styles.text]}
              codeInputFieldStyle={{
                borderBottomWidth: 1.5,
                borderWidth: 0,
                width: width * 0.1,
                borderBottomColor: 'black',
                borderRadius: 0,
                color: 'black',
              }}
            />
          }
        </View>
        <View style={{ alignSelf: 'center', marginTop: 50 }}>
          <TouchableOpacity
            onPress={() => handleOTP(otp, email)}
            style={{
              width: 150,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FBC300',
              borderRadius: 10,
            }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#359DB6',
  },
});

export default ParentLoginOTP;
