// src/Screens/Guest/OnboardingScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Scale } from '../../Constants';
import { OnboardingContent } from './OnboardingContent';
import { OnboardingImageSection } from './OnboardingImageSection';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import { OnboardingButtons } from './OnboardingButtons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { OnboardingScreenNavigationProp, Routes } from '../../../Types';
import { ONBOARDING_SLIDES, SLIDE_INTERVAL } from './OnboardingData';
import ToastService from '../../../Services/Toast/ToastService';

interface OnboardingScreenProps {}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAnimation = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset fade animation
    fadeAnim.setValue(1);

    // Start new interval
    intervalRef.current = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Change slide
        setCurrentSlide(prev => (prev + 1) % ONBOARDING_SLIDES.length);

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, SLIDE_INTERVAL);
  };

  const stopAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Use useFocusEffect to restart animation when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Screen is focused - start animation
      startAnimation();

      // Cleanup when screen loses focus
      return () => {
        stopAnimation();
      };
    }, []),
  );

  const handleLoginPress = () => {
    stopAnimation();
    navigation.navigate(Routes.LOGIN);
  };

  const handleCreateAccountPress = () => {
    // stopAnimation();
    ToastService.SUCCESS("SignUp");
    // navigation.navigate(Routes.SIGNUP);
  };

  const currentSlideData = ONBOARDING_SLIDES[currentSlide];

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: currentSlideData.backgroundColor },
      ]}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: currentSlideData.backgroundColor },
        ]}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.progressSection}>
            <OnboardingProgressBar
              totalSteps={ONBOARDING_SLIDES.length}
              currentStep={currentSlide}
              activeColor={currentSlideData.activeColor}
            />
          </View>

          <Animated.View style={[styles.textSection, { opacity: fadeAnim }]}>
            <OnboardingContent
              heading={currentSlideData.heading}
              description={currentSlideData.description}
            />
          </Animated.View>

          <Animated.View style={[styles.imageSection, { opacity: fadeAnim }]}>
            <OnboardingImageSection image={currentSlideData.image} />
          </Animated.View>

          <View style={styles.buttonSection}>
            <OnboardingButtons
              onLoginPress={handleLoginPress}
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
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Scale.SCALE_16,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSection: {
    alignSelf: 'stretch',
    marginBottom: Scale.SCALE_20,
  },
});
