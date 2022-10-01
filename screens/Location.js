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
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import Item from '../util/Item';
import { BASE_URL } from '../config';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Entypo from 'react-native-vector-icons/Entypo';

export default class Location extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
    };
  }


  componentDidMount() {
    axios
      .get(`${BASE_URL}/location`)
      .then(res => {
        this.setState({ data: res.data.data });
        console.log('res.data', res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  _renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  render() {

    const { data } = this.state;
    // console.log('data', data);
    return (

      <SafeAreaView>
        <View
          style={{
            padding: 20,
            justifyContent: 'center',
          }}
        >
          <Text style={styles.titleText}>{t('common:OurLocation')}</Text>
          <Text style={styles.textDescription}>{t('common:FindUsHere')}</Text>
        </View>
        {/* <FlatList
            style={{backgroundColor: '#f5f5f5', padding: 5}}
            data={data}
            numColumns={1}
            keyExtractor={item => item.id.toString()}
            // keyExtractor={(item, id) => {
            //   return id.toString();
            // }}
            renderItem={this._renderItem}
          /> */}
        <TouchableOpacity>
          <View style={styles.Image_view}>
            <View style={styles.Text}>
              <Text style={{ marginLeft: 14, fontSize: RFPercentage(2.4), fontWeight: '700', color: '#166795' }}>
                Langenhagen
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="location-pin"
                    size={18}
                    color="#1a6997"
                    style={styles.icon}
                  />
                </Text>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}>Galileistrasse 3,30853 Langenhagen</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="mail"
                    size={18}
                    color="#1a6997"
                    style={{ marginRight: 18 }}
                  />
                </Text>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}> langenhagen@bbz.kiry.de</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="phone"
                    size={18}
                    color="#1a6997"
                    style={{ marginRight: 18 }}
                  />
                </Text>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}> 0511 91163656</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.Image_view}>
            <View style={styles.Text}>
              <Text style={{ marginLeft: 14, fontSize: RFPercentage(2.4), fontWeight: '700', color: '#166795' }}>
                Frankfurt
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="location-pin"
                    size={18}
                    color="#1a6997"
                    style={styles.icon}
                  />
                </Text>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}>Gutleutstraße 34-36 ,60329 Frankfurt am Main</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="mail"
                    size={18}
                    color="#1a6997"
                    style={{ marginRight: 18 }}
                  />
                </Text>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}> frankfurt2@bbz.kiry.de</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="phone"
                    size={18}
                    color="#1a6997"
                    style={{ marginRight: 18 }}
                  />
                </Text>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}> 069 348792507</Text>
              </View>

            </View>
          </View>
        </TouchableOpacity><TouchableOpacity>
          <View style={styles.Image_view}>
            <View style={styles.Text}>
              <Text style={{ marginLeft: 14, fontSize: RFPercentage(2.4), fontWeight: '700', color: '#166795' }}>
                Bonn
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="location-pin"
                    size={18}
                    color="#1a6997"
                    style={styles.icon}
                  />
                </Text>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}>Kennedybrücke 2-4 ,53225 Bonn</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="mail"
                    size={18}
                    color="#1a6997"
                    style={{ marginRight: 18 }}
                  />
                </Text>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}> bonn@bbz.kiry.de</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="phone"
                    size={18}
                    color="#1a6997"
                    style={{ marginRight: 18 }}
                  />
                </Text>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}> 0228 28627200</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity><TouchableOpacity>
          <View style={styles.Image_view}>
            <View style={styles.Text}>
              <Text style={{ marginLeft: 14, fontSize: RFPercentage(2.4), fontWeight: '700', color: '#166795' }}>
                Koblenz
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="location-pin"
                    size={18}
                    color="#1a6997"
                    style={styles.icon}
                  />
                </Text>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}>Viktoriastr. 32-36 ,56068 Koblenz
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="mail"
                    size={18}
                    color="#1a6997"
                    style={{ marginRight: 18 }}
                  />
                </Text>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}>koblenz@bbz.kiry.de</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>

                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000' }}>
                  <Entypo
                    name="phone"
                    size={18}
                    color="#1a6997"
                    style={{ marginRight: 18 }}
                  />
                </Text>
                <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}>0261 45093180</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
    fontSize: RFPercentage(2.8),
    // fontWeight: 600,
  },
  textDescription: {
    marginTop: 10,
    color: '#333',
    fontSize: RFPercentage(2.1),
  },
  Text: {
    // flex: 1,
    flexDirection: 'column',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImageBackground: {
    opacity: 0.3,
  },
  Date: {
    flex: 0.05,
    flexDirection: 'column',
    color: '#000',
  },
  Image_view: {
    // flex: 1,
    paddingTop: 9,
    // paddingHorizontal: 14,
    paddingBottom: 15,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderLeftColor: '#166795',
    borderLeftWidth: 5,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    shadowcolor: '#000',
    shadowOffset: { height: 10, width: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,


  },
});
