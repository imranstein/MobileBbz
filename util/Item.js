import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

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
        <Text style={{ marginLeft: -8, fontSize: 16, fontWeight: '700', color: '#166795' }}>
          {item.name}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginLeft: -8, marginTop: 10, color: '#000' }}>
            <Entypo
              name="location-pin"
              size={18}
              color="#1a6997"
              style={styles.icon}
            />
          </Text>
          <Text style={{ marginLeft: 5, marginTop: 10, color: '#000' }}>{item.city},{item.street_name}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>

          <Text style={{ marginLeft: -8, marginTop: 10, color: '#000' }}>
            <Entypo
              name="mail"
              size={18}
              color="#1a6997"
              style={{ marginRight: 18 }}
            />
          </Text>
          <Text style={{ marginLeft: 5, marginTop: 10, color: '#000' }}> {item.email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Image_view: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderLeftColor: '#166795',
    borderLeftWidth: 7,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    marginLeft: 5,
    marginRight: 5,
  },
  Text: {
    flex: 1,
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
