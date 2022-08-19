import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
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
    const {t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };
  const navigation = useNavigation();
  const {userInfo, logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.name}>
          <View style={{marginTop: 100}}>
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
          <Text style={styles.label}>
            <MaterialIcons
              name="tag-faces"
              size={22}
              color="#1a6997"
              style={styles.icon}
            />
               {t('common:MyProfile')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.label}>
            <Entypo
              name="back-in-time"
              size={22}
              color="#1a6997"
              style={styles.icon}
            />
             <Text style={{ marginRight:20 }}>{t('common:BookingHistory')}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Change Password')}>
          <Text style={styles.label}>
            <MaterialIcons
              name="lock"
              size={22}
              color="#1a6997"
              style={styles.icon}
            />
             {t('common:ChangePassword')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.logoutLabel} onPress={logout}>
            <MaterialIcons
              name="power-settings-new"
              size={22}
              color="red"
              style={styles.icon}
            />
             {t('common:LogOut')}
          </Text>
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
    borderBottomColor: '#fff',
  },
  name: {
    fontSize: 28,
    color: '#1a6997',
    marginLeft: 30,
    marginTop: 5,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#1a6997',
    marginLeft: 50,
    marginTop: 27,
    fontWeight: 'bold',
  },
  list: {
    flex: 0.3,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  logout: {
    flex: 0.1,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  logoutLabel: {
    fontSize: 18,
    color: 'red',
    marginLeft: 50,
    marginTop: 27,
  },
  icon: {
    marginRight: 100,
  },
});
