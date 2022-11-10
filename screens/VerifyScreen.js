import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';
import { t } from 'i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale } from 'react-native-size-matters';



const VerifyScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const { userInfo } = useContext(AuthContext);
    // const {isLoading, reset} = useContext(AuthContext);
    const email = userInfo.email;
    const [verification, setVerification] = useState(null);


    const id = userInfo.id;
    const verify = () => {
        axios.post(`${BASE_URL}/verify`, {
            id: id
        }).then(res => {
            console.log(res.data);
            setVerification(res.data.email_verified_at);
            console.log('verification', verification);
            // return true;
        }
        ).catch(e => {
            console.log(e);
        }
        )
    }
    useEffect(() => {
        verify();
    })
    if (verification != null) {
        navigation.popToTop();
    }
    const verifyEmail = () => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/user-verify`, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }

        }).then(res => {
            console.log(res);
            alert(t('common:VerificationLinkIsSentToYourEmail'), 'Success');
            setIsLoading(false);
            navigation.navigate('VerifySuccess');
            return true;
        }
        ).catch(e => {
            console.log(e);

            if (e.response.status === 400) {
                alert(e.response.data.message, 'Error');
            }
            setIsLoading(false);
        }
        )


    };

    return (
        <ImageBackground
            source={require('../assets/background.png')}
            resizeMode="cover"
            style={styles.ImageContainer}
            imageStyle={styles.ImageBackground}>
            <Spinner visible={isLoading} />
            <View style={styles.container}>
                <Text style={styles.text}>
                    {t('common:VerifyEmail')}
                </Text>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => verifyEmail()}>
                        <Text style={styles.buttonText}>{t('common:SendVerification')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default VerifyScreen;

const styles = StyleSheet.create({
    ImageContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ImageBackground: {
        opacity: 1,
    },
    container: {
        // flex: 0.5,
        alignItems: 'center',
        marginVertical: scale(100),
        marginHorizontal: scale(20),
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: scale(13),
    },
    text: {
        marginTop: '10%',
        width: '100%',
        textAlign: 'left',
        fontSize: RFPercentage(2.45),
        color: '#5E6D77',
        marginBottom: '13%',
    },
    input: {
        width: '100%',
        height: 45,
        borderColor: '#DAE1E7',
        borderWidth: 1,
        marginBottom: '7%',
        borderRadius: 4,
        paddingLeft: 14,
        color: '#566573',
    },
    button: {
        width: '100%',
        height: 45,
        backgroundColor: '#1570A5',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%',
    },
    buttonText: {
        color: '#fff',
        fontSize: RFValue(15),
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
});
