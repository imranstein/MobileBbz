import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';
import { BASE_URL } from '../config';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { t } from 'i18next';
import { RFValue } from 'react-native-responsive-fontsize';


const InvoiceScreen = ({ route }) => {

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
    const [examLevel, setExamLevel] = useState('');

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
        setExamTime((data.data.service.exam_time));
        setPrice(data.data.service.price);
        setExamLevel(data.data.booking.examLevel);
        const full_name = data.data.booking.first_name + ' ' + data.data.booking.last_name;
        console.log(examLevel);
    };
    useEffect(() => {
        getInvoice();
    }, []);
    // console.log(code);
    const date = moment(new Date()).format('DD/MM/YYYY');
    const html = `
        <html>
        <head>
            <title> Invoice </title>
        </head>
        <body>
            <h1> Invoice </h1>
            <h3>Billing to</h3>
            <p> ${first_name} ${last_name} </p>
            <p>${email}</p>
            <p> ${phone} </p>
            <p> ${city},${zip_code},${country} </p>

            <div style="margin-top:5em;">
            <p> Booking Number  <div style="margin-left:40em;">${bookingId}</div></p>
            <p> Booking Status <div style="margin-left:40em;">Paid</div> </p>
            <p> Payment Method <div style="margin-left:40em;">${gateway}</div> </p>
            <p> Exam Name <div style="margin-left:40em;">${title}</div> </p>
            <p> Exam Type <div style="margin-left:40em;">${examLevel}</div> </p>
            <p> Exam time and Date <div style="margin-left:40em;">${examDate}(${examTime})</div> </p>

            <p> Fee </p>    
            <p style="font-size:21px;"> Total <div style="margin-left:40em;">${price} €</div> </p>
            </div>
        </body>
        </html>

    `;
    const createPdf = async () => {
        let options = {
            html: html,
            fileName: `invoice_${bookingId}`,
            directory: 'Documents',
        };
        console.log('create pdf');
        let file = await RNHTMLtoPDF.convert(options)
        console.log(file.filePath);
        alert(t('common:PDFCreatedSuccessfully'));
    }

    return (
        <View>
            <TouchableOpacity onPress={createPdf}>
                <Text style={{ alignSelf: 'flex-end', marginEnd: widthPercentageToDP(15), marginVertical: heightPercentageToDP(3) }}>
                    <Entypo
                        name="print"
                        size={30}
                        color="black"
                    />
                </Text>
            </TouchableOpacity >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ alignSelf: 'flex-start', fontSize: 20, fontWeight: 'bold', color: '#1a6997', marginStart: widthPercentageToDP(5) }}>{t('common:BillingTo')}</Text>
                <Image source={require('../assets/logo.png')} style={{ width: widthPercentageToDP(20), height: heightPercentageToDP(10), resizeMode: 'contain', marginEnd: widthPercentageToDP(5), marginTop: heightPercentageToDP(-4) }} />

            </View>
            <View style={{ marginTop: heightPercentageToDP(1), borderColor: '#cecece', borderWidth: 1, padding: 5, borderRadius: 3, margin: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:FullName')} :
                    </Text>
                    <Text style={[styles.title, { marginBottom: heightPercentageToDP(2) }]}>
                        {first_name} {last_name}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:Email')} :
                    </Text>
                    <Text style={[styles.title, { marginBottom: heightPercentageToDP(2) }]}>
                        {email}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:Phone')} :
                    </Text>
                    <Text style={[styles.title, { marginBottom: heightPercentageToDP(2) }]}>
                        {phone}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:Address')} :
                    </Text>
                    <Text style={styles.title}>
                        {city},{zip_code},{country}
                    </Text>
                </View>

            </View>
            <View style={{ marginTop: heightPercentageToDP(5), borderColor: '#cecece', borderWidth: 1, padding: 5, borderRadius: 3, margin: 5 }}>
                <View style={{ flexDirection: 'row', marginBottom: heightPercentageToDP(1), justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:BookingNumber')}
                    </Text><Text style={styles.content}>{bookingId}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: heightPercentageToDP(1), justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:BookingStatus')}
                    </Text><Text style={styles.content}>Paid</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: heightPercentageToDP(1), justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:PaymentMethod')}
                    </Text><Text style={styles.content}>{gateway}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: heightPercentageToDP(1), justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:ExamName')}
                    </Text><Text style={styles.content}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: heightPercentageToDP(1), justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:ExamType')}
                    </Text><Text style={styles.content}>{examLevel}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: heightPercentageToDP(1), justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:ExamTimeAndDate')}
                    </Text><Text style={styles.content}>{examDate}({examTime})</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: heightPercentageToDP(1), justifyContent: 'space-between' }}>
                    <Text style={styles.title}>
                        {t('common:Fee')}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: heightPercentageToDP(1), justifyContent: 'space-between' }}>
                    <Text style={[styles.title, { fontSize: 17, fontWeight: 'bold', color: '#1a6997' }]}>
                        {t('common:Total')}
                    </Text><Text style={[styles.content, { fontSize: 17, fontWeight: 'bold', color: 'red' }]}>{price} €</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', marginBottom: heightPercentageToDP(1), justifyContent: 'space-between' }}>
                    <Text style={[styles.title, { fontSize: 17, fontWeight: 'bold', color: '#1a6997' }]}>
                        {t('common:Paid')}
                    </Text>
                    <Text style={[styles.content, { fontSize: 17, fontWeight: 'bold', alignSelf: 'flex-end', color: 'red' }]}>{price} €</Text>
                </View> */}
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(14),
        fontWeight: '500',
        color: '#000',
        marginStart: widthPercentageToDP(4)
    },
    content: {
        fontSize: RFValue(13),
        fontWeight: '500',
        color: '#000',
        // marginLeft: widthPercentageToDP(15),
        alignSelf: 'flex-end'
    }

})

export default InvoiceScreen
