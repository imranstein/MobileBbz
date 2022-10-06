import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { IMAGE_URL } from '../config';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const NewsItem = ({ item }) => {
    const navigation = useNavigation();
    const media = item.media;
    const source = { html: item.content };
    const { width } = useWindowDimensions();

    return (

        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('NewsDetail', {
                    paramKey: item.id,
                })}>
                {media != null ? <View style={styles.image}>
                    <Image
                        style={{ width: '100%', height: 245 }}
                        source={{ uri: `${IMAGE_URL}${item.media.file_path}` }}
                    />
                </View> : <View style={styles.image}><Image
                    style={{ width: '100%', height: 245 }}
                    source={require('../assets/searchBackground.png')}
                /></View>}


                <View style={styles.date}>
                    <Text style={styles.dateText}>
                        {moment(item.created_at).format('DD/MM/YY')}
                    </Text>
                </View>

                <View style={styles.title}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
                <View style={styles.description}>
                    {/* {/* <Text style={styles.descriptionText}>{item.content}</Text>  */}
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: item.content || '' }}
                        enableExperimentalMarginCollapsing={true}
                        enableExperimentalGhostLinesPrevention={true}
                        baseStyle={{
                            color: '#5E6D77',
                            textAlign: 'justify',
                            fontSize: '13px',
                            // marginRight: '4%',
                        }}
                    />
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // elevation: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginTop: 32,
    },
    image: {
        flex: 1,
        marginBottom: 25,
    },
    Text: {
        flex: 1,
        flexDirection: 'column',
        color: '#000',
    },
    ImageBackground: {
        opacity: 0.3,
    },
    date: {
        marginBottom: 7,
        // marginLeft: '2%',
        flexDirection: 'row',
    },
    dateText: {
        fontSize: RFPercentage(2.2),
        color: '#1a6997',
    },
    title: {
        // marginBottom: 10,
        flexDirection: 'row',
        // marginLeft: '2%',
    },
    titleText: {
        fontSize: RFPercentage(2.4),
        color: '#000',
        fontWeight: 'bold',
    },
    description: {
        // marginBottom: 20,
        flexDirection: 'row',
        maxHeight: 85,
        // marginLeft: '2%',
    },
    descriptionText: {
        fontSize: RFPercentage(2.4),
        color: '#5E6D77',
    },
});

export default NewsItem;
