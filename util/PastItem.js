import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { IMAGE_URL } from '../config';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
    from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import { t } from 'i18next';
import { AuthContext } from '../context/AuthContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { color } from 'react-native-reanimated';



const PastItem = ({ item }) => {
    const navigation = useNavigation();
    const { userInfo } = useContext(AuthContext);
    // const media = item.media;
    // const location = item.location;
    // const progress = item.available_seats / item.total_seat;
    // const academicTitle = item.academic_title;
    // const source = { html: item.content };
    // const { width } = useWindowDimensions();
    console.log(item.booked_event)
    const paymentDate = item.created_at;
    const title = item.booked_event.title;
    const slug = item.booked_event.slug;
    const amount = item.pay_now;
    return (

        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('BookingDetail', {
                        paramKey: item.id,
                    })
                }
                }
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 18 }}>
                    <Text style={{ marginLeft: 10, color: '#000' }}>
                        <MaterialCommunityIcons

                            name="credit-card-check"
                            size={28}
                            color="#1a6997"
                            style={styles.icon}
                        />
                    </Text>

                    <Text style={{ marginLeft: 14, color: '#000', fontSize: RFPercentage(2), fontWeight: 'bold' }}>{t('common:FullAmount')}</Text>
                    <Text style={{ marginLeft: 10, width: 6, height: 6, borderWidth: 1, borderRadius: 10, backgroundColor: '#A8B0B5', borderColor: '#A8B0B5' }}></Text>
                    <Text style={{ marginLeft: 10, color: '#1a6997', fontSize: RFPercentage(2), fontWeight: '400' }}>{moment(paymentDate).format('DD/MM/YYYY | hh:mm a')}</Text>
                </View>
                <View style={styles.image}><ImageBackground
                    style={{ width: '60%', height: 90, borderRadius: 2 }}
                    source={require('../assets/testinghall.png')}
                >
                </ImageBackground>
                    <View style={styles.detailView}>
                        <Text style={[styles.detail, { width: '40%', fontSize: RFPercentage(2) }]}>
                            {t('common:AdditionalService')}
                        </Text>
                        <Text style={[styles.detail, { color: '#1a6997', fontWeight: '600' }]}>
                            {slug}
                        </Text>
                        <Text style={[styles.detail, { fontWeight: '600' }]}>
                            {t('common:AmountPaid')} <Text style={[styles.detail, { color: '#4BA765' }]}>{amount} $</Text>
                        </Text>
                    </View>
                </View>



                {/* <View style={styles.date}>
                <Text style={styles.dateText}>
                    {moment(item.created_at).format('DD/MM/YY')}
                </Text>
            </View> */}


            </TouchableOpacity >
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.touchable}>
                    <Text style={styles.button}>{t('common:GetInvoice')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable1}>
                    <Text style={styles.button1}>{t('common:PrintTicket')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 5,
        // marginLeft: '2%',
        marginBottom: 30,
        backgroundColor: '#fff',
        borderColor: '#DFDFDF',
        borderWidth: 1,
        // marginHorizontal: 5,
        elevation: 2,
    },
    image: {
        flex: 1,
        marginBottom: 20,
        marginLeft: 10,
        flexDirection: 'row'
    },
    Text: {
        flex: 1,
        flexDirection: 'column',
        color: '#000',
    },
    ImageBackground: {
        opacity: 0.3,
    },
    date: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    dateText: {
        fontSize: RFPercentage(2.2),
        color: "#1a6997",
    },
    title: {
        marginBottom: 10,
        flexDirection: 'row',
        marginLeft: 5,
    },
    titleText: {
        fontSize: RFPercentage(2.5),
        color: "#000",
        fontWeight: 'bold',
    },
    description: {
        marginBottom: 20,
        flexDirection: 'row',
        maxHeight: 82,
    },
    descriptionText: {
        fontSize: RFPercentage(2.1),
        color: "#000",
    },
    upperTextView: {
        backgroundColor: '#ee4327',
        height: '15%',
        width: '25%',
        marginTop: '3%',
    },
    upperText: {
        color: '#fff',
        fontSize: RFPercentage(2.8),
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '2%',
    },
    lowerTextView: {
        // backgroundColor: '#fff',
        height: '15%',
        width: '20%',
        marginTop: '32%',
    },
    lowerText: {
        color: '#fff',
        fontSize: RFPercentage(3.4),
        fontWeight: '500',
        textAlign: 'center',
        marginTop: '2%',
    },
    examDateText: {
        fontSize: RFPercentage(2.3),
        color: "#1a6997",
        fontWeight: '600',
        marginRight: '4%',
    },
    regDateText: {
        fontSize: RFPercentage(2.3),
        color: "#ee4327",
        fontWeight: '600',
        marginRight: '4%',
    },
    locationText: {
        fontSize: RFPercentage(2.2),
        color: "#1a6997",
        width: '70%',
        fontWeight: '400',
        marginRight: '4%',
    },
    AvailableSeats: {
        fontSize: RFPercentage(2.2),
        color: "#000",
        fontWeight: '600',
        marginTop: '6%',
        marginBottom: '6%',
        marginLeft: 5,
    }, detail: {
        color: '#000',
        textAlign: 'left',
        marginLeft: 13,
        marginBottom: 2,
        marginRight: 110,
    }, detailView: {
        flexDirection: 'column',
        marginLeft: '-22%',
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: -3,
    },
    touchable1: {
        backgroundColor: '#1a6997',
        width: '50%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        backgroundColor: '#fff',
        width: '50%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#1a6997',
        borderWidth: 1,
    },
    button1: {
        color: '#fff',
        fontSize: RFPercentage(2.2),
        fontWeight: '600',
    },
    button: {
        color: '#1a6997',
        fontSize: RFPercentage(2.2),
        fontWeight: '600',
    },

});

export default PastItem;
