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

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ImageBackground source={require('../assets/searchBackground.png')}>
            <Text style={styles.h1}>Know Who We Are!</Text>
          </ImageBackground>
        </View>
        <View style={styles.search}>
          <Text style={styles.description}>
            The BBZ Language Schools are part of the Kiry Group of Companies,
            which has been working continuously and successfully in the areas of
            training, coaching and implementation of activation and placement
            measures since 1987. As an integration course provider recognized by
            the Federal Office for Migration and Refugees (BAMF), we offer
            courses at all levels at our locations in Koblenz, Bonn,
            Gelsenkirchen and Frankfurt am Main. Our services also include
            job-related German language support.
          </Text>
          <Text style={styles.description}>
            Whether it's a classic integration course with or without literacy
            or specifically for second language learners, or job-related German
            language support - our focus is always on the language learner. With
            our needs-based German courses, experienced German language
            specialists specifically promote the basic skills of reading,
            listening, writing, and speaking.
          </Text>
          <Text style={styles.lastdescription}>
            In addition, we deploy language support staff within various
            placement-oriented measures, e.g. KomBer (job-related language
            course with certificate), PerF or Aktivcenter as well as other
            offers in which the practical use of the German language in a
            professional context is trained or an initial assessment of German
            language skills takes place.
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
