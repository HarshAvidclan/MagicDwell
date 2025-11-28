// src/Navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GuestStackNavigator } from './GuestStackNavigator';

export const RootNavigator: React.FC = () => {
  // TODO: Add authentication logic here to switch between stacks
  // For now, we'll use GuestStack
  //   const isAuthenticated = false;
  //   const userRole = 'guest'; // 'guest' | 'buyer' | 'agent' | 'admin'

  //   const renderNavigator = () => {
  //     if (!isAuthenticated) {
  //       return <GuestStackNavigator />;
  //     }

  // TODO: Add other navigators based on user role
  // switch (userRole) {
  //   case 'buyer':
  //     return <BuyerStackNavigator />;
  //   case 'agent':
  //     return <AgentStackNavigator />;
  //   case 'admin':
  //     return <AdminStackNavigator />;
  //   default:
  //     return <GuestStackNavigator />;
  // }

  //     return <GuestStackNavigator />;
  //   };

  return (
    <NavigationContainer>
      <GuestStackNavigator />
    </NavigationContainer>
  );
};
