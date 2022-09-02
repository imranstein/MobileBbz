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
                options={{ title: t('common:MyProfile') }}
                name="My Profile" component={MyProfileScreen} />
            <Stack.Screen
              name="Change Password"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
            <Stack.Screen name="ExamDetail" component={ExamDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name="Login/Signup" component={Welcome} />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: t('common:Login') }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: t('common:Register') }}
            />
            <Stack.Screen
              name="Reset Your Password"
              component={ResetPassword}
            />
            <Stack.Screen name="Success" component={ResetSuccess} />
            <Stack.Screen options={{ title: t("common:NewsDetail") }} name="NewsDetail" component={NewsDetailScreen} />
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
