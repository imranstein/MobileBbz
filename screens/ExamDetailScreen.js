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

    // const [description, setDescription] = useState(null)
    // const [image, setImage] = useState('')
    // const [date, setDate] = useState(null)
    const { width } = useWindowDimensions()

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'TRenderEngineProvider', '']);
    }, [])

    const id = route.params.paramKey;
    // console.log(id);
    const getData = async () => {
        const { data } = await axios
            .get(`${BASE_URL}/exam-detail/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
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


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <ImageBackground source={require('../assets/searchBackground.png')}>
                        <Text style={styles.h1}>{slug} {t('common:Level')}</Text>
                        {location != null ?
                            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                                <Text style={{ marginRight: 10, marginLeft: 5, }}>
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
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ marginLeft: 5, }}>
                            <Entypo
                                name="user"
                                size={30}
                                color="#3e8529"
                                style={styles.icon}
                            />
                        </Text>
                        <Text style={styles.title}> {t('common:AvailableSeats')} | {remaining}/{total} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ marginLeft: 5, }}>
                            <Entypo
                                name="calendar"
                                size={30}
                                color="#1570a5"
                                style={styles.icon}
                            />
                        </Text>
                        <Text style={styles.dateTitle}> {t('common:ExamDate')} | {moment(examDate).format('DD/MM/YY')} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ marginLeft: 5, }}>
                            <Entypo
                                name="hour-glass"
                                size={30}
                                color="#d1a771"
                                style={styles.icon}
                            />
                        </Text>
                        <Text style={styles.regTitle}> {t('common:RegUntil')} | {moment(regDate).format('DD/MM/YY')} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ marginLeft: 5, }}>
                            <Entypo
                                name="time-slot"
                                size={30}
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
                <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#fff', height: 400, width: '90%', marginLeft: '5%' }}>
                    <Text style={styles.descriptionLabel}>{t('common:Description')}</Text>
                    <RenderHtml
                        // contentWidth={width}
                        source={{ html: content || '' }}
                        // enableExperimentalMarginCollapsing={true}
                        // enableExperimentalGhostLinesPrevention={true}
                        baseStyle={{
                            color: '#15181E',
                            textAlign: 'justify',
                            fontSize: RFPercentage(2.2),
                            marginRight: '4%',
                            marginLeft: 15,
                            width: '90%',
                            alignContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}
                    />
                </View>



            </ScrollView>
            <View style={styles.submit}>
                <Text style={{
                    flex: 0.4,
                    fontSize: RFPercentage(2.5),
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 20,

                }}>{t('common:Fee')} </Text>
                <Text style={{
                    flex: 0.6,
                    fontSize: RFPercentage(3.2),
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginRight: 10,
                    color: '#1a6997'

                }}
                > {price} $ </Text>
                <TouchableOpacity style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: 20 }}
                    onPress={() => {
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
                        })
                        // navigation.navigate('BookingSuccess')
                    }
                    }>
                    <Text style={styles.submitLabel}>{t('common:BookNow')}</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        backgroundColor: '#1a6997',
        height: 200,
    },
    h1: {
        fontSize: RFPercentage(3.5),
        color: '#fff',
        marginHorizontal: 10,
        paddingTop: 12,
    },
    h5: {
        fontSize: RFPercentage(2.3),
        color: '#fff',
        marginHorizontal: 20,
        paddingTop: 5,
        lineHeight: 20,
    },
    search: {
        width: '94%',
        height: 220,
        // borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        elevation: 1,
        backgroundColor: '#fff',
        marginTop: -90,
        zindex: -1,
    },
    title: {
        fontSize: RFPercentage(2.3),
        fontWeight: 'bold',
        color: '#3e8529',
        marginHorizontal: 10,
        paddingTop: 5,
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
        fontSize: 15,
        color: "#fff",
        width: '70%',
        fontWeight: '400',
        marginRight: '4%',
    },
    dateTitle: {
        fontSize: RFPercentage(2.3),
        fontWeight: 'bold',
        color: '#000',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    regTitle: {
        fontSize: RFPercentage(2.3),
        fontWeight: 'bold',
        color: '#d1a771',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    timeTitle: {
        fontSize: RFPercentage(2.3),
        fontWeight: 'bold',
        color: '#7dbde0',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    descriptionLabel: {
        fontSize: RFPercentage(2.8),
        fontWeight: 'bold',
        color: '#1a6997',
        marginHorizontal: 15,
        paddingTop: 20,
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
        fontSize: RFPercentage(2.7),
        marginTop: '2%',
        marginBottom: '2%',
        color: '#fff',
        borderColor: '#1a6997',
        backgroundColor: '#1a6997',
        borderWidth: 2,
        paddingHorizontal: '15%',
        paddingVertical: '2%',
        borderRadius: 4,
        alignSelf: 'center',
        justifyContent: 'center',
    },
})