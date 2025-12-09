// src/Navigation/BuyerStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BuyerTabNavigator } from './BuyerTabNavigator';
import { BuyerStackParamList, Routes } from '../Types/Navigation';
import { BuyerPostListingPropertyScreen } from '../components/Buyer/BuyerPostListingPropertyScreen/BuyerPostListingPropertyScreen';
import { BuyerPostListingVehicleScreen } from '../components/Buyer/BuyerPostListingVehicleScreen/BuyerPostListingVehicleScreen';
import { PostListingModalProvider } from '../contexts/PostListingModalContext';
import { PostListingModalWrapper } from '../components/Buyer/PostListingModalWrapper/PostListingModalWrapper';

const Stack = createNativeStackNavigator<BuyerStackParamList>();

export const BuyerStackNavigator: React.FC = () => {
  return (
    <PostListingModalProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={Routes.BUYER_TABS} component={BuyerTabNavigator} />
        <Stack.Screen
          name={Routes.BUYER_POST_LISTING_PROPERTY}
          component={BuyerPostListingPropertyScreen}
        />

        <Stack.Screen
          name={Routes.BUYER_POST_LISTING_VEHICLE}
          component={BuyerPostListingVehicleScreen}
        />
      </Stack.Navigator>
      {/* Modal Wrapper placed here to be available globally in this stack */}
      <PostListingModalWrapper />
    </PostListingModalProvider>
  );
};