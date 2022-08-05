import React from 'react';
import {
  ActivityIndicator,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.ImageBackground}>
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#1a6997'}}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    opacity: 0.3,
  },
});
