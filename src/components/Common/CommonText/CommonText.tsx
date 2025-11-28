// src/Common/CommonText/CommonText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { Colors, Typography } from '../../Constants';

export interface CommonTextProps extends TextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'button';
  color?: string;
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  children: React.ReactNode;
}

export const CommonText: React.FC<CommonTextProps> = ({
  variant = 'body',
  color = Colors.BLACK,
  align = 'left',
  bold = false,
  semibold = false,
  medium = false,
  style,
  children,
  ...rest
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'heading':
        return styles.heading;
      case 'subheading':
        return styles.subheading;
      case 'body':
        return styles.body;
      case 'caption':
        return styles.caption;
      case 'button':
        return styles.button;
      default:
        return styles.body;
    }
  };

  const getFontFamily = (): string => {
    if (bold) return Typography.FONT_FAMILY_BOLD;
    if (semibold) return Typography.FONT_FAMILY_SEMIBOLD;
    if (medium) return Typography.FONT_FAMILY_MEDIUM;
    return Typography.FONT_FAMILY_REGULAR;
  };

  const getFontWeight = (): TextStyle['fontWeight'] => {
    if (bold) return Typography.FONT_WEIGHT_BOLD;
    if (semibold) return Typography.FONT_WEIGHT_SEMIBOLD;
    if (medium) return Typography.FONT_WEIGHT_MEDIUM;
    return Typography.FONT_WEIGHT_REGULAR;
  };

  return (
    <Text
      {...rest}
      style={[
        getVariantStyle(),
        {
          fontFamily: getFontFamily(),
          fontWeight: getFontWeight(),
          color: color,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: Typography.FONT_SIZE_20,
    lineHeight: Typography.LINE_HEIGHT_28,
    letterSpacing: Typography.LETTER_SPACING__4,
  },
  subheading: {
    fontSize: Typography.FONT_SIZE_16,
    lineHeight: Typography.LINE_HEIGHT_24,
  },
  body: {
    fontSize: Typography.FONT_SIZE_15,
    lineHeight: Typography.LINE_HEIGHT_24,
  },
  caption: {
    fontSize: Typography.FONT_SIZE_14,
    lineHeight: Typography.LINE_HEIGHT_20,
  },
  button: {
    fontSize: Typography.FONT_SIZE_16,
    lineHeight: Typography.LINE_HEIGHT_24,
  },
});