import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { resetPassword } from '../../../redux/action/authAction';
import { useSelector,useDispatch } from 'react-redux';

const KidResetPassword = ({navigation}) => {
  const [password,setPassword] = useState()
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [confirmPassword,setConfirmPassword] = useState()
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);

  const handleResetPassword = password => {
    if(password === confirmPassword){
      dispatch(resetPassword({token:"token",password:password}))
        if(state.authReducer.isPasswordReset){
          navigation.replace("Kid Login")
        }
        else
        ToastAndroid.show(state.authReducer.errorMessage,ToastAndroid.SHORT)
    }
    else
    ToastAndroid.show('Password does not match!', ToastAndroid.SHORT);
  }
  return (
    <ImageBackground
      source={require('../../../assets/backgroundImages/background2.png')}
      style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 50 }}>
        <Text style={[styles.text, { fontSize: 15, fontWeight: '600' }]}>
          Type in your new password.
        </Text>
        <View style={{ marginTop: 30 }}>
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
              placeholder="New Password"
              style={{ padding: 0 }}
              secureTextEntry={showPassword}
            />
            <IonIcons
              onPress={() => setShowPassword(!showPassword)}
              name={!showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              style={[styles.text, { position: 'absolute', right: 0 }]}
            />
          </View>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 0.5,
              borderBottomColor: 'black',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TextInput
            onChangeText={text => setConfirmPassword(text)}
              placeholder="Re-type new password"
              style={{ padding: 0 }}
              secureTextEntry={showPassword1}
            />
            <IonIcons
              onPress={() => setShowPassword1(!showPassword1)}
              name={!showPassword1 ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              style={[styles.text, { position: 'absolute', right: 0 }]}
            />
          </View>
        </View>
        <View style={{ alignSelf: 'center', marginTop: 50 }}>
          <TouchableOpacity
          onPress={() => handleResetPassword(password)}
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

export default KidResetPassword;
