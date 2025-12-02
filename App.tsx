import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/Navigation';
import { toastConfig } from './src/Services/Toast/ToastConfig';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <RootNavigator />
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
