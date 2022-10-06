import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Dimensions
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';





const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SearchPage = () => {

  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [from_date, setFromDate] = useState(null);
  const [to_date, setToDate] = useState(null);
  const [location_id, setLocation] = useState('');
  const [exam_level_id, setExamLevel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  //
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date1, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());


  const onChangeFrom = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setFromDate(moment(currentDate).format('YYYY-MM-DD'));
    console.log('fromDate', from_date);
  }
  const onChangeTo = (event2, selectedDate2) => {
    const currentDate2 = selectedDate2 || date2;
    setShow(Platform.OS === 'ios');
    setDate2(currentDate2);
    setToDate(moment(currentDate2).format('YYYY-MM-DD'));
    console.log('toDate', to_date);
  }



  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const { t } = useTranslation();
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'TRenderHtml']);
  }, [])


  const searchExam = (term, from_date, to_date, location_id, exam_level_id) => {
    console.log("searching for " + term, from_date, to_date, location_id, exam_level_id);
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/search`, {
        term,
        from_date,
        to_date,
        location_id,
        exam_level_id
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

  const getSearchDetail = async () => {
    const { data } = await axios
      .get(`${BASE_URL}/exam-search-detail`, {
      });
    setData3(data.locations);
    setData4(data.exam_level);
    console.log(data3);
  };
  useEffect(() => {
    getSearchDetail();
  }, [])
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
                color="#000"
                placeholder={t('common:SearchEverything')}
                placeholderTextColor="#B7D2E3"
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5, marginTop: '5%' }}>
              <Entypo
                name="location-pin"
                size={22}
                color="#1a6997"
                style={styles.icon}
              />
            </Text>
            <Picker
              itemStyle={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', borderColor: '#c9c9c9', borderWidth: 0.5, borderRadius: 5, }}
              selectedValue={location_id}
              style={{ height: 50, width: '96%', marginLeft: '2%', marginBottom: '2%', color: '#A8B0B5' }}
              onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
            >
              <Picker.Item
                color='#A8B0B5'
                label={t('common:SelectLocation')} value="" />
              {data3.map((item, index) => {
                return (
                  <Picker.Item label={item.name} value={item.id} key={index} />
                )
              })}
            </Picker>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5 }}>
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
              // marginTop: '2%',
              marginBottom: '2%',
              marginLeft: '2%',
              borderColor: '#cecece',
              borderWidth: 0.5,
              borderRadius: 5,
              // paddingHorizontal: '%',
              width: '90%',
              color: '#000',
            }}>
              <TouchableOpacity onPress={() => showMode('date')}>
                {from_date != null ?
                  <Text style={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', marginTop: 5, marginBottom: 5, marginLeft: 3 }}>{moment(from_date).format('DD/MM/YYYY')}</Text> :
                  <Text style={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', marginTop: 5, marginBottom: 5, marginLeft: 3 }}>{moment(date1).format('DD/MM/YYYY')}</Text>
                }
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date1}
                  maximumDate={new Date(2023, 6, 1)}
                  minimumDate={new Date(2022, 1, 1)}
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
              marginBottom: '2%',
              marginLeft: '2%',
              borderColor: '#cecece',
              borderWidth: 0.5,
              borderRadius: 5,
              // paddingHorizontal: '%',
              width: '90%',
              color: '#000',
            }}>
              <TouchableOpacity onPress={() => showMode('date')}>
                {to_date != null ?
                  <Text style={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', marginTop: 5, marginBottom: 5, marginLeft: 3 }}>{moment(to_date).format('DD/MM/YYYY')}</Text> :
                  <Text style={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', marginTop: 5, marginBottom: 5, marginLeft: 3 }}>{moment(date2).format('DD/MM/YYYY')}</Text>
                }
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date2}
                  mode={mode}
                  maximumDate={new Date(2023, 6, 1)}
                  minimumDate={new Date(2022, 1, 1)}
                  is24Hour={true}
                  display="calendar"
                  onChange={onChangeTo}
                />
              )}
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 5, marginTop: scale(10) }}>
              <FontAwesome
                name="language"
                size={22}
                color="#1a6997"
                style={styles.icon}
              />
            </Text>
            <Picker
              itemStyle={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', borderColor: '#c9c9c9', borderWidth: 0.5, borderRadius: 5, }}
              selectedValue={exam_level_id}
              style={{ height: 50, width: '96%', marginLeft: '2%', marginBottom: '2%', color: '#A8B0B5' }}
              onValueChange={(itemValue, itemIndex) => setExamLevel(itemValue)}
            >
              <Picker.Item
                color='#A8B0B5'
                label={t('common:SelectExam')} value="" />
              {data4.map((item, index) => {
                return (
                  <Picker.Item label={item.name} value={item.id} key={index} />
                )
              })}
            </Picker>
          </View>

        </View>



        {
          search == true ?
            <View style={styles.searchButton2}>
              <TouchableOpacity
                onPress={() => { searchExam(term, from_date, to_date, location_id, exam_level_id) }}
                style={styles.button2}>
                <Text style={styles.buttonText}>{t('common:Search')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  () => {
                    setSearch(false);
                    setTerm('');
                    setFromDate(null);
                    setToDate(null);
                    setLocation('');
                    setExamLevel('');
                  }
                }
                style={styles.button3}>
                <Text style={styles.buttonText}>{t('common:Clear')}</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={styles.searchButton}>
              <TouchableOpacity
                onPress={() => { searchExam(term, from_date, to_date, location_id, exam_level_id) }}
                style={styles.button}>
                <Text style={styles.buttonText}>{t('common:Search')}</Text>
              </TouchableOpacity>
            </View>
        }
        {
          search == false ?
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


      </ScrollView >
    </View >
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
    height: height * 0.3,
  },
  h1: {
    // fontSize: 25,
    fontSize: wp('7%'),
    color: '#fff',
    marginHorizontal: wp('4.2%'),
    paddingTop: wp('4.2%')
  },
  h5: {
    // fontSize: 16,
    fontSize: RFValue(16),
    color: '#fff',
    marginHorizontal: wp('4%'),
    paddingTop: hp('1%'),
    lineHeight: wp('5%'),
  },
  search: {
    width: width * 0.94,
    height: height * 0.36,
    // borderWidth: 0.5,
    borderRadius: 5,
    padding: height * 0.02,
    margin: height * 0.01,
    elevation: 1,
    backgroundColor: '#fff',
    marginTop: height * -0.15,
    zindex: -1,
  },
  title: {
    fontSize: height * 0.025,
    color: '#000',
    marginHorizontal: width * 0.01,
    paddingTop: 5,
  },
  titleHeader: {
    // fontSize: 13,
    fontSize: height * 0.023,
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
    fontSize: height * 0.026,
    fontWeight: 'bold',
  },
  searchButton: {
    width: '100%',
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
    fontSize: height * 0.028,
    fontWeight: 'bold',
    color: '#1a6997',
    marginHorizontal: 10,
    paddingTop: 5,
  },
  listSubTitle: {
    // fontSize: 16,
    fontSize: height * 0.024,
    color: '#000',
    marginHorizontal: 10,
    paddingTop: 5,
    marginBottom: 10,
  },
});
