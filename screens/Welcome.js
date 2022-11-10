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
          onPress={() => navigation.push('Login')}>
          <Text style={styles.buttonText}>{t('common:LoginCap')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signup}>
        <Text style={{
          fontSize: RFPercentage(2.45), color: '#000000'
        }}>{t('common:DoNotHaveAnAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.push('Register')}>
          <Text style={styles.signupButton}>{t('common:SignUp')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.push('Main')}>
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
          <Text style={{ marginTop: 7, marginRight: 5, }}><Entypo
            name="arrow-long-left"
            size={18}
            color="#1a6997"
            style={styles.icon}
          /></Text>
          <Text
            style={{
              color: '#1570A5',
              fontSize: RFPercentage(2.45),
              textAlign: 'center',
              marginTop: '1%',
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
    color: 'gray',
    textAlign: 'center',
    marginTop: scale(9),
    paddingHorizontal: width * 0.042,
    fontSize: RFValue(16),
  },
  button: {
    backgroundColor: '#1570A5',
    borderRadius: 5,
    paddingHorizontal: '12%',
    width: '90%',
    marginLeft: '5%',
    height: '17%',
    marginTop: scale(20),
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: scale(13),
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: '-5%',
  },
  signupButton: {
    color: '#1570A5',
    fontSize: RFValue(14),
    marginLeft: '1%',
    marginTop: '4%',
  },
});
export default Welcome;
