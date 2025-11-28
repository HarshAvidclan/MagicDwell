// src/Common/CommonCheckbox/CommonCheckbox.tsx
import React from 'react';
import { Pressable, StyleSheet, View, PressableProps } from 'react-native';
import { Colors, Scale } from '../../Constants';

export interface CommonCheckboxProps extends Omit<PressableProps, 'style'> {
  checked: boolean;
  onToggle: () => void;
  style?: object;
}

export const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
  checked,
  onToggle,
  style,
  ...rest
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        checked && styles.checked,
        style,
      ]}
      onPress={onToggle}
      {...rest}
    >
      {checked && (
        <View style={styles.checkmark}>
          <View style={styles.checkmarkStem} />
          <View style={styles.checkmarkKick} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Scale.SCALE_24,
    height: Scale.SCALE_24,
    borderRadius: Scale.BORDER_RADIUS_3,
    borderWidth: Scale.SCALE_2,
    borderColor: Colors.BORDER_SECONDARY,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: Colors.TERTIARY_700,
    borderColor: Colors.TERTIARY_700,
  },
  checkmark: {
    width: Scale.SCALE_16,
    height: Scale.SCALE_16,
    position: 'relative',
  },
  checkmarkStem: {
    position: 'absolute',
    width: Scale.SCALE_2 + 0.5,
    height: Scale.SCALE_10,
    backgroundColor: Colors.WHITE,
    left: Scale.SCALE_10,
    top: Scale.SCALE_2,
    transform: [{ rotate: '45deg' }],
    borderRadius: Scale.SCALE_1,
  },
  checkmarkKick: {
    position: 'absolute',
    width: Scale.SCALE_2 + 0.5,
    height: Scale.SCALE_4 + Scale.SCALE_1,
    backgroundColor: Colors.WHITE,
    left: Scale.SCALE_4,
    top: Scale.SCALE_8,
    transform: [{ rotate: '-45deg' }],
    borderRadius: Scale.SCALE_1,
  },
});