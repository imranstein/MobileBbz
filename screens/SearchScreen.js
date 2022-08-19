import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";


const SearchPage = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ImageBackground source={require('../assets/searchBackground.png')}>
            <Text style={styles.h1}>{t('common:BookYourExamNow')}</Text>
            <Text style={styles.h5}>
              {t('common:SearchPageTitle')}
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.search}>
          <View style={styles.label}>
            <Text style={styles.title}> {t('common:Location')} ,{t('common:Date')} Or {t('common:Level')}</Text>
            <View style={styles.titleHeader}>
              <TextInput style={styles.titleHeader} placeholder="Search" />
            </View>
          </View>
          <View style={styles.input} />
        </View>
        <View style={styles.searchButton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{t('common:Search')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 200,
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
    color: '#000',
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
  label: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
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
});
