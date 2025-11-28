// src/Navigation/GuestStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GuestStackParamList, Routes } from '../Types/Navigation';
import { LoginScreen, VerifyOTPScreen } from '../components/Guest/Login';
import { OnboardingScreen } from '../components/Guest/Onboarding/OnboardingScreen';

const Stack = createNativeStackNavigator<GuestStackParamList>();

export const GuestStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.ONBOARDING}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Routes.VERIFY_OTP} component={VerifyOTPScreen} />
    </Stack.Navigator>
  );
};
