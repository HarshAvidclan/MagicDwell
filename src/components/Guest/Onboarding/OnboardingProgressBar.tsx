import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Scale } from '../../Constants';

interface OnboardingProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

export const OnboardingProgressBar: React.FC<OnboardingProgressBarProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressItem,
            index === 0 && styles.firstItem,
            index === totalSteps - 1 && styles.lastItem,
            index === currentStep && styles.activeItem,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_2,
  },
  progressItem: {
    width: Scale.SCALE_52,
    height: Scale.SCALE_4,
    backgroundColor: Colors.WHITE,
  },
  firstItem: {
    borderTopLeftRadius: Scale.BORDER_RADIUS_4,
    borderBottomLeftRadius: Scale.BORDER_RADIUS_4,
  },
  lastItem: {
    borderTopRightRadius: Scale.BORDER_RADIUS_4,
    borderBottomRightRadius: Scale.BORDER_RADIUS_4,
  },
  activeItem: {
    backgroundColor: Colors.MAINFOUR_RESIDENTIAL_500,
  },
});