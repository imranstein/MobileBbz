import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useContext, useState } from 'react';
import { t } from 'i18next';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  old_password: Yup.string()
    .required('Old Password is required')
    .min(6, 'Old Password must be at least 6 characters'),
  new_password: Yup.string()
    .required('New Password is required')
    .min(6, 'New Password must be at least 6 characters'),
  new_password_confirmation: Yup.string()
    .required('New Password Confirmation is required')
    .min(6, 'New Password Confirmation must be at least 6 characters')
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
}).defined();




const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

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
        alert(res.data.message, 'Success');
        logout();
        // navigation.navigate('My Profile');
        return true;
      })
      .catch(e => {
        console.log(e.response.data.message);
        alert(e.response.data.message, 'Error');
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
              </View>
            </View>
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
    width: '90%',
    alignSelf: 'center',
    marginHorizontal: '5%',
    marginVertical: '15%',
    marginBottom: '4%',
    // flex: 1,
  },
  submit: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  submitLabel: {
    fontSize: 18,
    marginTop: '2%',
    marginBottom: '2%',
    color: '#fff',
    borderColor: '#1a6997',
    backgroundColor: '#1a6997',
    borderWidth: 2,
    paddingHorizontal: '15%',
    paddingVertical: '2%',
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#cecece',
    marginVertical: 10,
    borderRadius: 4,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    color: '#000',
    width: '95%',
    marginRight: '5%',
  },
  inputs: {
    marginLeft: '5%',
    marginTop: '2%',
  },
  ImageBackground: {
    opacity: 0.5,
  },
  label: {
    fontSize: 15,
    color: '#000',
    marginBottom: '2%',
    fontWeight: '400',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
