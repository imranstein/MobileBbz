import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import SearchPage from './SearchScreen';
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/EvilIcons';
import Login from './Login';
import { t } from 'i18next';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);

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
          } else if (route.name === 'Login') {
            iconName = focused ? 'key' : 'key-sharp';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#166795',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Search" component={SearchPage} options={{ headerShown: false, title: t('common:Exams') }} />

      {userInfo.token ?
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, title: t('common:Profile') }} />
        :
        <Tab.Screen name="Login" component={Login} options={{ title: t('common:Login') }} />}
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
    fontSize: RFPercentage(2.7),
    marginBottom: 8,
  },
});

export default HomeScreen;
