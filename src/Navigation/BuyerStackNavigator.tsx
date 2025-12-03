// src/Navigation/BuyerStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BuyerTabNavigator } from './BuyerTabNavigator';
import { BuyerStackParamList, Routes } from '../Types/Navigation';

const Stack = createNativeStackNavigator<BuyerStackParamList>();

export const BuyerStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.BUYER_TABS} component={BuyerTabNavigator} />
    </Stack.Navigator>
  );
};