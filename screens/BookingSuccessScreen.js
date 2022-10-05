import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { t } from 'i18next';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from '../config';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';


const BookingSuccessScreen = ({ route }) => {

  const navigation = useNavigation;
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      navigation.navigate('ExamDetail', {
        paramKey: eventId,
      });
    });
  }, [navigation]);
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [salutation, setSalutation] = useState('');
  const [academicTitle, setAcademicTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [birthPlace, setBirthPlace] = useState('');
  const [country_of_birth, setCountryOfBirth] = useState('');
  const [motherTongue, setMotherTongue] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [address2, setAddress2] = useState('');
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const code = route.params.code;
  const eventId = route.params.event_id;

  const gateway = route.params.gateway;
  const amount = route.params.amount;
  const slug = route.params.slug;
  const location = route.params.location;
  const city_name = route.params.city;
  const examDate = route.params.examDate;
  const examTime = route.params.examTime;
  // const location = 'Addis Ababa';
  // const city_name = 'Addis Ababa';
  // const street_name = 'Bole';

  // const code = '03F67260BE95911DA7F47E9107323B';
  const getData = async () => {
    const { result } = await axios
      .get(`${BASE_URL}/get-booking/${code}`, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      }).then(res => {
        console.log(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setIdentificationNumber(res.data.identification_number);
        setEmail(res.data.email);
        setSalutation(res.data.salutation);
        setAcademicTitle(res.data.academic_title);
        setPhone(res.data.phone);
        setTelephone(res.data.tele_phone);
        setBirthday(res.data.birth_date);
        setBirthPlace(res.data.birth_place);
        setCountryOfBirth(res.data.country_Of_birth);
        setMotherTongue(res.data.mother_tongue);
        setAddress(res.data.address_line_1);
        setCity(res.data.city);
        setZipCode(res.data.zip_code);
        setCountry(res.data.country);
        setAddress2(res.data.address2);
        setStatus(res.data.status);
        setId(res.data.id);
        setBookingDate(res.data.start_date);
      }
      ).catch(err => {
        console.log(err);
      }
      );

  };
  useEffect(() => {
    getData();
  }, [])
  // console.log(city);



  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{
          backgroundColor: '#fff',
          width: '100%',
          height: scale(80),
        }}>
          <Image source={require('../assets/2.png')} style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginTop: scale(25),
            // width: scale(200),
            // height: scale(20),
          }} />

        </View>
        <View style={styles.header}>
          <ImageBackground source={require('../assets/searchBackground.png')}>

            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15, width: '90%' }}>
              <Text style={{ marginRight: 10, marginLeft: 20, marginTop: 20 }}>
                <FontAwesome
                  name="check-circle"
                  size={30}
                  color="#3E8529"
                  borderColor="#fff"
                  style={styles.icon}
                  backgroundColor="#fff"
                  borderRadius={50}
                  borderWidth={1}
                />
              </Text>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.locationText}>
                  {t("common:BookingSuccessful")}
                </Text>
                <Text style={styles.locationDescription}>
                  {t("common:BookingDetailHasBeenSentTo")}:
                </Text>
                <Text style={styles.locationDescription}>
                  {email}
                </Text>
              </View>
            </View>

          </ImageBackground>
        </View>
        <View style={styles.search}>
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 2 }}>

            <Text style={styles.title}> {t('common:BookingNumber')}: </Text>
            <Text style={[styles.value]}> {id} </Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>

            <Text style={styles.title}> {t('common:BookingDate')}:   </Text>
            <Text style={[styles.value]}>
              {moment(bookingDate).format('M/D/yyyy')}
            </Text>


          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:PaymentMethod')}:   </Text>
            <Text style={[styles.value]}>{gateway} </Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:BookingStatus')}:   </Text>
            <Text style={[styles.value]}>  {status} </Text>

          </View>
          {/* <View style={{ flexDirection: 'column', marginTop: 20, marginBottom: 2 }}>
            <Text style={{
              fontSize: 22,
              color: '#1a6997',
              fontWeight: 'bold',
              marginLeft: 10,
            }}> {t('common:Total')}:   </Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000',
              // marginHorizontal: 10,
              paddingTop: 5,
              textAlign: 'right',
              flex: 1,
              marginRight: 7,
            }}> </Text>

          </View> */}
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#fff', height: 400, width: '90%', marginLeft: '5%' }}>
          <Text style={styles.descriptionLabel}>{t('common:YourBooking')}</Text>
          <Text style={styles.h1}>{slug}</Text>
          {location != null ?
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
              <Text style={{ marginRight: 10, marginLeft: 5, }}>
                <Entypo
                  name="location-pin"
                  size={18}
                  color="#fff"
                  style={styles.icon}
                />
              </Text>
              <Text style={styles.locationText}>
                {location.name} - {city_name}/ {location.street_name}
              </Text>
            </View> : <View View style={{ flexDirection: 'column', marginTop: 15, marginBottom: 15 }}>
              <Text style={{ marginRight: 5, marginLeft: 5, }}>
                <Entypo
                  name="location-pin"
                  size={18}
                  color="#000"
                  style={styles.icon}
                />
              </Text>
            </View>}
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 2 }}>

            <Text style={styles.title}> {t('common:ExamLevel')}: </Text>
            <Text style={[styles.value]}> {slug}</Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>

            <Text style={styles.title}> {t('common:ExamDate')}:   </Text>
            <Text style={[styles.value]}>
              {moment(examDate).format('M/D/yyyy (ddd)')}
            </Text>


          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 10 }}>
            <Text style={styles.title}> {t('common:ExamTime')}:   </Text>
            <Text style={[styles.value]}>
              {examTime}
            </Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:ExaminationFee')}:   </Text>
            <Text style={[styles.value]}>
              {amount}
              € </Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 2 }}>
            <Text style={{
              fontSize: 22,
              color: '#1a6997',
              fontWeight: 'bold',
              marginLeft: 10,
            }}> {t('common:Total')}:   </Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000',
              // marginHorizontal: 10,
              paddingTop: 5,
              textAlign: 'right',
              flex: 1,
              marginRight: 7,
            }}>
              {amount}
              € </Text>

          </View>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#fff', width: '90%', marginLeft: '5%' }}>
          <Text style={styles.descriptionLabel}>{t('common:YourInformation')}</Text>
          <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 2 }}>

            <Text style={styles.title}> {t('common:FirstName')} </Text>
            <Text style={[styles.infovalue]}> {first_name} </Text>

          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:LastName')} </Text>
            <Text style={[styles.infovalue]}> {last_name} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:IdentificationNumber')} </Text>
            <Text style={[styles.infovalue]}> {identificationNumber} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:Email')} </Text>
            <Text style={[styles.infovalue]}> {email} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:Salutation')} </Text>
            <Text style={[styles.infovalue]}> {salutation} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:AcademicTitle')} </Text>
            <Text style={[styles.infovalue]}> {academicTitle} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:BirthDate')} </Text>
            <Text style={[styles.infovalue]}> {moment(birthday).format('M/D/yyyy')} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:BirthPlace')} </Text>
            <Text style={[styles.infovalue]}> {birthPlace} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:CountryOfBirth')} </Text>
            <Text style={[styles.infovalue]}> {country_of_birth} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:MotherTongue')} </Text>
            <Text style={[styles.infovalue]}> {motherTongue} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:Telephone')} </Text>
            <Text style={[styles.infovalue]}> {telephone} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:Mobile')} </Text>
            <Text style={[styles.infovalue]}> {phone} </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
            <Text style={styles.title}> {t('common:Address')} </Text>
            <Text style={[styles.infovalue]}>{city},{address},{zipCode} </Text>
          </View>

        </View>
        <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#D9E8F1', width: '90%', marginLeft: '5%', height: 300, borderTopColor: '#1570A5', borderTopWidth: 4, borderTopLeftRadius: 5, borderTopRightRadius: 5, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 15, width: '90%' }}>
            <Text style={{ marginRight: 10, marginLeft: 20, }}>
              <Ionicons
                name="bulb"
                size={70}
                color="#C16E20"
              />
            </Text>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 19, color: '#4F94BC', fontWeight: '600', marginTop: 5, marginLeft: 2 }}>
                {t("common:DoYouHaveQuery")}
              </Text>
              <Text style={{ fontSize: 15, color: '#333', fontWeight: '500', marginTop: 5, marginBottom: 5, marginLeft: 2 }}>
                {t("common:YouCanConnectWithUsAnytime")}
              </Text>
            </View>
          </View>
          <View style={{ borderTopColor: '#888', borderTopWidth: 1 }}>
            <Text style={{ color: '#555', fontSize: 17, fontWeight: 'bold', marginTop: 15, marginLeft: 15 }}>{t('common:ContactUs')}</Text>
            <Text style={{ color: '#555', fontSize: 15, fontWeight: '500', marginTop: 5, marginLeft: 15 }}>Deutschtest für Zuwanderer (DTZ / A2-B1)(PR-220409-HU-DTZ)</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ marginRight: 5, marginLeft: 13, }}>
                <Entypo
                  name="location-pin"
                  size={20}
                  color="#666"
                />
              </Text>
              <Text style={{ fontSize: 14, color: '#4F94BC', fontWeight: '600', marginLeft: 1, width: '85%' }}>
                Brüder Grimm Bildungscentrum e. V. Langstr.60 63452 Hanau
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ marginRight: 5, marginLeft: 13, }}>
                <Entypo
                  name="phone"
                  size={20}
                  color="#666"
                />
              </Text>
              <Text style={{ fontSize: 14, color: '#4F94BC', fontWeight: '600', marginLeft: 1, width: '85%' }}>
                +49 1234567
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
              <Text style={{ marginRight: 5, marginLeft: 13, }}>
                <Entypo
                  name="mail"
                  size={20}
                  color="#666"
                />
              </Text>
              <Text style={{ fontSize: 14, color: '#4F94BC', fontWeight: '600', marginLeft: 1, width: '85%' }}>
                admin@gmail.com
              </Text>
            </View>

          </View>
        </View>
      </ScrollView >
    </View >
  )
}

export default BookingSuccessScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  header: {
    flex: 1,
    backgroundColor: '#1a6997',
    height: 200,
  },
  h1: {
    fontSize: 25,
    color: '#000',
    marginHorizontal: 10,
    paddingTop: 12,
  },
  h5: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 20,
    paddingTop: 5,
    lineHeight: 20,
  },
  search: {
    width: '94%',
    height: 180,
    // borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 1,
    backgroundColor: '#fff',
    marginTop: -90,
    zindex: -1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  titleHeader: {
    fontSize: 13,
    color: '#1a6997',
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  button: {
    backgroundColor: '#1a6997',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    elevation: 1,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    zindex: -1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    width: '94%',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    elevation: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a6997',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  listSubTitle: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 10,
    paddingTop: 5,
    marginBottom: 10,
  },
  locationText: {
    fontSize: RFPercentage(3),
    color: "#fff",
    width: '90%',
    fontWeight: '400',
    marginRight: '4%',
    marginBottom: '2%',
  },
  locationDescription: {
    fontSize: RFPercentage(2),
    color: "#fff",
    marginTop: 3,
    fontWeight: '300',
    marginRight: '4%',
  },
  submit: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row'
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
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    // marginHorizontal: 10,
    paddingTop: 5,
    textAlign: 'right',
    flex: 1,
    marginRight: 7,
  },
  infovalue: {
    fontSize: 15,
    fontWeight: '400',
    color: '#939393',
    // marginHorizontal: 10,
    paddingTop: 5,
    textAlign: 'right',
    flex: 1,
    marginRight: 7,
  },
  descriptionLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a6997',
    marginHorizontal: 15,
    paddingTop: 20,
  },
  titleHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
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
  name: {
    flexDirection: 'row',
  },
  icon: {
    // borderColor: '#cecece',
    // borderWidth: 0.1,
    // borderRadius: 100,
    // backgroundColor: '#fff',
  },
})