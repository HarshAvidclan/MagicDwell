// src/Screens/Guest/OnboardingImageSection.tsx
import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { Scale } from '../../Constants';

interface OnboardingImageSectionProps {
  image: ImageSourcePropType;
}

export const OnboardingImageSection: React.FC<OnboardingImageSectionProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.mainImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: Scale.SCALE_359,
    height: Scale.SCALE_312,
    // borderTopLeftRadius: Scale.BORDER_RADIUS_152,
    // borderTopRightRadius: Scale.BORDER_RADIUS_152,
  },
});