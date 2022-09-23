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



const WeWorkScreen = () => {
    const { t } = useTranslation();
    return (
        <ScrollView contentContainerStyle={{ height: 610 }}>
            <View style={styles.container}>
                {/* <ActivityIndicator animating={isLoading} size="large" color="#0000ff" /> */}
                <View style={styles.header}>
                    <ImageBackground style={styles.image} source={require('../assets/searchBackground.png')}>
                        <Text style={styles.h1}>{t('common:KnowWhoWeAre')}</Text>
                    </ImageBackground>
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
        // backgroundColor: '#1a6997',
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
        marginTop: -45,
        marginBottom: 20,
        zindex: -2,
    },
    title: {
        fontSize: RFPercentage(2.2),
        color: '#000',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    titleHeader: {
        fontSize: RFPercentage(2.2),
        color: '#1a6997',
        marginHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    button: {
        // backgroundColor: '#1a6997',
        paddingVertical: 8,
        paddingHorizontal: 26,
        marginTop: 20,
        borderRadius: 4,
        elevation: 1,
        // width: 150,
        // height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-10%',
        // zindex: -1,
    },
    buttonText: {
        color: '#fff',
        fontSize: RFPercentage(2.4),
        textTransform: 'uppercase',
        // fontWeight: 'bold',
    },
    searchButton: {
        width: '100%',
        // height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#DAE1E7',
        marginBottom: 16,
        justifyContent: 'flex-start',
        paddingHorizontal: 14,
        color: '#000',
        fontSize: RFPercentage(2.1),
    },
    message: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#DAE1E7',
        paddingHorizontal: 14,
        color: '#000',
        marginBottom: 16,
        fontSize: RFPercentage(2.1),
        textAlignVertical: 'top',
    },
    error: {
        color: 'red',
        marginBottom: 16,
        fontSize: RFPercentage(2.1),
    },
});
