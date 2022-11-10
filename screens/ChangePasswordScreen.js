import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import { t } from 'i18next';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { scale } from 'react-native-size-matters';



const ChangePasswordScreen = () => {

  const validationSchema = Yup.object().shape({
    old_password: Yup.string()
      .required(t('common:OldPasswordIsRequired'))
      .min(6, t('common:OldPasswordMustBeAtLeast6Characters')),
    new_password: Yup.string()
      .required(t('common:NewPasswordIsRequired'))
      .min(6, t('common:NewPasswordMustBeAtLeast6Characters')),
    new_password_confirmation: Yup.string()
      .required(t('common:NewPasswordConfirmationIsRequired'))
      .min(6, t('common:NewPasswordMustBeAtLeast6Characters'))
      .oneOf([Yup.ref('new_password'), null], t('common:PasswordsMustMatch')),
  }).defined();

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userInfo, logout } = useContext(AuthContext);
  // const [old_password, setOldPassword] = useState('');
  // const [new_password, setNewPassword] = useState('');
  // const [new_password_confirmation, setConfirmPassword] = useState('');

  // const ChangePassword = async function (old_password, new_password, new_password_confirmation): Promise<boolena> {
  //   setIsLoading(true);
  //   return await axios
  //     .post(`${BASE_URL}/change-password`, { old_password, new_password, new_password_confirmation }, {
  //       headers: {
  //         Authorization: 'Bearer ' + userInfo.token,
  //       },
  //     })
  const ChangePassword = (old_password, new_password, new_password_confirmation) => {
    setIsLoading(true);
    console.log(old_password, new_password, new_password_confirmation);
    axios
      .post(`${BASE_URL}/change-password`, {
        old_password,
        new_password,
        new_password_confirmation,
      }, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      })
      .then(res => {
        console.log(res);
        alert(t('common:Success'), 'Success');
        logout();
        // navigation.navigate('My Profile');
        return true;
      })
      .catch(e => {
        console.log(e.response.data.message);
        // alert(e.response.data.message, 'Error');
        setError(e.response.data.message);
        // if (e.response.status === 400) {
        //   alert(e.response.data.errors, 'Error');
        // } else if (e.response.message === 401) {
        //   console.log(e.response.data.error);
        //   alert('Old Password Is incorrect', 'Error');
        // } else if (e.response.status === 500) {
        //   alert(e.response.data.error, 'Error');
        // } else if (e.response.status === 422) {
        //   alert(e.response.data.errors.new_password, 'Error');
        // }
        return false;
      });
  };

  return (

    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.ImageBackground}>
      <Formik
        initialValues={{ old_password: '', new_password: '', new_password_confirmation: '' }}
        onSubmit={(values) => {
          ChangePassword(
            values.old_password,
            values.new_password,
            values.new_password_confirmation,
          );
        }
        }
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <ScrollView>
              <View style={{ flex: 1 }}>
                <View style={styles.wrapper}>
                  <View style={styles.inputs}>
                    <View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.label}>{t('common:CurrentPassword')}</Text>
                        <Text style={{ color: 'red', fontSize: 17, height: 13, marginLeft: 5 }}>*</Text>
                      </View>
                      <TextInput style={styles.input}
                        placeholder={t('common:PleaseEnter')}
                        placeholderTextColor='#9c9c9c'
                        onChangeText={handleChange('old_password')}
                        onBlur={handleBlur('old_password')}
                        value={values.old_password}
                        secureTextEntry />
                      {errors.old_password && touched.old_password && (
                        <Text style={styles.error}>{errors.old_password}</Text>
                      )}
                    </View>

                  </View>
                  <View style={styles.inputs}>
                    <View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.label}>{t('common:NewPassword')}</Text>
                        <Text style={{ color: 'red', fontSize: 17, height: 13, marginLeft: 5 }}>*</Text>
                      </View>
                      <TextInput style={styles.input}
                        placeholder={t('common:PleaseEnter')}
                        placeholderTextColor='#9c9c9c'
                        onChangeText={handleChange('new_password')}
                        onBlur={handleBlur('new_password')}
                        value={values.new_password}
                        secureTextEntry />
                      {errors.new_password && touched.new_password && (
                        <Text style={styles.error}>{errors.new_password}</Text>
                      )}
                    </View>

                  </View>
                  <View style={styles.inputs}>
                    <View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.label}>{t('common:ConfirmPassword')}</Text>
                        <Text style={{ color: 'red', fontSize: 17, height: 13, marginLeft: 5 }}>*</Text>
                      </View>
                      <TextInput style={styles.input}
                        placeholder={t('common:PleaseEnter')}
                        placeholderTextColor='#9c9c9c'
                        onChangeText={handleChange('new_password_confirmation')}
                        onBlur={handleBlur('new_password_confirmation')}
                        value={values.new_password_confirmation}
                        secureTextEntry />
                      {errors.new_password_confirmation && touched.new_password_confirmation && (
                        <Text style={styles.error}>{errors.new_password_confirmation}</Text>
                      )}
                    </View>

                  </View>
                  {error ?
                    <View>
                      <Text style={[styles.error, { alignSelf: 'center' }]}>{error ? error : ''}</Text>
                    </View> : null}
                </View>

              </View>

            </ScrollView>

            <View style={styles.submit}>
              <TouchableOpacity
                onPress={handleSubmit}
              >
                <Text style={styles.submitLabel}>{t('common:SaveChanges')}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ImageBackground>

  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EFEF',
    flex: 1,
  },
  wrapper: {
    backgroundColor: '#fff',
    marginTop: scale(32),
    marginHorizontal: 10,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingTop: scale(16),
    paddingBottom: 7,
  },
  submit: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  submitLabel: {
    fontFamily: 'Poppins-Medium',
    width: '90%',
    fontSize: scale(16),
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginVertical: 10,
    color: '#fff',
    borderColor: '#1a6997',
    backgroundColor: '#1a6997',
    borderWidth: 2,
    // paddingHorizontal: '15%',
    paddingVertical: 9,
    borderRadius: 4,
    // alignSelf: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DAE1E7',
    // marginVertical: 10,
    borderRadius: 4,
    marginBottom: scale(20),
    justifyContent: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#000',
    width: '100%',
    height: scale(45),
    // marginRight: '5%',
  },
  inputs: {
    // marginLeft: '5%',
    // marginTop: '2%',
  },
  ImageBackground: {
    opacity: 1
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: scale(14),
    fontWeight: '400',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
