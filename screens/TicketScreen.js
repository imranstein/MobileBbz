import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import { BASE_URL } from '../config';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { t } from 'i18next';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale } from 'react-native-size-matters';
import { CameraRoll, ToastAndroid } from "react-native"
import RNFS from "react-native-fs"

const TicketScreen = ({ route }) => {
    const { userInfo } = useContext(AuthContext);
    const code = route.params.paramKey;
    const [bookingId, setBookingId] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zip_code, setZipCode] = useState('');
    const [gateway, setGateway] = useState('');
    const [title, setTitle] = useState('');
    const [examDate, setExamDate] = useState('');
    const [examTime, setExamTime] = useState('');
    const [price, setPrice] = useState('');

    const getInvoice = async () => {
        const { data } = await axios
            .get(`${BASE_URL}/invoice/${code}`, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
        // setResult(data.data);
        setBookingId(data.data.booking.id);
        setFirstName(data.data.booking.first_name);
        setLastName(data.data.booking.last_name);
        setEmail(data.data.booking.email);
        setPhone(data.data.booking.phone);
        setCity(data.data.booking.city);
        setCountry(data.data.booking.country);
        setZipCode(data.data.booking.zip_code);
        setGateway(data.data.booking.gateway);
        setTitle(data.data.service.title);
        setExamDate(moment(data.data.service.exam_date).format('DD.MM.YYYY'));
        setExamTime(data.data.service.exam_time);
        setPrice(data.data.service.price);
        const full_name = data.data.booking.first_name + ' ' + data.data.booking.last_name;
        console.log(examTime);
    };
    useEffect(() => {
        getInvoice();
    }, []);

    const printTicket = () => {
        // this.svg.toDataURL((data) => {
        //     RNFS.writeFile(RNFS.CachesDirectoryPath + "/some-name.png", data, 'base64')
        //         .then((success) => {
        //             return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath + "/some-name.png", 'photo')
        //         })
        //         .then(() => {
        //             this.setState({ busy: false, imageSaved: true })
        //             ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
        //         })
        // })

        this.svg.toDataURL((data) => {
            RNFS.writeFile(RNFS.CachesDirectoryPath + "/some-name.png", data, 'base64')
                .then((success) => {
                    return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath + "/some-name.png", 'photo')
                })
                .then(() => {
                    this.setState({ busy: false, imageSaved: true })
                    ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
                })
        })

    }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={printTicket}>
                <Text style={{ alignSelf: 'flex-end', marginEnd: widthPercentageToDP(5) }}>
                    <Entypo
                        name="print"
                        size={30}
                        color="black"
                    />
                </Text>
            </TouchableOpacity > */}
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>{t('common:Ticket')}</Text>
            </View> */}
            <View style={styles.body}>

                <View style={styles.ticket}>
                    <Text style={{ color: '#1a6997', fontSize: scale(17), marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginBottom: heightPercentageToDP(2) }}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginRight: widthPercentageToDP(5) }}>
                    <Entypo name="location-pin" size={20} color="#1a6997" />
                    <Text style={{ color: '#000', marginLeft: widthPercentageToDP(2) }}>
                        {city}, {country}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginRight: widthPercentageToDP(5), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginRight: widthPercentageToDP(5) }}>
                        <Entypo name="calendar" size={20} color="#1a6997" />
                        <Text style={{ color: '#000', marginLeft: widthPercentageToDP(2) }}>
                            {t('common:Date')}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginRight: widthPercentageToDP(25) }}>
                        <FontAwesome5 name="money-bill-alt" size={20} color="#1a6997" />
                        <Text style={{ color: '#000', marginLeft: widthPercentageToDP(2) }}>
                            {t('common:price')}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginRight: widthPercentageToDP(5), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginRight: widthPercentageToDP(5) }}>
                        <Text style={{ color: '#000', marginLeft: widthPercentageToDP(1), fontWeight: '700' }}>
                            {examDate}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginRight: widthPercentageToDP(33) }}>
                        <Text style={{ color: '#000', marginLeft: widthPercentageToDP(1), fontWeight: '700' }}>
                            {price} €
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginRight: widthPercentageToDP(5), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginRight: widthPercentageToDP(5) }}>
                        <Entypo name="clock" size={20} color="#1a6997" />
                        <Text style={{ color: '#000', marginLeft: widthPercentageToDP(2) }}>
                            {t('common:ExamTime')}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginRight: widthPercentageToDP(23) }}>
                        <Ionicons name="person" size={20} color="#1a6997" />
                        <Text style={{ color: '#000', marginLeft: widthPercentageToDP(2) }}>
                            {t('common:Student')}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginRight: widthPercentageToDP(5), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginRight: widthPercentageToDP(5) }}>
                        <Text style={{ color: '#000', marginLeft: widthPercentageToDP(1), fontWeight: '700' }}>
                            {examTime}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: heightPercentageToDP(2), marginLeft: widthPercentageToDP(5), marginRight: widthPercentageToDP(5) }}>
                        <Text style={{ color: '#666', marginLeft: widthPercentageToDP(2), fontWeight: '500' }}>
                            {first_name} {last_name}
                        </Text>
                        <Text style={{ color: '#666', marginLeft: widthPercentageToDP(2), fontWeight: '500' }}>
                            {email}
                        </Text>
                        <Text style={{ color: '#666', marginLeft: widthPercentageToDP(2), fontWeight: '500' }}>
                            {phone}
                        </Text>
                    </View>
                </View>
                <View style={styles.qrCode}>
                    <QRCode
                        value={code}
                        size={widthPercentageToDP(50)}
                        color="black"
                        backgroundColor="white"
                    />
                </View>
            </View>
        </View>
    )
}

export default TicketScreen

const styles = StyleSheet.create({
    qrCode: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPercentageToDP(6),
        marginBottom: heightPercentageToDP(6),
    },
})