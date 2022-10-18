import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { t } from 'i18next';
import UpcomingItem from '../util/UpcomingItem';
import PastItem from '../util/PastItem';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from '../config';

const BookingHistoryScreen = () => {
    const navigation = useNavigation();
    const { userInfo } = useContext(AuthContext);
    const [result, setResult] = useState([]);
    const [result2, setResult2] = useState([]);
    const id = userInfo.id;
    const { t } = useTranslation();
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'TRenderHtml']);
    }, [])
    const getData = async () => {
        const { data } = await axios
            .get(`${BASE_URL}/upcoming-exams/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
        setResult(data.data);
        console.log(data);
    };
    const getData2 = async () => {
        const { data } = await axios
            .get(`${BASE_URL}/past-exams/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
        setResult2(data.data);
        console.log(result2);
    };
    useEffect(() => {
        getData();
        getData2();
    }, [])
    const renderItem = ({ item }) => {
        return <UpcomingItem item={item} />;
    };
    const renderItem2 = ({ item }) => {
        return <PastItem item={item} />;
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.h1}>{t('common:UpcomingExams')}</Text>
                </View>
                <View style={styles.upcomingExams}>
                    <FlatList
                        style={{ backgroundColor: '#f5f5f5', padding: 5 }}
                        data={result}
                        numColumns={1}
                        keyExtractor={item => item.id.toString()}
                        // keyExtractor={(item, id) => {
                        //   return id.toString();
                        // }}
                        renderItem={renderItem}
                    />
                </View>
                <View style={styles.header}>
                    <Text style={styles.h1}>{t('common:PastExams')}</Text>
                </View>
                <View style={styles.upcomingExams}>
                    <FlatList
                        style={{ backgroundColor: '#f5f5f5', padding: 5 }}
                        data={result2}
                        numColumns={1}
                        keyExtractor={item => item.id.toString()}
                        // keyExtractor={(item, id) => {
                        //   return id.toString();
                        // }}
                        renderItem={renderItem2}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default BookingHistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    header: {
        flex: 1,
        color: '#1a6997',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    h1: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a6997',
        marginHorizontal: 20,
        paddingTop: 12,
    },
})