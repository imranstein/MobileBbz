import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import Welcome from '../screens/Welcome';
import ResetPassword from '../screens/ResetPassword';
import ResetSuccess from '../screens/ResetSuccess';
import MainScreen from '../screens/MainScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import ExamDetailScreen from '../screens/ExamDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import { t } from 'i18next';
import SearchPage from '../screens/SearchScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import StripePaymentScreen from '../screens/StripePaymentScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';
import BookingDetailScreen from '../screens/BookingDetailScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : userInfo.token ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              options={{ title: t('common:MyProfile'), headerTintColor: '#1a6997' }}
              name="My Profile" component={MyProfileScreen} />
            <Stack.Screen
              name="Change Password"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="Exams" component={SearchPage} />
            <Stack.Screen name="NewsDetail"
              options={{ title: t('common:NewsDetail'), headerTintColor: '#1a6997' }}
              component={NewsDetailScreen} />
            <Stack.Screen name="ExamDetail"
              options={{ title: t('common:ExamDetail'), headerTintColor: '#1a6997' }}
              component={ExamDetailScreen} />
            <Stack.Screen name="Booking"
              options={{ title: t('common:Booking'), headerTintColor: '#1a6997' }}
              component={BookingScreen} />
            <Stack.Screen name="BookingHistory"
              options={{ title: t('common:BookingHistory'), headerTintColor: '#1a6997' }}
              component={BookingHistoryScreen} />
            <Stack.Screen name="StripePayment" component={StripePaymentScreen} />
              <Stack.Screen name="BookingSuccess"
                options={{ title: t('common:BookingSuccess'), headerTintColor: '#1a6997' }}
                component={BookingSuccessScreen} />
              <Stack.Screen name="BookingDetail"
                options={{ title: t('common:BookingDetail'), headerTintColor: '#1a6997' }}
                component={BookingDetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login/Signup"
              options={{ title: t('common:Login'), headerTintColor: '#1a6997' }}
              component={Welcome} />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: t('common:Login'), headerTintColor: '#1a6997' }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: t('common:Register'), headerTintColor: '#1a6997' }}
            />
            <Stack.Screen
              name="Reset Your Password"
              component={ResetPassword}
            />
            <Stack.Screen name="Success" component={ResetSuccess} />
            <Stack.Screen name="NewsDetail"
              options={{ title: t('common:NewsDetail'), headerTintColor: '#1a6997' }}
              component={NewsDetailScreen} />
            <Stack.Screen name="ExamDetail" component={ExamDetailScreen} />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
