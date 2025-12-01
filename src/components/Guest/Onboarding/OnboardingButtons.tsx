// src/Components/Shared/OnboardingButtons.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Scale, Strings } from '../../Constants';
import { CommonButton } from '../../Common';

interface OnboardingButtonsProps {
  onLoginPress: () => void;
  onCreateAccountPress: () => void;
}

export const OnboardingButtons: React.FC<OnboardingButtonsProps> = ({
  onLoginPress,
  onCreateAccountPress,
}) => {
  return (
    <View style={styles.container}>
      <CommonButton
        title={Strings.ONBOARDING.LOGIN}
        variant="primary"
        onPress={onLoginPress}
      />

      <CommonButton
        title={Strings.ONBOARDING.CREATE_ACCOUNT}
        variant="outline"
        onPress={onCreateAccountPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Scale.SCALE_16,
    gap: Scale.SCALE_16,
  },
});