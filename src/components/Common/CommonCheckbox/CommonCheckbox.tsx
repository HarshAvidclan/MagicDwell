// src/Common/CommonCheckbox/CommonCheckbox.tsx
import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  PressableProps,
  Platform,
} from 'react-native';
import { Colors, Scale, Typography } from '../../Constants';

export interface CommonCheckboxProps extends Omit<PressableProps, 'style'> {
  checked: boolean;
  onToggle: () => void;
  style?: object;
  size?: number; // Width and height of the square
  checkedColor?: string; // Color when checked (fill)
  uncheckedBorderColor?: string; // Border color when unchecked
  borderRadius?: number; // optional override for corner radius
}

export const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
  checked,
  onToggle,
  style,
  size = Scale.SCALE_12, // Default size 12
  checkedColor = Colors.PRIMARY_400,
  uncheckedBorderColor = Colors.GRAY_500,
  ...rest
}) => {
  const BOX_SIZE = size;
  // const RADIUS = Math.round(BOX_SIZE * 0.18);
  const RADIUS = Scale.BORDER_RADIUS_1;
  const checkFontSize = Math.round(BOX_SIZE * 0.62);

  return (
    <Pressable
      onPress={onToggle}
      android_ripple={{ color: 'rgba(0,0,0,0.06)', radius: Math.round(BOX_SIZE * 1.2) }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      style={({ pressed }) => [
        styles.wrapper,
        {
          width: BOX_SIZE,
          height: BOX_SIZE,
          borderRadius: RADIUS,
          backgroundColor: checked ? checkedColor : 'transparent',
          borderColor: checked ? checkedColor : uncheckedBorderColor,
          borderWidth: Scale.SCALE_1,
          opacity: pressed ? 0.96 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {/* Centered check glyph when checked; invisible when unchecked */}
      {checked ? (
        <Text
          style={[
            styles.checkGlyph,
            {
              color: Colors.WHITE,
              fontSize: checkFontSize,
              lineHeight: checkFontSize,
            },
          ]}
          allowFontScaling={false}
        >
          ✓
        </Text>
      ) : (
        // Keep an invisible element to preserve layout consistency if needed
        <View style={{ width: checkFontSize, height: checkFontSize }} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // subtle platform shadow if you want (optional)
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
      },
      android: {},
    }),
  },
  checkGlyph: {
    textAlign: 'center',
    includeFontPadding: false,
    fontWeight: '700',
  },
});
