import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';
import { Location_URL } from '../config';

const Location = () => {

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: Location_URL }}
                style={{ marginTop: 20 }}
                automaticallyAdjustContentInsets={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                automaticallyAdjustsScrollIndicatorInsets={true}
                renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}

            />
        </View>
    )
}

export default Location

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})