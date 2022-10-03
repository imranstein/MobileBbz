import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import { IMAGE_URL } from '../config';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Progress from 'react-native-progress';
import { t } from 'i18next';
import { AuthContext } from '../context/AuthContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ExamItem = ({ item }) => {
    const navigation = useNavigation();
    const { userInfo } = useContext(AuthContext);
    const media = item.media;
    const location = item.location;
    const progress = item.available_seats / item.total_seat;
    // const source = { html: item.content };
    // const { width } = useWindowDimensions();


    return (

        <View style={styles.container}>
            <TouchableOpacity
                // onPress={() => {
                //     userInfo.token ?
                //         navigation.navigate('ExamDetail', {
                //             paramKey: item.id,
                //         }) : navigation.navigate('Login')
                // }
                // }
                onPress={() => {
                    navigation.navigate('ExamDetail', {
                        paramKey: item.id,
                    })
                }
                }

            >
                {media != null ? <View style={styles.image}>
                    <ImageBackground
                        style={{ width: width * 1, height: height * 0.37, borderRadius: 2 }}
                        source={{ uri: `${IMAGE_URL}${item.media.file_path}` }}
                    >
                        <View style={styles.upperTextView}><Text style={styles.upperText}>{item.slug}</Text></View>
                        <View style={styles.lowerTextView}><Text style={styles.lowerText}>{item.price} €</Text></View>
                    </ImageBackground>
                </View> : <View style={styles.image}><ImageBackground
                    style={{ width: width * 1, height: height * 0.37, borderRadius: 2 }}
                    source={require('../assets/testinghall.png')}
                >
                    <View style={styles.upperTextView}><Text style={styles.upperText} >{item.slug}</Text></View>
                    <View style={styles.lowerTextView}><Text style={styles.lowerText}>{item.price} €</Text></View>
                </ImageBackground></View>}


                {/* <View style={styles.date}>
                <Text style={styles.dateText}>
                    {moment(item.created_at).format('DD/MM/YY')}
                </Text>
            </View> */}

                <View style={styles.title}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                <Text style={{
                    fontSize: RFValue(13),
                    fontWeight: '600', color: '#000'
                }}>{t("common:ExamDate")}: </Text><Text style={styles.examDateText}>{moment(item.exam_date).format('DD/MM/YY')}</Text>
                <Text style={{
                    fontSize: RFValue(13),
                    fontWeight: '600', color: '#000'
                }}>{t("common:RegDate")}: </Text><Text style={styles.regDateText}>{moment(item.reg_until_date).format('DD/MM/YY')}</Text>
            </View>
            {location != null ?
                <View View style={{
                    flexDirection: 'row', marginTop: 23, paddingBottom: 17, marginHorizontal: 10, borderBottomWidth: 1,
                    borderBottomColor: '#EBEBEB'
                }}>
                    <Text style={{ marginRight: 10 }}>
                        <Entypo
                            name="location-pin"
                            size={18}
                            color="#000"
                            style={styles.icon}
                        />
                    </Text>
                    <Text style={styles.locationText}>
                        {location.name} - {location.city}/ {location.street_name}
                    </Text>
                </View> : <View View style={{ flexDirection: 'row' }}>
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
            <View style={styles.description}>
                <Text style={styles.AvailableSeats}>{t("common:AvailableSeats")}</Text>
                <Text style={{
                    marginLeft: wp('40%'),
                    fontSize: RFValue(13),
                    color: "#000",
                    fontWeight: '600',
                    marginRight: '3%',
                    // marginTop: '5%',
                    // marginBottom: '7%',
                }}>
                    {/* {progress} */}
                    <Progress.Circle thickness={4} progress={progress} size={40} animated={false} showsText={true} textStyle={{
                        fontWeight: 'bold', fontSize: height * 0.011, color: '#000'
                    }} color={'green'} unfilledColor={'red'} />

                </Text>
                {/* {/* <Text style={styles.descriptionText}>{item.content}</Text>  */}
                {/* <RenderHtml
                    contentWidth={width}
                    source={{ html: item.content || '' }}
                    enableExperimentalMarginCollapsing={true}
                    enableExperimentalGhostLinesPrevention={true}
                    baseStyle={{
                        color: '#15181E',
                        textAlign: 'justify',
                        fontSize: '16px',
                        marginRight: '4%',
                    }}
                /> */}
            </View>



        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        // marginLeft: '2%',
        marginBottom: 40,
        // elevation: 1,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        marginBottom: 20,
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
        fontSize: height * 0.016,
        color: "#1a6997",
    },
    title: {
        marginBottom: 10,
        flexDirection: 'row',
        marginLeft: 15,
    },
    titleText: {
        fontSize: RFValue(14),
        color: "#000",
        // fontWeight: 'bold',
    },
    description: {
        // marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        maxHeight: 82,
    },
    descriptionText: {
        fontSize: height * 0.015,
        color: "#000",
    },
    //create a diagonalborder for upperTextView

    upperTextView: {
        backgroundColor: '#ee4327',
        height: height * 0.05,
        width: width * 0.25,
        marginTop: '5%',

    },
    upperText: {
        color: '#fff',
        fontSize: RFValue(15),
        fontWeight: '600',
        textAlign: 'left',
        marginLeft: '10%',
        marginTop: '6%',
    },
    lowerTextView: {
        // backgroundColor: '#fff',
        height: '12%',
        width: '20%',
        marginTop: height * 0.24,
    },
    lowerText: {
        color: '#fff',
        fontSize: RFValue(16),
        fontWeight: '500',
        textAlign: 'center',
        // marginTop: '2%',
    },
    examDateText: {
        fontSize: RFValue(13),
        color: "#1a6997",
        fontWeight: '600',
        marginRight: '4%',
    },
    regDateText: {
        fontSize: RFValue(13),
        color: "#ee4327",
        fontWeight: '600',
        marginRight: '4%',
    },
    locationText: {
        fontSize: RFValue(14),
        color: "#1a6997",
        width: '90%',
        fontWeight: '400',
        // marginRight: '4%',
    },
    AvailableSeats: {
        fontSize: RFValue(14),
        color: "#000",
        fontWeight: '600',
        marginTop: 22,
        marginBottom: 22,
        marginLeft: 15,
    }, triangleCorner: {
        // position: 'absolute',
        top: '5%',
        left: 0,
        width: '40%',
        height: '21%',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 20,
        // borderTopWidth: 30,
        borderBottomColor: 'red',
        // borderBottomWidth: 30,
        borderRightColor: 'transparent',
        borderTopColor: 'red'
    }
});

export default ExamItem;
