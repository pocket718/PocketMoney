import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];

const DropdownComponent = props => {
  const { data, dropdownLabel, width, toSelectFn, endIcon } = props;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // on change
  React.useEffect(() => {
    if (value) {
      // console.log('value >>', value);
      if (value.value) {
        toSelectFn(value.value);
      } else {
        toSelectFn && toSelectFn(value);
      }
    }
  }, [value]);

  //on load
  React.useEffect(() => {
    setValue(data[0]);
    toSelectFn && toSelectFn(data[0]);
  }, [data]);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {dropdownLabel}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={{ ...styles.container, width: width }}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue({
            label: item.value.firstName ? item.value.firstName : item.value,
            value: item.value,
          });
          // setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => endIcon}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE4AB',
    padding: 12,
    marginTop: 20,
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    borderColor: '#BA8357',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#FFE4AB',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#BA8357',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#BA8357',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#BA8357',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#BA8357',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemTextStyle: {
    color: '#BA8357',
  },
});
