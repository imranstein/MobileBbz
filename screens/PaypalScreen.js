import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import axios from 'axios';
import { BASE_URL } from '../config';
import { WebView } from 'react-native-webview';
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const PaypalScreen = ({ route }) => {
    const [approvalUrl, setApprovalUrl] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [paymentId, setPaymentId] = useState(null);
    const [status, setStatus] = useState('');
    const navigation = useNavigation();
    const amount = route.params.amount;
    const code = route.params.code;
    const event_id = route.params.event_id;
    const gateway = route.params.gateway;
    const location = route.params.location;
    const slug = route.params.slug;
    const examDate = route.params.examDate;
    const examTime = route.params.examTime;
    const city_name = route.params.city_name;

    const dataDetail = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `${BASE_URL}/success`,
            "cancel_url": `${BASE_URL}/cancel`
        },
        "transactions": [{
            "amount": {
                "total": amount,
                "currency": "EUR"
            }
        }]
    }

    const finalize = async () => {
        const { data } = await axios.post(`${BASE_URL}/confirm/${gateway}`, {
            code: code,
            amount: amount,
            event_id: event_id,
        }).then((res) => {
            console.log(res.data);
            console.log('success');
        }).catch((err) => {
            console.log(err);
            console.log('error');
        })
    }
    const bookingStatus = async () => {
        const { result } = await axios
            .get(`${BASE_URL}/get-booking/${code}`).then(res => {
                setStatus(res.data.status);
            })
    }
    useEffect(() => {
        bookingStatus();
    }, [status]);


    const getAccessToken = async () => {
        const { data } = await axios.post(`${BASE_URL}/accessToken`)
            .then((response) => {
                setAccessToken(response.data.accessToken);
                console.log(response.accessToken);

            }).catch((error) => {
                console.log(error);
            });
    };
    //     setAccessToken(data.accessToken);
    //     console.log(data.accessToken);
    // };
    useEffect(() => {
        getAccessToken();
    }, [])

    const createPayment = async () => {
        if (status == 'paid') {
            alert('Already Paid');
            navigation.navigate('BookingSuccess'
                , {
                    amount: amount,
                    code: code,
                    event_id: event_id,
                    gateway: gateway,
                    location: location,
                    slug: slug,
                    examDate: examDate,
                    examTime: examTime,
                    city_name: city_name,
                }
            );
        } else {
            const { data } = await axios.post(`https://api.sandbox.paypal.com/v1/payments/payment`, dataDetail, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((response) => {
                    console.log('if ', response.data);
                    setPaymentId(response.data.id);
                    setApprovalUrl(response.data.links[1].href)
                }
                ).catch((error) => {
                    console.log('here', error);
                }
                );
        }
    };
    useEffect(() => {
        createPayment();
    }, [accessToken])

    // const executePayment = async () => {
    //     const { data } = await axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, {
    //         payer_id: "PAYER_ID"
    //     }, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${accessToken}`
    //         }
    //     })
    //         .then((response) => {
    //             console.log(response.data);
    //         }
    //         ).catch((error) => {
    //             console.log(error);
    //         }
    //         );
    // };

    // useEffect
    //     (() => {
    //         if (approvalUrl) {
    //             executePayment();
    //         }
    //     }, [approvalUrl])

    const onNavigationStateChange = (webViewState) => {
        if (webViewState.url.includes(`${BASE_URL}/success`)) {
            console.log('Payment Successful');
            alert('Payment Successful');
            finalize();
            navigation.navigate('BookingSuccess'
                , {
                    amount: amount,
                    code: code,
                    event_id: event_id,
                    gateway: gateway,
                    location: location,
                    slug: slug,
                    examDate: examDate,
                    examTime: examTime,
                    city_name: city_name,
                }
            );
            if (webViewState.url.includes('https://example.com/')) {

                this.setState({
                    approvalUrl: null
                })

                const { PayerID, paymentId } = webViewState.url

                axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: PayerID },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                ).then(res => res.json())
                    .then(response => {
                        console.log('2');
                        console.log("res", response);
                        if (response.state === 'approved') {

                            console.log('Payment Successful');
                            navigation.navigate('BookingSuccess'
                                , {
                                    amount: amount,
                                    // code: code,
                                    // event_id: event_id,
                                    // gateway: gateway,
                                    // location: location,
                                    // slug: slug,
                                    // examDate: examDate,
                                    // examTime: examTime,
                                    // city_name: city_name,
                                }
                            );
                        }
                        else if (response.name == "INVALID_RESOURCE_ID") {
                            console.log('Payment Failed');
                            alert('Payment Failed, Please try again');
                            setApprovalUrl(null);
                            navigation.navigate('BookingScreen');
                        }
                        console.log('success', response.data);
                        console.log(response);
                        console.log('3');


                    }).catch(err => {
                        console.log('there', err)
                    })

            }
        }
        else if (webViewState.url.includes(`${BASE_URL}/cancel`)) {
            console.log('Payment Cancelled');
            alert('Payment Cancelled');
            navigation.navigate('BookingSuccess'
                , {
                    amount: amount,
                    code: code,
                    event_id: event_id,
                    gateway: gateway,
                    location: location,
                    slug: slug,
                    examDate: examDate,
                    examTime: examTime,
                    city_name: city_name,
                }
            );
        }
    }

    return (
        <View style={styles.container}>
            {
                approvalUrl ? <WebView
                    style={{ height: 400, width: 300 }}
                    source={{ uri: approvalUrl }}
                    onNavigationStateChange={onNavigationStateChange}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={false}
                    scalesPageToFit={true}
                /> : <ActivityIndicator size="large" color="#0000ff" />
                // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                //     <Text>Paypal Screen</Text>
                // </View>
            }
        </View>

    )
}

export default PaypalScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})