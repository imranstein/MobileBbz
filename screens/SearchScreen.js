import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
  RefreshControl
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
import { date } from 'yup';
import DateTimePickerModal from "react-native-modal-datetime-picker";






const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SearchPage = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    getData();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getData();

      console.log('Refreshed');
    });
    return focusHandler;
  }, [navigation]);

  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [from_date, setFromDate] = useState('');
  const [to_date, setToDate] = useState('');
  const [location_id, setLocation] = useState('');
  const [exam_level_id, setExamLevel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  //

  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

  const showFromDatePicker = () => {
    console.log("clicked here");
    setFromDatePickerVisibility(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisibility(false);
  };

  const fromHandleConfirm = (date) => {
    // const date1 = moment(date).format('YYYY-MM-DD');
    setFromDate(date);
    console.log("A date has been picked: ", from_date);
    hideFromDatePicker();
  };
  const showToDatePicker = () => {
    console.log("clicked");
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
  };

  const toHandleConfirm = (date) => {
    // date = moment(date).format('YYYY-MM-DD');
    setToDate(date);
    console.log("A date has been picked: ", to_date);

    hideToDatePicker();
  };





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
    if (to_date < from_date) {
      Alert.alert(
        t("common:Error"),
        t("common:ToDateMustBeGreaterThanFromDate"),
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed")
          }
        ],
        { cancelable: false }
      );
      setIsLoading(false);
    } else {

      axios
        .post(`${BASE_URL}/search`, {
          term,
          from_date,
          to_date,
          location_id,
          exam_level_id
        })
        .then(res => {
          if (res.data.status == 'error') {
            Alert.alert(
              t("common:Error"),
              t('common:PleaseChooseAtLeastOneOption'),
              [
                {
                  text: "OK",
                  onPress: () => setSearch(false)
                }
              ],
              { cancelable: false }
            );
            setIsLoading(false);
          }
          setData2(res.data.data);
          console.log('here', res.data);
          setSearch(true);
          // setTerm('');
          // setFromDate('');
          // setToDate('');
          // setLocation('');
          // setExamLevel('');

          setIsLoading(false);
        })
        .catch(err => {
          // console.log(err);
          console.log('here');
          alert(t('common:PleaseChooseAtLeastOneOption'));
          setIsLoading(false);
        });
    }
  };

  const getSearchDetail = async () => {
    const { data } = await axios
      .get(`${BASE_URL}/exam-search-detail`, {
      });
    setData3(data.locations);
    setData4(data.exam_level);
    console.log(data4);
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
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
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
            <Text style={styles.title}> {t('common:Location')}, {t('common:Date')} Or {t('common:Level')}</Text>
            <View style={styles.titleHeader}>
              <TextInput
                value={term}
                onChangeText={setTerm}
                style={styles.titleHeader}
                color="#1a6997"
                placeholder={t('common:SearchEverything')}
                placeholderTextColor="#B7D2E3"
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#cecece', borderBottomWidth: 0.5, marginBottom: 5 }}>
            <Text style={{ marginLeft: 5, marginBottom: '2%', }}>
              <Entypo
                name="location-pin"
                size={22}
                color="#1a6997"
                style={styles.icon}
              />
            </Text>
            <Picker
              dropdownIconColor="#1a6997" dropdownIconRippleColor="#1a6988"
              itemStyle={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', borderColor: '#c9c9c9', borderWidth: 0.5, borderRadius: 5 }}
              selectedValue={location_id}
              style={{ height: 50, width: '96%', color: '#A8B0B5', marginBottom: '2%', }}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '2%', borderBottomColor: '#cecece', borderBottomWidth: 0.5, }}>
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
              marginBottom: '3%',
              marginLeft: '2%',
              borderColor: '#cecece',
              borderWidth: 1,
              borderRadius: 5,
              // paddingHorizontal: '%',
              width: '90%',
              color: '#000',
            }}>
              <TouchableOpacity onPress={showFromDatePicker}>
                {from_date != '' ?
                  <Text style={{ fontSize: RFPercentage(2.2), color: '#A8B0B5', marginTop: 5, marginBottom: 5, marginLeft: 5 }}>{moment(from_date).format('DD/MM/YYYY')}</Text> :
                  <Text style={{ fontSize: RFPercentage(2.2), color: '#A8B0B5', marginTop: 5, marginBottom: 5, marginLeft: 5 }}>{t('common:From')}</Text>}
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isFromDatePickerVisible}
                mode="date"
                maximumDate={new Date(2023, 12, 31)}
                minimumDate={new Date(2021, 1, 1)}
                onConfirm={fromHandleConfirm}
                onCancel={hideFromDatePicker}
              />

            </View>
            <View style={{
              flex: 1,
              fontSize: RFPercentage(2.7),
              marginBottom: '3%',
              marginLeft: '2%',
              borderColor: '#cecece',
              borderWidth: 1,
              borderRadius: 5,
              // paddingHorizontal: '%',
              width: '90%',
              color: '#000',
            }}>
              <TouchableOpacity onPress={showToDatePicker}>
                {to_date != '' ?
                  <Text style={{ fontSize: RFPercentage(2.2), color: '#A8B0B5', marginTop: 5, marginBottom: 5, marginLeft: 5 }}>{moment(to_date).format('DD/MM/YYYY')}</Text> :
                  <Text style={{ fontSize: RFPercentage(2.2), color: '#A8B0B5', marginTop: 5, marginBottom: 5, marginLeft: 5 }}>{t('common:To')}</Text>}
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isToDatePickerVisible}
                mode="date"
                maximumDate={new Date(2023, 12, 31)}
                minimumDate={new Date(2021, 1, 1)}
                onConfirm={toHandleConfirm}
                onCancel={hideToDatePicker}
              />

            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#cecece', borderBottomWidth: 0.5, }}>
            <Text style={{ marginLeft: 5, marginTop: scale(10), marginBottom: '2%' }}>
              <FontAwesome
                name="language"
                size={22}
                color="#1a6997"
                style={styles.icon}
              />
            </Text>
            <Picker
              dropdownIconColor="#1a6997" dropdownIconRippleColor="#1a6988"
              itemStyle={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', borderColor: '#c9c9c9', borderWidth: 0.5, borderRadius: 5, }}
              selectedValue={exam_level_id}
              style={{ height: 50, width: '96%', marginLeft: '2%', color: '#A8B0B5' }}
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
                    setFromDate('');
                    setToDate('');
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
              {data2 == '' ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: RFPercentage(2.7), color: '#666', marginTop: hp(10), marginBottom: hp(5) }}>{t('common:NoResultFound')}</Text>
                </View>
                :
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
              }
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
    height: height * 0.4,
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
    marginHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  label: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#cecece',
  },
  button: {
    backgroundColor: '#1a6997',
    // paddingHorizontal: 10,
    paddingVertical: 4,
    // margin: 10,
    borderRadius: 5,
    elevation: 1,
    width: 155,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    zindex: -1,
  },
  button2: {
    backgroundColor: '#1a6997',
    paddingVertical: 8,
    margin: 10,
    borderRadius: 5,
    elevation: 1,
    width: 100,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    zindex: -1,
  },
  button3: {
    backgroundColor: '#1a6997',
    paddingVertical: 8,
    margin: 10,
    borderRadius: 5,
    elevation: 1,
    width: 100,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    zindex: -1,
  },
  buttonText: {
    color: '#fff',
    // fontSize: 18,
    fontSize: height * 0.026,
    fontWeight: '600',
  },
  searchButton: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton2: {
    width: '100%',
    height: 40,
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
