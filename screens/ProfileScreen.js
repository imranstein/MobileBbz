import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];

const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };
  const navigation = useNavigation();
  const { userInfo, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.name}>
          <View style={{ marginTop: 100 }}>
            <Icons
              name="user"
              size={40}
              color="#1a6997"
              IconStyle={styles.icon}
            />
          </View>
          {userInfo.name}
          {/* user */}
        </Text>
      </View>
      <View style={styles.list}>
        {LANGUAGES.map((language) => {
          const selectedLanguage = language.code === selectedLanguageCode;
          return (
            <TouchableOpacity
              key={language.code}
              style={styles.buttonContainer}
              disabled={selectedLanguage}
              onPress={() => setLanguage(language.code)}
            >
              <Text
                style={[selectedLanguage ? styles.selectedText : styles.text]}
              >
                {language.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('My Profile');
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.icon}><MaterialIcons
              name="tag-faces"
              size={25}
              color="#1a6997"
              style={styles.icon}
            /></Text>
            <Text style={styles.label}>

              {t('common:MyProfile')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.icon}>
              <Entypo
                name="back-in-time"
                size={25}
                color="#1a6997"
                style={styles.icon}
              />
            </Text>
            <Text style={styles.label}>

              <Text style={{ marginRight: 20 }}>{t('common:BookingHistory')}</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Change Password')}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.icon}>
              <MaterialIcons
                name="lock"
                size={25}
                color="#1a6997"
                style={styles.icon}
              />
            </Text>
            <Text style={styles.label}>

              {t('common:ChangePassword')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => { }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.logoutIcon}>
              <MaterialIcons
                name="power-settings-new"
                size={25}
                color="red"
              />
            </Text>
            <Text style={styles.logoutLabel} onPress={logout}>
              {t('common:LogOut')}
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    flex: 0.1,
    borderBottomWidth: 1,
    borderBottomColor: '#cecece',
  },
  name: {
    fontSize: 28,
    color: '#1a6997',
    marginLeft: 30,
    marginTop: 5,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 15,
    color: '#000',
    marginLeft: 20,
    marginTop: 27,
    fontWeight: '500',
  },
  list: {
    flex: 0.3,
    borderTopWidth: 0.1,
    borderBottomColor: '#cecece',
  },
  logout: {
    flex: 0.15,
    marginTop: '22%',
    marginBottom: '2%',
    borderTopWidth: 0.1,
    borderBottomColor: '#cecece',
  },
  logoutLabel: {
    fontSize: 15,
    color: 'red',
    marginLeft: 20,
    marginTop: 27,
    fontWeight: '600',
    marginBottom: '2%',
  },
  icon: {
    color: '#1a6997',
    marginLeft: 30,
    marginTop: 27,
    fontWeight: 'bold',
  },
  logoutIcon: {
    color: 'red',
    marginLeft: 30,
    marginTop: 27,
    fontWeight: 'bold',
  }
});
