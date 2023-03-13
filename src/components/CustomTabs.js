import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FilterIcon from '../assets/svgImages/filterIcon';

const CustomTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeTitle = children[activeTab]?.props?.title;

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {children.map(({ props: { title } }, index) => (
          <TouchableOpacity
            style={[
              styles.tabContainer,
              index === activeTab && styles.tabContainerActive,
            ]}
            onPress={() => setActiveTab(index)}
            key={index}>
            <Text
              style={{
                color: index === activeTab ? '#FFFFFF' : '#8AD3E3',
                fontFamily: 'Avenir',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.filterContainer}>
        <View
          style={{
            width: '33.33%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: '#333333',
              fontSize: 18,
              //fontFamily: 'Montserrat',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {activeTitle}
          </Text>
        </View>
        <View
          style={{
            width: '33.33%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <FilterIcon />
        </View>
      </View>
      <View style={styles.contentContainer}>{children[activeTab]}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    height: '7.5%',
    width: '95%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    //paddingTop: 30,
  },
  filterContainer: {
    height: '8.5%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingVertical: 15,
    //borderBottomWidth: 3,
    //borderBottomColor: 'transparent',
  },
  tabContainerActive: {
    borderBottomColor: '#FFFFFF',
    backgroundColor: '#8AD3E3',
    borderRadius: 4,
  },
  tabText: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    height: '80%',
  },
});

export default CustomTabs;
