import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { t } from 'i18next';
import Icons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import { BASE_URL, IMAGE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// import CountryPicker from "@volkenomakers/react-native-country-picker";
import CountryPicker from 'react-native-country-picker-modal';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale } from 'react-native-size-matters';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const MyProfileScreen = () => {

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required(t('common:FirstNameIsRequired'))
            .min(2, t('common:FirstNameMustBeAtLeast2Characters'))
            .matches(/^[a-zA-Z ]+$/, t('common:FirstNameMustBeAlphabetical')),
        last_name: Yup.string()
            .required(t('common:LastNameIsRequired'))
            .min(2, t('common:LastNameMustBeAtLeast2Characters'))
            .matches(/^[a-zA-Z ]+$/, t('common:LastNameMustBeAlphabetical')),
        email: Yup.string()
            .required(t('common:EmailIsRequired'))
            .email(t('common:EmailIsInvalid'))
            .max(40, t('common:EmailMustBeAtMost40Characters')),
        phone: Yup.string()
            .required(t('common:PhoneIsRequired'))
            .matches(/^[0-9]+$/, t('common:PhoneMustBeNumeric'))
            .min(10, t('common:PhoneMustBeAtLeast9Characters'))
            .max(15, t('common:PhoneMustBeAtMost15Characters')),
        address: Yup.string()
            .required(t('common:AddressLine1IsRequired'))
            .min(2, t('common:AddressLine1MustBeAtLeast2Characters')),
        address2: Yup.string()
            .required(t('common:StreetIsRequired'))
            .min(2, t('common:StreetMustBeAtLeast2Characters')),
        city: Yup.string()
            .required(t('common:CityIsRequired'))
            .matches(/^[a-zA-Z ]+$/, t('common:CityMustBeAlphabetical'))
            .min(2, t('common:CityMustBeAtLeast2Characters')),
        zipCode: Yup.string()
            .required(t('common:ZipCodeIsRequired'))
            .matches(/^[0-9]+$/, t('common:ZipCodeMustBeNumeric'))
            .min(4, t('common:ZipCodeMustBeAtLeast4Characters'))
            .max(6, t('common:ZipCodeMustBeAtMost6Characters')),
        // country: Yup.string()
        //     .required(t('common:CountryIsRequired')),

    }).strict(true);

    //bithday
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        console.log("clicked here");
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const fromHandleConfirm = (date) => {
        // const date1 = moment(date).format('YYYY-MM-DD');
        setBirthday(date);
        console.log("A date has been picked: ", birthday);
        hideDatePicker();
    };

    const [isLoading, setIsLoading] = useState(false);

    const formData = new FormData();

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
        }
    }
    const openGallery = async () => {
        setIsLoading(true);
        const result = await launchImageLibrary(options);
        // console.log(result.assets[0]);
        formData.append('avatar', {
            uri: result.assets[0].uri,
            type: result.assets[0].type,
            name: result.assets[0].fileName,
        });
        // setIdProof(result.assets[0].fileName);
        axios.post(`${BASE_URL}/profileImage`, formData, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
                'Content-Type': 'multipart/form-data',
                // Authorization: 'Bearer ' + userInfo.token,
            }
        }).then((response) => {
            if (response.data.status == 1) {
                console.log('here', response.data);
                setIsLoading(false);
                alert(t('common:ProfileImageUpdatedSuccessfully'));
                navigation.navigate('Main');
                // alert(response.data.message);
            } else {
                console.log('there', response.data);
            }
        }).catch((error) => {
            console.log('here', error);
        });
    }



    const navigation = useNavigation();
    const { userInfo } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState(null);
    const [zipCode, setZipCode] = useState();
    const [country, setCountry] = useState('');
    const [address2, setAddress2] = useState('');
    const [image, setImage] = useState(null);

    // const [show, setShow] = useState(false);
    // const [mode, setMode] = useState('date');
    // const [date, setDate] = useState(new Date());
    const [birthdayError, setBirthdayError] = useState(false);
    const [countryError, setCountryError] = useState(false);


    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    //     setBirthday(currentDate);
    // }

    // const showMode = (currentMode) => {
    //     setShow(true);
    //     setMode(currentMode);
    // }

    const UpdateProfile = (first_name, last_name, email, phone, birthday, address, address2, city, zipCode, country) => {
        // const UpdateProfile = async function (): Promise<boolena> {
        console.log(first_name, last_name, email, phone, birthday, address, address2, city, zipCode, country);
        if (birthday == null) {
            setBirthdayError(true);
        } if (country == null) {
            setCountryError(true);
        }
        else {
            axios.put(`${BASE_URL}/edit-profile/`,
                {
                    first_name: first_name, last_name: last_name,
                    email: email, phone: phone,
                    birthday: birthday, address: address,
                    city: city, zipCode: zipCode,
                    country: country, address2: address2
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + userInfo.token,
                    },
                })
                .then(res => {
                    console.log(res.data);
                    alert(t('common:ProfileUpdated'), t('common:Success'));
                    navigation.navigate('Main');
                    return true;
                })
                .catch(e => {
                    console.log(e);
                    if (e.response.status === 400) {
                        alert(e.response.data.message, 'Error');
                    } else if (e.response.status === 500) {
                        alert('Sorry it is not available', 'Error');
                    }
                    // else if (e.response.status === 422) {

                    //     alert('Please enter a valid data', 'Error');
                    // }
                    else if (birthday == null) {
                        setBirthdayError(true);
                    } else if (country == null) {
                        setCountryError(true);
                    }
                    else if (e.response.status === 423) {
                        alert(t('common:NoChangesMade'));
                    }
                    return false;
                });
        }
    };
    token = userInfo.token;
    console.log(token);
    const getData = async () => {
        const { data } = await axios
            .get(`${BASE_URL}/profile`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
        setData(data);
        // console.log('herr', data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setPhone(data.phone);
        setBirthday(data.birthday);
        setAddress(data.address);
        setCity(data.city);
        const zipCode = data.zip_code;
        if (zipCode != null) {
            setZipCode((zipCode).toString());
        }
        setCountry(data.country);
        setAddress2(data.address2);
        setImage(data.media.file_name);
        console.log('image', image);

    };
    useEffect(() => {
        getData();
    }, [])

    return (
        console.log(zipCode),
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.wrapper}>
                    <View style={styles.image} >
                        <Text>
                            {image != null ? <View style={styles.image1}>
                                <Image
                                    style={{ width: 80, height: 80, borderRadius: 40 }}
                                    source={{ uri: `${IMAGE_URL}/${image}` }}
                                />
                            </View> :

                                <View style={styles.image1}>
                                    {/* <Image
                                        style={{ width: 80, height: 80, borderRadius: 40, }}
                                        source={require('../assets/searchBackground.png')}
                                        />
                                         */}
                                    <Icons name="user" size={100} color="#1a6997" />
                                </View>
                            }
                        </Text>
                        <TouchableOpacity
                            onPress={() => { openGallery() }}
                        >
                            <Text style={styles.imageLabel}>{t('common:EditPicture')}</Text>
                        </TouchableOpacity>
                        <Spinner visible={isLoading} />

                    </View>
                    <Formik initialValues={{
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        phone: phone ?? '',
                        address: address ?? '',
                        address2: address2 ?? '',
                        city: city ?? '',
                        zipCode: zipCode ?? '',
                    }}
                        validateOnMount={true}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            console.log('here');
                            console.log(values);
                            UpdateProfile(
                                values.first_name,
                                values.last_name,
                                values.email,
                                values.phone,
                                birthday,
                                values.address,
                                values.address2,
                                values.city,
                                values.zipCode,
                                country,
                            );
                        }}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                <View style={styles.name}>
                                    <View>
                                        <Text style={styles.label} >{t('common:FirstName')}: <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <TextInput style={{
                                            flex: 1,
                                            // marginBottom: 20,
                                            borderWidth: 1,
                                            borderColor: '#DAE1E7',
                                            borderRadius: 4,
                                            // paddingVertical: 12,
                                            paddingHorizontal: 14,
                                            width: 162,
                                            height: 42,
                                            color: '#000',
                                        }}
                                            onChangeText={handleChange('first_name')}
                                            onBlur={handleBlur('first_name')}
                                            value={values.first_name}
                                            placeholder={t('common:FirstName')}
                                            placeholderTextColor="#A8B0B5" />
                                    </View>
                                    <View>
                                        <Text style={styles.label} >{t('common:LastName')}: <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <TextInput style={{
                                            flex: 1,
                                            // marginBottom: 20,
                                            marginLeft: 20,
                                            borderWidth: 1,
                                            borderColor: '#DAE1E7',
                                            borderRadius: 4,
                                            // paddingVertical: 12,
                                            paddingHorizontal: 14,
                                            width: 162,
                                            height: 42,
                                            color: '#000',
                                        }}
                                            onChangeText={handleChange('last_name')}
                                            onBlur={handleBlur('last_name')}
                                            value={values.last_name}
                                            placeholder={t('common:LastName')}
                                            placeholderTextColor="#A8B0B5" />
                                    </View>
                                </View>
                                {errors.first_name && touched.first_name ? (
                                    <Text style={[styles.error, { marginLeft: scale(20) }]}>{errors.first_name}</Text>
                                ) : null}
                                {errors.last_name && touched.last_name ? (
                                    <Text style={[styles.error, { marginLeft: scale(20) }]}>{errors.last_name}</Text>
                                ) : null}
                                <View style={styles.inputs}>
                                    <View>
                                        <Text style={styles.label}>{t('common:Email')}: <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <TextInput style={styles.input}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email.trim()}
                                            placeholder={t('common:Email')}
                                            editable={false}
                                            placeholderTextColor="#A8B0B5" />
                                    </View>
                                </View>
                                {errors.email && touched.email ? (
                                    <Text style={styles.error}>{errors.email}</Text>
                                ) : null}
                                <View style={styles.inputs}>
                                    <View>
                                        <Text style={styles.label}>{t('common:Phone')}: <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <TextInput style={styles.input}
                                            onChangeText={handleChange('phone')}
                                            onBlur={handleBlur('phone')}
                                            value={values.phone}
                                            placeholder={t('common:Mobile')}
                                            placeholderTextColor="#A8B0B5"
                                            keyboardType='phone-pad'
                                            keyboardAppearance='dark' />
                                    </View>
                                </View>
                                {errors.phone && touched.phone ? (
                                    <Text style={styles.error}>{errors.phone}</Text>
                                ) : null}
                                <View style={styles.inputs}>
                                    <View>
                                        <Text style={styles.label}>{t('common:Birthdate')}: <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <View style={{
                                            borderWidth: 1,
                                            borderColor: '#DAE1E7',
                                            // marginVertical: 10,
                                            borderRadius: 4,
                                            // marginBottom: 20,
                                            justifyContent: 'flex-start',
                                            paddingHorizontal: 14,
                                            // paddingVertical: 12,
                                            color: '#000',
                                            width: '100%',
                                            height: 42,
                                        }}>
                                            <TouchableOpacity onPress={showDatePicker}>
                                                {birthday != null ?
                                                    <Text style={{ fontSize: scale(14), color: '#000', marginTop: 10 }}>{moment(birthday).format('DD/MM/YYYY')}</Text> :
                                                    <Text style={{ fontSize: RFPercentage(2.7), color: '#9e9e9e', marginTop: 10 }}>{t('common:Birthday')}</Text>
                                                }
                                            </TouchableOpacity>
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                maximumDate={new Date(2006, 11, 31)}
                                                minimumDate={new Date(1970, 0, 1)}
                                                onConfirm={fromHandleConfirm}
                                                onCancel={hideDatePicker}
                                            />
                                        </View>
                                    </View>
                                    {birthdayError == true ? (
                                        <Text style={styles.error}>{t('common:BirthDateError')}</Text>
                                    ) : null}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        fontSize: RFPercentage(2.6),
                                        fontWeight: '500',
                                        color: '#000',
                                        // marginHorizontal: 10,
                                        paddingTop: 20,
                                        paddingBottom: 5
                                    }}>{t('common:Address')}</Text>
                                </View>
                                <View style={styles.inputs}>
                                    <View>
                                        <Text style={styles.label}>C/o : <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <TextInput style={styles.input}
                                            onChangeText={handleChange('address')}
                                            onBlur={handleBlur('address')}
                                            value={values.address}
                                            placeholder={t('common:Address')}
                                            placeholderTextColor="#A8B0B5" />
                                    </View>
                                </View>
                                {errors.address && touched.address ? (
                                    <Text style={styles.error}>{errors.address}</Text>
                                ) : null}
                                <View style={styles.inputs}>
                                    <View>
                                        <Text style={styles.label}>{t('common:Street')}: <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <TextInput style={styles.input}
                                            onChangeText={handleChange('address2')}
                                            onBlur={handleBlur('address2')}
                                            value={values.address2}
                                            placeholder={t('common:Street')}
                                            placeholderTextColor="#A8B0B5" />
                                    </View>
                                </View>
                                {errors.address2 && touched.address2 ? (
                                    <Text style={styles.error}>{errors.address2}</Text>
                                ) : null}
                                <View style={styles.inputs}>
                                    <View>
                                        <Text style={styles.label}>{t('common:City')}: <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <TextInput style={styles.input}
                                            onChangeText={handleChange('city')}
                                            onBlur={handleBlur('city')}
                                            value={values.city}
                                            placeholder={t('common:City')}
                                            placeholderTextColor="#A8B0B5" />
                                    </View>
                                </View>
                                {errors.city && touched.city ? (
                                    <Text style={styles.error}>{errors.city}</Text>
                                ) : null}
                                <View style={styles.inputs}>
                                    <View>
                                        <Text style={styles.label}>{t('common:PostalCode')}: <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <TextInput style={styles.input}
                                            onChangeText={handleChange('zipCode')}
                                            onBlur={handleBlur('zipCode')}
                                            value={values.zipCode}
                                            placeholder={t('common:PostalCode')}
                                            placeholderTextColor="#A8B0B5"
                                            keyboardType='phone-pad'
                                            keyboardAppearance='dark' />
                                    </View>
                                </View>
                                {errors.zipCode && touched.zipCode ? (
                                    <Text style={styles.error}>{errors.zipCode}</Text>
                                ) : null}
                                <View style={styles.inputs}>
                                    <View>
                                        <Text style={styles.label}>{t('common:Country')}: <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                        <View style={{
                                            // marginLeft: '4%',
                                            // borderColor: '#cecece',
                                            // borderBottomWidth: 0.5,
                                        }}
                                        >
                                            <CountryPicker
                                                withFilter
                                                withFlag
                                                preferredCountries={['DE', 'IN']}
                                                onSelect={(country) => {
                                                    setCountry(country.cca2);
                                                    // handleChange('country')(country.cca2);
                                                    console.log(country.cca2);
                                                }
                                                }
                                            // onBlur={handleBlur('country')}
                                            />
                                        </View>

                                        <Text style={{
                                            flex: 1,
                                            marginBottom: 20,
                                            borderWidth: 1,
                                            borderColor: '#DAE1E7',
                                            borderRadius: 4,
                                            paddingVertical: 12,
                                            paddingHorizontal: 14,
                                            color: '#000',
                                            width: '100%',
                                            height: 47,
                                            color: '#000',
                                            marginTop: 10,
                                        }}>{country}</Text>

                                    </View>
                                </View>
                                {countryError == true ? (
                                    <Text style={[styles.error, { marginVertical: scale(5) }]}>{t('common:CountryIsRequired')}</Text>
                                ) : null}

                                <View style={styles.inputs}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Change Password')}>
                                        <Text style={styles.changePassword}>{t('common:ChangePassword')}</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <View style={styles.submit}> */}
                                <TouchableOpacity
                                    onPress={handleSubmit}>
                                    <Text style={styles.submitLabel}>{t('common:SaveChanges')}</Text>
                                </TouchableOpacity>
                                {/* </View> */}
                            </View >
                        )}
                    </Formik>
                </View>
            </ScrollView >

        </View >
    );
    // }
};

export default MyProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0EFEF',
        flex: 1,
    },
    wrapper: {
        backgroundColor: '#fff',
        marginTop: 32,
        marginHorizontal: 8,
        borderRadius: 4,
        paddingHorizontal: 15,
        paddingTop: 16,
        paddingBottom: 7,
    },
    name: {
        flexDirection: 'row',
        // marginLeft: '6%',
        // marginTop: '2%',
    },
    image: {
        width: '100%',
        borderColor: '#F0EFEF',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        // marginHorizontal: '5%',
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    imageLabel: {
        fontSize: RFValue(16),
        marginLeft: '5%',
        marginRight: '10%',
        color: '#1a6997',
        borderColor: '#1a6997',
        borderWidth: 2,
        paddingHorizontal: '8%',
        paddingVertical: '2%',
        borderRadius: 4,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
    },
    submit: {
        width: '100%'
    },
    submitLabel: {
        fontSize: RFPercentage(2.7),
        marginVertical: 20,
        marginHorizontal: 20,
        color: '#fff',
        borderColor: '#1a6997',
        backgroundColor: '#1a6997',
        borderWidth: 2,
        paddingVertical: 8,
        borderRadius: 4,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    input: {
        fontSize: scale(14),
        borderWidth: 1,
        borderColor: '#DAE1E7',
        // marginVertical: 10,
        borderRadius: 4,
        // marginBottom: 20,
        justifyContent: 'flex-start',
        paddingHorizontal: 14,
        // paddingVertical: 12,
        color: '#000',
        width: '100%',
        height: 44,
    },
    inputs: {
        // marginLeft: '5%',
        // marginTop: '2%',
    },
    changePassword: {
        fontSize: RFPercentage(2.7),
        marginTop: 40,
        marginBottom: 40,
        color: '#1a6997',
        borderColor: '#1a6997',
        borderWidth: 2,
        paddingVertical: 8,
        width: '100%',
        borderRadius: 4,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    label: {
        fontSize: RFPercentage(2.1),
        color: '#000',
        marginVertical: 15,
    },
    image1: {
        flex: 1,
        marginBottom: 25,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        // marginLeft: '1%',
        marginTop: '3.5%'
    },
});
