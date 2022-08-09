import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import SearchPage from './SearchScreen';
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/EvilIcons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);

  return (
    // <View style={styles.container}>
    //   <Spinner visible={isLoading} />
    //   <Text style={styles.welcome}>Welcome {userInfo.name}</Text>
    //   <Button title="Logout" color="red" onPress={logout} />
    // </View>
    <Tab.Navigator
    screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Search') {
              iconName = focused
                ? 'ios-reader-outline'
                : 'ios-reader';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person-circle-outline' : 'ios-person-circle-sharp';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#166795',
          tabBarInactiveTintColor: 'gray',
        })}>
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
