import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import axios from 'axios';
import { BASE_URL, IMAGE_URL } from '../config';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const NewsDetailScreen = React.memo(({ route }) => {
    const [data, setData] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null)
    const [date, setDate] = useState()
    const { width } = useWindowDimensions()

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'TRenderEngineProvider', '']);
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
        console.log(description),

        <View style={styles.container}>

            <ScrollView>
                {image != null ? <View style={styles.image}>
                    <Image
                        style={{ width: '100%', height: 260 }}
                        source={{ uri: `${IMAGE_URL}${image}` }}
                    />
                </View> : <View style={styles.image}><Image
                    style={{ width: '100%', height: 260 }}
                    source={require('../assets/searchBackground.png')}
                /></View>}
                <View style={styles.date}>
                    {date != null ? <Text style={styles.dateText}>
                        {moment(date).format('DD/MM/YY')}
                    </Text> : <Text style={styles.dateText}>
                        {moment(date).format('DD/MM/YY')}
                    </Text>}
                </View>
                <View style={styles.description}>
                    {/* <Text style={styles.descriptionText}>{item.content}</Text> */}
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: description || '' }}
                        enableExperimentalMarginCollapsing={true}
                        baseStyle={{
                            color: '#5E6D77',
                            textAlign: 'justify',
                            fontSize: '13px',
                            // marginRight: '5%',
                            // marginLeft: '2%',
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
        // marginLeft: '2%',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '5%',
    },
    titleText: {
        fontSize: RFPercentage(2.5),
        fontWeight: 'bold',
        color: '#1a6997',
    },
    image: {
        // flex: 1,
        marginBottom: 13,
    },
    date: {
        // marginBottom: 12,
        marginLeft: 10,
        flexDirection: 'row',
    },
    dateText: {
        fontSize: RFPercentage(2.2),
        color: "#1a6997",
        // fontWeight: 'bold',
    },
    description: {
        // marginBottom: 20,
        marginHorizontal: 12,
        flexDirection: 'row',
    },
    descriptionText: {
        fontSize: RFPercentage(2.3),
        color: '#5E6D77',
    },
})