import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { Colors } from '../../components/Constants';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={3}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <Text style={styles.successIcon}>✓</Text>
        </View>
      )}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={3}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <Text style={styles.errorIcon}>✕</Text>
        </View>
      )}
    />
  ),

  info: (props: any) => (
    <InfoToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={3}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <Text style={styles.infoIcon}>ℹ</Text>
        </View>
      )}
    />
  ),

  warning: (props: any) => (
    <BaseToast
      {...props}
      style={styles.warningToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={3}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <Text style={styles.warningIcon}>⚠</Text>
        </View>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: Colors.ALERT_SUCCESS_500,
    borderLeftWidth: 6,
    backgroundColor: Colors.WHITE,
    height: 'auto',
    minHeight: 70,
    paddingVertical: 12,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    width: '90%',
  },
  errorToast: {
    borderLeftColor: Colors.ALERT_DANGER_500,
    borderLeftWidth: 6,
    backgroundColor: Colors.WHITE,
    height: 'auto',
    minHeight: 70,
    paddingVertical: 12,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    width: '90%',
  },
  infoToast: {
    borderLeftColor: Colors.PRIMARY_500,
    borderLeftWidth: 6,
    backgroundColor: Colors.WHITE,
    height: 'auto',
    minHeight: 70,
    paddingVertical: 12,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    width: '90%',
  },
  warningToast: {
    borderLeftColor: Colors.ALERT_WARNING_500,
    borderLeftWidth: 6,
    backgroundColor: Colors.WHITE,
    height: 'auto',
    minHeight: 70,
    paddingVertical: 12,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    width: '90%',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  text1: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.TEXT_PRIMARY,
    marginBottom: 4,
  },
  text2: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.TEXT_SECONDARY,
    lineHeight: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  successIcon: {
    fontSize: 24,
    color: Colors.ALERT_SUCCESS_500,
    fontWeight: '700',
  },
  errorIcon: {
    fontSize: 24,
    color: Colors.ALERT_DANGER_500,
    fontWeight: '700',
  },
  infoIcon: {
    fontSize: 24,
    color: Colors.PRIMARY_500,
    fontWeight: '700',
  },
  warningIcon: {
    fontSize: 24,
    color: Colors.ALERT_WARNING_500,
    fontWeight: '700',
  },
});