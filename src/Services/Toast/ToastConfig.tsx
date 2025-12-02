import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../components/Constants';

export const toastConfig = {
  success: (props: any) => (
    <View style={styles.toastWrapper}>
      <View style={[styles.toastContainer, styles.successContainer]}>
        <Text style={styles.messageText} numberOfLines={2}>
          {props.text2 || props.text1}
        </Text>
      </View>
    </View>
  ),

  error: (props: any) => (
    <View style={styles.toastWrapper}>
      <View style={[styles.toastContainer, styles.errorContainer]}>
        <Text style={styles.messageText} numberOfLines={2}>
          {props.text2 || props.text1}
        </Text>
      </View>
    </View>
  ),

  info: (props: any) => (
    <View style={styles.toastWrapper}>
      <View style={[styles.toastContainer, styles.infoContainer]}>
        <Text style={styles.messageText} numberOfLines={2}>
          {props.text2 || props.text1}
        </Text>
      </View>
    </View>
  ),

  warning: (props: any) => (
    <View style={styles.toastWrapper}>
      <View style={[styles.toastContainer, styles.warningContainer]}>
        <Text style={styles.messageText} numberOfLines={2}>
          {props.text2 || props.text1}
        </Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  toastContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  successContainer: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.ALERT_SUCCESS_500,
  },
  errorContainer: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.ALERT_DANGER_500,
  },
  infoContainer: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.PRIMARY_500,
  },
  warningContainer: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.ALERT_WARNING_500,
  },
  messageText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.TEXT_PRIMARY,
    lineHeight: 20,
  },
});