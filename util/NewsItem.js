import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { IMAGE_URL } from '../config';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const NewsItem = ({ item }) => {
    const navigation = useNavigation();
    const media = item.media;
    const source = { html: item.content };
    const { width } = useWindowDimensions();

    return (

        <View style={styles.container}>
            {media != null ? <View style={styles.image}>
                <Image
                    style={{ width: '96%', height: 230, borderRadius: 2 }}
                    source={{ uri: `${IMAGE_URL}${item.media.file_path}` }}
                />
            </View> : <View style={styles.image}><Image
                style={{ width: '96%', height: 200, borderRadius: 2 }}
                source={require('../assets/searchBackground.png')}
            /></View>}


            <View style={styles.date}>
                <Text style={styles.dateText}>
                    {moment(item.created_at).format('DD/MM/YY')}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('NewsDetail', {
                    paramKey: item.id,
                })}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
            </TouchableOpacity>
            {/* <View style={styles.description}>
                    {/* <Text style={styles.descriptionText}>{item.content}</Text> 
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: item.content || '' }}
                        enableExperimentalMarginCollapsing={true}
                        enableExperimentalGhostLinesPrevention={true}
                        baseStyle={{
                            color: '#15181E',
                            textAlign: 'justify',
                            fontSize: '16px',
                            marginRight: '4%',
                        }}
                    />
                </View> */}



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        marginLeft: '2%',
    },
    image: {
        flex: 1,
        marginBottom: 20,
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
        marginBottom: 10,
        flexDirection: 'row',
    },
    dateText: {
        fontSize: 14,
        color: "#1a6997",
    },
    title: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 15,
        color: "#000",
        fontWeight: 'bold',
    },
    description: {
        marginBottom: 20,
        flexDirection: 'row',
    },
    descriptionText: {
        fontSize: 14,
        color: "#000",
    },
});

export default NewsItem;
