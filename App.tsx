import React from 'react';
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
