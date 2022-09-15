import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { t } from 'i18next';
import Spinner from 'react-native-loading-spinner-overlay';

import { Formik } from 'formik';
import * as Yup from 'yup';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const Login = ({ navigation }) => {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const { isLoading, isAuthenticating, login, error } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('common:EmailIsRequired'))
      .email(t('common:EmailIsInvalid')),
    password: Yup.string()
      .required(t('common:PasswordIsRequired'))
      .min(6, t('common:PasswordMustBeAtLeast6Characters')),
  });
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.ImageBackground}>
      <View style={styles.login}>
        <Spinner visible={isLoading} />
        {/* <ActivityIndicator animating={isLoading} size="large" color="#0000ff" /> */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validateOnMount={true}
          onSubmit={(values) => {
            login(values.email, values.password);
          }
          }
          validationSchema={validationSchema}
        >
          {({
            handleChange, handleBlur, handleSubmit, values, errors, touched, isValid
          }) => (
            <View style={styles.form}>

              <View style={styles.loginContent}>
                <TextInput
                  style={styles.textInput}
                  placeholder={t('common:Email')}
                  placeholderTextColor='#9c9c9c'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.loginContent}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder={t('common:Password')}
                  placeholderTextColor='#9c9c9c'
                  secureTextEntry={true}
                />
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>
              <View>
                <Text style={[styles.error, { alignSelf: 'center' }]}>{error ? error : ''}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Reset Your Password')}>
                <Text style={styles.buttonText}>{t('common:ForgotPassword')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.loginButton, {
                backgroundColor: isValid ? '#1a6997' : '#9c9c9c',
              }]}
                disabled={!isValid} onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>{t('common:Login')}</Text>
              </TouchableOpacity>
              <View style={styles.signup}>
                <Text style={{ color: '#999' }}>{t('common:DoNotHaveAnAccount')} </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.signupButton}>{t('common:SignUp')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        {/* <View style={styles.loginContent}>
        <TextInput
          style={styles.textInput}
          placeholder={t('common:Email')}
          placeholderTextColor='#9c9c9c'
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder={t('common:Password')}
          placeholderTextColor='#9c9c9c'
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Reset Your Password')}>
        <Text style={styles.buttonText}>{t('common:ForgotPassword')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          login(email, password);
        }}>
        <Text style={styles.loginButtonText}>{t('common:Login')}</Text>
      </TouchableOpacity>
      <View style={styles.signup}>
        <Text style={{ color: '#999' }}>{t('common:DoNotHaveAnAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupButton}>{t('common:SignUp')}</Text>
        </TouchableOpacity>
      </View> */}
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    opacity: 0.3,
  },
  login: {
    flex: 0.6,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 1,
    // opacity: 0.8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#999',
    marginVertical: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    color: '#000',
  },
  loginContent: {
    // marginTop: 50,
  },
  button: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: '#166795',
    fontSize: RFPercentage(2.1),
  },
  loginButton: {
    marginTop: 10,
    // backgroundColor: '#1570a5',
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: RFPercentage(2.7),
    textAlign: 'center',
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
  signupButton: {
    color: '#166795',
    fontSize: RFPercentage(2.4),
    marginLeft: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
