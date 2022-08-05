import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import SearchPage from './SearchScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);

  return (
    // <View style={styles.container}>
    //   <Spinner visible={isLoading} />
    //   <Text style={styles.welcome}>Welcome {userInfo.name}</Text>
    //   <Button title="Logout" color="red" onPress={logout} />
    // </View>
    <Tab.Navigator>
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
