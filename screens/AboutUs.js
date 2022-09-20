import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import { t } from 'i18next';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const AboutUs = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ImageBackground style={styles.image} source={require('../assets/searchBackground.png')}>
            <Text style={styles.h1}>{t('common:AboutUsTitle')}</Text>
          </ImageBackground>
        </View>
        <View style={styles.search}>
          <Text style={styles.description}>
            {t('common:AboutUsFirstParagraph')}
          </Text>
          <Text style={styles.description}>
            {t('common:AboutUsSecondParagraph')}
          </Text>
          <Text style={styles.lastdescription}>
            {t('common:AboutUsThirdParagraph')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#999',
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
    // fontSize: 25,
    fontSize: RFPercentage(4),
    color: '#fff',
    marginHorizontal: 10,
    paddingTop: 16,
  },
  search: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingTop: 14,
    borderRadius: 4,
    elevation: 1,
    backgroundColor: '#fff',
    marginTop: -90,
    marginBottom: 20,
    zindex: -2,
  },
  description: {
    // fontSize: 14,
    fontSize: RFPercentage(2.4),
    // fontWeight: 'bold',
    paddingVertical: 10,
    marginBottom: 50,
    lineHeight: 20,
    paddingHorizontal: 6,
    color: '#000',
  },
  lastdescription: {
    // fontSize: 14,
    fontSize: RFPercentage(2.4),
    // fontWeight: 'bold',
    paddingVertical: 10,
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 6,
    color: '#000',
  },
});
