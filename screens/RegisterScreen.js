import React, { useContext, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { AuthContext } from '../context/AuthContext';
import { t } from 'i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale } from 'react-native-size-matters';

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required(t('common:FirstNameIsRequired'))
    .min(2, t('common:FirstNameMustBeAtLeast2Characters'))
    .matches(/^[a-zA-Z]+$/, t('common:FirstNameMustBeAlphabetical')),
  last_name: Yup.string()
    .required(t('common:LastNameIsRequired'))
    .min(2, t('common:LastNameMustBeAtLeast2Characters'))
    .matches(/^[a-zA-Z]+$/, t('common:LastNameMustBeAlphabetical')),
  email: Yup.string()
    .required(t('common:EmailIsRequired'))
    .email(t('common:EmailIsInvalid'))
    .max(40, t('common:EmailMustBeAtMost40Characters')),
  password: Yup.string()
    .required(t('common:PasswordIsRequired'))
    .min(6, t('common:PasswordMustBeAtLeast6Characters')),
  phone: Yup.string()
    .required(t('common:PhoneIsRequired'))
    .min(9, t('common:PhoneMustBeAtLeast9Characters'))
    .max(15, t('common:PhoneMustBeAtMost15Characters'))
    .matches(/^[0-9]+$/, t('common:PhoneMustBeNumeric')),
  // confirmPassword: Yup.string()
  //   .required(t('common:confirm_password_required'))
  //   .oneOf([Yup.ref('password'), null], t('common:confirm_password_invalid')),
  // terms: Yup.boolean().oneOf([true], t('common:TermIsRequired'))
  //   .required(t('common:TermIsRequired')),
}).strict();

const RegisterScreen = ({ navigation }) => {
  const [term, setTerm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const { isLoading, isAuthenticating, register, error2 } = useContext(AuthContext);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.ImageContainer}
      imageStyle={styles.ImageBackground}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <ScrollView>
          <View style={{ opacity: 1 }}>
            <View style={styles.wrapper}>
              <Formik initialValues={{ first_name: '', last_name: '', email: '', password: '', phone: '' }}
                validateOnMount={true}
                onSubmit={(values) => {
                  register(
                    values.first_name,
                    values.last_name,
                    values.email,
                    values.password,
                    values.phone,
                    term,
                  );
                }
                }
                validationSchema={validationSchema}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                  <View style={styles.form}>
                    <View style={styles.name}>
                      <TextInput
                        style={{
                          marginBottom: 20,
                          borderWidth: 1,
                          borderColor: '#DAE1E7',
                          borderRadius: 4,
                          paddingVertical: 12,
                          paddingHorizontal: 14,
                          width: '47%',
                          color: '#000',
                        }}
                        placeholder={t('common:FirstName')}
                        placeholderTextColor='#9c9c9c'
                        onChangeText={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}
                      />
                      <TextInput
                        style={{
                          marginLeft: '6%',
                          marginBottom: 20,
                          borderWidth: 1,
                          borderColor: '#DAE1E7',
                          borderRadius: 4,
                          paddingVertical: 12,
                          paddingHorizontal: 14,
                          width: '47%',
                          color: '#000',
                        }}
                        placeholder={t('common:LastName')}
                        placeholderTextColor='#9c9c9c'
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}
                      />

                    </View>
                    {touched.first_name && errors.first_name && <Text style={styles.error}>{errors.first_name}</Text>}
                    {touched.last_name && errors.last_name && <Text style={styles.error}>{errors.last_name}</Text>}

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
                    <TextInput
                      style={styles.input}
                      placeholder={t('common:Password')}
                      placeholderTextColor='#9c9c9c'
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={true}
                    />
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                    <TextInput
                      style={styles.input}
                      placeholder={t('common:Phone')}
                      placeholderTextColor='#9c9c9c'
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      keyboardType='phone-pad'

                    />
                    {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
                    <View style={{ flexDirection: 'row', marginLeft: -7 }}>
                      <CheckBox
                        value={term}
                        onPress={() => setTerm(!term)}
                        onValueChange={newValue => setTerm(newValue)}
                        tintColors={{ true: '#1570a5', false: '#B4B9BE', borderWidth: 1, }}
                      />
                      <Text style={{
                        marginLeft: 8, fontSize: RFPercentage(2),
                        color: '#999', textAlignVertical: 'center', maxWidth: '80%'
                      }}>{t('common:IHaveReadAndAcceptTheTermsAndConditions')}</Text>
                      {/* {touched.terms && errors.terms && <Text style={styles.error}>{errors.terms}</Text>} */}
                    </View>
                    <View>
                      <Text style={[styles.error, { alignSelf: 'center' }]}>{error2 ? error2 : ''}</Text>
                    </View>
                    <TouchableOpacity onPress={handleSubmit}
                      // disabled={!isValid}
                      style={[styles.loginButton, { backgroundColor: '#1570a5' }]}>
                      <Text style={styles.loginButtonText}>{t('common:SignUp')}</Text>
                    </TouchableOpacity>

                  </View>
                )}
              </Formik>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 17,
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#000', fontSize: scale(12), }}>{t('common:AlreadyHaveAnAccount')} </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.link}>{t('common:Login')}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}>
                <Text
                  style={{
                    color: '#166795',
                    fontSize: scale(14),
                    textAlign: 'center',
                    marginTop: 14,
                  }}>
                  {t('common:ContinueAsAGuest')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginTop: 32,
    marginHorizontal: 10,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DAE1E7',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: '#000',
  },
  link: {
    color: '#1570a5',
  },
  name: {
    flexDirection: 'row',
  },
  ImageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    opacity: 1,
  },
  loginButton: {
    // marginTop: scale(-20),
    // backgroundColor: '#1570a5',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: RFPercentage(2.4),
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default RegisterScreen;
