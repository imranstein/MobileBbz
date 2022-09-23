import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import './src/constants/DCSLocalize';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51Ll82qSE1zKryg0yM2lHHw01sYprPfkQMJPMVWwq1oVEyEHhcdpQ5TCXCVirLyrvqQtdqX0v8uvfhzdAAX5Sevc5004SMzN7Fh">
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </StripeProvider>
  );
};

export default App;
