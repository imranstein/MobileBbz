import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Item = ({ item }) => {
  return (
    <View style={styles.Image_view}>
      {/* <Image
        style={{width: 50, height: 50, borderRadius: 100}}
        source={{uri: item.thumbnailUrl}}
      /> */}
      <View style={styles.Date}>

        <Text style={{ width: 10, color: '#000' }}>

        </Text>
        <Text style={{ color: '#000' }}>

        </Text>
      </View>
      <View style={styles.Text}>
        <Text style={{ marginLeft: 14, fontSize: RFPercentage(2.4), fontWeight: '700', color: '#166795' }}>
          {item.name}
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

          <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}>{item.city},{item.street_name}</Text>
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
          <Text style={{ marginLeft: 14, marginTop: 10, color: '#000', fontSize: RFPercentage(2) }}> {item.email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Image_view: {
    flex: 1,
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
});

export default Item;
