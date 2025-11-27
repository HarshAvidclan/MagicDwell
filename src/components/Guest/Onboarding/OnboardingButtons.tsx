import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Colors, Scale, Typography, Strings } from '../../Constants';

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
      <Pressable style={styles.loginButton} onPress={onLoginPress}>
        <Text style={styles.loginButtonText}>{Strings.ONBOARDING.LOGIN}</Text>
      </Pressable>

      <Pressable
        style={styles.createAccountButton}
        onPress={onCreateAccountPress}
      >
        <Text style={styles.createAccountButtonText}>
          {Strings.ONBOARDING.CREATE_ACCOUNT}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Scale.SCALE_16,
  },
  loginButton: {
    height: Scale.SCALE_48,
    backgroundColor: Colors.PRIMARY_500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  loginButtonText: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontWeight: Typography.FONT_WEIGHT_MEDIUM_500,
    lineHeight: Typography.LINE_HEIGHT_24,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
  },
  createAccountButton: {
    height: 50,
    backgroundColor: Colors.WHITE,
    borderStyle: 'solid',
    borderColor: Colors.PRIMARY_500,
    borderWidth: Scale.BORDER_WIDTH_1_5,
    paddingVertical: Scale.SCALE_8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: Scale.BORDER_RADIUS_100,
    color: Colors.PRIMARY_500,
  },
  createAccountButtonText: {
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontWeight: Typography.FONT_WEIGHT_MEDIUM_500,
    lineHeight: Typography.LINE_HEIGHT_24,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.PRIMARY_500,
  },
});
