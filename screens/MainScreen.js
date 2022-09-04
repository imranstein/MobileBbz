import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import News from './News';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Location from './Location';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomDrawer from './CustomDrawer';
import Language from './Language';
const Drawer = createDrawerNavigator();
// const { t } = useTranslation();

const MainScreen = () => {
  return (
    <Drawer.Navigator

      screenOptions={{
        drawerActiveBackgroundColor: '#166795',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { fontSize: 15, marginLeft: -20, fontFamily: 'Roboto-medium' }
      }}
      drawerContent={props => <CustomDrawer{...props} />} initialRouteName="Main">
      <Drawer.Screen name={t('common:Home')} component={HomeScreen} options={{
        // title: 'Home',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="md-home"
            size={size}
            color={focused ? '#fff' : '#1a6997'}
          />
        ),
      }} />
      <Drawer.Screen name={t('common:AboutUs')} component={AboutUs}
        options={{
          // title: '.{t('common: AboutUs')}.',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="people"
              size={size}
              color={focused ? '#fff' : '#1a6997'}
            />
          ),
        }} />
      <Drawer.Screen name={t('common:Location')} component={Location}
        options={{
          // title: 'Location',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="location-outline"
              size={size}
              color={focused ? '#fff' : '#1a6997'}
            />
          ),
        }} />
      <Drawer.Screen name={t('common:ContactUs')} component={ContactUs}
        options={{
          // title: 'Contact Us',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="phone-portrait"
              size={size}
              color={focused ? '#fff' : '#1a6997'}
            />
          ),
        }} />
      <Drawer.Screen name={t('common:News')} component={News}
        options={{
          // title: 'News',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="newspaper"
              size={size}
              color={focused ? '#fff' : '#1a6997'}
            />
          ),
        }} />
      <Drawer.Screen name={t('common:Language')} component={Language}
        options={{
          // title: 'News',
          drawerIcon: ({ focused, size }) => (
            <Entypo
              name="language"
              size={size}
              color={focused ? '#fff' : '#1a6997'}
            />
          ),
        }} />
    </Drawer.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
