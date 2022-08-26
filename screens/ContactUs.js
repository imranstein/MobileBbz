import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';



const ContactUs = () => {
  const navigation = useNavigation();
  const { userInfo, logout } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const SendMessage = async function (): Promise<boolena> {

    return await axios
      .post(`${BASE_URL}/contact-us`, { name, email, message }, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      })
      .then(res => {
        console.log(res);
        alert(res.data.success, 'Success');
        // logout();
        name.clear();
        email.clear();
        message.clear();
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
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground source={require('../assets/searchBackground.png')}>
          <Text style={styles.h1}>{t('common:LoveToHear')}</Text>
          <Text style={styles.h5}>
            {t('common:SendUsAMessage')}
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.search}>
        <View style={styles.label}>
          <TextInput
            style={styles.textInput}
            placeholder={t('common:YourName')}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder={t('common:EmailAddress')}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.message}
            multiline={true}
            numberOfLines={8}
            placeholder={t('common:Message')}
            onChangeText={text => setMessage(text)}
          />
        </View>

      </View>
      <View style={styles.searchButton}>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            SendMessage();
          }}>
          <Text style={styles.buttonText}>{t('common:SendMessage')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1a6997',
    height: '25%',
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
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    zindex: -1,
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
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: '#cecece',
    marginVertical: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    color: '#000',
  },
  message: {
    borderWidth: 0.3,
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
});
