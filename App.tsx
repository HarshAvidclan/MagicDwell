import { useState } from 'react';
import { OnboardingScreen } from './src/components/Guest/Onboarding/OnboardingScreen';
import { Login } from './src/components/Guest/Login';

function App() {
  // const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'login'>(
  //   'onboarding',
  // );

  // if (currentScreen === 'login') {
  //   return <Login />;
  // }

  return <OnboardingScreen onLoginPress={() => {}} />;
}

export default App;
