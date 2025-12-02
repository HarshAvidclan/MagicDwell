// src/Screens/Buyer/HomeScreen/HomeScreen.tsx
import React from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../../Stores/AuthStore';
import { CommonText, CommonButton } from '../../Common';
import { Colors, Scale } from '../../Constants';

export const HomeScreen: React.FC = () => {
  const { CurrentUser, ClearCurrentUser } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => await ClearCurrentUser(),
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <CommonText bold variant="subheading" color={Colors.TEXT_PRIMARY}>
            Welcome
          </CommonText>
          <CommonText variant="body" color={Colors.TEXT_SECONDARY}>
            {CurrentUser?.AppUser.Name || 'User'}
          </CommonText>
        </View>

        {/* User Info Card */}
        <CommonText semibold variant="body" color={Colors.TEXT_PRIMARY}>
          Account Details
        </CommonText>

        <View style={styles.infoRow}>
          <CommonText variant="caption" color={Colors.TEXT_SECONDARY}>
            Phone:
          </CommonText>
          <CommonText variant="caption" color={Colors.TEXT_PRIMARY}>
            {CurrentUser?.AppUser.PhoneNumber || 'N/A'}
          </CommonText>
        </View>

        <View style={styles.infoRow}>
          <CommonText variant="caption" color={Colors.TEXT_SECONDARY}>
            Email:
          </CommonText>
          <CommonText variant="caption" color={Colors.TEXT_PRIMARY}>
            {CurrentUser?.AppUser.Email || 'N/A'}
          </CommonText>
        </View>

        <View style={styles.infoRow}>
          <CommonText variant="caption" color={Colors.TEXT_SECONDARY}>
            Role:
          </CommonText>
          <CommonText variant="caption" color={Colors.PRIMARY_500}>
            {CurrentUser?.Roles?.[0] || 'N/A'}
          </CommonText>
        </View>

        {/* Logout Button */}
        <CommonButton
          title="Logout"
          variant="primary"
          onPress={handleLogout}
          backgroundColor={Colors.ERROR_500}
          textColor={Colors.WHITE}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_100,
  },
  content: {
    padding: Scale.SCALE_16,
    gap: Scale.SCALE_24,
  },
  header: {
    gap: Scale.SCALE_4,
  },
  card: {
    padding: Scale.SCALE_20,
    gap: Scale.SCALE_12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
