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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SearchItem from '../util/SearchItem';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';



const SearchPage = () => {

  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [from_date, setFromDate] = useState(new Date());
  const [to_date, setToDate] = useState(new Date());
  //
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date1, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setFromDate(moment(currentDate).format('YYYY-MM-DD'));
  }
  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate2(currentDate);
    setToDate(moment(currentDate).format('YYYY-MM-DD'));
  }



  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const { t } = useTranslation();
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'TRenderHtml']);
  }, [])


  const searchExam = (term, from_date, to_date) => {
    console.log("searching for " + to_date);
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/search`, {
        term,
        from_date,
        to_date
      })
      .then(res => {
        setData2(res.data.data);
        console.log(res.data);
        setSearch(true);
        setTerm('');
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getData = async () => {
    const { data } = await axios
      .get(`${BASE_URL}/exams`, {
      });
    setData(data.data);
    // console.log(data.data);
  };
  useEffect(() => {
    getData();
  }, [])
  const renderItem = ({ item }) => {
    return <ExamItem item={item} />;
  };
  const renderItem2 = ({ item }) => {
    return <SearchItem item={item} />;
  };
  // const clear = () => {
  //   navigation.navigate('SearchPage');
  // };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Spinner visible={isLoading} />
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
              <TextInput
                value={term}
                onChangeText={setTerm}
                style={styles.titleHeader}
                placeholder={t('common:Search')} />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5, marginTop: '5%' }}>
              <Entypo
                name="calendar"
                size={22}
                color="#1a6997"
                style={styles.icon}
              />
            </Text>
            <View style={{
              flex: 1,
              fontSize: RFPercentage(2.7),
              marginTop: '2%',
              marginBottom: '5%',
              marginLeft: '2%',
              borderColor: '#cecece',
              borderWidth: 0.5,
              borderRadius: 5,
              // paddingHorizontal: '%',
              width: '90%',
              color: '#000',
            }}>
              <TouchableOpacity onPress={() => showMode('date')}>
                <Text style={{ fontSize: RFPercentage(2.7), color: '#000', marginTop: 10 }}>{moment(from_date).format('DD/MM/YYYY')}</Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date1}
                  mode={mode}
                  is24Hour={true}
                  display="calendar"
                  onChange={onChangeFrom}
                />
              )}
            </View>
            <View style={{
              flex: 1,
              fontSize: RFPercentage(2.7),
              marginTop: '2%',
              marginBottom: '5%',
              marginLeft: '2%',
              borderColor: '#cecece',
              borderWidth: 0.5,
              borderRadius: 5,
              // paddingHorizontal: '%',
              width: '90%',
              color: '#000',
            }}>
              <TouchableOpacity onPress={() => showMode('date')}>
                <Text style={{ fontSize: RFPercentage(2.7), color: '#000', marginTop: 10 }}>{moment(to_date).format('DD/MM/YYYY')}</Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date2}
                  mode={mode}
                  is24Hour={true}
                  display="calendar"
                  onChange={onChangeTo}
                />
              )}
            </View>
          </View>
        </View>



        {search == true ?
          <View style={styles.searchButton2}>
            <TouchableOpacity
              onPress={() => { searchExam(term, from_date, to_date) }}
              style={styles.button2}>
              <Text style={styles.buttonText}>{t('common:Search')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () => {
                  setSearch(false);
                  setTerm('');
                  setFromDate(new Date());
                  setToDate(new Date());
                }
              }
              style={styles.button3}>
              <Text style={styles.buttonText}>{t('common:Clear')}</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.searchButton}>
            <TouchableOpacity
              onPress={() => { searchExam(term, from_date, to_date) }}
              style={styles.button}>
              <Text style={styles.buttonText}>{t('common:Search')}</Text>
            </TouchableOpacity>
          </View>
        }
        {search == false ?
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
          :
          <View style={styles.list}>
            <Text style={styles.listTitle}>{t('common:SearchResult')}</Text>
            <Text style={styles.listSubTitle}>{t('common:YourSearchedResult')}</Text>
            <FlatList
              style={{ backgroundColor: '#f5f5f5', padding: 5 }}
              data={data2}
              numColumns={1}
              keyExtractor={item => item.id.toString()}
              // keyExtractor={(item, id) => {
              //   return id.toString();
              // }}
              renderItem={renderItem2}
            />
          </View>
        }


      </ScrollView>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  header: {
    flex: 1,
    backgroundColor: '#1a6997',
    height: 240,
  },
  h1: {
    // fontSize: 25,
    fontSize: RFPercentage(4),
    color: '#fff',
    marginHorizontal: 20,
    paddingTop: 12,
  },
  h5: {
    // fontSize: 16,
    fontSize: RFPercentage(2.5),
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
    fontSize: RFPercentage(2.5),
    color: '#000',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  titleHeader: {
    // fontSize: 13,
    fontSize: RFPercentage(2.3),
    color: '#1a6997',
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  label: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#cecece',
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
  button2: {
    backgroundColor: '#1a6997',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    elevation: 1,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    zindex: -1,
  },
  button3: {
    backgroundColor: '#1a6997',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    elevation: 1,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    zindex: -1,
  },
  buttonText: {
    color: '#fff',
    // fontSize: 18,
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
  },
  searchButton: {
    width: '94%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton2: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    // fontSize: 20,
    fontSize: RFPercentage(2.9),
    fontWeight: 'bold',
    color: '#1a6997',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  listSubTitle: {
    // fontSize: 16,
    fontSize: RFPercentage(2.5),
    color: '#000',
    marginHorizontal: 10,
    paddingTop: 5,
    marginBottom: 10,
  },
});
