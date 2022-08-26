import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import axios from 'axios';
import { BASE_URL, IMAGE_URL } from '../config';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const NewsDetailScreen = React.memo(({ route }) => {
    const [data, setData] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState('')
    const [date, setDate] = useState(null)
    const { width } = useWindowDimensions()

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'TRenderEngineProvider','']);
    }, [])

    const id = route.params.paramKey;
    const getData = async () => {
        const { data } = await axios
            .get(`${BASE_URL}/news/${id}`, {});
        setData(data.data);
        setTitle(data.data.title);
        setDescription(data.data.content);
        setImage(data.data.media.file_path);
        setDate(data.data.created_at);

    };
    useEffect(() => {
        getData();
    }, [])

    return (
        // console.log(image),

        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <ScrollView>

                {image != null ? <View style={styles.image}>
                    <Image
                        style={{ width: '96%', height: 230, borderRadius: 2 }}
                        source={{ uri: `${IMAGE_URL}${image}` }}
                    />
                </View> : <View style={styles.image}><Image
                    style={{ width: '96%', height: 200, borderRadius: 2 }}
                    source={require('../assets/searchBackground.png')}
                /></View>}
                <View style={styles.date}>
                    <Text style={styles.dateText}>
                        {moment(date).format('DD/MM/YY')}
                    </Text>
                </View>
                <View style={styles.description}>
                    {/* <Text style={styles.descriptionText}>{item.content}</Text> */}
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: description || '' }}
                        enableExperimentalMarginCollapsing={true}
                        baseStyle={{
                            color: '#15181E',
                            textAlign: 'justify',
                            fontSize: '16px',
                            marginRight: '5%',
                            marginLeft: '2%',
                        }}
                    />
                </View>
            </ScrollView>
        </View >
    )
});

export default NewsDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginLeft: '2%',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1%',
        marginBottom: '5%',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a6997',
    },
    image: {
        // flex: 1,
        marginBottom: 20,
    },
    date: {

        marginBottom: 10,
        flexDirection: 'row',
    },
    dateText: {
        fontSize: 16,
        color: "#1a6997",
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
})