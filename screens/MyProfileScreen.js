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
          <View style={styles.image}>
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
              <Text style={styles.label}>{t('common:FirstName')}</Text>
              <TextInput style={{
                flex: 1,
                fontSize: RFPercentage(2.4),
                marginTop: '5%',
                marginBottom: '5%',
                borderColor: '#cecece',
                borderWidth: 0.5,
                borderRadius: 5,
                marginLeft: '2%',
                // paddingHorizontal: '%',
                width: 132,
                height: 42,
                color: '#000',
              }}
                value={first_name}
                onChangeText={setFirstName} />
            </View>
            <View>
              <Text style={styles.label}>{t('common:LastName')}</Text>
              <TextInput style={{
                flex: 1,
                fontSize: RFPercentage(2.4),
                marginTop: '5%',
                marginBottom: '5%',
                marginLeft: '7%',
                borderColor: '#cecece',
                borderWidth: 0.5,
                borderRadius: 5,
                // paddingHorizontal: '%',
                width: 132,
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
                value={email}
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
                flex: 1,
                fontSize: RFPercentage(2.7),
                marginTop: '5%',
                marginBottom: '5%',
                marginLeft: '2%',
                borderColor: '#cecece',
                borderWidth: 0.5,
                borderRadius: 5,
                // paddingHorizontal: '%',
                width: '90%',
                height: 42,
                color: '#000',
              }}>
                <TouchableOpacity onPress={() => showMode('date')}>
                  <Text style={{ fontSize: RFPercentage(2.7), color: '#000', marginTop: 10 }}>{moment(birthday).format('DD/MM/YYYY')}</Text>
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
          <View style={{ flex: 1, marginTop: '5%', marginBottom: '5%' }}>
            <Text style={{ marginLeft: '5%', fontSize: RFPercentage(2.5), fontWeight: 'bold', color: '#000' }}>{t('common:Address')}</Text>
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
                marginLeft: '4%',
                borderColor: '#cecece',
                borderBottomWidth: 0.5,
              }}
              >
                <CountryPicker
                  withFilter
                  withFlag
                  withCountryNameButton
                  preferredCountries={['DE', 'IN']}
                  onSelect={(country) => {
                    setCountry(country.cca2);
                    console.log(country.cca2);
                  }
                  }
                />
              </View>
              {country !== null && (
                <Text style={{
                  flex: 1,
                  fontSize: RFPercentage(2.7),
                  marginTop: '5%',
                  marginBottom: '5%',
                  marginLeft: '3%',
                  borderColor: '#cecece',
                  borderWidth: 0.5,
                  borderRadius: 5,
                  // paddingHorizontal: '%',
                  paddingTop: '3%',
                  paddingLeft: '2%',
                  width: '90%',
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
    width: '90%',
    alignSelf: 'center',
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  name: {
    flexDirection: 'row',
    marginLeft: '6%',
    marginTop: '2%',
  },
  image: {
    width: '90%',
    borderColor: '#F0EFEF',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: '5%',
    marginHorizontal: '5%',
    padding: '5%',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  imageLabel: {
    fontSize: RFPercentage(2.7),
    marginLeft: '10%',
    marginRight: '5%',
    marginTop: '10%',
    color: '#1a6997',
    borderColor: '#1a6997',
    borderWidth: 2,
    paddingHorizontal: '15%',
    paddingVertical: '2%',
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  submit: {
    alignSelf: 'center',
  },
  submitLabel: {
    fontSize: RFPercentage(2.7),
    marginTop: '10%',
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
    flex: 1,
    fontSize: RFPercentage(2.7),
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '2%',
    borderColor: '#cecece',
    borderWidth: 0.5,
    borderRadius: 5,
    // paddingHorizontal: '%',
    width: '90%',
    height: 42,
    color: '#000',
  },
  inputs: {
    marginLeft: '5%',
    marginTop: '2%',
  },
  changePassword: {
    fontSize: RFPercentage(2.7),
    marginTop: '10%',
    marginBottom: '10%',
    color: '#1a6997',
    borderColor: '#1a6997',
    borderWidth: 2,
    paddingVertical: '2%',
    paddingHorizontal: '25%',
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: RFPercentage(2.7),
    marginLeft: '2%',
    color: '#000',
  },
});
