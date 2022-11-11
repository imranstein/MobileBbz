import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';
import { t } from 'i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale } from 'react-native-size-matters';




const ResetPassword = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('common:EmailIsRequired'))
      .email(t('common:EmailIsInvalid')),
  }).defined();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  // const {isLoading, reset} = useContext(AuthContext);
  const PasswordReset = (email) => {
    setIsLoading(true);
    console.log(email)
    // const PasswordReset = async function (): Promise<boolena> {
    //   const emailValue = email;
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/reset-password`, { email })
      .then(res => {
        console.log(res);
        alert(t('common:PasswordResetLinkIsSentToYourEmail'), t('common:Success'));
        setIsLoading(false);
        navigation.navigate('Success');
        return true;
      })
      .catch(e => {
        console.log(e);

        if (e.response.status === 400) {
          alert(e.response.data.message, 'Error');
        } else if (e.response.status === 500) {
          alert(t('common:SorryTheEmailYouEnteredIsNotRegistered'), 'Error');
        } else if (e.response.status === 422) {
          alert(t('common:PleaseEnterAValidEmail'), 'Error');
        }
        setIsLoading(false);
        return false;

      });
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.ImageContainer}
      imageStyle={styles.ImageBackground}>
      <Spinner visible={isLoading} />
      <View style={styles.container}>
        <Text style={styles.text}>
          {t('common:ResetPasswordMessage')}
        </Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => {
            PasswordReset(
              values.email,
            );
          }}
          validationSchema={validationSchema}>
          {({
            handleChange, handleBlur, handleSubmit, values, errors, touched,
          }) => (
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                style={styles.input}
                placeholder={t('common:Email')}
                placeholderTextColor='#9c9c9c'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType='email-address'
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>{t('common:SendPassword')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ImageBackground>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  ImageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    opacity: 1,
  },
  container: {
    // flex: 0.5,
    alignItems: 'center',
    marginTop: 32,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 13,
  },
  text: {
    marginTop: 30,
    width: 274,
    textAlign: 'left',
    lineHeight: 20,
    fontSize: 12,
    height: 55,
    color: '#5E6D77',
    fontFamily: 'Poppins-Regular',
    // marginBottom: '7%',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#DAE1E7',
    borderWidth: 1,
    // marginBottom: '7%',
    borderRadius: 4,
    paddingLeft: 14,
    color: '#566573',
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    width: '100%',
    height: 45,
    backgroundColor: '#1570A5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    paddingVertical: 13,
    fontFamily: 'Poppins-Bold',
    textTransform: 'uppercase',
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
});
