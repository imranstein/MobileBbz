import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  ImageBackground,
} from 'react-native';

import axios from 'axios';
import NewsItem from '../util/NewsItem';
import { BASE_URL } from '../config';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default class News extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
    };
  }


  componentDidMount() {
    axios
      .get(`${BASE_URL}/news`)
      .then(res => {
        this.setState({ data: res.data.data });
        // console.log('res.data', res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  _renderItem = ({ item }) => {
    return <NewsItem item={item} />;
  };

  render() {

    const { data } = this.state;
    // console.log('data', data);
    return (

      <SafeAreaView>
        <View
          style={{
            // padding: 20,
            justifyContent: 'center',
          }}
        >
          {/* <Text style={styles.titleText}>{t('common:OurLocation')}</Text>
          <Text style={styles.textDescription}>{t('common:FindUsHere')}</Text> */}
        </View>
        <FlatList
          style={{ backgroundColor: '#fff' }}
          data={data}
          numColumns={1}
          keyExtractor={item => item.id.toString()}
          // keyExtractor={(item, id) => {
          //   return id.toString();
          // }}
          renderItem={this._renderItem}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    opacity: 0.3,
  },
  titleText: {
    color: '#166795',
    fontSize: RFPercentage(2.9),
    // fontWeight: 600,
  },
  textDescription: {
    marginTop: 10,
    color: '#333',
    fontSize: RFPercentage(2.3),
  }
});
