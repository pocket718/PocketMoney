import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DropdownComponent = props => {
  const { dropdownLabel, data, toSelectFn, val } = props;
  const [value, setValue] = useState(val ? val : null);
  const [isFocus, setIsFocus] = useState(false);

  React.useEffect(() => {
    if (value) {
      toSelectFn(value);
    }
  }, [value]);

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
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: 'blue' },
          { color: 'red' },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={false}
        searchable={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `Select ${dropdownLabel}` : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? 'blue' : 'black'}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE4AB',
    width: '45%',
    padding: 12,
    color: '#BA8357',
    marginTop: 15,
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
    color: '#BA8357',
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
    color: '#BA8357',
    fontSize: 16,
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
