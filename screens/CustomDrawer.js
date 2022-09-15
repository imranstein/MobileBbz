import { StyleSheet, Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { t } from 'i18next'
import { useTranslation } from "react-i18next"
import { AuthContext } from '../context/AuthContext'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const CustomDrawer = (props) => {
    const { t } = useTranslation()
    const { userInfo } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 15, borderBottomColor: '#cecece', borderBottomWidth: 1 }}>
                        <View style={{ marginLeft: 5, flexDirection: 'row', marginRight: 15, marginBottom: 20 }}>
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
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: RFPercentage(3.2),
        marginTop: 12,
        fontWeight: '800',
        color: '#1570a5',
        marginLeft: 15,
        fontFamily: 'Roboto-Medium',
    },
})