import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useContext } from 'react';
import { t } from 'i18next';
import { AuthContext } from '../context/AuthContext';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const VerifySuccessScreen = ({ navigation }) => {
    const { userInfo, logout } = useContext(AuthContext);

    return (
        <ImageBackground
            source={require('../assets/background.png')}
            resizeMode="cover"
            style={styles.ImageContainer}
            imageStyle={styles.ImageBackground}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {t('common:EmailVerifyLink')}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => logout()}>
                    <Text style={styles.buttonText}>{t('common:Back')}</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground >
    );
};

export default VerifySuccessScreen;

const styles = StyleSheet.create({
    ImageContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ImageBackground: {
        opacity: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        marginTop: '20%',
        width: '86%',
        textAlign: 'left',
        fontSize: RFPercentage(2.45),
        color: '#566573',
        marginBottom: '7%',
    },
    input: {
        width: '86%',
        height: 50,
        borderColor: '#999',
        borderWidth: 0.5,
        marginBottom: '7%',
        borderRadius: 3,
        paddingLeft: 10,
        color: '#566573',
    },
    button: {
        width: '86%',
        height: 50,
        backgroundColor: '#166795',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '7%',
    },
    buttonText: {
        color: '#fff',
        fontSize: RFPercentage(2.45),
        fontWeight: 'bold',
    },
});
