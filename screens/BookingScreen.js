import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { IMAGE_URL } from '../config';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Progress from 'react-native-progress';
import { t } from 'i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';


const validationSchema = Yup.object().shape({
    salutation: Yup.string()
        .required('Required'),
    academic_title: Yup.string()
        .required('Required'),
    first_name: Yup.string()
        .required(t('common:FirstNameIsRequired'))
        .min(2, t('common:FirstNameMustBeAtLeast2Characters'))
        .matches(/^[a-zA-Z]+$/, t('common:FirstNameMustBeAlphabetical')),
    last_name: Yup.string()
        .required(t('common:LastNameIsRequired'))
        .min(2, t('common:LastNameMustBeAtLeast2Characters'))
        .matches(/^[a-zA-Z]+$/, t('common:LastNameMustBeAlphabetical')),
    email: Yup.string()
        .required(t('common:EmailIsRequired'))
        .email(t('common:EmailIsInvalid')),
    identification_number: Yup.string()
        .required(t('common:IdentificationNumberIsRequired'))
        .min(2, t('common:IdentificationNumberMustBeAtLeast2Characters'))
        .matches(/^[0-9]+$/, t('common:IdentificationNumberMustBeNumeric')),
    birth_place: Yup.string()
        .required(t('common:BirthPlaceIsRequired'))
        .min(2, t('common:BirthPlaceMustBeAtLeast2Characters')),
    telephone: Yup.string()
        .required(t('common:PhoneIsRequired'))
        .min(9, t('common:PhoneMustBeAtLeast9Characters'))
        .max(15, t('common:PhoneMustBeAtMost15Characters'))
        .matches(/^[0-9]+$/, t('common:PhoneMustBeNumeric')),
    phone: Yup.string()
        .required(t('common:PhoneIsRequired'))
        .min(9, t('common:PhoneMustBeAtLeast9Characters'))
        .max(15, t('common:PhoneMustBeAtMost15Characters'))
        .matches(/^[0-9]+$/, t('common:PhoneMustBeNumeric')),
    address_line_1: Yup.string()
        .required(t('common:AddressLine1IsRequired'))
        .min(2, t('common:AddressLine1MustBeAtLeast2Characters')),
    street: Yup.string()
        .required(t('common:StreetIsRequired'))
        .min(2, t('common:StreetMustBeAtLeast2Characters')),
    city: Yup.string()
        .required(t('common:CityIsRequired'))
        .min(2, t('common:CityMustBeAtLeast2Characters'))
        .matches(/^[a-zA-Z]+$/, t('common:CityMustBeAlphabetical')),
    zip_code: Yup.string()
        .required(t('common:ZipCodeIsRequired'))
        .min(2, t('common:ZipCodeMustBeAtLeast2Characters'))
        .matches(/^[0-9]+$/, t('common:ZipCodeMustBeNumeric')),
    country: Yup.string()
        .required(t('common:CountryIsRequired')),
    terms_conditions: Yup.bool()
        .oneOf([true], t('common:YouMustAcceptTermsAndConditions')),
    terms_conditions_1: Yup.bool()
        .oneOf([true], t('common:YouMustAcceptTermsAndConditions')),


}).strict();






const BookingScreen = ({ route }) => {
    const slug = route.params.slug;
    const location = route.params.location;
    const city = route.params.city;
    const country = route.params.country;
    const street_name = route.params.street_name;
    const name = route.params.name;
    const examDate = route.params.examDate;
    const examTime = route.params.examTime;
    const price = route.params.price;
    const event_id = route.params.id;
    const [birth_date, setBirthdate] = React.useState('');
    const [country_of_birth, setCountryOfBirth] = React.useState('');
    const [mother_tongue, setMotherTongue] = React.useState('');
    const [co, setCo] = React.useState('');
    const [id_proof, setIdProof] = React.useState('');
    const [payment_gateway, setPaymentGateway] = React.useState('');
    const [terms_conditions_1, setTermsConditions1] = React.useState('');
    const [terms_conditions, setTermsConditions] = React.useState('');

    //birthdate
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [date, setDate] = useState(new Date());


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setBirthday(currentDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <ImageBackground source={require('../assets/searchBackground.png')}>
                        <Text style={styles.h1}>{slug} {t('common:Level')}</Text>
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
                                    {location.name} - {city}/ {location.street_name}
                                </Text>
                            </View> : <View View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
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
                        <Text style={[styles.value]}> {slug} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>

                        <Text style={styles.title}> {t('common:ExamDate')}:   </Text>
                        <Text style={[styles.value]}> {examDate} </Text>


                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 10 }}>
                        <Text style={styles.title}> {t('common:ExamTime')}:   </Text>
                        <Text style={[styles.value]}> {examTime} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 2 }}>
                        <Text style={styles.title}> {t('common:ExaminationFee')}:   </Text>
                        <Text style={[styles.value]}> {price} $ </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 2 }}>
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
                            marginRight: 7,
                        }}> {price} $ </Text>

                    </View>
                </View>
                <View style={{ marginTop: 50, marginBottom: 10, backgroundColor: '#fff', height: 400 }}>
                    <Text style={styles.descriptionLabel}>{t('common:BookingSubmission')}</Text>
                    <Text style={styles.titleHeader}>{t('common:ContactInformation')}</Text>

                    <Formik
                        initialValues={{
                            salutation: '',
                            academic_title: '',
                            first_name: '',
                            last_name: '',
                            email: '',
                            identification_number: '',
                            birth_place: '',
                            telephone: '',
                            phone: '',
                            address_line_1: '',
                            street: '',
                            city: '',
                            zip_code: '',
                            country: '',
                            terms_conditions: false,
                            terms_conditions_1: false,
                        }}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            console.log(values);
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                            }, 400);
                        }}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched, isValid }) => (
                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:FirstName')}:   </Text>
                                    <TextInput
                                        style={[styles.value, { flex: 1, marginRight: 10 }]}
                                        onChangeText={handleChange('first_name')}
                                        onBlur={handleBlur('first_name')}
                                        value={values.first_name}
                                    />
                                    {errors.first_name && touched.first_name ? (
                                        <Text style={styles.error}>{errors.first_name}</Text>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:LastName')}:   </Text>
                                    <TextInput
                                        style={[styles.value, { flex: 1, marginRight: 10 }]}
                                        onChangeText={handleChange('last_name')}
                                        onBlur={handleBlur('last_name')}
                                        value={values.last_name}
                                    />
                                    {errors.last_name && touched.last_name ? (
                                        <Text style={styles.error}>{errors.last_name}</Text>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:Email')}:   </Text>
                                    <TextInput
                                        style={[styles.value, { flex: 1, marginRight: 10 }]}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email ? (
                                        <Text style={styles.error}>{errors.email}</Text>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:IdentificationNumber')}:   </Text>
                                    <TextInput
                                        style={[styles.value, { flex: 1, marginRight: 10 }]}
                                        onChangeText={handleChange('identification_number')}
                                        onBlur={handleBlur('identification_number')}
                                        value={values.identification_number}
                                    />
                                    {errors.identification_number && touched.identification_number ? (
                                        <Text style={styles.error}>{errors.identification_number}</Text>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:BirthDate')}:   </Text>
                                    <TouchableOpacity onPress={() => showMode('date')}>
                                        <Text style={{ fontSize: 18, color: '#000', marginTop: 10 }}>{moment(birthday).format('DD/MM/YYYY')}</Text>
                                    </TouchableOpacity>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            timeZoneOffsetInMinutes={0}
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="calendar"
                                            onChange={onChange}
                                        />
                                    )}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:BirthPlace')}:   </Text>
                                    <TextInput
                                        style={[styles.value, { flex: 1, marginRight: 10 }]}
                                        onChangeText={handleChange('birth_place')}
                                        onBlur={handleBlur('birth_place')}
                                        value={values.birth_place}
                                    />
                                    {errors.birth_place && touched.birth_place ? (
                                        <Text style={styles.error}>{errors.birth_place}</Text>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:Telephone')}:   </Text>
                                    <TextInput
                                        style={[styles.value, { flex: 1, marginRight: 10 }]}
                                        onChangeText={handleChange('telephone')}
                                        onBlur={handleBlur('telephone')}
                                        value={values.telephone}
                                    />
                                    {errors.telephone && touched.telephone ? (
                                        <Text style={styles.error}>{errors.telephone}</Text>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:Phone')}:   </Text>
                                    <TextInput
                                        style={[styles.value, { flex: 1, marginRight: 10 }]}
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        value={values.phone}
                                    />
                                    {errors.phone && touched.phone ? (
                                        <Text style={styles.error}>{errors.phone}</Text>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:AddressLine1')}:   </Text>
                                    <TextInput
                                        style={[styles.value, { flex: 1, marginRight: 10 }]}
                                        onChangeText={handleChange('address_line_1')}
                                        onBlur={handleBlur('address_line_1')}
                                        value={values.address_line_1}
                                    />
                                    {errors.address_line_1 && touched.address_line_1 ? (
                                        <Text style={styles.error}>{errors.address_line_1}</Text>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.title}> {t('common:Street')}:   </Text>
                                    <TextInput
                                        style={[styles.value, { flex: 1, marginRight: 10 }]}
                                        onChangeText={handleChange('street')}
                                        onBlur={handleBlur('street')}
                                        value={values.street}
                                    />
                                    {errors.street && touched.street ? (
                                        <Text style={styles.error}>{errors.street}</Text>
                                    ) : null}
                                </View>
                            </View>
                        )}
                    </Formik>

                </View>

            </ScrollView>
            <View style={styles.submit}>
                <Text style={{
                    flex: 0.4,
                    fontSize: 16,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 30,

                }}>{t('common:Fee')} </Text>
                <Text style={{
                    flex: 0.6,
                    fontSize: 24,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginRight: 10,
                    color: '#1a6997'

                }}
                >
                    {/* {price} */}
                    $ </Text>
                <TouchableOpacity style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginRight: 20 }}
                    onPress={() => {

                    }
                    }>
                    <Text style={styles.submitLabel}>{t('common:PayNow')}</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        fontSize: 25,
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
        height: 220,
        // borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
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
        flexDirection: 'row'
    },
    submitLabel: {
        fontSize: 18,
        marginTop: '2%',
        marginBottom: '2%',
        color: '#fff',
        borderColor: '#1a6997',
        backgroundColor: '#1a6997',
        borderWidth: 2,
        paddingHorizontal: '15%',
        paddingVertical: '2%',
        borderRadius: 4,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    value: {
        fontSize: 15,
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
        marginHorizontal: 15,
        paddingTop: 20,
    },
    titleHeader: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#000',
        marginHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 10,
    },
})