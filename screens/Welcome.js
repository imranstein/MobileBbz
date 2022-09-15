import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';
import RegisterScreen from './RegisterScreen';
import { useTranslation } from "react-i18next";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const Welcome = ({ navigation }) => {
  const { t, } = useTranslation();

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.ImageBackground}>
      <View>
        <Text style={styles.welcome}>{t('common:WelcomeTo')} BBZ!</Text>
        <Text style={styles.description}>
          {t('common:Login')}/{t('common:SignUp')} {t('common:ToGetYourProfileAndStayUpdatedWithTheUpcomingExamsAndNews')}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>{t('common:Login')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signup}>
        <Text style={{
          fontSize: RFPercentage(2.45), color: '#999'
        }}>{t('common:DoNotHaveAnAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupButton}>{t('common:SignUp')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}>
        <Text
          style={{
            color: '#166795',
            fontSize: RFPercentage(2.45),
            textAlign: 'center',
            marginTop: '1%',
          }}>
          {t('common:ContinueAsAGuest')}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  welcome: {
    color: '#1570a5',
    fontSize: RFPercentage(3.8),
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: '15%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    opacity: 0.8,
  },
  description: {
    color: 'gray',
    textAlign: 'center',
    marginTop: '5%',
    paddingHorizontal: '12%',
    fontSize: RFPercentage(2.4),
  },
  button: {
    backgroundColor: '#1570a5',
    borderRadius: 5,
    paddingHorizontal: '12%',
    width: '90%',
    marginLeft: '5%',
    height: '17%',
    marginTop: '10%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    marginTop: '5%',
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: '-10%',
  },
  signupButton: {
    color: '#166795',
    fontSize: RFPercentage(2.45),
    marginLeft: '1%',
  },
});
