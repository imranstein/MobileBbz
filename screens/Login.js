import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import { t } from 'i18next';

const Login = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.ImageBackground}>
      <View style={styles.login}>
        {/* <Spinner visible={isLoading} /> */}
        <View style={styles.loginContent}>
          <TextInput
            style={styles.textInput}
            placeholder={t('common:Email')}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder={t('common:Password')}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reset Your Password')}>
          <Text style={styles.buttonText}>{t('common:ForgotPassword')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            login(email, password);
          }}>
          <Text style={styles.loginButtonText}>{t('common:Login')}</Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text>{t('common:DoNotHaveAnAccount')} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupButton}>{t('common:SignUp')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    opacity: 0.3,
  },
  login: {
    flex: 0.6,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    opacity: 0.8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#999',
    marginVertical: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    color: 'black',
  },
  loginContent: {
    marginTop: 50,
  },
  button: {
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: '#166795',
    fontSize: 12,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: '#166795',
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
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
  signupButton: {
    color: '#166795',
    fontSize: 14,
    marginLeft: 10,
  },
});
