import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import './src/constants/DCSLocalize';
import { StripeProvider } from '@stripe/stripe-react-native';
import { BASE_URL } from './config';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [publishableKey, setPublishableKey] = useState(null);


  const getPublishableKey = async () => {
    const key = await axios.get(`${BASE_URL}/stripe-gateway`, {}, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response.data);
      setPublishableKey(response.data);
      console.log('publishableKey', publishableKey);
    }).catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    getPublishableKey();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, [])
  return (
    // <StripeProvider publishableKey="pk_test_51Ll82qSE1zKryg0yM2lHHw01sYprPfkQMJPMVWwq1oVEyEHhcdpQ5TCXCVirLyrvqQtdqX0v8uvfhzdAAX5Sevc5004SMzN7Fh">
    <StripeProvider publishableKey={publishableKey}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </StripeProvider>
  );
};

export default App;
