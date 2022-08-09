import React, {useContext, useState} from 'react';
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
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import { t } from 'i18next';

const RegisterScreen = ({navigation}) => {
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [term, setTerm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const {isLoading, register} = useContext(AuthContext);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.ImageContainer}
      imageStyle={styles.ImageBackground}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <View style={styles.wrapper}>
          <View style={styles.name}>
            <TextInput
              style={styles.input}
              value={first_name}
              placeholder={t('common:FirstName')}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              style={{
                marginLeft: 20,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#bbb',
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 14,
                width: 160,
              }}
              value={last_name}
              placeholder={t('common:LastName')}
              onChangeText={text => setLastName(text)}
            />
          </View>

          <TextInput
            style={styles.input}
            value={email}
            placeholder={t('common:Email')}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            value={phone}
            placeholder={t('common:Phone')}
            onChangeText={text => setPhone(text)}
          />

          <TextInput
            style={styles.input}
            value={password}
            placeholder={t('common:Password')}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          {/* <TextInput
            style={styles.input}
            value={confirmPassword}
            placeholder="Confirm password"
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
          /> */}
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <CheckBox
              title="I have read and accept the terms and conditions"
              value={term}
              onPress={() => setTerm(!term)}
              onValueChange={newValue => setTerm(newValue)}
            />
            <Text style={{marginLeft: 10, fontSize: 15}}>
              {t('common:IHaveReadAndAcceptTheTermsAndConditions')}
            </Text>
          </View>
          <Button
            title="Sign Up"
            onPress={() => {
              register(first_name, last_name, email, phone, password, term);
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'center',
            }}>
            <Text>{t('common:AlreadyHaveAnAccount')} </Text>
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
  },
  link: {
    color: '#166795',
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
});

export default RegisterScreen;
