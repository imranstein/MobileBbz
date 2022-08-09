import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../config';
import { t } from 'i18next';

const ResetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  // const {isLoading, reset} = useContext(AuthContext);
  const PasswordReset = async function (): Promise<boolena> {
    const emailValue = email;

    return await axios
      .post(`${BASE_URL}/reset-password`, {email})
      .then(res => {
        console.log(res);
        alert(res.data.message, 'Success');
        navigation.navigate('Success');
        return true;
      })
      .catch(e => {
        console.log(e);
        if (e.response.status === 400) {
          alert(e.response.data.message, 'Error');
        } else if (e.response.status === 500) {
          alert('Sorry the email you entered is not registered', 'Error');
        } else if (e.response.status === 422) {
          alert('Please enter a valid email', 'Error');
        }
        return false;
      });
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.ImageContainer}
      imageStyle={styles.ImageBackground}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {t('common:ResetPasswordMessage')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={t('common:Email')}
          onChangeText={text => setEmail(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            PasswordReset();
          }}>
          <Text style={styles.buttonText}>{t('common:SendPassword')}</Text>
        </TouchableOpacity>
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
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginTop: '20%',
    width: '86%',
    textAlign: 'left',
    fontSize: 15,
    color: '#566573',
    marginBottom: '7%',
  },
  input: {
    width: '86%',
    height: 50,
    borderColor: '#999',
    borderWidth: 0.5,
    marginBottom: '7%',
    borderRadius: 3,
    paddingLeft: 10,
    color: '#566573',
  },
  button: {
    width: '86%',
    height: 50,
    backgroundColor: '#166795',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
