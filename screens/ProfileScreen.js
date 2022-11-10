import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from "react-i18next";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { BASE_URL } from '../config';
import axios from 'axios';
import { scale } from 'react-native-size-matters';
4

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];


const ProfileScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    verify();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      verify();

      console.log('Refreshed');
    });
    return focusHandler;
  }, [navigation]);
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };
  const navigation = useNavigation();
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  // const [verification, setVerification] = useState(null);
  const [data, setData] = useState(null);
  const [verification, setVerification] = useState(null);


  const id = userInfo.id;
  const verify = () => {
    axios.post(`${BASE_URL}/verify`, {
      id: id
    }).then(res => {
      console.log(res.data);
      setVerification(res.data.email_verified_at);
      console.log('verification', verification);
      // return true;
    }
    ).catch(e => {
      console.log(e);
    }
    )
  }
  useEffect(() => {
    verify();
  })


  // const verification = userInfo.email_verified_at;
  // console.log('verification', verification);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.profile}>
        <Text style={{
          color: '#1a6997',
          marginLeft: 19,
          // marginVertical: 30,
          fontWeight: 'bold',
        }}>

          <Icon
            name="user-circle-o"
            size={30}
            color="#1a6997"
            IconStyle={styles.icon}
          />
        </Text>
        <Text style={styles.name}>

          {userInfo.name}
          {/* user */}
        </Text>
      </View>
      {/* <View style={{ flexDirection: 'row' }}>
        <Text style={styles.icon}>
          <Entypo
            name="language"
            size={25}
            color="#1a6997"
            style={styles.icon}
          />
        </Text>
        <Text style={styles.label}>

          <Text style={{ marginRight: 20 }}>{t('common:Language')}</Text>
        </Text>
      </View> */}
      <View style={styles.list}>
        {/* {LANGUAGES.map((language) => {
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
        })} */}

        <TouchableOpacity onPress={() => {
          {
            verification != null ?
              navigation.navigate('My Profile')
              : navigation.navigate('Verify')
          }
        }
        }>
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
        <TouchableOpacity onPress={() => {
          {
            verification != null ?
              navigation.navigate('BookingHistory')
              : navigation.navigate('Verify')
          }
        }
        }>
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
              {t('common:BookingHistory')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            {
              verification != null ?
                navigation.navigate('Change Password')
                : navigation.navigate('Verify')
            }
          }
          }>
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
      <TouchableOpacity onPress={() => { }}>
        <View style={styles.logout}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.logoutIcon}>
              <MaterialIcons
                name="power-settings-new"
                size={27}
                color="#ED0925"
              />
            </Text>
            <Text style={styles.logoutLabel} onPress={logout}>
              {t('common:LogOut')}
            </Text>
          </View>

        </View>
      </TouchableOpacity>
    </View >
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    marginTop: scale(29),
    flexDirection: 'row',
    // flex: 0.2,
    // borderBottomWidth: 2,
    // borderBottomColor: '#DAE1E7',
    marginBottom: scale(27),
    // marginBottom: 5,
  },
  name: {
    fontSize: RFPercentage(3.3),
    color: '#1a6997',
    marginLeft: 11,
    // marginTop: 30,
    fontWeight: '600',
  },
  label: {
    fontSize: scale(14),
    fontFamily: 'Poppins-Regular',
    color: '#5E6D77',
    marginLeft: scale(18),
    marginTop: 30,
    fontWeight: '400',
  },
  list: {
    // flex: 0.3,
    borderTopColor: '#DAE1E7',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#DAE1E7',
    paddingBottom: scale(32),
    marginTop: 30,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1,
  },
  logout: {
    // flex: 0.15,
    // marginLeft: 5,
  },
  logoutLabel: {
    fontSize: scale(14),
    color: '#ED0925',
    marginLeft: scale(14),
    marginTop: scale(32),
  },
  icon: {
    color: '#1a6997',
    marginLeft: 20,
    marginTop: 30,
    fontWeight: 'bold',
  },
  logoutIcon: {
    color: 'red',
    marginLeft: 20,
    marginTop: 30,
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: RFPercentage(2.5),
    color: '#1a6997',
    marginLeft: 100,
    marginTop: 10,
    fontWeight: '500',
  }, text: {
    fontSize: RFPercentage(2.5),
    color: '#000',
    marginLeft: 100,
    marginTop: 10,
    fontWeight: '500',
  }
});
