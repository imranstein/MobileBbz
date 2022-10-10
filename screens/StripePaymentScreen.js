import { View, Text, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { CardField, useStripe, useConfirmPayment, BillingDetails } from '@stripe/stripe-react-native';
import { scale } from 'react-native-size-matters';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { t } from 'i18next';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';


const StripePaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { confirmPayment, loading } = useConfirmPayment();
  const amount = route.params.amount;
  const code = route.params.code;
  const event_id = route.params.event_id;
  const gateway = route.params.gateway;
  const location = route.params.location;
  const slug = route.params.slug;
  const examDate = route.params.examDate;
  const examTime = route.params.examTime;
  const city_name = route.params.city_name;
  const email = route.params.email;
  const city = route.params.city;
  const country = route.params.country;
  const phone = route.params.phone;
  const address = route.params.address;
  const zip_code = (route.params.zip_code).toString();
  const name = route.params.name;
  const [status, setStatus] = useState('');
  // const [country, setCountry] = useState('');
  // const [phone, setPhone] = useState('');
  // const [address, setAddress] = useState('');
  // const [zip_code, setZipCode] = useState('');
  // const [name, setName] = useState('');
  // const [city, setCity] = useState('');

  // country = setCountry(route.params.country);
  // phone = setPhone(route.params.phone);
  // address = setAddress(route.params.address);
  // zip_code = setZipCode(route.params.zip_code);
  // name = setName(route.params.name);
  // city = setCity(route.params.city);

  const bookingStatus = async () => {
    const { result } = await axios
      .get(`${BASE_URL}/get-booking/${code}`).then(res => {
        setStatus(res.data.status);
        console.log(res.data.status);
      })
  }
  useEffect(() => {
    bookingStatus();
  }, [status]);

  const { userInfo } = useContext(AuthContext);
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  const [line1, setLine1] = useState('');
  // const [city, setCity] = useState('');
  const [postal_code, setPostalCode] = useState('');
  // const [country, setCountry] = useState('');
  const [isLoading, setLoading] = useState(false);

  // console.log(userInfo);
  // const getData = async () => {
  //   const { data } = await axios
  //     .get(`${BASE_URL}/profile`, {
  //       headers: {
  //         Authorization: 'Bearer ' + userInfo.token,
  //       },
  //     }).then(res => {
  //       console.log(res.data);
  //       setName(res.data.name);
  //       setPhone(res.data.phone);
  //       setAddress(res.data.address);
  //       setCity(res.data.city);
  //       setZipCode((res.data.zip_code).toString());
  //       setCountry(res.data.country);
  //       console.log(name);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  //   setResult(data);
  //   setName(data.name);
  //   setEmail(data.email);
  //   setPhone(data.phone);
  //   setLine1(data.address);
  //   setCity(data.city);
  //   setCountry(data.country);
  //   setPostalCode((data.zip_code).toString());
  //   console.log(name);
  // };

  // useEffect(() => {
  //   getData();

  // }, [])
  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${BASE_URL}/paymentIntent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'eur',
        amount: amount,
      }),
    });
    const { clientSecret } = await response.json();

    return clientSecret;
  };
  const finalize = async () => {
    const { data } = await axios.post(`${BASE_URL}/confirm/${gateway}`, {
      code: code,
      amount: amount,
      event_id: event_id,
    }).then((res) => {
      console.log(res.data);
      console.log('success');
    }).catch((err) => {
      console.log(err);
      console.log('error');
    })
  }
  const handlePayPress = async () => {

    if (status == 'paid') {
      console.log('already paid');
      alert('Already Paid');
      navigation.navigate('BookingSuccess'
        , {
          amount: amount,
          code: code,
          event_id: event_id,
          gateway: gateway,
          location: location,
          slug: slug,
          examDate: examDate,
          examTime: examTime,
          city_name: city_name,
        }
      );
    } else {
      setLoading(true);
      // Gather the customer's billing information (for example, email)
      // const billingDetails: BillingDetails = {
      //   email: 'jenny.rosen@example.com',
      // };
      // const billingDetails: BillingDetails = {
      //   email: userInfo.email,
      // };


      // Fetch the intent client secret from the backend
      const clientSecret = await fetchPaymentIntentClientSecret();

      // Confirm the payment with the card details
      const { paymentIntent, error } = await confirmPayment(clientSecret, {

        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: email,
            name: name,
            phone: phone,
            address: {
              line1: address,
              city: city,
              postal_code: zip_code,
              country: country,
            },

          },
        },

        // paymentMethodData: {
        //   billingDetails,
        // },
        // type: 'Card',
        // billingDetails: { email: userInfo.email, name: userInfo.first_name },
      });

      if (error) {
        console.log('Payment confirmation error', error);
        alert(`Payment confirmation error ${error.message}`);
      } else if (paymentIntent) {

        console.log('Success from promise', paymentIntent);
        finalize();
        navigation.navigate('BookingSuccess'
          , {
            amount: amount,
            code: code,
            event_id: event_id,
            gateway: gateway,
            location: location,
            slug: slug,
            examDate: examDate,
            examTime: examTime,
            city_name: city_name,
          }
        );
      }
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <ActivityIndicator size="medium" color="#1570a5" animating={isLoading} /> */}
      <Spinner visible={isLoading} />

      <View style={{
        marginTop: '-5%',
      }}>
        <Text style={{
          fontSize: scale(20),
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: scale(20),
          color: '#000',
        }}>{t('common:BillingAddress')}</Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor='#1570a5'
          style={{
            color: '#000',
            borderWidth: 1,
            borderColor: '#1570a5',
            marginHorizontal: '2%',
            marginBottom: scale(20),
            borderRadius: scale(4),
            paddingHorizontal: scale(10),
            fontSize: scale(16),
          }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Phone"
          placeholderTextColor='#1570a5'
          style={{
            color: '#000',
            borderWidth: 1,
            borderColor: '#1570a5',
            marginHorizontal: '2%',
            marginBottom: scale(20),
            borderRadius: scale(4),
            paddingHorizontal: scale(10),
            fontSize: scale(16),
          }}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          placeholder="Address"
          placeholderTextColor='#1570a5'
          style={{
            color: '#000',
            borderWidth: 1,
            borderColor: '#1570a5',
            marginHorizontal: '2%',
            marginBottom: scale(20),
            borderRadius: scale(4),
            paddingHorizontal: scale(10),
            fontSize: scale(16),
          }}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          placeholder="Zip Code"
          placeholderTextColor='#1570a5'
          style={{
            color: '#000',
            borderWidth: 1,
            borderColor: '#1570a5',
            marginHorizontal: '2%',
            marginBottom: scale(20),
            borderRadius: scale(4),
            paddingHorizontal: scale(10),
            fontSize: scale(16),
          }}
          value={zip_code}
          onChangeText={(text) => setZipCode(text)}
        />
        <TextInput
          placeholder="City"
          placeholderTextColor='#1570a5'
          style={{
            color: '#000',
            borderWidth: 1,
            borderColor: '#1570a5',
            marginHorizontal: '2%',
            marginBottom: scale(20),
            borderRadius: scale(4),
            paddingHorizontal: scale(10),
            fontSize: scale(16),
          }}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <View>
          <View style={{
            marginLeft: '4%',
            borderColor: '#cecece',
            borderBottomWidth: 0.5,
          }}
          >
            <CountryPicker
              withFilter
              withFlag
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
              fontSize: scale(17),
              marginTop: '2%',
              marginBottom: '2%',
              marginLeft: '3%',
              borderColor: '#cecece',
              borderWidth: 0.5,
              borderRadius: 5,
              // paddingHorizontal: '%',
              paddingTop: '1%',
              paddingLeft: '2%',
              width: '90%',
              height: 42,
              color: '#000',
            }}>{country}</Text>
          )}
        </View>

        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#ffffff',
            textColor: '#000000',
            placeholderColor: '#1570a5',
            cursorColor: '#1570a5',
            borderColor: '#1570a5',
            borderWidth: 1,
            borderRadius: 4,
            height: 40,
            width: 300,
            marginVertical: 10,
          }}
          style={{
            width: '96%',
            height: 50,
            marginVertical: 30,
            color: '#000',
            marginHorizontal: '2%',

          }}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
        <Button
          title="Pay"
          onPress={handlePayPress}
          buttonStyle={{
            backgroundColor: '#1570a5',
            borderRadius: 5,
            marginHorizontal: '10%',
            width: '40%',
            height: 50,
            marginBottom: scale(20),
          }}
          titleStyle={{
            fontSize: scale(18),
          }}
          disabled={loading}
        />
        {/* <TouchableOpacity
        onPress={handlePayPress}
        style={{
          marginTop: scale(5),
          backgroundColor: '#1570a5',
          paddingVertical: 12,
          borderRadius: 4,
          alignContent: 'center',
          alignSelf: 'center',
          width: '60%',
        }}
        disabled={loading}
      >
        <Text style={{
          color: '#fff',
          fontSize: scale(18),
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
        >Pay</Text>
      </TouchableOpacity> */}

      </View>
    </ScrollView>
  )
}

export default StripePaymentScreen