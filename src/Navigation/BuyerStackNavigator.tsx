// src/Navigation/BuyerStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BuyerStackParamList, Routes } from '../Types/Navigation';
import { HomeScreen } from '../components/Buyer/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator<BuyerStackParamList>();

export const BuyerStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name={Routes.BUYER_HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};