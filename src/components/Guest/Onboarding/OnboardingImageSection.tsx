import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Scale, Images } from '../../Constants';

export const OnboardingImageSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={Images.ONBOARDING_HOME}
        style={styles.mainImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 68,
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
