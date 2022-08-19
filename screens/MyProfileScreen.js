import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { t } from 'i18next';
import Icons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';

const MyProfileScreen = (props) => {
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [address2, setAddress2] = useState('');



  const UpdateProfile = async function (): Promise<boolena> {
    const emailValue = email;


    return await axios
      .put(`${BASE_URL}/edit-profile/`,
        { first_name, last_name, email, phone, birthday, address, city, zip_code, country, address2 },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        })
      .then(res => {
        console.log(res);
        alert(res.data.message, 'Success');
        // navigation.navigate('Success');
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
    setZipCode(data.zip_code);
    setCountry(data.country);
    setAddress2(data.address2);


  };
  useEffect(() => {
    getData();
  }, [])

  return (
    console.log(data),
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
              <Text style={styles.label}>First name</Text>
              <TextInput style={styles.input}
                value={first_name}
                onChangeText={setFirstName} />
            </View>
            <View>
              <Text style={styles.label}>Last name</Text>
              <TextInput style={styles.input}
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
                onChangeText={setPhone} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>{t('common:Birthdate')}</Text>
              <TextInput style={styles.input}
                value={birthday}
                onChangeText={setBirthday} />
            </View>
          </View>
          <View style={{ flex: 1, marginTop: '5%', marginBottom: '5%' }}>
            <Text style={{ marginLeft: '5%', fontSize: 16, fontWeight: 'bold' }}>{t('common:Address')}</Text>
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
                value={zip_code}
                onChangeText={setZipCode} />
            </View>
          </View>
          <View style={styles.inputs}>
            <View>
              <Text style={styles.label}>{t('common:Country')}</Text>
              <TextInput style={styles.input}
                value={country}
                onChangeText={setCountry} />
            </View>
          </View>
          <View style={styles.inputs}>
            <TouchableOpacity>
              <Text style={styles.changePassword}>{t('common:ChangePassword')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.submit}>
        <TouchableOpacity onPress={() => { UpdateProfile(); }}>
          <Text style={styles.submitLabel}>{t('common:SaveChanges')}</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: 'space-evenly',
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
    fontSize: 18,
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
    fontSize: 18,
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
    fontSize: 18,
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '2%',
    borderColor: '#cecece',
    borderWidth: 1,
    // paddingHorizontal: '%',
    width: '90%',
    height: '37%',
  },
  inputs: {
    marginLeft: '5%',
    marginTop: '2%',
  },
  changePassword: {
    fontSize: 18,
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
  }
});
