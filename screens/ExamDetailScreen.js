import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    ScrollView
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ExamDetailScreen = ({ route }) => {

    const navigation = useNavigation();
    const [data, setData] = useState(null);
    const [title, setTitle] = useState(null);
    const [slug, setSlug] = useState(null);
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState(null);
    const { userInfo } = useContext(AuthContext);
    const [remaining, setRemaining] = useState(null);
    const [total, setTotal] = useState(null);
    const [examDate, setExamDate] = useState(null);
    const [regDate, setRegDate] = useState(null);
    const [examTime, setExamTime] = useState(null);
    const [content, setContent] = useState(null);
    const [price, setPrice] = useState(null);
    const [examLevel, setExamLevel] = useState(null);
    const [booking, setBooking] = useState(null);
    //diff between 10:00:00 and current time

    const diff = moment('10:00:00', 'HH:mm:ss').diff(moment(), 'seconds');
    //change diff to time
    const time = moment.utc(diff * 1000).format('HH:mm:ss');

    console.log('diff', diff);

    //
    // const [verification, setVerification] = useState(null);

    // const [description, setDescription] = useState(null)
    // const [image, setImage] = useState('')
    // const [date, setDate] = useState(null)
    const { width } = useWindowDimensions()
    const verification = userInfo.email_verified_at;
    console.log('verify', verification);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'TRenderEngineProvider', '']);
    }, [])

    const id = route.params.paramKey;
    // console.log(id);
    if (userInfo.token) {
        const bookedExam = async () => {
            const { data } = await axios.get(`${BASE_URL}/bookedExam/${id}`, {

                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            }).then((res) => {
                console.log(res.data.status);
                setBooking(res.data.status);
            }).catch((err) => {
                console.log(err);
            })
        }
        useEffect(() => {
            bookedExam();
        }, [])
    }
    console.log('booking', booking);

    const getData = async () => {
        const { data } = await axios
            .get(`${BASE_URL}/exam-detail/${id}`, {
                // headers: {
                //     Authorization: 'Bearer ' + userInfo.token,
                // },
            }).then(res => {
                setData(res.data.data);
                setTitle(res.data.data.title);
                setSlug(res.data.data.slug);
                setLocation(res.data.data.location);
                setCity(res.data.data.location.city);
                setRemaining(res.data.data.available_seats);
                setTotal(res.data.data.total_seat);
                setExamDate(res.data.data.exam_date);
                setRegDate(res.data.data.reg_until_date);
                setExamTime(res.data.data.exam_time);
                setContent(res.data.data.content);
                setPrice(res.data.data.price);
                setExamLevel(res.data.data.exam_level);

                // setDescription(res.data.data.content);
                // setImage(res.data.data.media.file_path);
                // setDate(res.data.data.created_at);
            }
            ).catch(err => {
                console.log(err);
            }
            );

    };
    useEffect(() => {
        getData();
    }, [])
    // console.log(city);
    const daysleft = moment(regDate).diff(moment(), 'days');
    console.log('daysleft', daysleft);
    console.log('seats', remaining);


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <ImageBackground style={styles.image} source={require('../assets/searchBackground.png')}>
                        <Text style={styles.h1} numberOfLines={1} ellipsizeMode='tail'>{examLevel} {t('common:Level')}</Text>
                        {location != null ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginLeft: 10, paddingTop: 5, lineHeight: 22 }} numberOfLines={2} ellipsizeMode='tail'>
                                    <Entypo
                                        name="location-pin"
                                        size={18}
                                        color="#fff"
                                        style={styles.icon}
                                    />
                                </Text>
                                <Text style={styles.locationText}>
                                    {location.name} - {city}/ {location.street_name}
                                </Text>
                            </View> : <View View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                                <Text style={{ marginRight: 5, marginLeft: 5, }}>
                                    <Entypo
                                        name="location-pin"
                                        size={18}
                                        color="#000"
                                        style={styles.icon}
                                    />
                                </Text>
                                {/* <Text style={style.LocationText}>
                        NO LOCATION
                    </Text> */}
                            </View>}
                    </ImageBackground>
                </View>
                <View style={styles.search}>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 27, alignItems: 'center' }}>
                        <Text style={{ marginLeft: 22, }}>
                            <Entypo
                                name="user"
                                size={26}
                                color="#3e8529"
                                style={styles.icon}
                            />
                        </Text>
                        {remaining < 3 ?
                            <Text style={styles.title}> {t('common:AvailableSeats')} | <Text style={[styles.title, { color: 'red' }]}>{remaining}</Text>/{total} </Text> :
                            <Text style={styles.title}> {t('common:AvailableSeats')} | {remaining}/{total} </Text>
                        }

                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 27, alignItems: 'center' }}>
                        <Text style={{ marginLeft: 22, }}>
                            <Entypo
                                name="calendar"
                                size={26}
                                color="#1570a5"
                                style={styles.icon}
                            />
                        </Text>
                        <Text style={styles.dateTitle}> {t('common:ExamDate')} | {moment(examDate).format('DD/MM/YY')} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 27, alignItems: 'center' }}>
                        <Text style={{ marginLeft: 22, }}>
                            <Entypo
                                name="hour-glass"
                                size={26}
                                color="#d1a771"
                                style={styles.icon}
                            />
                        </Text>
                        {daysleft < 5 && daysleft > 1 ? <Text style={styles.regTitle}> {t('common:RegUntil')} | <Text style={{ color: '#C16D00' }}>{moment(regDate).format('DD/MM/YY')}</Text> </Text> :
                            daysleft <= 1 ?
                                <Text style={styles.regTitle}> {t('common:RegUntil')} | <Text style={{ color: 'red' }}>{moment(regDate).format('DD/MM/YY')}</Text> </Text> :
                                <Text style={styles.regTitle}> {t('common:RegUntil')} | <Text style={{ color: '#008428' }}>{moment(regDate).format('DD/MM/YY')}</Text> </Text>}

                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center' }}>
                        <Text style={{ marginLeft: 22, }}>
                            <Entypo
                                name="time-slot"
                                size={26}
                                color="#7dbde0"
                                style={styles.icon}
                            />
                        </Text>
                        <Text style={styles.timeTitle}> {t('common:ExamTime')} | {examTime} </Text>

                    </View>
                </View>
                {/* <View style={styles.description}>
                    {/* <Text style={styles.descriptionText}>{item.content}</Text> *
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: description || '' }}
                        enableExperimentalMarginCollapsing={true}
                        baseStyle={{
                            color: '#15181E',
                            textAlign: 'justify',
                            fontSize: '16px',
                            marginRight: '5%',
                            marginLeft: '2%',
                        }}
                    />
                </View> */}
                <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#fff', height: 400, width: '100%' }}>
                    {content != null ?
                        <Text style={styles.descriptionLabel}>{t('common:Description')}</Text>
                        : null}
                    <RenderHtml
                        // contentWidth={width}
                        source={{ html: content || '' }}
                        // enableExperimentalMarginCollapsing={true}
                        // enableExperimentalGhostLinesPrevention={true}
                        baseStyle={{
                            color: '#000',
                            textAlign: 'justify',
                            fontSize: RFPercentage(2.4),
                            marginHorizontal: '3%',
                            width: '94%',
                            // alignContent: 'center',
                            // alignSelf: 'center',
                            // alignItems: 'center',
                        }}
                    />
                </View>



            </ScrollView>
            {diff <= 0 && daysleft == 0 ?
                <View style={{
                    width: '100%',
                    height: 30,
                    backgroundColor: '#fff',

                }}>
                    <Text style={{

                        fontSize: RFValue(20),
                        color: 'red',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        marginLeft: 15,

                    }}>
                        {t('common:RegistrationClosed')}
                    </Text>
                </View> :

                <View style={styles.submit}>
                    <Text style={{
                        flex: 0.41,
                        fontSize: RFValue(16),
                        color: '#5E6D77',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginLeft: 15,

                    }}>{t('common:Fee')} </Text>
                    <Text style={{
                        flex: 0.59,
                        fontSize: RFValue(18),
                        fontWeight: '500',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        color: '#1a6997'

                    }}
                    > {price} € </Text>
                    {booking != 'booked' && remaining > 0 ?
                        <TouchableOpacity style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: 15 }}
                            onPress={() => {
                                // userInfo.token ?
                                {
                                    verification != null && userInfo.token != null ?
                                        navigation.navigate('Booking', {
                                            id: id,
                                            slug: slug,
                                            price: price,
                                            examDate: examDate,
                                            examTime: examTime,
                                            regDate: regDate,
                                            location: location,
                                            name: location.name,
                                            street_name: location.street_name,
                                            city: city,
                                            total: total,
                                            remaining: remaining,
                                            content: content,
                                            term: examLevel
                                        }) : verification == null && userInfo.token == null ?
                                            navigation.navigate('Booking', {
                                                id: id,
                                                slug: slug,
                                                price: price,
                                                examDate: examDate,
                                                examTime: examTime,
                                                regDate: regDate,
                                                location: location,
                                                name: location.name,
                                                street_name: location.street_name,
                                                city: city,
                                                total: total,
                                                remaining: remaining,
                                                content: content,
                                                term: examLevel
                                            })
                                            : navigation.navigate('Verify')
                                }
                                // navigation.navigate('BookingSuccess')
                                // navigation.navigate('StripePayment', {
                                //     amount: price,

                                // })
                                // navigation.navigate('PaypalPayment', {
                                //     amount: price,
                                //     slug: slug,
                                // })
                            }
                            }
                        >

                            <Text style={styles.submitLabel}>{t('common:BookNow')}</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: 15 }}
                            onPress={() => {
                                // userInfo.token ?
                                if (booking == 'booked') {
                                    alert(t('common:YouHaveAlreadyBookedThisExam'));
                                } else if (remaining >= 1) {
                                    console.log('remaining', remaining);
                                    alert('No Seat');
                                    // alert(t('common:NoSeatsAvailable'));
                                }

                            }
                            }
                        >
                            <Text style={styles.submitLabel}>{t('common:BookNow')}</Text>
                        </TouchableOpacity>}
                </View>}
        </View >
        // <View>
        //     <Text>{route.params.paramKey}</Text>
        // </View>
    )
}

export default ExamDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    header: {
        flex: 1,
        // backgroundColor: '#1a6997',
        // height: 200,
    },
    image: {
        height: 164,
    },
    h1: {
        fontSize: RFPercentage(4),
        color: '#fff',
        marginHorizontal: 10,
        paddingTop: 16,
        fontWeight: '500',
    },
    h5: {
        fontSize: RFPercentage(2.4),
        color: '#fff',
        marginHorizontal: 10,
        paddingTop: 2,
        lineHeight: 22,
    },
    search: {
        minHeight: 200,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 4,
        // padding: 15,
        borderRadius: 4,
        // elevation: 1,
        marginTop: -45,
        marginBottom: 20,
        zindex: -1,
    },
    title: {
        fontSize: RFPercentage(2.4),
        fontWeight: '500',
        color: '#3e8529',
        marginHorizontal: 10,
        // paddingTop: 5,
    },
    titleHeader: {
        fontSize: RFPercentage(2),
        color: '#1a6997',
        marginHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    button: {
        backgroundColor: '#1a6997',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        elevation: 1,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50,
        zindex: -1,
    },
    buttonText: {
        color: '#fff',
        fontSize: RFPercentage(2.7),
        fontWeight: 'bold',
    },
    searchButton: {
        width: '94%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '94%',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 10,
        elevation: 1,
    },
    listTitle: {
        fontSize: RFPercentage(2.8),
        fontWeight: 'bold',
        color: '#1a6997',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    listSubTitle: {
        fontSize: RFPercentage(2.3),
        color: '#000',
        marginHorizontal: 10,
        paddingTop: 5,
        marginBottom: 10,
    },
    locationText: {
        fontSize: 14,
        // color: "#fff",
        width: '70%',
        // fontSize: RFPercentage(2.4),
        color: '#fff',
        marginHorizontal: 10,
        paddingTop: 2,
        lineHeight: 22,
        // fontWeight: '400',
        // marginRight: '4%',
    },
    dateTitle: {
        fontSize: RFPercentage(2.4),
        fontWeight: '500',
        color: '#000',
        marginHorizontal: 10,
        // paddingTop: 5,
    },
    regTitle: {
        fontSize: RFPercentage(2.4),
        fontWeight: '500',
        color: '#d1a771',
        marginHorizontal: 10,
        // paddingTop: 5,
    },
    timeTitle: {
        fontSize: RFPercentage(2.4),
        fontWeight: '500',
        color: '#7dbde0',
        marginHorizontal: 10,
        // paddingTop: 5,
    },
    descriptionLabel: {
        fontSize: RFPercentage(2.8),
        fontWeight: '500',
        color: '#1a6997',
        marginHorizontal: 10,
        paddingTop: 33,
    },
    description: {
        marginBottom: 20,
        flexDirection: 'row',
        maxHeight: 80,
        marginLeft: 15,
    },
    submit: {
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row'
    },
    submitLabel: {
        fontSize: RFValue(15),
        fontWeight: '450',
        marginTop: 10,
        marginBottom: 10,
        color: '#fff',
        borderColor: '#1a6997',
        backgroundColor: '#1a6997',
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
    },
})