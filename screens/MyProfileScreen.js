// import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
// import React from 'react';

// const MyProfileScreen = () => {
//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <View style={styles.name}>
//           <View>
//             <Text style={styles.label}>First name</Text>
//             <TextInput style={styles.input} />
//           </View>
//           <View>
//             <Text style={styles.label}>Last name</Text>
//             <TextInput style={styles.input} />
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default MyProfileScreen;

// const styles = StyleSheet.create({
// container: {
//   color: '#999',
//   flex: 1,
// },
// name: {
//   flexDirection: 'row',
//   justifyContent: 'space-evenly',
// },
// label: {
//   alignItems: 'left',
//   fontSize: 18,
// },
// });

import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React from 'react';

const MyProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.name}>
          <View>
            <Text style={styles.label}>First name</Text>
            <TextInput style={styles.input} />
          </View>
          <View>
            <Text style={styles.label}>Last name</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    color: '#999',
    flex: 1,
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
