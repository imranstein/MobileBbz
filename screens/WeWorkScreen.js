import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from 'react-native-size-matters';



const WeWorkScreen = () => {
    const { t } = useTranslation();
    return (
        <ScrollView contentContainerStyle={{ height: 750 }}>
            <View style={styles.container}>
                {/* <ActivityIndicator animating={isLoading} size="large" color="#0000ff" /> */}
                <View style={styles.header}>
                    <ImageBackground style={styles.image} source={require('../assets/searchBackground.png')}>
                        <Text style={styles.h1}>{t('common:KnowWhoWeAre')}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.search}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.icon}>
                            <AntDesign
                                name="form"
                                size={55}
                                color="#1570A5"
                                style={styles.icon}
                            />
                        </Text>
                        <View style={{ flexDirection: 'column', width: '75%', marginBottom: scale(20) }}>
                            <Text style={styles.title}>
                                {t('common:Registration')}
                            </Text>
                            <Text style={styles.content}>
                                {/* something intersting going on here but i dont know wat is is yet */}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.icon}>
                            <MaterialCommunityIcons
                                name="list-status"
                                size={55}
                                color="#1570A5"
                                style={styles.icon}
                            />
                        </Text>
                        <View style={{ flexDirection: 'column', width: '75%', marginBottom: scale(20) }}>
                            <Text style={styles.title}>
                                {t('common:GradingTest')}
                            </Text>
                            <Text style={styles.content}>
                                {/* something intersting going on here but i dont know wat is is yet */}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.icon}>
                            <FontAwesome5
                                name="book-reader"
                                size={55}
                                color="#1570A5"
                                style={styles.icon}
                            />
                        </Text>
                        <View style={{ flexDirection: 'column', width: '75%', marginBottom: scale(20) }}>
                            <Text style={styles.title}>
                                {t('common:Education')}
                            </Text>
                            <Text style={styles.content}>
                                {/* something intersting going on here but i dont know wat is is yet */}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.icon}>
                            <FontAwesome
                                name="institution"
                                size={55}
                                color="#1570A5"
                                style={styles.icon}
                            />
                        </Text>
                        <View style={{ flexDirection: 'column', width: '75%', marginBottom: scale(20) }}>
                            <Text style={styles.title}>
                                {t('common:ExamTraining')}
                            </Text>
                            <Text style={styles.content}>
                                {/* something intersting going on here but i dont know wat is is yet */}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.icon}>
                            <SimpleLineIcons
                                name="book-open"
                                size={55}
                                color="#1570A5"
                                style={styles.icon}
                            />
                        </Text>
                        <View style={{ flexDirection: 'column', width: '75%', marginBottom: scale(20), }}>
                            <Text style={styles.title}>
                                {t('common:Exam')}
                            </Text>
                            <Text style={styles.content}>
                                {/* something intersting going on here but i dont know wat is is yet */}
                            </Text>
                        </View>
                    </View>

                </View>

            </View>
        </ScrollView>
    );
};

export default WeWorkScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    header: {
        // backgroundColor: '#1570A5',
        // height: '29%',
    },
    image: {
        height: 164,
    },
    h1: {
        fontSize: RFPercentage(3.5),
        color: '#fff',
        marginHorizontal: 10,
        paddingTop: 16,
    },
    h5: {
        fontSize: RFPercentage(2.2),
        color: '#fff',
        marginHorizontal: 10,
        paddingTop: 5,
        lineHeight: 20,
    },
    search: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 4,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 4,
        elevation: 1,
        backgroundColor: '#fff',
        marginTop: -90,
        marginBottom: 20,
        zindex: -2,
    },
    icon: {
        color: '#1570A5',
        marginLeft: 10,
        marginTop: 20,
        fontWeight: 'bold',
    },
    title: {
        color: '#1570A5',
        fontSize: scale(16),
        fontWeight: '700',
        marginTop: scale(35),
        marginLeft: scale(20),
    },
    content: {
        color: '#000000',
        fontSize: scale(13),
        fontWeight: '600',
        marginTop: scale(5),
        marginLeft: scale(20)
    }

});
