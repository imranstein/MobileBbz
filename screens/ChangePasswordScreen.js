import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useContext, useState } from 'react';
import { t } from 'i18next';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';



const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const { userInfo, logout } = useContext(AuthContext);
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [new_password_confirmation, setConfirmPassword] = useState('');

  const ChangePassword = async function (): Promise<boolena> {

    return await axios
      .post(`${BASE_URL}/change-password`, { old_password, new_password, new_password_confirmation }, {
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
        console.log(e);
        if (e.response.status === 400) {
          alert(e.response.data.errors, 'Error');
        } else if (e.response.status === 401) {
          alert(e.response.data.error, 'Error');
        } else if (e.response.status === 500) {
          alert(e.response.data.error, 'Error');
        } else if (e.response.status === 422) {
          alert(e.response.data.errors.new_password, 'Error');
        }
        return false;
      });
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.ImageBackground}>
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
                onChangeText={text => setOldPassword(text)}
                secureTextEntry />
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
                onChangeText={text => setNewPassword(text)}
                secureTextEntry />
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
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.submit}>
        <TouchableOpacity
          onPress={() => {
            ChangePassword();
          }}>
          <Text style={styles.submitLabel}>{t('common:SaveChanges')}</Text>
        </TouchableOpacity>
      </View>
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
    color: 'black',
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
});
