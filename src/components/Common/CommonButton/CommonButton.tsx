// src/Common/CommonButton/CommonButton.tsx
import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Colors, Scale, Typography } from '../../Constants';
import { CommonText } from '..';

export interface CommonButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'custom';
  size?: 'small' | 'medium' | 'large';
  buttonStyle?: ViewStyle;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  loading?: boolean;
  fullWidth?: boolean;
  borderRadius?: number;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  buttonStyle,
  textColor,
  backgroundColor,
  borderColor,
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = true,
  borderRadius,
  disabled,
  ...rest
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.baseButton,
      ...(fullWidth && styles.fullWidth),
      ...(borderRadius && { borderRadius }),
    };

    switch (size) {
      case 'small':
        return { ...baseStyle, ...styles.smallButton };
      case 'medium':
        return { ...baseStyle, ...styles.mediumButton };
      case 'large':
        return { ...baseStyle, ...styles.largeButton };
      default:
        return { ...baseStyle, ...styles.mediumButton };
    }
  };

  const getVariantStyle = (): ViewStyle => {
    if (backgroundColor) {
      return { backgroundColor };
    }

    switch (variant) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return {
          ...styles.outlineButton,
          borderColor: borderColor || Colors.PRIMARY_500,
        };
      case 'ghost':
        return styles.ghostButton;
      case 'custom':
        return {}; // Allow full customization via buttonStyle
      default:
        return styles.primaryButton;
    }
  };

  const getTextColor = (): string => {
    if (textColor) return textColor;
    if (disabled) return Colors.TEXT_DISABLED;

    switch (variant) {
      case 'primary':
        return Colors.WHITE;
      case 'secondary':
      case 'custom':
        return Colors.TEXT_PRIMARY;
      case 'outline':
        return Colors.PRIMARY_500;
      case 'ghost':
        return Colors.PRIMARY_500;
      default:
        return Colors.WHITE;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return Scale.SCALE_19;
      case 'medium':
        return Scale.SCALE_24;
      case 'large':
        return Scale.SCALE_28;
      default:
        return Scale.SCALE_24;
    }
  };

  return (
    <Pressable
      {...rest}
      disabled={disabled || loading}
      style={({ pressed }) => [
        getButtonStyle(),
        getVariantStyle(),
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        buttonStyle,
      ]}
    >
      {leftIcon && (
        <Image
          style={[styles.icon, { width: getIconSize(), height: getIconSize() }]}
          source={leftIcon}
          resizeMode="cover"
        />
      )}
      <CommonText
        variant="button"
        medium
        color={getTextColor()}
        style={styles.buttonText}
      >
        {loading ? 'Loading...' : title}
      </CommonText>
      {rightIcon && (
        <Image
          style={[styles.icon, { width: getIconSize(), height: getIconSize() }]}
          source={rightIcon}
          resizeMode="cover"
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Scale.SCALE_4,
    borderRadius: Scale.SCALE_100,
    overflow: 'hidden',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  smallButton: {
    paddingLeft: Scale.SCALE_8,
    paddingTop: Scale.SCALE_4,
    paddingRight: Scale.SCALE_16,
    paddingBottom: Scale.SCALE_4,
  },
  mediumButton: {
    paddingHorizontal: Scale.SCALE_20,
    paddingVertical: Scale.SCALE_12,
  },
  largeButton: {
    paddingHorizontal: Scale.SCALE_24,
    paddingVertical: Scale.SCALE_16,
  },
  primaryButton: {
    backgroundColor: Colors.PRIMARY_500,
  },
  secondaryButton: {
    backgroundColor: Colors.WHITE,
  },
  outlineButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: Scale.SCALE_1,
    borderStyle: 'solid',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    textAlign: 'center',
  },
  icon: {
    // Size will be set dynamically based on button size
  },
});
