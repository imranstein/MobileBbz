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
import { t } from 'i18next';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(t('common:NameIsRequired'))
    .min(4, t('common:NameMustBeAtLeast4Characters')),
  email: Yup.string()
    .required(t('common:EmailIsRequired'))
    .email(t('common:EmailIsInvalid')),
  message: Yup.string()
    .required(t('common:MessageIsRequired')),
});


const ContactUs = () => {
  const navigation = useNavigation();
  const { userInfo, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();


  const SendMessage = (name, email, message) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/contact-us`, {
        name,
        email,
        message,
      })
      .then(res => {
        console.log(res);
        alert(res.data.success, 'Success');
        navigation.navigate('Home');
        //clear the values
        // logout();
        setIsLoading(false);
        return true;
      })
      .catch(e => {
        console.log(e);
        if (e.response.status === 400) {
          alert(e.response.data.errors, 'Error');
        } else if (e.response.status === 401) {
          alert(e.response.data.error, 'Error');
        } else if (e.response.status === 500) {
          alert(e.response.data.error, 'Error');
        } else if (e.response.status === 422) {
          alert(e.response.data.errors.name, 'Error');
        } else if (e.response.status === 422) {
          alert(e.response.data.errors.email, 'Error');
        } else if (e.response.status === 422) {
          alert(e.response.data.errors.message, 'Error');
        }
        return false;
      });
  };

  return (
    <ScrollView contentContainerStyle={{ height:610 }}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        {/* <ActivityIndicator animating={isLoading} size="large" color="#0000ff" /> */}
        <View style={styles.header}>
          <ImageBackground source={require('../assets/searchBackground.png')}>
            <Text style={styles.h1}>{t('common:LoveToHear')}</Text>
            <Text style={styles.h5}>
              {t('common:SendUsAMessage')}
            </Text>
          </ImageBackground>
        </View>
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          onSubmit={(values) => {
            console.log(values);
            SendMessage(
              fullname = values.name,
              email = values.email,
              message = values.message,
            );
          }}
          validationSchema={validationSchema}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <View style={styles.search}>
                <View style={styles.label}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={t('common:Name')}
                    // onChangeText={text => setName(text)}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    placeholderTextColor="#000"
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}
                  <TextInput
                    style={styles.textInput}
                    placeholder={t('common:Email')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholderTextColor="#000"
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                  <TextInput
                    style={styles.message}
                    placeholder={t('common:Message')}
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                    placeholderTextColor="#000"
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>{t('common:SendMessage')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1a6997',
    height: '29%',

  },
  h1: {
    fontSize: 25,
    color: '#fff',
    marginHorizontal: 20,
    paddingTop: 12,
  },
  h5: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 20,
    paddingTop: 5,
    lineHeight: 20,
  },
  search: {
    width: '94%',
    // borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 1,
    backgroundColor: '#fff',
    marginTop: '-10%',
    zindex: -1,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  titleHeader: {
    fontSize: 13,
    color: '#1a6997',
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  button: {
    backgroundColor: '#1a6997',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    elevation: 1,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-10%',
    // zindex: -1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButton: {
    width: '94%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#cecece',
    marginVertical: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    color: '#000',
  },
  message: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#cecece',
    marginVertical: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    color: '#000',
    // height: 200,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
