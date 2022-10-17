import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { t } from 'i18next';
import { scale } from 'react-native-size-matters';





const ContactUs = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    full_name: Yup.string()
      .required(t('common:NameIsRequired'))
      .min(4, t('common:NameMustBeAtLeast4Characters')),
    email: Yup.string()
      .required(t('common:EmailIsRequired'))
      .email(t('common:EmailIsInvalid')),
    message: Yup.string()
      .required(t('common:MessageIsRequired'))
      .min(10, t('common:MessageMustBeAtLeast10Characters'))
      .matches(/^[a-zA-Z0-9 ]*$/, t('common:MessageMustBeAlphanumeric')),
  });

  const navigation = useNavigation();
  const { userInfo, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);


  const SendMessage = (full_name, email, message) => {
    setIsLoading(true);
    console.log('here', full_name, email, message);

    axios
      .post(`${BASE_URL}/contact-us`, {
        full_name,
        email,
        message,
      })
      .then(res => {
        console.log(res);
        alert(t('common:MessageSentSuccessfully'), t('common:Success'));

        navigation.navigate('Home');
        //clear the values

        // logout();
        setIsLoading(false);
        return true;
      })
      .catch(e => {
        console.log('error', e);
        if (e.response.status === 400) {
          alert(e.response.data.errors, 'Error');
        } else if (e.response.status === 401) {
          alert(e.response.data.error, 'Error');
        } else if (e.response.status === 500) {
          alert(e.response.data.error, 'Error');
        } else if (e.response.status === 422) {
          alert(T('common:NameOrMessageCannotBeEmpty'), 'Error');
        }
        setIsLoading(false);
        return true;
      });
  };

  return (
    <ScrollView contentContainerStyle={{ height: 850 }}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        {/* <ActivityIndicator animating={isLoading} size="large" color="#0000ff" /> */}
        <View style={styles.header}>
          <ImageBackground style={styles.image} source={require('../assets/searchBackground.png')}>
            <Text style={styles.h1} numberOfLines={1} ellipsizeMode='tail'>{t('common:LoveToHear')}</Text>
            <Text style={styles.h5} numberOfLines={2} ellipsizeMode='tail'>
              {t('common:SendUsAMessage')}
            </Text>
          </ImageBackground>
        </View>
        <Formik
          initialValues={{ full_name: '', email: '', message: '' }}
          validateOnMount={true}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            SendMessage(
              full_name = values.full_name,
              email = values.email,
              message = values.message,
            );
            resetForm();
            //change values to empty


          }}
          validationSchema={validationSchema}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View style={styles.form}>
              <View style={styles.search}>
                <View style={styles.label}>
                  <Text style={styles.labels}>{t('common:FullName')}:<Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={t('common:Name')}
                    // onChangeText={text => setName(text)}
                    onChangeText={handleChange('full_name')}
                    onBlur={handleBlur('full_name')}
                    placeholderTextColor="#DAE1E7"
                    value={values.full_name}
                  />
                  {touched.full_name && errors.full_name && (
                    <Text style={styles.error}>{errors.full_name}</Text>
                  )}
                  <Text style={styles.labels}>{t('common:Email')}:<Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={t('common:Email')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholderTextColor="#DAE1E7"
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                  <Text style={styles.labels}>{t('common:Message')}:<Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                  <TextInput
                    style={styles.message}
                    placeholder={t('common:Message')}
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                    placeholderTextColor="#DAE1E7"
                    multiline={true}
                    numberOfLines={8}
                    value={values.message}
                  />
                  {touched.message && errors.message && (
                    <Text style={styles.error}>{errors.message}</Text>
                  )}
                </View>
              </View>
              <View style={styles.searchButton}>
                <TouchableOpacity style={[styles.button, {
                  backgroundColor: isValid ? '#1a6997' : '#1570A5',
                }]}
                  // disabled={!isValid}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>{t('common:SendMessage')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView >
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  header: {
    // backgroundColor: '#1a6997',
    // height: '29%',
  },
  image: {
    height: 164,
  },
  h1: {
    fontSize: RFPercentage(3.5),
    color: '#fff',
    marginHorizontal: 10,
    paddingTop: 16,
  },
  h5: {
    fontSize: RFPercentage(2.2),
    color: '#fff',
    marginHorizontal: 10,
    paddingTop: 5,
    lineHeight: 20,
  },
  search: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 4,
    elevation: 1,
    backgroundColor: '#fff',
    marginTop: -45,
    marginBottom: 20,
    zindex: -2,
  },
  title: {
    fontSize: RFPercentage(2.2),
    color: '#000',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  titleHeader: {
    fontSize: RFPercentage(2.2),
    color: '#1a6997',
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  button: {
    // backgroundColor: '#1a6997',
    paddingVertical: 8,
    paddingHorizontal: 26,
    marginTop: 20,
    borderRadius: 4,
    elevation: 1,
    // width: 150,
    // height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-10%',
    // zindex: -1,
  },
  buttonText: {
    color: '#fff',
    fontSize: RFPercentage(2.4),
    textTransform: 'uppercase',
    // fontWeight: 'bold',
  },
  searchButton: {
    width: '100%',
    // height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DAE1E7',
    marginBottom: 16,
    justifyContent: 'flex-start',
    paddingHorizontal: 14,
    color: '#000',
    fontSize: RFPercentage(2.1),
  },
  message: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DAE1E7',
    paddingHorizontal: 14,
    color: '#000',
    marginBottom: 16,
    fontSize: RFPercentage(2.1),
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    fontSize: RFPercentage(2.1),
  },
  labels: {
    color: '#000',
    fontSize: scale(15),
    marginBottom: '2%',
  }
});
