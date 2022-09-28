import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { t } from 'i18next';
import Icons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// import CountryPicker from "@volkenomakers/react-native-country-picker";
import CountryPicker from 'react-native-country-picker-modal';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale } from 'react-native-size-matters';


const MyProfileScreen = (props) => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState();
  const [country, setCountry] = useState('');
  const [address2, setAddress2] = useState('');

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date());


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setBirthday(currentDate);
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const UpdateProfile = async function (): Promise<boolena> {

    console.log(birthday);
    return await axios
      .put(`${BASE_URL}/edit-profile/`,
        { first_name, last_name, email, phone, birthday, address, city, zipCode, country, address2 },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        })
      .then(res => {
        console.log(res);
        alert(res.data.message, 'Success');
        navigation.navigate('Main');
        return true;
      })
      .catch(e => {
        console.log(e);
        if (e.response.status === 400) {
          alert(e.response.data.message, 'Error');
        } else if (e.response.status === 500) {
          alert('Sorry it is not available', 'Error');
        } else if (e.response.status === 422) {
          alert('Please enter a valid data', 'Error');
        }
        return false;
      });
  };
  console.log(userInfo.email)
  const getData = async () => {
    const { data } = await axios
      .get(`${BASE_URL}/profile`, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
    setData(data);
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setEmail(data.email);
    setPhone(data.phone);
    setBirthday(data.birthday);
    setAddress(data.address);
    setCity(data.city);
    setZipCode((data.zip_code).toString());
    setCountry(data.country);
    setAddress2(data.address2);


  };
  useEffect(() => {
    getData();
  }, [])

  return (
    console.log(zipCode),
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.image} >
            <Text>
              <Icons
                name="user"
                size={110}
                color="#1a6997"
                IconStyle={styles.icon}
              />
            </Text>
            <TouchableOpacity>
              <Text style={styles.imageLabel}>{t('common:EditPicture')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.name}>
            <View>
              <Text style={styles.label} >{t('common:FirstName')}</Text>
              <TextInput style={{
                flex: 1,
                // marginBottom: 20,
                borderWidth: 1,
                borderColor: '#DAE1E7',
                borderRadius: 4,
                // paddingVertical: 12,
                paddingHorizontal: 14,
                width: 162,
                height: 42,
                color: '#000',
              }}
                value={first_name}
                onChangeText={setFirstName} />
            </View>
            <View>
              <Text style={styles.label} >{t('common:LastName')}</Text>
              <TextInput style={{
                flex: 1,
                // marginBottom: 20,
                marginLeft: 20,
                borderWidth: 1,
                borderColor: '#DAE1E7',
                borderRadius: 4,
                // paddingVertical: 12,
                paddingHorizontal: 14,
                width: 162,
                height: 42,
                color: '#000',
              }}
                value={last_name}
                onChangeText={setLastName} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>{t('common:Email')}</Text>
              <TextInput style={styles.input}
                value={email.trim()}
                onChangeText={setEmail} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>{t('common:Phone')}</Text>
              <TextInput style={styles.input}
                value={phone}
                keyboardType='phone-pad'
                onChangeText={setPhone} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>{t('common:Birthdate')}</Text>
              {/* <TextInput style={styles.input}
                value={birthday}
                onChangeText={setBirthday} /> */}
              <View style={{
                borderWidth: 1,
                borderColor: '#DAE1E7',
                // marginVertical: 10,
                borderRadius: 4,
                // marginBottom: 20,
                justifyContent: 'flex-start',
                paddingHorizontal: 14,
                // paddingVertical: 12,
                color: '#000',
                width: '100%',
                height: 42,
              }}>
                <TouchableOpacity onPress={() => showMode('date')}>
                  <Text style={{ fontSize: scale(14), color: '#000', marginTop: 10 }}>{moment(birthday).format('DD/MM/YYYY')}</Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: RFPercentage(2.6),
              fontWeight: '500',
              color: '#000',
              // marginHorizontal: 10,
              paddingTop: 20,
              paddingBottom: 5
            }}>{t('common:Address')}</Text>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>C/o</Text>
              <TextInput style={styles.input}
                value={address}
                onChangeText={setAddress} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>{t('common:Street')}</Text>
              <TextInput style={styles.input}
                value={address2}
                onChangeText={setAddress2} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>{t('common:City')}</Text>
              <TextInput style={styles.input}
                value={city}
                onChangeText={setCity} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>{t('common:PostalCode')}</Text>
              <TextInput style={styles.input}
                value={zipCode}
                keyboardType='phone-pad'
                onChangeText={setZipCode} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>{t('common:Country')}</Text>
              <View style={{
                // marginLeft: '4%',
                // borderColor: '#cecece',
                // borderBottomWidth: 0.5,
              }}
              >
                <CountryPicker
                  withFilter
                  withFlag
                  preferredCountries={['DE', 'IN']}
                  onSelect={(country) => {
                    setCountry(country.name);
                    console.log(country.name);
                  }
                  }
                />
              </View>
              {country !== null && (
                <Text style={{
                  flex: 1,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: '#DAE1E7',
                  borderRadius: 4,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  color: '#000',
                  width: '100%',
                  height: 42,
                  color: '#000',
                }}>{country}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputs}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Change Password')}>
              <Text style={styles.changePassword}>{t('common:ChangePassword')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView >
      <View style={styles.submit}>
        <TouchableOpacity
          onPress={() => {
            UpdateProfile();
          }}>
          <Text style={styles.submitLabel}>{t('common:SaveChanges')}</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
  // }
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EFEF',
    flex: 1,
  },
  wrapper: {
    backgroundColor: '#fff',
    marginTop: 32,
    marginHorizontal: 10,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingTop: 16,
    paddingBottom: 7,
  },
  name: {
    flexDirection: 'row',
    // marginLeft: '6%',
    // marginTop: '2%',
  },
  image: {
    width: '100%',
    borderColor: '#F0EFEF',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    // marginHorizontal: '5%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  imageLabel: {
    fontSize: RFPercentage(2.7),
    marginLeft: '10%',
    marginRight: '5%',
    color: '#1a6997',
    borderColor: '#1a6997',
    borderWidth: 2,
    paddingHorizontal: '12%',
    paddingVertical: '2%',
    borderRadius: 4,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
  submit: {
    width: '100%'
  },
  submitLabel: {
    fontSize: RFPercentage(2.7),
    marginVertical: 20,
    marginHorizontal: 20,
    color: '#fff',
    borderColor: '#1a6997',
    backgroundColor: '#1a6997',
    borderWidth: 2,
    paddingVertical: 8,
    borderRadius: 4,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input: {
    fontSize: scale(14),
    borderWidth: 1,
    borderColor: '#DAE1E7',
    // marginVertical: 10,
    borderRadius: 4,
    // marginBottom: 20,
    justifyContent: 'flex-start',
    paddingHorizontal: 14,
    // paddingVertical: 12,
    color: '#000',
    width: '100%',
    height: 44,
  },
  inputs: {
    // marginLeft: '5%',
    // marginTop: '2%',
  },
  changePassword: {
    fontSize: RFPercentage(2.7),
    marginTop: 40,
    marginBottom: 40,
    color: '#1a6997',
    borderColor: '#1a6997',
    borderWidth: 2,
    paddingVertical: 8,
    width: '100%',
    borderRadius: 4,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  label: {
    fontSize: RFPercentage(2.1),
    color: '#000',
    marginVertical: 15,
  },
});
