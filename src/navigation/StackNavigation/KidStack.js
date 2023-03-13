import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';

const KidStack = () => {
  const {colors} = useTheme();
  //console.log('colors >>', colors);
  return (
    <View style={styles.container}>
      <Text>KidStack</Text>
    </View>
  )
}

export default KidStack

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})