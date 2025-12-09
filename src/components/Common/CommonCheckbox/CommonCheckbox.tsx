// src/Common/CommonCheckbox/CommonCheckbox.tsx
import React from 'react';
import { Pressable, StyleSheet, View, PressableProps } from 'react-native';
import { Colors, Scale } from '../../Constants';

export interface CommonCheckboxProps extends Omit<PressableProps, 'style'> {
  checked: boolean;
  onToggle: () => void;
  style?: object;
  size?: number; // Width and height
  checkedColor?: string; // Color when checked
  uncheckedBorderColor?: string; // Border color when unchecked
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
  // Calculate tick mark dimensions based on checkbox size
  const checkmarkSize = size * 0.80; // Checkmark is 80% of checkbox size
  const line1Height = checkmarkSize * 0.2; // Short line
  const line2Height = checkmarkSize * 0.7; // Long line
  const lineWidth = size * 0.08; // Thin line thickness for elegant look

  return (
    <Pressable
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderColor: checked ? checkedColor : uncheckedBorderColor,
          backgroundColor: checked ? checkedColor : Colors.WHITE,
        },
        style,
      ]}
      onPress={onToggle}
      {...rest}
    >
      {checked && (
        <View style={[styles.checkmark, { width: checkmarkSize, height: checkmarkSize }]}>
          <View
            style={[
              styles.checkmarkLine1,
              {
                width: lineWidth,
                height: line1Height,
                left: checkmarkSize * 0.1,
                top: checkmarkSize * 0.5,
              },
            ]}
          />
          <View
            style={[
              styles.checkmarkLine2,
              {
                width: lineWidth,
                height: line2Height,
                left: checkmarkSize * 0.35,
                top: checkmarkSize * 0.15,
              },
            ]}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: Scale.SCALE_1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Scale.BORDER_RADIUS_1,
  },
  checkmark: {
    position: 'relative',
  },
  // Short line (left side of checkmark)
  checkmarkLine1: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    transform: [{ rotate: '-45deg' }],
  },
  // Long line (right side of checkmark)
  checkmarkLine2: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    transform: [{ rotate: '45deg' }],
  },
});