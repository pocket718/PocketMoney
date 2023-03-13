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
  import  { useState } from 'react';

  import React from 'react';
  import { useDispatch } from 'react-redux';
  import { forgotPassword } from '../../../redux/action/authAction';
  import {useSelector} from "react-redux"
  

const ParentForgotPassword = ({navigation}) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [email,setEmail] = useState('')

  const handleForgotPassword = email => {
    
    dispatch(forgotPassword(email))
    if(state.authReducer.verificationMailSent){
      navigation.navigate("Parent OTP",{email:email});
    }
    else
    ToastAndroid.show(state.authReducer.errorMessage, ToastAndroid.SHORT);
  }
  return (
    <ImageBackground
    source={require('../../../assets/backgroundImages/overlay.png')}
    style={{ flex: 1, justifyContent: 'center' }}>
    <View style={{ paddingHorizontal: 50 }}>
      <Text style={[styles.text, { fontSize: 13, fontWeight: '600' }]}>
      Enter your email to receive the OTP for change of password
      </Text>
      <View style={{ marginTop: 30 }}>
        <TextInput
        onChangeText={text => setEmail(text)}
          placeholder="Email"
          style={{
            width: '100%',
            borderBottomWidth: 0.5,
            borderBottomColor: 'black',
            padding: 0,
          }}
        />
      </View>
      <View style={{ alignSelf: 'center', marginTop: 50 }}>
      <TouchableOpacity
        onPress={() => handleForgotPassword(email)}
          style={{
            width: 150,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FBC300',
            borderRadius: 10,
          }}>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>
            Send OTP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  )
}

const styles = StyleSheet.create({
    text: {
      color: '#359DB6',
    },
  });

export default ParentForgotPassword