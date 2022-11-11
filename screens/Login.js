import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
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
import { scale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import CheckBox from '@react-native-community/checkbox';


const Login = ({ navigation }) => {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
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
        <ScrollView>
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
                {error ?
                  <View>
                    <Text style={[styles.error, { alignSelf: 'center' }]}>{error ? error : ''}</Text>
                  </View> : null}
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                      marginTop: -8,
                      marginLeft: -6,
                    }}><CheckBox
                        s
                        value={rememberMe}
                        onPress={() => setRememberMe(!rememberMe)}
                        onValueChange={newValue => setRememberMe(newValue)}
                        tintColors={{ true: '#1570A5', false: '#B4B9BE', borderWidth: 0.5, }}
                      />
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Light',
                      color: '#000000'
                    }}>{t('common:RememberMe')}</Text>

                    {/* {touched.terms && errors.terms && <Text style={styles.error}>{errors.terms}</Text>} */}
                  </View>
                  <TouchableOpacity
                    style={[styles.button, {
                      marginLeft: 107,
                    }]}
                    onPress={() => navigation.push('Reset Your Password')}>
                    <Text style={styles.buttonText}>{t('common:ForgotPassword')}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.loginButton, {
                  // backgroundColor: isValid ? '#1a6997' : '#9c9c9c',
                  backgroundColor: '#1a6997',
                }]}
                  // disabled={!isValid}
                  onPress={handleSubmit}>
                  <Text style={styles.loginButtonText}>{t('common:LoginCap')}</Text>
                </TouchableOpacity>
                <View style={styles.signup}>
                  <Text style={{
                    fontFamily: 'Poppins-Light',
                    fontSize: 12, color: '#000000'
                  }}>{t('common:DoNotHaveAnAccount')} </Text>
                  <TouchableOpacity onPress={() => navigation.push('Register')}>
                    <Text style={styles.signupButton}>{t('common:SignUp')}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.push('Main')}>
                  <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', marginTop: 11 }}>

                    <Text
                      style={{
                        color: '#1570A5',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                        textAlign: 'center',
                        // marginTop: '1%',
                      }}>
                      {t('common:ContinueAsAGuest')}
                    </Text>
                    <Text style={{ marginTop: 1.5, marginLeft: 5, }}><Entypo
                      name="arrow-long-right"
                      size={18}
                      color="#1a6997"
                      style={styles.icon}
                    /></Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>

      </View>
    </ImageBackground >
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  ImageBackground: {
    opacity: 1,
  },
  login: {
    // flex: 0.6,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 26,
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    marginBottom: 30,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 1,
    // opacity: 0.8,
  },
  textInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#DAE1E7',
    borderRadius: 4,
    marginBottom: 20,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#000',
  },
  // loginContent: {
  //   // marginTop: 50,
  // },
  button: {
    // marginTop: 10,
    // justifyContent: 'flex-end',
  },
  buttonText: {
    color: '#1570A5',
    fontSize: 12,
    marginBottom: 29,
    textAlign: 'right',
    fontFamily: 'Poppins-Light'

  },
  loginButton: {
    // marginTop: 10,
    // backgroundColor: '#1570a5',
    // paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 13,
    height: 45,
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },
  signupButton: {
    fontFamily: 'Poppins-Light',
    color: '#166795',
    fontSize: 12,
    marginLeft: 4,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});