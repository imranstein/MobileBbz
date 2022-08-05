import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './components/Navigation';
import {AuthProvider} from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
