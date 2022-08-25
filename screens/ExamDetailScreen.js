import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ExamDetailScreen = ({ route }) => {
    return (
        <View>
            <Text>{route.params.paramKey}</Text>
        </View>
    )
}

export default ExamDetailScreen

const styles = StyleSheet.create({})