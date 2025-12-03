// src/Types/Navigation.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

// Define all route names as constants
export const Routes = {
  // Guest Routes
  ONBOARDING: 'Onboarding' as const,
  LOGIN: 'Login' as const,
  VERIFY_OTP: 'VerifyOTP' as const,
  ACCOUNT_DETAILS: 'AccountDetails' as const,
  
  // Buyer Routes
  BUYER_TABS: 'BuyerTabs' as const,
  BUYER_HOME: 'BuyerHome' as const,
  BUYER_MESSAGES: 'BuyerMessages' as const,
  BUYER_ADD_LISTING: 'BuyerAddListing' as const,
  BUYER_SAVED: 'BuyerSaved' as const,
  BUYER_PROFILE: 'BuyerProfile' as const,
  
  // Buyer Stack Screens (outside tabs)
  PROPERTY_DETAILS: 'PropertyDetails' as const,
  SEARCH_RESULTS: 'SearchResults' as const,
};

// Guest Stack Routes
export type GuestStackParamList = {
  Onboarding: undefined;
  Login: { phoneNumber?: string } | undefined;
  VerifyOTP: {
    phoneNumber: string;
  };
  AccountDetails: {
    phoneNumber?: string;
    isNewAccount: boolean;
  } | undefined;
};

// Buyer Tab Routes
export type BuyerTabParamList = {
  BuyerHome: undefined;
  BuyerMessages: undefined;
  BuyerAddListing: undefined;
  BuyerSaved: undefined;
  BuyerProfile: undefined;
};

// Buyer Stack Routes (includes tabs and other screens)
export type BuyerStackParamList = {
  BuyerTabs: undefined;
  PropertyDetails: { propertyId: string };
  SearchResults: { query: string };
};

// Navigation prop types for Guest screens
export type OnboardingScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, 'Onboarding'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, 'Login'>;
export type VerifyOTPScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, 'VerifyOTP'>;
export type AccountDetailsScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, 'AccountDetails'>;

// Navigation prop types for Buyer Tab screens
export type BuyerHomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, 'BuyerHome'>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

export type BuyerMessagesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, 'BuyerMessages'>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

export type BuyerAddListingScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, 'BuyerAddListing'>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

export type BuyerSavedScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, 'BuyerSaved'>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

export type BuyerProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, 'BuyerProfile'>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

// Navigation prop types for Buyer Stack screens
export type PropertyDetailsScreenNavigationProp = NativeStackNavigationProp<BuyerStackParamList, 'PropertyDetails'>;
export type SearchResultsScreenNavigationProp = NativeStackNavigationProp<BuyerStackParamList, 'SearchResults'>;