import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import ExamItem from '../util/ExamItem';



const SearchPage = () => {

  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested','TRenderHtml']);
  }, [])
  const getData = async () => {
    const { data } = await axios
      .get(`${BASE_URL}/exams`, {
      });
    setData(data.data);
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, [])
  const renderItem = ({ item }) => {
    return <ExamItem item={item} />;
  };
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
        <View style={styles.list}>
          <Text style={styles.listTitle}>{t('common:UpcomingExams')}</Text>
          <Text style={styles.listSubTitle}>{t('common:UpcomingExamsSubTitle')}</Text>
          <FlatList
            style={{ backgroundColor: '#f5f5f5', padding: 5 }}
            data={data}
            numColumns={1}
            keyExtractor={item => item.id.toString()}
            // keyExtractor={(item, id) => {
            //   return id.toString();
            // }}
            renderItem={renderItem}
          />
        </View>

      </ScrollView>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cecece',
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
});
