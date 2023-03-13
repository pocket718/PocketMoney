







// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import moment from 'moment';
// import Picker from '@react-native-picker/picker';
// const CustomDatePicker = () => {
//   const [selectedYear, setSelectedYear] = useState(moment().year());
//   const [selectedMonth, setSelectedMonth] = useState(moment().month());

//   const years = Array.from({ length: 100 }, (v, i) => moment().year() - i);

//   const months = moment.months().map((month, index) => {
//     return { label: month, value: index };
//   });

//   return (
//     <View style={styles.container}>
//       <Picker
//         style={styles.picker}
//         selectedValue={selectedMonth}
//         onValueChange={itemValue => setSelectedMonth(itemValue)}>
//         {months.map(month => (
//           <Picker.Item
//             label={month.label}
//             value={month.value}
//             key={month.value}
//           />
//         ))}
//       </Picker>
//       <Picker
//         style={styles.picker}
//         selectedValue={selectedYear}
//         onValueChange={itemValue => setSelectedYear(itemValue)}>
//         {years.map(year => (
//           <Picker.Item label={year.toString()} value={year} key={year} />
//         ))}
//       </Picker>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   picker: {
//     width: 100,
//     height: 50,
//     margin: 10,
//   },
// });

// export default CustomDatePicker;

// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import moment from 'moment';

// const CustomDatePicker = () => {
//   const [selectedYear, setSelectedYear] = useState(moment().year());
//   const [selectedMonth, setSelectedMonth] = useState(moment().month());

//   const years = Array.from({ length: 100 }, (v, i) => moment().year() - i);

//   const months = moment.months().map((month, index) => {
//     return { label: month, value: index };
//   });
//   console.log('months >>', months);
//   return (
//     <View style={styles.container}>
//       <DropDownPicker
//         items={months}
//         defaultValue={selectedMonth}
//         value={selectedMonth}
//         containerStyle={styles.picker}
//         style={{ backgroundColor: '#fafafa' }}
//         itemStyle={{ justifyContent: 'flex-start' }}
//         dropDownStyle={{ backgroundColor: '#fafafa' }}
//         onChangeItem={item => setSelectedMonth(item.value)}
//       />
//       <DropDownPicker
//         items={years.map(year => ({ label: year.toString(), value: year }))}
//         defaultValue={selectedYear}
//         value={selectedYear}
//         containerStyle={styles.picker}
//         style={{ backgroundColor: '#fafafa' }}
//         itemStyle={{ justifyContent: 'flex-start' }}
//         dropDownStyle={{ backgroundColor: '#fafafa' }}
//         onChangeItem={item => setSelectedYear(item.value)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   picker: {
//     width: 100,
//     height: 50,
//     margin: 10,
//   },
// });

// export default CustomDatePicker;
