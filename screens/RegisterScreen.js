import React, { useContext, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { AuthContext } from '../context/AuthContext';
import { t } from 'i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required(t('common:FirstNameIsRequired'))
    .min(2, t('common:FirstNameMustBeAtLeast2Characters')),
  last_name: Yup.string()
    .required(t('common:LastNameIsRequired'))
    .min(2, t('common:LastNameMustBeAtLeast2Characters')),
  email: Yup.string()
    .required(t('common:EmailIsRequired'))
    .email(t('common:EmailIsInvalid')),
  password: Yup.string()
    .required(t('common:PasswordIsRequired'))
    .min(6, t('common:PasswordMustBeAtLeast6Characters')),
  phone: Yup.string()
    .required(t('common:PhoneIsRequired'))
    .min(9, t('common:PhoneMustBeAtLeast9Characters'))
    .max(15, t('common:PhoneMustBeAtMost15Characters')),
  // confirmPassword: Yup.string()
  //   .required(t('common:confirm_password_required'))
  //   .oneOf([Yup.ref('password'), null], t('common:confirm_password_invalid')),
  terms: Yup.boolean().oneOf([true], t('common:TermIsRequired')),
}).strict();

const RegisterScreen = ({ navigation }) => {
  const [term, setTerm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const { isLoading, isAuthenticating, register } = useContext(AuthContext);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.ImageContainer}
      imageStyle={styles.ImageBackground}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <View style={styles.wrapper}>
          <Formik initialValues={{ first_name: '', last_name: '', email: '', password: '', phone: '' }}
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
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <View style={styles.name}>
                  <TextInput
                    style={{
                      marginBottom: 12,
                      borderWidth: 1,
                      borderColor: '#bbb',
                      borderRadius: 5,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      width: 135,
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
                      marginLeft: 16,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderColor: '#bbb',
                      borderRadius: 5,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      width: 135,
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
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <CheckBox
                    value={term}
                    onPress={() => setTerm(!term)}
                    onValueChange={newValue => setTerm(newValue)}
                    tintColors={{ true: '#1570a5', false: '#000' }}
                  />
                  <Text style={{ marginLeft: 10, fontSize: 15, color: '#999' }}>{t('common:IHaveReadAndAcceptTheTermsAndConditions')}</Text>
                </View>
                {/*               
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <CheckBox
                  value={term}
                  title="I have read and accept the terms and conditions"
                  onPress={() => setTerm(term)}
                  onValueChange={newValue => setTerm(newValue)}
                  tintColors={{ true: '#1570a5', false: 'black' }}
                />
                <Text style={{ marginLeft: 10, fontSize: 15, color: '#999' }}>
                  {t('common:IHaveReadAndAcceptTheTermsAndConditions')}
                </Text>
              </View> */}
                {touched.terms && errors.terms && <Text style={styles.error}>{errors.terms}</Text>}
                <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>{t('common:SignUp')}</Text>
                </TouchableOpacity>

              </View>
            )}
          </Formik>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#999' }}>{t('common:AlreadyHaveAnAccount')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>{t('common:Login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingVertical: 10,
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
    opacity: 0.3,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: '#1570a5',
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
