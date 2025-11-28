// src/Types/Navigation.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define all route names as constants
export const Routes = {
  // Guest Routes
  ONBOARDING: 'Onboarding' as const,
  LOGIN: 'Login' as const,
  VERIFY_OTP: 'VerifyOTP' as const,
  ACCOUNT_DETAILS: 'AccountDetails' as const,
};

// Guest Stack Routes
export type GuestStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  VerifyOTP: {
    phoneNumber: string;
  };
  AccountDetails: {
    phoneNumber: string;
    isNewAccount: boolean;
  };
};

// Navigation prop types for each screen
export type OnboardingScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, 'Onboarding'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, 'Login'>;
export type VerifyOTPScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, 'VerifyOTP'>;
export type AccountDetailsScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, 'AccountDetails'>;