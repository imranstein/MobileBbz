import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import React, { useCallback } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';
import RegisterScreen from './RegisterScreen';
import { useTranslation } from "react-i18next";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

console.log('height', height);
console.log('width', width)

const Welcome = ({ navigation }) => {

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
    }, []),
  );

  const { t, } = useTranslation();
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.ImageBackground}>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Language')}>
          <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', alignSelf: 'flex-end', alignItems: 'flex-end', marginTop: scale(10), marginBottom: scale(-10), marginRight: scale(10), borderColor: '#cecece', borderWidth: scale(1), padding: scale(5), borderRadius: scale(5) }}>
            <View style={{ flexDirection: 'row' }}>
              <Entypo
                name="language"
                size={30}
                color="#1570A5"
                style={styles.icon}
              />
              {/* <Text style={{
              color: '#000',
              marginLeft: scale(5),
              fontSize: scale(16)
            }}>
              {t('common:Language')}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.welcome}>{t('common:WelcomeTo')} BBZ!</Text>
        <Text style={styles.description}>
          {t('common:Login')}/{t('common:SignUp')} {t('common:ToGetYourProfileAndStayUpdatedWithTheUpcomingExamsAndNews')}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>{t('common:LoginCapital')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signup}>
        <Text style={{
          fontSize: RFPercentage(2.45), 
          color: '#000000',
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
        }}>{t('common:DoNotHaveAnAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupButton}>{t('common:SignUp')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}>
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
          <Text style={{ 
            marginTop: 3, 
            marginRight: 5, }}><Entypo
            name="arrow-long-left"
            size={16}
            color="#1a6997"
            style={styles.icon}
          /></Text>
          <Text
            style={{
              color: '#1570A5',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
              // marginTop: '1%',
            }}>
            {t('common:ContinueAsAGuest')}
          </Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  welcome: {
    color: '#1570A5',
    fontSize: scale(26),
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: scale(32),
    fontFamily: 'Poppins-Medium'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    opacity: 1,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#5E6D77',
    textAlign: 'center',
    marginTop: height / 35,
    paddingHorizontal: width * 0.042,
    fontSize: RFValue(12),
  },
  button: {
    backgroundColor: '#1570A5',
    borderRadius: 4,
    paddingHorizontal: '12%',
    width: '90%',
    marginLeft: '5%',
    height: 50,
    marginTop: height * 0.04,
  },

  buttonText: {
    color: '#fff',

    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignItems: 'center',

    height: 50,
    // backgroundColor: 'red',
    lineHeight: 50,
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    // paddingTop: height * 0.025,
  },

  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },

  signupButton: {
    color: '#1570A5',
    fontSize: RFValue(14),
    // marginLeft: '1%',
    // marginTop: '4%',
    fontFamily: 'Poppins-Regular',
          fontSize: 15,
  },
});
export default Welcome;
