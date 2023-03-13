import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { AppImages } from '../assets/images';

const AuthLoader = loading => {
  const { loading } = props;
  return (
    <>
      {loading && (
        <View style={styles.loaderContainer}>
          <Image
            source={AppImages.AuthLoader}
            style={{ height: 100, width: 100 }}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  loaderContainer: {
    backgroundColor: 'red',
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoader;
