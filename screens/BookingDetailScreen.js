import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
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
    const navigation = useNavigation();
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
    const [bookingId, setBookingId] = useState('');
    const [gateway, setGateway] = useState('');
    const [examType, setExamType] = useState('');
    const [examDate, setExamDate] = useState('');
    const [examTime, setExamTime] = useState('');
    const [examFee, setExamFee] = useState('');
    const [code, setCode] = useState('');
    const [eventID, setEventID] = useState('');

    const finalize = () => {
        if (gateway == 'paypal') {
            navigation.navigate('PaypalPayment', {
                amount: examFee,
                code: code,
                event_id: eventID,
                gateway: gateway,
                // location: location,
                slug: examType,
                examDate: examDate,
                examTime: examTime,
                city_name: city,
            });
        }
        else if (gateway == 'stripe') {
            navigation.navigate('StripePayment', {
                amount: examFee,
                code: code,
                event_id: eventID,
                gateway: gateway,
                // location: location,
                slug: examType,
                examDate: examDate,
                examTime: examTime,
                city_name: city,
                email: email,
                phone: phone,
                city: city,
                address: address,
                zip_code: zipCode,
                country: country,
                name: first_name + ' ' + last_name,
            });
        }
    }
    const getData = async () => {
        const { res } = await axios
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
                setBookingId(res.data.id);
                setStatus(res.data.status);
                setGateway(res.data.gateway);
                setExamType(res.data.booked_event.slug);
                setExamDate(res.data.booked_event.exam_date);
                setExamTime(res.data.booked_event.exam_time);
                setExamFee(res.data.booked_event.price);
                setCode(res.data.code);
                setEventID(res.data.object_id);
            }
            ).catch(err => {
                throw err;
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
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={styles.header}>
                        <Text style={styles.h1}>{t('common:BookingDetails')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 7 }}>

                        <Text style={[styles.title, { color: '#1570A5' }]}> {t('common:BookingId')} </Text>
                        <Text style={[styles.infovalue, { color: '#1570A5' }]}> {bookingId}{ } </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                        <Text style={styles.title}> {t('common:BookingStatus')} </Text>
                        <Text style={[styles.infovalue]}> {status} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 11 }}>
                        <Text style={styles.title}> {t('common:PaymentMethod')} </Text>
                        <Text style={[styles.infovalue]}> {gateway} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 11 }}>
                        <Text style={styles.title}> {t('common:ExamType')} </Text>
                        <Text style={[styles.infovalue]}> {examType} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 11 }}>
                        <Text style={styles.title}> {t('common:ExamDate')} </Text>
                        <Text style={[styles.infovalue]}> {moment(examDate).format('M/D/yyyy')} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={styles.title}> {t('common:ExamTime')} </Text>
                        <Text style={[styles.infovalue]}> {examTime} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={styles.title}> {t('common:ExamFees')} </Text>
                        <Text style={[styles.infovalue]}> {examFee} €</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 36 }}>
                        <Text style={[styles.title, { color: '#1570A5' }]}> {t('common:Total')} </Text>
                        <Text style={[styles.infovalue, { color: '#1570A5' }]}> {examFee} €</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#F2F2F2' }}>
                    {/* <Text style={styles.descriptionLabel}>{t('common:YourInformation')}</Text> */}
                    <View style={styles.header}>
                        <Text style={styles.h1}>{t('common:YourInformation')}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 36, marginBottom: 7 }}>

                        <Text style={styles.title}> {t('common:FirstName')} </Text>
                        <Text style={[styles.infovalue]}> {first_name}{ } </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 11 }}>
                        <Text style={styles.title}> {t('common:LastName')} </Text>
                        <Text style={[styles.infovalue]}> {last_name} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 11 }}>
                        <Text style={styles.title}> {t('common:IdentificationNumber')} </Text>
                        <Text style={[styles.infovalue]}> {identificationNumber} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 11 }}>
                        <Text style={styles.title}> {t('common:Email')} </Text>
                        <Text style={[styles.infovalue]}> {email} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={styles.title}> {t('common:Salutation')} </Text>
                        <Text style={[styles.infovalue]}> {salutation} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <Text style={styles.title}> {t('common:AcademicTitle')} </Text>
                        <Text style={[styles.infovalue]}> {academicTitle} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={styles.title}> {t('common:BirthDate')} </Text>
                        <Text style={[styles.infovalue]}> {moment(birthday).format('M/D/yyyy')} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 13 }}>
                        <Text style={styles.title}> {t('common:BirthPlace')} </Text>
                        <Text style={[styles.infovalue]}> {birthPlace} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 14 }}>
                        <Text style={styles.title}> {t('common:CountryOfBirth')} </Text>
                        <Text style={[styles.infovalue]}> {country_of_birth} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                        <Text style={styles.title}> {t('common:MotherTongue')} </Text>
                        <Text style={[styles.infovalue]}> {motherTongue} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                        <Text style={styles.title}> {t('common:Telephone')} </Text>
                        <Text style={[styles.infovalue]}> {telephone} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 11 }}>
                        <Text style={styles.title}> {t('common:Mobile')} </Text>
                        <Text style={[styles.infovalue]}> {phone} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                        <Text style={styles.title}> {t('common:Address')} </Text>
                        <Text style={[styles.infovalue]}>{city},{address},{zipCode} </Text>
                    </View>
                    {status === 'unpaid' ?
                        <View style={{ flexDirection: 'row', marginBottom: 40, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#1570A5',
                                height: 40,
                                width: 150,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 20

                            }}
                                onPress={finalize}>
                                <Text style={[styles.title, { color: '#fff', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]} > {t('common:PayNow')} </Text>
                            </TouchableOpacity>


                        </View> : null}
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
        fontSize: 18,
        fontWeight: '600',
        color: '#1570A5',
        marginHorizontal: 10,
        paddingTop: 36,
    },
    infovalue: {
        fontSize: 14,
        fontWeight: '400',
        color: '#A8B0B5',
        marginHorizontal: 10,
        paddingTop: 5,
        textAlign: 'right',
        flex: 1,
        // marginRight: 7,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        marginHorizontal: 10,
        // paddingTop: 5,
    },
    descriptionLabel: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a6997',
        marginHorizontal: 15,
        paddingTop: 20,
    },
})