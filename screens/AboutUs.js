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

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ImageBackground source={require('../assets/searchBackground.png')}>
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
    backgroundColor: '#1a6997',
    height: 200,
  },
  h1: {
    fontSize: 25,
    color: '#fff',
    marginHorizontal: 20,
    paddingTop: 12,
  },
  search: {
    width: '94%',
    // height: '100%',
    // borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 1,
    backgroundColor: '#fff',
    marginTop: -125,
    zindex: -2,
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 10,
    marginBottom: 50,
    lineHeight: 20,
    paddingHorizontal: 6,
    color: '#444',
  },
  lastdescription: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 10,
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 6,
    color: '#444',
  },
});
