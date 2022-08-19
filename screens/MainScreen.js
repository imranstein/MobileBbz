import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import News from './News';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Location from './Location';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";

const Drawer = createDrawerNavigator();
  // const { t } = useTranslation();

const MainScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name={t('common:Home')} component={HomeScreen} />
      <Drawer.Screen name={t('common:AboutUs')} component={AboutUs} />
      <Drawer.Screen name={t('common:Location')} component={Location} />
      <Drawer.Screen name={t('common:ContactUs')} component={ContactUs} />
      <Drawer.Screen name={t('common:News')} component={News} />
    </Drawer.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
