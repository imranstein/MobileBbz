import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import { t } from 'i18next';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [termError, setTermError] = useState(null);

  const register = (first_name, last_name, email, password, phone, term) => {
    setIsLoading(true);
    setError2(null);
    setTermError(null);
    // console.log(first_name, last_name, email, phone, password, term);
    if (term == false || term == null) {
      setTermError('Please accept the terms and conditions');
      setIsLoading(false);
    } else {
      setTermError(null);
      setError2(null);
      axios
        .post(`${BASE_URL}/signup`, {
          first_name,
          last_name,
          email,
          password,
          phone,
          term,
        })
        .then(res => {
          console.log(res.data.error,);
          if (res.data.error) {
            // alert('email or Phone is already taken', 'Error');
            setError2('email or Phone is already taken');
            setIsLoading(false);
          }
          // else if (term == null || term == false) {
          //   setTermError('Please accept the terms and conditions');
          //   setIsLoading(false);
          // }
          else {
            setTermError(null);
            setError2(null);
            alert('Successfully registered');
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
          }

        })
        .catch(e => {
          console.log(`register error ${e}`);
          alert('Something went wrong', 'Error');
          setIsLoading(false);
        });
    }
  };

  const login = (email, password) => {
    setIsLoading(true);
    setError(null);
    axios
      .post(`${BASE_URL}/login`, {
        email,
        password,
      })
      .then(res => {

        let userInfo = res.data;
        setError(null);
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        if (e.response.status === 401) {
          // alert(e.response.data.error, 'Error');
          setError(t('common:PasswordIsIncorrect'));
        }
        else if (e.response.status == 404) {
          setError(t('common:EmailIsNotFound'));
        }
        setIsLoading(false);
      });
  };
  const reset = email => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/reset-password`, {
        email,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        if (res) {
          alert(userInfo.message);
          this.props.navigation.navigate('ResetSuccess');
        } else {
          alert(userInfo.message);
        }
        // setUserInfo(userInfo);
        // setIsLoading(false);
      })
      .catch(e => {
        console.log(`Password Reset error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        // this.props.navigation.navigate('Main');
        setIsLoading(false);

      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        reset,
        isLoggedIn,
        error,
        error2,
        termError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
