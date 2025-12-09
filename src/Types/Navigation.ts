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

  // Buyer Routes - Post Listing Flow
  BUYER_POST_LISTING_PROPERTY: 'BuyerPostListingProperty' as const,
  BUYER_POST_LISTING_VEHICLE: 'BuyerPostListingVehicle' as const,
  BUYER_LISTING_PREVIEW: 'BuyerListingPreview' as const,
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


  BuyerPostListingProperty: undefined;
  BuyerPostListingVehicle: undefined;
  BuyerListingPreview: undefined;
};

// Navigation prop types for Guest screens
export type OnboardingScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, typeof Routes.ONBOARDING>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, typeof Routes.LOGIN>;
export type VerifyOTPScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, typeof Routes.VERIFY_OTP>;
export type AccountDetailsScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList, typeof Routes.ACCOUNT_DETAILS>;
export type BuyerStackNavigationProp = NativeStackNavigationProp<BuyerStackParamList>;

// Navigation prop types for Buyer Tab screens
export type BuyerHomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, typeof Routes.BUYER_HOME>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

export type BuyerMessagesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, typeof Routes.BUYER_MESSAGES>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

export type BuyerAddListingScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, typeof Routes.BUYER_ADD_LISTING>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

export type BuyerSavedScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, typeof Routes.BUYER_SAVED>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

export type BuyerProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BuyerTabParamList, typeof Routes.BUYER_PROFILE>,
  NativeStackNavigationProp<BuyerStackParamList>
>;

// Navigation prop types for Buyer Stack screens
export type PropertyDetailsScreenNavigationProp = NativeStackNavigationProp<BuyerStackParamList, typeof Routes.PROPERTY_DETAILS>;
export type SearchResultsScreenNavigationProp = NativeStackNavigationProp<BuyerStackParamList, typeof Routes.SEARCH_RESULTS>;

// Add navigation prop types
export type BuyerPostListingPropertyNavigationProp = NativeStackNavigationProp<BuyerStackParamList, typeof Routes.BUYER_POST_LISTING_PROPERTY>;

export type BuyerPostListingVehicleNavigationProp = NativeStackNavigationProp<BuyerStackParamList, typeof Routes.BUYER_POST_LISTING_VEHICLE>;

export type BuyerListingPreviewNavigationProp = NativeStackNavigationProp<BuyerStackParamList, typeof Routes.BUYER_LISTING_PREVIEW>;