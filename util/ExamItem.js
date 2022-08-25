import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { IMAGE_URL } from '../config';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';



const ExamItem = ({ item }) => {
    const navigation = useNavigation();
    const media = item.media;
    const location = item.location;
    // const source = { html: item.content };
    // const { width } = useWindowDimensions();

    return (

        <View style={styles.container}>
            {media != null ? <View style={styles.image}>
                <ImageBackground
                    style={{ width: '100%', height: 230, borderRadius: 2 }}
                    source={{ uri: `${IMAGE_URL}${item.media.file_path}` }}
                >
                    <View style={styles.upperTextView}><Text style={styles.upperText}>{item.slug}</Text></View>
                    <View style={styles.lowerTextView}><Text style={styles.lowerText}>{item.price} $</Text></View>
                </ImageBackground>
            </View> : <View style={styles.image}><ImageBackground
                style={{ width: '100%', height: 200, borderRadius: 2 }}
                source={require('../assets/testinghall.png')}
            >
                <View style={styles.upperTextView}><Text style={styles.upperText}>{item.slug}</Text></View>
                <View style={styles.lowerTextView}><Text style={styles.lowerText}>{item.price} $</Text></View>
            </ImageBackground></View>}


            {/* <View style={styles.date}>
                <Text style={styles.dateText}>
                    {moment(item.created_at).format('DD/MM/YY')}
                </Text>
            </View> */}
            <TouchableOpacity
                onPress={() => navigation.navigate('ExamDetail', {
                    paramKey: item.id,
                })}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 3, }}>Exam Date:</Text><Text style={styles.examDateText}>{moment(item.exam_date).format('DD/MM/YY')}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 3, }}>Reg Date:</Text><Text style={styles.regDateText}>{moment(item.reg_until_date).format('DD/MM/YY')}</Text>
            </View>
            {location != null ?
                <View View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                    <Text style={{ marginRight: 10, }}>
                        <Entypo
                            name="location-pin"
                            size={18}
                            color="#000"
                            style={styles.icon}
                        />alignContent
                    </Text>
                    <Text style={styles.locationText}>
                        {location.name} - {location.city}/ {location.street_name}
                    </Text>
                </View> : <View View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                    <Text style={{ marginRight: 10, }}>
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
                <Text style={styles.AvailableSeats}>Available Seats</Text>
                <Text style={{
                    marginLeft: '50%',
                    fontSize: 16,
                    color: "#000",
                    fontWeight: '600',
                    marginRight: '4%',
                    marginTop: '6%',
                    marginBottom: '6%',
                }}>{item.available_seats}</Text>
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
        marginLeft: '2%',
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
        fontSize: 14,
        color: "#1a6997",
    },
    title: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 15,
        color: "#000",
        fontWeight: 'bold',
    },
    description: {
        marginBottom: 20,
        flexDirection: 'row',
        maxHeight: 82,
    },
    descriptionText: {
        fontSize: 14,
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
        fontSize: 20,
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
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: '2%',
    },
    examDateText: {
        fontSize: 17,
        color: "#1a6997",
        fontWeight: '600',
        marginRight: '4%',
    },
    regDateText: {
        fontSize: 17,
        color: "#ee4327",
        fontWeight: '600',
        marginRight: '4%',
    },
    locationText: {
        fontSize: 15,
        color: "#1a6997",
        fontWeight: '400',
    },
    AvailableSeats: {
        fontSize: 16,
        color: "#000",
        fontWeight: '600',
        marginRight: '4%',
        marginTop: '6%',
        marginBottom: '6%',
    }
});

export default ExamItem;
