// src/Navigation/RootNavigator.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../Stores/AuthStore';
import { GuestStackNavigator } from './GuestStackNavigator';
import { BuyerStackNavigator } from './BuyerStackNavigator';
import { ActivityIndicator, View } from 'react-native';

export const RootNavigator: React.FC = () => {
  const { FetchCurrentUser, isAuthenticated, isLoading } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    await FetchCurrentUser();
    setChecking(false);
  };

  if (checking || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <BuyerStackNavigator /> : <GuestStackNavigator />}
    </NavigationContainer>
  );
};
