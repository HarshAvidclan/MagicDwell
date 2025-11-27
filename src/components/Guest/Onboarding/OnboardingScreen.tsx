import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Scale, Strings } from '../../Constants';
import { OnboardingContent } from './OnboardingContent';
import { OnboardingImageSection } from './OnboardingImageSection';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import { OnboardingButtons } from './OnboardingButtons';

interface OnboardingScreenProps {
  onLoginPress: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onLoginPress,
}) => {
  const handleCreateAccountPress = () => {
    console.log('Create Account pressed');
    // Add your navigation logic here
  };
  // Replace these with your actual images

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.progressSection}>
            <OnboardingProgressBar totalSteps={4} currentStep={0} />
          </View>

          <View style={styles.textSection}>
            <OnboardingContent
              heading={Strings.ONBOARDING.HEADING}
              description={Strings.ONBOARDING.DESCRIPTION}
            />
          </View>

          <View style={styles.imageSection}>
            <OnboardingImageSection />
          </View>

          <View style={styles.buttonSection}>
            <OnboardingButtons
              onLoginPress={onLoginPress}
              onCreateAccountPress={handleCreateAccountPress}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.MAINFOUR_RESIDENTIAL_100,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.MAINFOUR_RESIDENTIAL_100,
  },
  contentWrapper: {
    paddingHorizontal: Scale.SCALE_15,
    paddingTop: 38,
    // width: Scale.SCALE_359,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Scale.SCALE_40,
  },
  progressSection: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  textSection: {
    alignSelf: 'stretch',
    gap: Scale.SCALE_36,
    alignItems: 'center',
  },
  imageSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSection: {
    alignSelf: 'stretch',
    marginTop: 'auto', // Push buttons to bottom
  },
});
