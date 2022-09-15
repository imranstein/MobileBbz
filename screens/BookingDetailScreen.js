import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { t } from 'i18next';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from '../config';
import moment from 'moment';

const BookingDetailScreen = ({ route }) => {
    const id = route.params.paramKey;
    const { userInfo } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [email, setEmail] = useState('');
    const [salutation, setSalutation] = useState('');
    const [academicTitle, setAcademicTitle] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [birthPlace, setBirthPlace] = useState('');
    const [country_of_birth, setCountryOfBirth] = useState('');
    const [motherTongue, setMotherTongue] = useState('');
    const [telephone, setTelephone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [address2, setAddress2] = useState('');
    const [status, setStatus] = useState('');
    const [bookingDate, setBookingDate] = useState('');

    const getData = async () => {
        const { result } = await axios
            .get(`${BASE_URL}/booking-detail/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            }).then(res => {
                console.log(res.data);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setIdentificationNumber(res.data.identification_number);
                setEmail(res.data.email);
                setSalutation(res.data.salutation);
                setAcademicTitle(res.data.academic_title);
                setPhone(res.data.phone);
                setTelephone(res.data.tele_phone);
                setBirthday(res.data.birth_date);
                setBirthPlace(res.data.birth_place);
                setCountryOfBirth(res.data.country_Of_birth);
                setMotherTongue(res.data.mother_tongue);
                setAddress(res.data.address_line_1);
                setCity(res.data.city);
                setZipCode(res.data.zip_code);
                setCountry(res.data.country);
                setAddress2(res.data.address2);
                setStatus(res.data.status);
                // setId(res.data.id);
                setBookingDate(res.data.start_date);
            }
            ).catch(err => {
                console.log(err);
            }
            );

    };
    useEffect(() => {
        getData();
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.h1}>{t('common:BookingDetails')}</Text>

                </View>

                <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#fff', marginLeft: '5%' }}>
                    <Text style={styles.descriptionLabel}>{t('common:YourInformation')}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 2 }}>

                        <Text style={styles.title}> {t('common:FirstName')} </Text>
                        <Text style={[styles.infovalue]}> {first_name} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:LastName')} </Text>
                        <Text style={[styles.infovalue]}> {last_name} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:IdentificationNumber')} </Text>
                        <Text style={[styles.infovalue]}> {identificationNumber} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:Email')} </Text>
                        <Text style={[styles.infovalue]}> {email} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:Salutation')} </Text>
                        <Text style={[styles.infovalue]}> {salutation} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:AcademicTitle')} </Text>
                        <Text style={[styles.infovalue]}> {academicTitle} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:BirthDate')} </Text>
                        <Text style={[styles.infovalue]}> {moment(birthday).format('M/D/yyyy')} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:BirthPlace')} </Text>
                        <Text style={[styles.infovalue]}> {birthPlace} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:CountryOfBirth')} </Text>
                        <Text style={[styles.infovalue]}> {country_of_birth} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:MotherTongue')} </Text>
                        <Text style={[styles.infovalue]}> {motherTongue} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:Telephone')} </Text>
                        <Text style={[styles.infovalue]}> {telephone} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:Mobile')} </Text>
                        <Text style={[styles.infovalue]}> {phone} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:Address')} </Text>
                        <Text style={[styles.infovalue]}>{city},{address},{zipCode} </Text>
                    </View>

                </View>

            </View>
        </ScrollView>
    )
}

export default BookingDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    header: {
        flex: 1,
        color: '#1a6997',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    h1: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a6997',
        marginHorizontal: 20,
        paddingTop: 12,
    },
    infovalue: {
        fontSize: 15,
        fontWeight: '400',
        color: '#939393',
        // marginHorizontal: 10,
        paddingTop: 5,
        textAlign: 'right',
        flex: 1,
        marginRight: 7,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    descriptionLabel: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a6997',
        marginHorizontal: 15,
        paddingTop: 20,
    },
})