// import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { CardField, StripeProvider } from '@stripe/stripe-react-native';


// const StripePaymentScreen = () => {
//     return (
//         <StripeProvider
//             publishableKey='key'
//             merchantIdentifier='identifier'
//             urlScheme='urlScheme'
//         >
//             <SafeAreaView>
//                 <Text>Stripe Payment Screen</Text>
//                 <StripeTest />
//             </SafeAreaView>
//         </StripeProvider>

//     )
// }
// const StripeTest = () => {
//     const handlePayment = () => { };
//     return (
//         <View>
//             <CardField
//                 postalCodeEnabled={true}
//                 placeholder={{
//                     number: '4242 4242 4242 4242',
//                 }}
//                 cardStyle={{
//                     backgroundColor: '#FFFFFF',
//                     textColor: '#000000',
//                 }}
//                 style={{
//                     width: '100%',
//                     height: 50,
//                     marginVertical: 30,
//                 }}
//                 onCardChange={(cardDetails) => {
//                     console.log('cardDetails', cardDetails);
//                 }}
//                 onFocus={(focusedField) => {
//                     console.log('focusField', focusedField);
//                 }}

//             />
//             <TouchableOpacity
//                 style={{
//                     backgroundColor: '#5469d4',
//                     borderRadius: 5,
//                     height: 40,
//                     width: '100%',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//                 onPress={() => {
//                     handlePayment()
//                     // console.log('Pressed pay');
//                 }}
//             >
//                 <Text style={{ color: 'white', fontWeight: 'bold' }}>Pay</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// export default StripePaymentScreen

// const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StripePaymentScreen = () => {
  return (
    <View>
      <Text>StripePaymentScreen</Text>
    </View>
  )
}

export default StripePaymentScreen

const styles = StyleSheet.create({})