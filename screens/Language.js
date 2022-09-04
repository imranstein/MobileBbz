import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';

const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
];

const Language = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const selectedLanguageCode = i18n.language;
    const setLanguage = (code) => {
        i18n.changeLanguage(code);
        navigation.navigate('Search');
    };

    return (
        <View style={{ backgroundColor: '#cfcfcf', height: '100%' }}>
            <View style={styles.list}>
                {LANGUAGES.map((language) => {
                    const selectedLanguage = language.code === selectedLanguageCode;
                    return (
                        <TouchableOpacity
                            key={language.code}
                            style={selectedLanguage ? styles.buttonContainer : styles.unselectedButtonContainer}
                            disabled={selectedLanguage}
                            onPress={() => setLanguage(language.code)}
                        >
                            <Text
                                style={[selectedLanguage ? styles.selectedText : styles.text]}
                            >
                                {language.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}

            </View>
        </View>
    )
}

export default Language

const styles = StyleSheet.create({
    list: {
        marginTop: 40,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#1570a5',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 50,
    },
    unselectedButtonContainer: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 50,
    },
    text: {
        fontSize: 18,
        color: '#000',
        alignSelf: 'center',


    },
    selectedText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center',
    },

})