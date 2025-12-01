import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Scale, Typography } from '../../Constants';

interface OnboardingContentProps {
  heading: string;
  description: string;
}

export const OnboardingContent: React.FC<OnboardingContentProps> = ({
  heading,
  description,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // gap: Scale.SCALE_4,
    alignSelf: 'stretch',
    paddingHorizontal:Scale.SCALE_16
  },
  heading: {
    fontSize: Typography.FONT_SIZE_28,
    letterSpacing: Typography.LETTER_SPACING_TIGHT,
    lineHeight: Typography.LINE_HEIGHT_36,
    fontWeight: Typography.FONT_WEIGHT_EXTRABOLD_800,
    fontFamily: Typography.FONT_FAMILY_EXTRABOLD,
    color: Colors.TEXT_PRIMARY,
    textAlign: 'center',
  },
  description: {
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_MEDIUM_500,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    color: Colors.GRAY_700,
    textAlign: 'center',
  },
});