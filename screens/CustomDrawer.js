import { StyleSheet, Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { t } from 'i18next'
import { useTranslation } from "react-i18next"
import { AuthContext } from '../context/AuthContext'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale } from 'react-native-size-matters'

const CustomDrawer = (props) => {
    const { t } = useTranslation()
    const { userInfo } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ marginLeft: 5, flexDirection: 'row', marginRight: 15, marginTop: scale(21), marginBottom: scale(19) }}>
                            <Text>
                                <Icons
                                    name="hand-wave-outline"
                                    color="#1a6997"
                                    size={45}
                                />
                            </Text>
                            {userInfo.token ?
                                <Text style={styles.title}>{t('common:Hello')} {userInfo.first_name}!</Text>
                                :
                                <Text style={styles.title}>{t('common:HelloThere')}</Text>
                            }
                        </View>
                    </View>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>

    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        borderBottomColor: '#DAE1E7',
        borderBottomWidth: 2,
        // marginBottom: 20,
    },
    userInfoSection: {
        paddingLeft: 23,
    },
    title: {
        fontSize: scale(26),
        // marginTop: scale(21),
        // fontWeight: '800',
        color: '#1570a5',
        marginLeft: 12,
        fontFamily: 'Poppins-Medium',
    },
})