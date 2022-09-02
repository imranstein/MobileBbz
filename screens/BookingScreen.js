import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { IMAGE_URL } from '../config';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Progress from 'react-native-progress';
import { t } from 'i18next';

const BookingScreen = ({ route }) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <ImageBackground source={require('../assets/searchBackground.png')}>
                        <Text style={styles.h1}>
                            {/* {slug} */}
                            {t('common:Level')}</Text>
                        {/* {location != null ?
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
                            </View>} */}
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
                        <Text style={styles.title}> {t('common:AvailableSeats')} |  </Text>

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
                        <Text style={styles.dateTitle}> {t('common:ExamDate')} |  </Text>

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
                        <Text style={styles.regTitle}> {t('common:ExamDate')} |  </Text>

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
                        <Text style={styles.timeTitle}> {t('common:ExamDate')} |  </Text>

                    </View>
                </View>
                {/* <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#fff', height: 400 }}>
                    <Text style={styles.descriptionLabel}>{t('common:Description')}</Text>
                    <Text style={styles.description}><RenderHtml
                        contentWidth={width}
                        source={{ html: content || '' }}
                        enableExperimentalMarginCollapsing={true}
                        enableExperimentalGhostLinesPrevention={true}
                        baseStyle={{
                            color: '#15181E',
                            textAlign: 'justify',
                            fontSize: '16px',
                            marginRight: '4%',
                            marginLeft: 15,
                        }}
                    /></Text>
                </View> */}



            </ScrollView>
            <View style={styles.submit}>
                <Text style={{
                    flex: 0.4,
                    fontSize: 16,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 30,

                }}>{t('common:Fee')} </Text>
                <Text style={{
                    flex: 0.6,
                    fontSize: 24,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginRight: 10,
                    color: '#1a6997'

                }}
                >
                    {/* {price} */}
                    $ </Text>
                <TouchableOpacity style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: 20 }}
                    onPress={() => {

                    }
                    }>
                    <Text style={styles.submitLabel}>{t('common:PayNow')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BookingScreen

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
        fontSize: 25,
        color: '#fff',
        marginHorizontal: 20,
        paddingTop: 12,
    },
    h5: {
        fontSize: 16,
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3e8529',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    titleHeader: {
        fontSize: 13,
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
        fontSize: 18,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a6997',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    listSubTitle: {
        fontSize: 16,
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    regTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d1a771',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    timeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7dbde0',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    descriptionLabel: {
        fontSize: 20,
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
        fontSize: 18,
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