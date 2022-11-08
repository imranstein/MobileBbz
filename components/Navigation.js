import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import PaypalScreen from '../screens/PaypalScreen';
import LanguageWelcome from '../screens/LanguageWelcome';
import HomeScreen from '../screens/HomeScreen';
import InvoiceScreen from '../screens/InvoiceScreen';
import TicketScreen from '../screens/TicketScreen';
import VerifyScreen from '../screens/VerifyScreen';
import VerifySuccessScreen from '../screens/VerifySuccessScreen';
import ProfileScreen from '../screens/ProfileScreen';


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
              name="Profile"
              options={{ title: t('common:Profile'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={ProfileScreen}
            />
            <Stack.Screen
              options={{ title: t('common:MyProfile'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              name="My Profile" component={MyProfileScreen} />
            <Stack.Screen
              name="Change Password"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="Exams" component={SearchPage} />
            <Stack.Screen name="NewsDetail"
              options={({ route }) => ({ title: route.params.title, headerTintColor: '#1a6997', headerTitleAlign: 'center' })}
              // options={{ title: t('common:NewsDetail'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={NewsDetailScreen} />
            <Stack.Screen name="ExamDetail"
              options={({ route }) => ({ title: route.params.name, headerTintColor: '#1a6997', headerTitleAlign: 'center' })}

              // options={{ title: t('common:ExamDetail'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={ExamDetailScreen} />
            <Stack.Screen name="Booking"
              options={({ route }) => ({ title: route.params.slug, headerTintColor: '#1a6997', headerTitleAlign: 'center' })}
              // options={{ title: t('common:Booking'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={BookingScreen} />
            <Stack.Screen name="BookingHistory"
              options={{ title: t('common:BookingHistory'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={BookingHistoryScreen} />
            <Stack.Screen name="StripePayment"
              options={{ title: t('common:StripePayment'), headerTintColor: '#1a6997', headerTitleAlign: 'center', headerBackVisible: false }}
              component={StripePaymentScreen} />
            <Stack.Screen name="PaypalPayment"
              options={{ title: t('common:PaypalPayment'), headerTintColor: '#1a6997', headerTitleAlign: 'center', headerBackVisible: false }}
              component={PaypalScreen} />
            <Stack.Screen name="BookingSuccess"
              options={{ title: t('common:BookingSuccess'), headerTintColor: '#1a6997', headerTitleAlign: 'center', headerBackVisible: false }}
              component={BookingSuccessScreen} />
            <Stack.Screen name="BookingDetail"
              options={{ title: t('common:BookingDetail'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={BookingDetailScreen} />
            <Stack.Screen name="InvoiceScreen"
              options={{ title: t('common:InvoiceScreen'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={InvoiceScreen} />
            <Stack.Screen name="TicketScreen"
              options={{ title: t('common:TicketScreen'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={TicketScreen} />
            <Stack.Screen name="Language"
              options={{ title: t('common:language'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={LanguageWelcome} />
            <Stack.Screen name="Verify"
              options={{ title: t('common:Verify'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={VerifyScreen} />
            <Stack.Screen name="VerifySuccess"
              options={{ title: t('common:VerifySuccess'), headerTintColor: '#1a6997', headerTitleAlign: 'center', headerBackVisible: false }}
              component={VerifySuccessScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name="Login/Signup"
              options={{ title: t('common:Welcome'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={Welcome} />
            <Stack.Screen name="Exam" component={HomeScreen} />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: t('common:Login'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: t('common:SignUp'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="Reset Your Password"
              component={ResetPassword}
              options={{ headerTintColor: '#1a6997', headerTitleAlign: 'center' }}

            />
            <Stack.Screen name="Success" component={ResetSuccess} />
            <Stack.Screen name="Exams" component={SearchPage} />
            <Stack.Screen name="NewsDetail"
              options={({ route }) => ({ title: route.params.title, headerTintColor: '#1a6997', headerTitleAlign: 'center' })}
              // options={{ title: t('common:NewsDetail'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={NewsDetailScreen} />
            <Stack.Screen name="ExamDetail"
              options={({ route }) => ({ title: route.params.name, headerTintColor: '#1a6997', headerTitleAlign: 'center' })}
              // options={{ title: t('common:ExamDetail'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={ExamDetailScreen} />
            <Stack.Screen name="Booking"
              options={({ route }) => ({ title: route.params.slug, headerTintColor: '#1a6997', headerTitleAlign: 'center' })}
              // options={{ title: t('common:Booking'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={BookingScreen} />
            <Stack.Screen name="StripePayment"
              options={{ title: t('common:StripePayment'), headerTintColor: '#1a6997', headerTitleAlign: 'center', headerBackVisible: false }}
              component={StripePaymentScreen} />
            <Stack.Screen name="PaypalPayment"
              options={{ title: t('common:PaypalPayment'), headerTintColor: '#1a6997', headerTitleAlign: 'center', headerBackVisible: false }}
              component={PaypalScreen} />
            <Stack.Screen name="BookingSuccess"
              options={{ title: t('common:BookingSuccess'), headerTintColor: '#1a6997', headerTitleAlign: 'center', headerBackVisible: false }}
              component={BookingSuccessScreen} />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Language"
              options={{ title: t('common:language'), headerTintColor: '#1a6997', headerTitleAlign: 'center' }}
              component={LanguageWelcome} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
