import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';
import RegisterScreen from './RegisterScreen';
import { useTranslation } from "react-i18next";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
console.log('height', height);
console.log('width', width)
const Welcome = ({ navigation }) => {
  const { t, } = useTranslation();
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.ImageBackground}>

      <View>
        <TouchableOpacity
          onPress={() => navigation.push('Language')}>
          <View style={{ alignContent: 'flex-end', justifyContent: 'flex-end', alignSelf: 'flex-end', alignItems: 'flex-end', marginTop: 10, marginBottom: -10, marginRight: 10, borderColor: '#cecece', borderWidth: 1, padding: 5, borderRadius: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Entypo
                name="language"
                size={30}
                color="#1570A5"
                style={styles.icon}
              />
              {/* <Text style={{
              color: '#000',
              marginLeft: 5),
              fontSize: 16)
            }}>
              {t('common:Language')}</Text> */}


            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.welcome}>{t('common:WelcomeTo')} BBZ!</Text>
        <Text style={styles.description}>
          {t('common:ToGetYourProfileAndStayUpdatedWithTheUpcomingExamsAndNews')}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('Login')}>
          <Text style={styles.buttonText}>{t('common:LoginCap')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signup}>
        <Text style={{
          fontFamily: 'Poppins-light',
          fontSize: 14, color: '#000000'
        }}>{t('common:DoNotHaveAnAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.push('Register')}>
          <Text style={styles.signupButton}>{t('common:SignUp')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.push('Main')}>
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
          <Text style={{ marginTop: 7, marginRight: 9, }}><Entypo
            name="arrow-long-left"
            size={18}
            color="#1a6997"
            style={styles.icon}
          /></Text>
          <Text
            style={{
              color: '#1570A5',
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'Poppins-Regular',
              marginTop: 7,
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
    fontSize: 26,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 32,
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
    marginTop: 9,
    marginHorizontal: 50,
    fontSize: 12,
    height: 55,
    width: 274
  },
  button: {
    backgroundColor: '#1570A5',
    borderRadius: 5,

    width: width - 36,
    marginLeft: '5%',
    height: 45,
    marginTop: 20,

  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    paddingVertical: 13,
    paddingHorizontal: 140,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signup: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,

  },
  signupButton: {
    color: '#1570A5',
    fontSize: 14,
    // marginTop: '4%',
  },
});
export default Welcome;
