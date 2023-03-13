import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Avatar } from '@rneui/themed';
import CalenderIcon from '../assets/svgImages/calenderIcon';
import CogIcon from '../assets/svgImages/cogIcon1';

const CustomModal = ({
  modalVisible,
  toggleModal,
  label,
  profile_pic,
  taskTitle,
  duration,
  status,
  formattedDate,
  firstName,
  startFormattedTime,
  endFormattedTime,
  reward,
}) => {
  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={toggleModal}
      transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {/*            
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
           
         
          <Text>{label}</Text> */}
          <View
            style={{
              height: '5%',
              width: '80%',
            }}
          />
          <View
            style={{
              height: '20%',
              width: '80%',
              borderBottomWidth: 0.6,
              borderBottomColor: '#B5B5B5',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={styles.closeButtonText}>{label}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '25%',
              width: '80%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '80%',
                height: '100%',
              }}>
              <View
                style={{
                  height: '40%',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Avatar
                  size={24}
                  rounded
                  source={{
                    uri: profile_pic
                      ? 'https://cogito.sgp1.cdn.digitaloceanspaces.com' +
                        '/' +
                        profile_pic
                      : 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    lineHeight: 19,
                    marginLeft: 5,
                  }}>
                  {firstName}
                </Text>
              </View>
              <View
                style={{
                  height: '30%',
                }}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 16,
                    letterSpacing: 0.2,
                  }}>
                  {taskTitle}
                </Text>
              </View>
              <View
                style={{
                  height: '30%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <CalenderIcon />
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      lineHeight: 16,
                    }}>
                    {formattedDate} | {startFormattedTime} - {endFormattedTime}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '20%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <CogIcon width={'40%'} height={'40%'} />
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  marginLeft: 2,
                  fontWeight: '600',
                  fontSize: 14,
                  letterSpacing: 0.4,
                }}>
                {reward}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FCF7F0',
    //padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: '35%',
    width: '75%',
  },
  closeButton: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // alignSelf: 'center',
    //padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#359DB6',
  },
});
