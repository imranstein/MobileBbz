import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BASE_URL, IMAGE_URL } from '../config';
import moment, { relativeTimeRounding } from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Progress from 'react-native-progress';
import { t } from 'i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CountryPicker from 'react-native-country-picker-modal';
import CheckBox from '@react-native-community/checkbox';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Spinner from 'react-native-loading-spinner-overlay';







const BookingScreen = ({ route }) => {

    React.useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            console.log('Refreshed');
        });
        return focusHandler;
    }, [navigation]);


    const validationSchema = Yup.object().shape({
        salutation: Yup.string()
            .required(t('common:SaluteIsRequired')),
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
        identification_number: Yup.string()
            .required(t('common:IdentificationNumberIsRequired'))
            .min(5, t('common:IdentificationNumberMustBeAtLeast5Characters'))
            .matches(/^[a-zA-Z0-9 ]+$/, t('common:IdentificationNumberMustBeAlphaNumeric')),
        mother_tongue: Yup.string()
            .required(t('common:MotherTongueIsRequired')),
        country_of_birth: Yup.string()
            .required(t('common:CountryOfBirthIsRequired')),
        birth_place: Yup.string()
            .required(t('common:BirthPlaceIsRequired'))
            .min(2, t('common:BirthPlaceMustBeAtLeast2Characters'))
            .matches(/^[a-zA-Z ]+$/, t('common:BirthPlaceMustBeAlphabetical')),
        telephone: Yup.string()
            .min(10, t('common:PhoneMustBeAtLeast9Characters'))
            .max(15, t('common:PhoneMustBeAtMost15Characters'))
            .matches(/^[0-9]+$/, t('common:PhoneMustBeNumeric')),
        phone: Yup.string()
            .required(t('common:PhoneIsRequired'))
            .min(10, t('common:PhoneMustBeAtLeast9Characters'))
            .max(15, t('common:PhoneMustBeAtMost15Characters'))
            .matches(/^[0-9]+$/, t('common:PhoneMustBeNumeric')),
        address: Yup.string()
            .required(t('common:AddressLine1IsRequired'))
            .matches(/^[a-zA-Z0-9]/, t('common:AddressMustStartWithLetterOrNumber'))
            .min(2, t('common:AddressLine1MustBeAtLeast2Characters')),
        address2: Yup.string()
            .required(t('common:StreetIsRequired'))
            .matches(/^[a-zA-Z0-9]/, t('common:AddressMustStartWithLetterOrNumber'))
            .min(2, t('common:StreetMustBeAtLeast2Characters')),
        city: Yup.string()
            .required(t('common:CityIsRequired'))
            .matches(/^[a-zA-Z]/, t('common:CityMustStartWithLetter'))
            .matches(/^[a-zA-Z ]+$/, t('common:CityMustBeAlphabetical'))
            .min(2, t('common:CityMustBeAtLeast2Characters')),

        zip_code: Yup.string()
            .required(t('common:ZipCodeIsRequired'))
            .min(4, t('common:ZipCodeMustBeAtLeast4Characters'))
            .matches(/^[0-9]+$/, t('common:ZipCodeMustBeNumeric'))
            .max(10, t('common:ZipCodeMustBeAtMost10Characters')),

        country: Yup.string()
            .required(t('common:CountryIsRequired')),

    }).strict(true);

    const navigation = useNavigation();
    const { userInfo } = useContext(AuthContext);
    const slug = route.params.slug;
    const location = route.params.location;
    const city_name = route.params.city;
    const country_name = route.params.country;
    const street_name = route.params.street_name;
    const name = route.params.name;
    const examDate = route.params.examDate;
    const examTime = route.params.examTime;
    const price = route.params.price;
    const event_id = route.params.id;
    const term = route.params.term;
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [identification_number, setIdentificationNumber] = useState('');
    const [country_of_birth, setCountryOfBirth] = useState('');
    const [mother_tongue, setMotherTongue] = useState('');
    const [telephone, setTelephone] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    // const [city, setCity] = useState('');
    const [zip_code, setZipCode] = useState('');
    // const [country, setCountry] = useState('');
    const [salutation, setSalutation] = useState('');
    const [academic_title, setAcademicTitle] = useState('');
    const [term_conditions, setTermsConditions] = useState(false);
    const [term_conditions_1, setTermsConditions1] = useState(false);
    const [term_conditions_2, setTermsConditions2] = useState(false);
    const [birthday, setBirthday] = useState();
    const [birth_place, setBirthPlace] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [co, setCo] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [id_proof, setIdProof] = useState('');
    const [payment_gateway, setPaymentGateway] = useState(null);
    const [result, setResult] = useState('');
    const [motherTongueData, setMotherTongueData] = useState([]);
    const [paymentError, setPaymentError] = useState(false);
    const [idProofError, setIdProofError] = useState(false);
    const [termsError, setTermsError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [loading, setLoading] = useState(false);


    //
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
    //images id
    const data = new FormData();

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            maxHright: 200,
            maxWidth: 200,
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
        }
    }
    const openGallery = async () => {
        const result = await launchImageLibrary(options);
        console.log(result.assets[0]);
        data.append('id_proof', {
            uri: result.assets[0].uri,
            type: result.assets[0].type,
            name: result.assets[0].fileName,
        });
        setIdProof(result.assets[0].fileName);
        axios.post(`${BASE_URL}/bookingImage`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // Authorization: 'Bearer ' + userInfo.token,
            }
        }).then((response) => {
            if (response.data.status == 1) {
                console.log(response.data);
                setIdProofError(false);
            } else {
                console.log(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    // const remove = async () => {
    //     const { data } = await axios.post(`${BASE_URL}/removeBooking/${code}`
    //     ).then((res) => {
    //         console.log(res.data);
    //         console.log('here is a success');
    //     }).catch((err) => {
    //         console.log(err);
    //         console.log('error');
    //     })
    // }
    //motherTongue
    const getMotherTongue = async () => {
        const { data } = await axios
            .get(`${BASE_URL}/motherTongue`, {
            });
        console.log(data);
        setMotherTongueData(data);
    };
    useEffect(() => {
        getMotherTongue();
    }, [])
    if (userInfo.token) {
        const getData = async () => {
            const { data } = await axios
                .get(`${BASE_URL}/profile`, {
                    headers: {
                        Authorization: 'Bearer ' + userInfo.token,
                    },
                });
            setResult(data);
            setFirstName(userInfo.first_name);
            setLastName(userInfo.last_name);
            setEmail(userInfo.email);
            setTelephone(data.telephone);
            setPhone(data.phone);
            setAddress(data.address);
            setCity(data.city);
            setAddress2(data.address2);
            // setCountry(data.country);
            setZipCode((data.zip_code).toString());
            setBirthday(data.birthday);
            console.log('name', data.first_name);
            console.log(data);
            console.log('BirthDay', birthday);
            console.log('phone', phone);
        };

        useEffect(() => {
            getData();

        }, [])
    }
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [date, setDate] = useState(new Date());
    //payment 
    var payments = [
        // { label: '', value: '' },
        { label: 'Paypal', value: 'paypal' },
        { label: 'stripe', value: 'stripe' },
    ]

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate);
        setBirthday(currentDate);
        console.log(birthday);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const book = (event_id, salutation, academic_title, first_name, last_name, identification_number, email, birthday, birth_place, country_of_birth, mother_tongue, telephone, phone, bamf_id, address_line_1, street, city, zip_code, country, id_proof, payment_gateway, term_conditions, term_conditions_1, term_conditions_2, price,) => {
        // console.log('here');
        //setLoading(true);

        // console.log(event_id, salutation, academic_title, first_name, last_name, identification_number, email, birthday, birth_place, country_of_birth, mother_tongue, telephone, phone, bamf_id, address_line_1, street, city, zip_code, country, id_proof, payment_gateway, term_conditions, term_conditions_1, term_conditions_2, price);
        if (id_proof == '') {
            setIdProofError(true);
            //setLoading(false);

        }
        else if (birthday == undefined) {
            setBirthDateError(true);
            //setLoading(false);


        }
        else if (payment_gateway == null) {
            setPaymentError(true);
            //setLoading(false);

        } else if (term_conditions == false) {
            setTermsError(true);
            //setLoading(false);


        } else if (term_conditions_1 == false) {
            setTermsError(true);
            //setLoading(false);


        }
        else if (term_conditions_2 == false) {
            setTermsError(true);
            //setLoading(false);


        }

        else {
            setLoading(true);
            axios.post(`${BASE_URL}/register-exam`, {
                event_id: event_id,
                salutation: salutation,
                academic_title: academic_title,
                first_name: first_name,
                last_name: last_name,
                identification_number: identification_number,
                email: email,
                birth_date: birthday,
                birth_place: birth_place,
                country_of_birth: country_of_birth,
                mother_tongue: mother_tongue,
                telephone: telephone,
                phone: phone,
                bamf_id: bamf_id,
                address_line_1: address_line_1,
                street: street,
                city: city,
                zip_code: zip_code,
                country: country,
                id_proof: id_proof,
                payment_gateway: payment_gateway,
                term_conditions_1: term_conditions_1,
                term_conditions_2: term_conditions_2,
                term_conditions: term_conditions,
                price: price,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    // Authorization: 'Bearer ' + userInfo.token,
                }
            }).then((response) => {
                if (response.data.status == 1) {
                    console.log(response.data);
                    // alert(response.data.message);
                    setLoading(false);
                    alert(t('common:BookedSuccessfully'));
                    if (response.data.gateway == 'stripe') {
                        //setLoading(false);

                        navigation.navigate('StripePayment'
                            , {
                                amount: response.data.amount,
                                code: response.data.code,
                                event_id: response.data.event_id,
                                gateway: response.data.gateway,
                                location: location,
                                slug: slug,
                                examDate: examDate,
                                examTime: examTime,
                                city_name: city_name,
                                email: email,
                                phone: phone,
                                city: city,
                                address: address_line_1,
                                zip_code: zip_code,
                                country: country,
                                name: first_name + ' ' + last_name,
                            }
                        );
                        console.log(response.data.gateway);
                    } else if (response.data.gateway == 'paypal') {
                        // console.log(response.data.gateway);
                        //setLoading(false);

                        navigation.navigate('PaypalPayment'
                            , {
                                amount: response.data.amount,
                                code: response.data.code,
                                event_id: response.data.event_id,
                                gateway: response.data.gateway,
                                location: location,
                                slug: slug,
                                examDate: examDate,
                                examTime: examTime,
                                city_name: city_name,
                            }
                        );
                        // console.log(response.data.gateway);
                        // }

                    }
                } else {
                    setLoading(false);
                    console.log(response.data);
                    if (country_of_birth == '') {
                        alert('Please Choose Country of birth', [{
                            text: t('common:OK'),
                            onPress: () => {
                                navigation.navigate('Home');
                            }
                        }]);
                        //setLoading(false);

                    } else if (birthday == undefined) {
                        // alert('Please Choose Birthday', [{
                        //     text: t('common:OK'),
                        //     onPress: () => {
                        //         navigation.navigate('Home');
                        //     }
                        // }]);
                        setLoading(false);
                        setBirthDateError(true);
                        //setLoading(false);

                    }
                    else if (id_proof == '') {
                        setLoading(false);
                        // alert('Please Choose Id Proof', [{
                        //     text: t('common:OK'),
                        //     onPress: () => {
                        //         navigation.navigate('Home');
                        //     }
                        // }]);
                        setIdProofError(true);
                        //setLoading(false);

                    } else if (country == '') {
                        setLoading(false);
                        alert('Please Choose Country', [{
                            text: t('common:OK'),
                            onPress: () => {
                                navigation.navigate('Home');
                            }
                        }]);
                        //setLoading(false);

                    }
                    else if (payment_gateway == null) {
                        setLoading(false);
                        setPaymentError(true);
                        //setLoading(false);

                    }
                    else if (term_conditions == false) {
                        setLoading(false);
                        setTermsError(true);
                        //setLoading(false);

                    } else if (term_conditions_1 == false) {
                        setLoading(false);
                        setTermsError(true);
                        //setLoading(false);

                    }
                    else if (term_conditions_2 == false) {
                        setLoading(false);
                        setTermsError(true);
                        //setLoading(false);

                    } else if (response.data.message ==
                        'Email already exists') {
                        setLoading(false);
                        alert(t('common:EmailAlreadyExists'));
                        //setLoading(false);

                    }
                    else if (response.data.message == 'Phone already exists') {
                        setLoading(false);
                        alert(t('common:PhoneAlreadyExists'));
                        //setLoading(false);

                    }
                    else {
                        setLoading(false);
                        alert(t('common:YouHaveAlreadyRegisteredForthisEvent'), [{
                            text: t('common:OK'),
                            onPress: () => {
                                navigation.navigate('Home');
                            }
                        }]);
                        //setLoading(false);

                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    // if (userInfo.token) {
    const authBook = (event_id, salutation, academic_title, first_name, last_name, identification_number, email, birthday, birth_place, country_of_birth, mother_tongue, telephone, phone, bamf_id, address_line_1, street, city, zip_code, country, id_proof, payment_gateway, term_conditions, term_conditions_1, term_conditions_2, price,) => {
        //setLoading(true);

        console.log(event_id, salutation, academic_title, first_name, last_name, identification_number, email, birthday, birth_place, country_of_birth, mother_tongue, telephone, phone, bamf_id, address_line_1, street, city, zip_code, country, id_proof, payment_gateway, term_conditions, term_conditions_1, term_conditions_2, price);
        console.log(payment_gateway);
        if (id_proof == '') {
            console.log('empty id');
            setIdProofError(true);
            //setLoading(false);


        }
        else if (birthday == '') {
            setBirthDateError(true);
            //setLoading(false);

        }
        else if (payment_gateway == null) {
            console.log('her is e');
            setPaymentError(true);
            //setLoading(false);


        } else if (term_conditions == false) {
            console.log('false term');
            setTermsError(true);
            //setLoading(false);


        } else if (term_conditions_1 == false) {
            console.log('false term2');
            setTermsError(true);
            //setLoading(false);


        }
        else if (term_conditions_2 == false) {
            console.log('false term2');
            setTermsError(true);
            //setLoading(false);


        }
        else {
            setLoading(true);
            axios.post(`${BASE_URL}/auth-register-exam`, {
                event_id: event_id,
                salutation: salutation,
                academic_title: academic_title,
                first_name: first_name,
                last_name: last_name,
                identification_number: identification_number,
                email: email,
                birth_date: birthday,
                birth_place: birth_place,
                country_of_birth: country_of_birth,
                mother_tongue: mother_tongue,
                telephone: telephone,
                phone: phone,
                bamf_id: bamf_id,
                address_line_1: address_line_1,
                street: street,
                city: city,
                zip_code: zip_code,
                country: country,
                id_proof: id_proof,
                payment_gateway: payment_gateway,
                term_conditions_1: term_conditions_1,
                term_conditions_2: term_conditions_2,
                term_conditions: term_conditions,
                price: price,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    Authorization: 'Bearer ' + userInfo.token,
                }
            }).then((response) => {
                if (response.data.status == 1) {
                    setLoading(false);
                    console.log(response.data);
                    // alert(response.data.message);
                    alert(t('common:BookedSuccessfully'));
                    if (response.data.gateway == 'stripe') {
                        //setLoading(false);

                        navigation.navigate('StripePayment'
                            , {
                                amount: response.data.amount,
                                code: response.data.code,
                                event_id: response.data.event_id,
                                gateway: response.data.gateway,
                                location: location,
                                slug: slug,
                                examDate: examDate,
                                examTime: examTime,
                                city_name: city_name,
                                email: email,
                                phone: phone,
                                city: city,
                                address: address_line_1,
                                zip_code: zip_code,
                                country: country,
                                name: first_name + ' ' + last_name,
                            }
                        );

                        console.log(response.data.gateway);
                    } else if (response.data.gateway == 'paypal') {
                        // //setLoading(false);
                        setLoading(false);
                        console.log(response.data.gateway);
                        navigation.navigate('PaypalPayment'
                            , {
                                amount: response.data.amount,
                                code: response.data.code,
                                event_id: response.data.event_id,
                                gateway: response.data.gateway,
                                location: location,
                                slug: slug,
                                examDate: examDate,
                                examTime: examTime,
                                city_name: city_name,
                            }
                        );

                        // console.log(response.data.gateway);
                        // }

                    }
                } else {
                    setLoading(false);
                    console.log(response.data);
                    if (country_of_birth == '') {
                        setLoading(false);

                        alert('Please Choose Country of birth', [{
                            text: t('common:OK'),
                            onPress: () => {
                                navigation.navigate('Home');
                            }
                        }]);
                        //setLoading(false);


                    } else if (birthday == undefined) {
                        alert('Please Choose Birthday', [{
                            text: t('common:OK'),
                            onPress: () => {
                                navigation.navigate('Home');
                            }
                        }]);
                        //setLoading(false);


                    }
                    else if (id_proof == '') {
                        // alert('Please Choose Id Proof', [{
                        //     text: t('common:OK'),
                        //     onPress: () => {
                        //         navigation.navigate('Home');
                        //     }
                        // }]);
                        setIdProofError(true);
                        //setLoading(false);


                    }
                    else if (payment_gateway == null) {
                        setPaymentError(true);
                        //setLoading(false);


                    }
                    else if (term_conditions == false) {
                        setTermsError(true);
                        //setLoading(false);


                    } else if (term_conditions_1 == false) {
                        setTermsError(true);
                        //setLoading(false);


                    }
                    else if (term_conditions_2 == false) {
                        setTermsError(true);
                        //setLoading(false);


                    }

                    else {
                        alert(t('common:YouHaveAlreadyRegisteredForthisEvent'), [{
                            text: t('common:OK'),
                            onPress: () => {
                                navigation.navigate('Home');
                            }
                        }]);
                        //setLoading(false);


                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    // }

    console.log(email);

    return (
        <View style={styles.container}>
            {/* <Spinner visible={isloading} /> */}
            <ScrollView>
                <View style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    height: scale(80),
                }}>
                    <Image source={require('../assets/1.png')} style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        marginTop: scale(25),
                        // width: scale(200),
                        // height: scale(20),
                    }} />

                </View>
                <View style={styles.header}>
                    <ImageBackground source={require('../assets/searchBackground.png')}>
                        <Text style={styles.h1}>{slug}</Text>
                        {location != null ?
                            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                                <Text style={{ marginRight: 10, marginLeft: 5, }}>
                                    <Entypo
                                        name="location-pin"
                                        size={18}
                                        color="#fff"
                                        style={styles.icon}
                                    />
                                </Text>
                                <Text style={styles.locationText}>
                                    {location.name} - {city_name}/ {location.street_name}
                                </Text>
                            </View> : <View View style={{ flexDirection: 'column', marginTop: 15, marginBottom: 15 }}>
                                <Text style={{ marginRight: 5, marginLeft: 5, }}>
                                    <Entypo
                                        name="location-pin"
                                        size={18}
                                        color="#000"
                                        style={styles.icon}
                                    />
                                </Text>
                            </View>}
                    </ImageBackground>
                </View>
                <View style={styles.search}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 2 }}>

                        <Text style={styles.title}> {t('common:ExamLevel')}: </Text>
                        <Text style={[styles.value]}> {term} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>

                        <Text style={styles.title}> {t('common:ExamDate')}:   </Text>
                        <Text style={[styles.value]}> {moment(examDate).format('M/D/yyyy (ddd)')} </Text>


                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, paddingBottom: 10,  borderColor: '#EBEBEB',
                                                borderBottomWidth: 1 }}>
                        <Text style={styles.title}> {t('common:ExamTime')}:   </Text>
                        <Text style={[styles.value]}> {examTime} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 0, paddingBottom: 10,
                borderColor: '#EBEBEB',
                borderBottomWidth: 1 }}>
                        <Text style={styles.title}> {t('common:ExaminationFees')}:   </Text>
                        <Text style={[styles.value]}> {price} € </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 2 }}>
                        <Text style={{
                            fontSize: 22,
                            color: '#1a6997',
                            fontWeight: 'bold',
                            marginLeft: 10,
                        }}> {t('common:Total')}:   </Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#000',
                            // marginHorizontal: 10,
                            paddingTop: 5,
                            textAlign: 'right',
                            flex: 1,
                            marginRight: 10,
                        }}> {price} €</Text>

                    </View>
                </View>
                <View style={{ marginTop: 20, marginBottom: 10, backgroundColor: '#fff', width: '90%', marginLeft: '5%' }}>
                    <Text style={styles.descriptionLabel}>{t('common:BookingSubmission')}</Text>
                    <Text style={styles.titleHeader}>{t('common:ContactInformation')}</Text>

                    <View style={styles.wrapper}>
                        <Formik initialValues={{ salutation: '', academic_title: '', first_name: first_name, last_name: last_name, identification_number: '', email: email, birth_place: '', country_of_birth: '', mother_tongue: '', telephone: '', phone: phone, bamf_id: '', address: '', address2: '', city: '', zip_code: '', country: '' }}
                            // <Formik initialValues={{ salutation: '', academic_title: '', first_name: first_name, last_name: last_name, identification_number: '', email: email, birth_place: '', mother_tongue: '', telephone: '', phone: phone, address: address, address2: address2, city: city, zip_code: zip_code }}
                            enableReinitialize={true}
                            // validateOnMount={true}
                            onSubmit={(values) => {
                                // setPaymentError(false);
                                // setTermsError(false);
                                // setBirthDateError(false);
                                // setIdProofError(false);
                                userInfo.token ?

                                    authBook(
                                        event_id,
                                        values.salutation,
                                        values.academic_title,
                                        values.first_name,
                                        values.last_name,
                                        values.identification_number,
                                        values.email,
                                        birthday,
                                        values.birth_place,
                                        country_of_birth,
                                        values.mother_tongue,
                                        values.telephone,
                                        values.phone,
                                        values.bamf_id,
                                        values.address,
                                        values.address2,
                                        values.city,
                                        values.zip_code,
                                        country,
                                        id_proof,
                                        payment_gateway,
                                        term_conditions,
                                        term_conditions_1,
                                        term_conditions_2,
                                        price,
                                    ) : book(
                                        event_id,
                                        values.salutation,
                                        values.academic_title,
                                        values.first_name,
                                        values.last_name,
                                        values.identification_number,
                                        values.email,
                                        birthday,
                                        values.birth_place,
                                        country_of_birth,
                                        mother_tongue,
                                        values.telephone,
                                        values.phone,
                                        values.bamf_id,
                                        values.address,
                                        values.address2,
                                        values.city,
                                        values.zip_code,
                                        country,
                                        id_proof,
                                        payment_gateway,
                                        term_conditions,
                                        term_conditions_1,
                                        term_conditions_2,
                                        price,
                                    );
                            }
                            }
                            validationSchema={validationSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                                <View>
                                    <View style={styles.inputs}>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>{t('common:Salutation')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>

                                            <View style={{
                                                flex: 1,
                                                fontSize: scale(16),
                                                marginTop: '5%',
                                                marginBottom: '5%',
                                                marginLeft: '2%',
                                                borderColor: '#cecece',
                                                borderWidth: 0.5,
                                                borderRadius: 5,
                                                // paddingHorizontal: '%',
                                                width: '90%',
                                                height: 42,
                                                color: '#000',
                                            }}>
                                                <Picker
                                                    itemStyle={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', borderColor: '#c9c9c9', borderWidth: 0.5, borderRadius: 5, marginTop: 4, marginRight: '42.5%' }}
                                                    selectedValue={salutation}
                                                    style={{ height: 60, width: '100%', marginLeft: '-4.5%', marginBottom: '16%', color: '#000', marginTop: '-4%', fontSize: scale(1) }}
                                                    // onValueChange={(itemValue, itemIndex) => setSalutation(itemValue)}
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        setSalutation(itemValue);
                                                        handleChange('salutation')(itemValue);
                                                    }}
                                                    onBlur={handleBlur('salutation')}
                                                    mode="dialog"
                                                    dropdownIconColor="#1570A5"
                                                    dropdownIconRippleColor="#1570A5"
                                                //dropdown icon position


                                                >
                                                    <Picker.Item label={t('common:PleaseSelect')} value="" />
                                                    <Picker.Item label={t('common:Mr')} value="Mr" />
                                                    <Picker.Item label={t('common:Mrs')} value="Mrs" />
                                                    <Picker.Item label={t('common:Ms')} value="Ms" />
                                                </Picker>
                                            </View>
                                        </View>
                                        {errors.salutation && touched.salutation ? (
                                            <Text style={styles.error}>{errors.salutation}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>{t('common:AcademicTitle')}</Text>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={handleChange('academic_title')}
                                                onBlur={handleBlur('academic_title')}
                                                value={values.academic_title}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"

                                            />
                                        </View>
                                        {errors.academic_title && touched.academic_title ? (
                                            <Text style={styles.error}>{errors.academic_title}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.name}>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>{t('common:FirstName')}<Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <TextInput style={{
                                                flex: 1,
                                                fontSize: RFPercentage(2.4),
                                                marginTop: '5%',
                                                marginBottom: '5%',
                                                borderColor: '#cecece',
                                                borderWidth: 0.5,
                                                borderRadius: 5,
                                                marginLeft: '2%',
                                                // paddingHorizontal: '%',
                                                width: 134,
                                                height: 42,
                                                color: '#000',
                                            }}
                                                onChangeText={handleChange('first_name')}
                                                onBlur={handleBlur('first_name')}
                                                value={values.first_name}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                            />
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>{t('common:LastName')}<Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <TextInput style={{
                                                flex: 1,
                                                fontSize: RFPercentage(2.4),
                                                marginTop: '5%',
                                                marginBottom: '5%',
                                                marginLeft: '7%',
                                                borderColor: '#cecece',
                                                borderWidth: 0.5,
                                                borderRadius: 4,
                                                // paddingHorizontal: '%',
                                                width: 134,
                                                height: 42,
                                                color: '#000',
                                            }}
                                                onChangeText={handleChange('last_name')}
                                                onBlur={handleBlur('last_name')}
                                                value={values.last_name}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                            />
                                        </View>

                                    </View>
                                    {errors.first_name && touched.first_name ? (
                                        <Text style={[styles.error, { marginLeft: scale(20) }]}>{errors.first_name}</Text>
                                    ) : null}
                                    {errors.last_name && touched.last_name ? (
                                        <Text style={[styles.error, { marginLeft: scale(20) }]}>{errors.last_name}</Text>
                                    ) : null}
                                    <View style={styles.inputs}>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>{t('common:Email')}<Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <TextInput style={styles.input}
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                            />
                                        </View>
                                        {errors.email && touched.email ? (
                                            <Text style={styles.error}>{errors.email}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>{t('common:IdentificationNumber')}<Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <TextInput style={styles.input}
                                                onChangeText={handleChange('identification_number')}
                                                onBlur={handleBlur('identification_number')}
                                                value={values.identification_number}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                            />
                                        </View>
                                        {errors.identification_number && touched.identification_number ? (
                                            <Text style={styles.error}>{errors.identification_number}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>{t('common:BirthDate')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <View style={{
                                                flex: 1,
                                                fontSize: RFPercentage(2.7),
                                                marginTop: '5%',
                                                marginBottom: '5%',
                                                marginLeft: '2%',
                                                borderColor: '#cecece',
                                                borderWidth: 0.5,
                                                borderRadius: 5,
                                                // paddingHorizontal: '%',
                                                width: '90%',
                                                height: 42,
                                                color: '#000',
                                            }}>
                                                <TouchableOpacity onPress={showDatePicker}>
                                                    {birthday != null ?
                                                        <Text style={{ fontSize: RFPercentage(2.7), color: '#000', marginTop: 10 }}>{moment(birthday).format('DD/MM/YYYY')}</Text> :
                                                        <Text style={{ fontSize: RFPercentage(2.7), color: '#9e9e9e', marginTop: 10 }}>{t('common:PleaseEnter')}</Text>
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
                                        {birthDateError == true ? (
                                            <Text style={[styles.error, { marginLeft: '7%' }]}>{t('common:BirthDateError')}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>{t('common:CountryOfBirth')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <View style={{
                                                marginLeft: '4%',
                                                borderColor: '#cecece',
                                                borderBottomWidth: 0.5,
                                            }}
                                            >
                                                <CountryPicker
                                                    withFilter
                                                    withFlag
                                                    preferredCountries={['DE', 'IN']}
                                                    onSelect={(country) => {
                                                        setCountryOfBirth(country.name);
                                                        handleChange('country_of_birth')(country.name);
                                                        console.log(country.name);

                                                    }
                                                    }
                                                    onBlur={handleBlur('country_of_birth')}
                                                />
                                            </View>
                                            {country_of_birth !== null && (
                                                <Text style={{
                                                    flex: 1,
                                                    fontSize: RFPercentage(2.7),
                                                    marginTop: '5%',
                                                    marginBottom: '5%',
                                                    // marginLeft: '1%',
                                                    borderColor: '#cecece',
                                                    borderWidth: 0.5,
                                                    borderRadius: 5,
                                                    // paddingHorizontal: '%',
                                                    paddingTop: '3%',
                                                    paddingLeft: '2%',
                                                    width: '90%',
                                                    height: 42,
                                                    color: '#000',
                                                }}>{country_of_birth}</Text>
                                            )}
                                        </View>
                                        {errors.country_of_birth && touched.country_of_birth ? (
                                            <Text style={styles.error}>{errors.country_of_birth}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>{t('common:BirthPlace')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <TextInput style={styles.input}
                                                onChangeText={handleChange('birth_place')}
                                                onBlur={handleBlur('birth_place')}
                                                value={values.birth_place}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                            />
                                        </View>
                                        {errors.birth_place && touched.birth_place ? (
                                            <Text style={styles.error}>{errors.birth_place}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>{t('common:MotherTongue')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            {/* <TextInput style={styles.input}
                                    value={mother_tongue}
                                    onChangeText={setMotherTongue} /> */}
                                            <View style={{
                                                flex: 1,
                                                fontSize: scale(16),
                                                marginTop: '5%',
                                                marginBottom: '5%',
                                                marginLeft: '2%',
                                                borderColor: '#cecece',
                                                borderWidth: 0.5,
                                                borderRadius: 5,
                                                // paddingHorizontal: '%',
                                                width: '90%',
                                                height: 42,
                                                color: '#000',
                                            }}>
                                                <Picker
                                                    itemStyle={{ fontSize: RFPercentage(2.7), color: '#A8B0B5', borderColor: '#c9c9c9', borderWidth: 0.5, borderRadius: 5, marginTop: 5 }}
                                                    selectedValue={mother_tongue}
                                                    style={{ height: 60, width: '100%', marginLeft: '-4.5%', marginBottom: '16%', color: '#000', marginTop: '-4%', fontSize: scale(1) }}
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        setMotherTongue(itemValue);
                                                        handleChange('mother_tongue')(itemValue);
                                                    }}
                                                    onBlur={handleBlur('mother_tongue')}
                                                    dropdownIconColor="#1570A5"
                                                    dropdownIconRippleColor="#1570A5"
                                                >
                                                    <Picker.Item
                                                        color='#A8B0B5'
                                                        label={t('common:PleaseEnter')} value="" />
                                                    {motherTongueData.map((item, index) => {
                                                        return (
                                                            <Picker.Item label={item.language} value={item.language} key={index} />
                                                        )
                                                    })}
                                                </Picker>
                                            </View>
                                        </View>
                                        {errors.mother_tongue && touched.mother_tongue ? (
                                            <Text style={styles.error}>{errors.mother_tongue}</Text>
                                        ) : null}
                                    </View>

                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>{t('common:TelePhone')}</Text>
                                            <TextInput style={styles.input}
                                                onChangeText={handleChange('telephone')}
                                                onBlur={handleBlur('telephone')}
                                                value={values.telephone}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                                keyboardType='phone-pad'
                                                keyboardAppearance='dark'
                                            />
                                        </View>
                                        {errors.telephone && touched.telephone ? (
                                            <Text style={styles.error}>{errors.telephone}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            {userInfo.token ?
                                                <Text style={styles.label}>{t('common:Mobile')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text> :
                                                <Text style={styles.label}>{t('common:Mobile')} <Text style={{ color: '#999', fontSize: scale(12) }}>{t('common:PhoneIsPassword')}</Text>:<Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            }
                                            <TextInput style={styles.input}
                                                onChangeText={handleChange('phone')}
                                                onBlur={handleBlur('phone')}
                                                value={values.phone}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                                keyboardType='phone-pad'
                                                keyboardAppearance='dark'
                                            />
                                        </View>
                                        {errors.phone && touched.phone ? (
                                            <Text style={styles.error}>{errors.phone}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.label}>{t('common:PersonalBamfID')}</Text>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={handleChange('bamf_id')}
                                                onBlur={handleBlur('bamf_id')}
                                                value={values.bamf_id}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"

                                            />
                                        </View>
                                        {errors.bamf_id && touched.bamf_id ? (
                                            <Text style={styles.error}>{errors.bamf_id}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => { openGallery() }}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: scale(10) }}>
                                                    <Text style={styles.icon}>
                                                        <Entypo
                                                            name="plus"
                                                            size={25}
                                                            color="#1a6997"
                                                            style={styles.icon}
                                                        />
                                                    </Text>
                                                    <Text style={{ marginRight: scale(20), marginLeft: scale(10), color: "#1a6997", fontWeight: 'bold', fontSize: scale(17) }}>{t('common:UploadId')} <Text style={{ color: 'red', fontSize: scale(20), marginTop: 15 }}>*</Text>
                                                    <Text style={{ color: "#5E6D77", fontWeight: 'bold', fontSize: scale(13),marginLeft: scale(10) }}>{t('common:sizeupto500kb')} </Text></Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <TextInput style={[styles.input, { color: '#1a6997' }]}
                                            value={id_proof}
                                            readOnly={true}
                                            // placeholder={t('common:UploadId')}
                                            placeholderTextColor="#A8B0B5"
                                        />
                                    </View>
                                    {idProofError == true ? (
                                        <Text style={[styles.error, { marginLeft: '7%' }]}>{t('common:IdProofError')}</Text>
                                    ) : null}
                                    <View style={{ flex: 1, marginTop: '5%', marginBottom: '5%' }}>
                                        <Text style={{ marginLeft: '5%', fontSize: RFPercentage(2.5), fontWeight: 'bold', color: '#000' }}>{t('common:Address')}</Text>
                                    </View>

                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>C/o <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <TextInput style={styles.input}
                                                onChangeText={handleChange('address')}
                                                onBlur={handleBlur('address')}
                                                value={values.address}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                            />
                                        </View>
                                        {errors.address && touched.address ? (
                                            <Text style={styles.error}>{errors.address}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>{t('common:Street')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <TextInput style={styles.input}
                                                onChangeText={handleChange('address2')}
                                                onBlur={handleBlur('address2')}
                                                value={values.address2}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                            />
                                        </View>
                                        {errors.address2 && touched.address2 ? (
                                            <Text style={styles.error}>{errors.address2}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>{t('common:City')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <TextInput style={styles.input}
                                                onChangeText={handleChange('city')}
                                                onBlur={handleBlur('city')}
                                                value={values.city}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                            />
                                        </View>
                                        {errors.city && touched.city ? (
                                            <Text style={styles.error}>{errors.city}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>{t('common:PostalCode')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <TextInput style={styles.input}
                                                onChangeText={handleChange('zip_code')}
                                                onBlur={handleBlur('zip_code')}
                                                value={values.zip_code}
                                                placeholder={t('common:PleaseEnter')}
                                                placeholderTextColor="#A8B0B5"
                                                keyboardType='phone-pad'
                                                keyboardAppearance='dark'
                                            />
                                        </View>
                                        {errors.zip_code && touched.zip_code ? (
                                            <Text style={styles.error}>{errors.zip_code}</Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputs}>
                                        <View>
                                            <Text style={styles.label}>{t('common:Country')} <Text style={{ color: 'red', fontSize: scale(18), marginTop: 15 }}>*</Text></Text>
                                            <View style={{
                                                marginLeft: '4%',
                                                borderColor: '#cecece',
                                                borderBottomWidth: 0.5,
                                            }}
                                            >
                                                <CountryPicker
                                                    withFilter
                                                    withFlag
                                                    preferredCountries={['DE', 'IN']}
                                                    onSelect={(country) => {
                                                        setCountry(country.cca2);
                                                        handleChange('country')(country.cca2);
                                                        console.log(country.cca2);
                                                    }
                                                    }
                                                    onBlur={handleBlur('country')}
                                                />
                                            </View>
                                            {country !== null && (
                                                <Text style={{
                                                    flex: 1,
                                                    fontSize: RFPercentage(2.7),
                                                    marginTop: '5%',
                                                    marginBottom: '5%',
                                                    marginLeft: '3%',
                                                    borderColor: '#cecece',
                                                    borderWidth: 0.5,
                                                    borderRadius: 5,
                                                    // paddingHorizontal: '%',
                                                    paddingTop: '3%',
                                                    paddingLeft: '2%',
                                                    width: '90%',
                                                    height: 42,
                                                    color: '#000',
                                                }}>{country}</Text>
                                            )}
                                        </View>
                                        {errors.country && touched.country ? (
                                            <Text style={styles.error}>{errors.country}</Text>
                                        ) : null}
                                    </View>
                                 <View>
                                    <Text style={{ color: '#000', fontSize: scale(20), paddingLeft: 20,paddingTop: 15, 
                                    paddingBottom: 15 }}>
                                        {t('common:SelectPaymentMethod')} 
                                    </Text>
                                        <View style={{ marginHorizontal: 30, marginVertical:10, paddingBottom: 0, flexDirection: 'row',  }}>
                                            <RadioForm
                                                style= {{ display: 'flex', alignItems: 'center', }}
                                                radio_props={payments}
                                                buttonSize={12}
                                                // initial={0}
                                                // formHorizontal={true}
                                                labelColor={'#000000'}
                                                labelStyle={{ 
                                               width:'100%',  paddingBottom:15, fontSize: scale(18), textTransform: 'capitalize',display: 'flex', alignItems: 'center', 
                                                }}
                                                initial={false}
                                                labelHorizontal={true} 
                                                buttonWrapStyle={{marginLeft: 20}}
                                                buttonOuterColor={'#000'}
                                                selectedButtonColor={'#000'}
                                                animation={true}
                                                onPress={(value) => { setPaymentGateway(value) && setPaymentError(false) }}
                                            />
                                        </View>
                                        {paymentError == true ? (
                                            <Text style={[styles.error, { marginLeft: '7%' }]}>{t('common:PaymentError')}</Text>
                                        ) : null}
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 15 }}>
                                            <CheckBox
                                                value={term_conditions}
                                                onPress={() => setTermsConditions(!term_conditions)}
                                                onValueChange={newValue => setTermsConditions(newValue)}
                                                tintColors={{ true: '#1570a5', false: '#000' }}
                                            />
                                            <Text style={{
                                                marginLeft: 10, fontSize: RFPercentage(2.25),
                                                color: '#999',
                                                width: '80%'
                                            }}>{t('common:Terms')}</Text>
                                            {/* {touched.terms && errors.terms && <Text style={styles.error}>{errors.terms}</Text>} */}
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 15 }}>
                                            <CheckBox
                                                value={term_conditions_1}
                                                onPress={() => setTermsConditions1(!term_conditions_1)}
                                                onValueChange={newValue => setTermsConditions1(newValue)}
                                                tintColors={{ true: '#1570a5', false: '#000' }}
                                            />
                                            <Text style={{
                                                marginLeft: 10, fontSize: RFPercentage(2.25),
                                                color: '#999',
                                                width: '80%'
                                            }}>{t('common:Terms1')}</Text>

                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 15 }}>
                                            <CheckBox
                                                value={term_conditions_2}
                                                onPress={() => setTermsConditions2(!term_conditions_2)}
                                                onValueChange={newValue => setTermsConditions2(newValue)}
                                                tintColors={{ true: '#1570a5', false: '#000' }}
                                            />
                                            <Text style={{
                                                marginLeft: 10, fontSize: RFPercentage(2.25),
                                                color: '#999',
                                                width: '80%'
                                            }}>{t('common:Terms2')}</Text>

                                        </View>
                                        {termsError == true ? (
                                            <Text style={[styles.error, { marginLeft: '7%' }]}>{t('common:TermsError')}</Text>
                                        ) : null}
                                    </View>
                                    {loading == false ?
                                        <TouchableOpacity onPress={handleSubmit}
                                            // disabled={!isValid}
                                            style={[styles.submitLabel, { backgroundColor: '#1570a5' }]}>
                                            <Text style={{ color: '#fff' }}>{t('common:PayNow')}</Text>
                                        </TouchableOpacity> :
                                        <TouchableOpacity
                                            //show alret on press
                                            onPress={() => alert(t('common:AlreadyBooking'))}
                                            // disabled={!isValid}
                                            style={[styles.submitLabel, { backgroundColor: '#cecece' }]}>
                                            <Text style={{ color: '#fff' }}>{t('common:PayNow')}</Text>
                                        </TouchableOpacity>}
                                </View>
                            )}
                        </Formik>

                    </View>
                </View>
            </ScrollView >
            <View style={{justifyContent: 'center',  alignSelf: 'flex-end',
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        height: 50,}}>
                <Text style={{
                    fontSize: scale(22),
                    alignSelf: 'center',
                    marginLeft: 30,
                    color: '#000'

                }}>{t('common:Total')} </Text>
                <Text style={{
                    fontSize: scale(20),
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginRight: 10,
                    color: '#1a6997'

                }}
                >
                    {price} €</Text>
                {/* <TouchableOpacity style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: 20 }}
                    onPress={() => {
                        // console.log('here');
                        book(event_id, salutation, academic_title, first_name, last_name, identification_number, email, birthday, birth_place, country_of_birth, mother_tongue, telephone, phone, address, address2, city, zip_code, country, id_proof, payment_gateway, term_conditions, term_conditions_1,term_conditions_2, price);
                    }
                    }>
                    <Text style={styles.submitLabel}>{t('common:PayNow')}</Text>
                </TouchableOpacity> */}
            </View>
        </View >
    )
}

export default BookingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    header: {
        flex: 1,
        backgroundColor: '#1a6997',
        height: 200,
    },
    h1: {
        fontSize: wp('5%'),
        color: '#fff',
        marginHorizontal: 10,
        paddingTop: 12,
    },
    h5: {
        fontSize: 16,
        color: '#fff',
        marginHorizontal: 20,
        paddingTop: 5,
        lineHeight: 20,
    },
    search: {
        width: '94%',
        height: hp('32%'),
        // borderWidth: 0.5,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 10,
        elevation: 1,
        backgroundColor: '#fff',
        marginTop: -90,
        zindex: -1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    titleHeader: {
        fontSize: 13,
        color: '#1a6997',
        marginHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    button: {
        backgroundColor: '#1a6997',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        elevation: 1,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50,
        zindex: -1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    list: {
        width: '94%',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 10,
        elevation: 1,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a6997',
        marginHorizontal: 10,
        paddingTop: 5,
    },
    listSubTitle: {
        fontSize: 16,
        color: '#000',
        marginHorizontal: 10,
        paddingTop: 5,
        marginBottom: 10,
    },
    locationText: {
        fontSize: 15,
        color: "#fff",
        width: '70%',
        fontWeight: '400',
        marginRight: '4%',
    },
    submit: {
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        height: 50,
    },
    submitLabel: {
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    value: {
        fontSize: RFPercentage(2.45),
        fontWeight: '500',
        color: '#000',
        // marginHorizontal: 10,
        paddingTop: 5,
        textAlign: 'right',
        flex: 1,
        marginRight: 7,
    },
    descriptionLabel: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a6997',
        // marginHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#EBEBEB',
        paddingHorizontal:15,
    },
    titleHeader: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#000',
        marginHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 10,
    },
    input: {
        flex: 1,
        fontSize: scale(16),
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: '2%',
        borderColor: '#cecece',
        borderWidth: 0.5,
        borderRadius: 5,
        // paddingHorizontal: '%',
        width: '90%',
        height: '100%',
        color: '#000',
    },
    inputs: {
        marginLeft: '5%',
        marginTop: '2%',
    },
    name: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginTop: '2%',
    }, label: {
        color: '#000',
        fontSize: RFPercentage(2.4),
        marginLeft: '2%',
        textTransform: 'capitalize'
    },
    error: {
        color: 'red',
        marginBottom: 20,
        marginLeft: '2%',
        marginTop: '1.5%'
    },
})