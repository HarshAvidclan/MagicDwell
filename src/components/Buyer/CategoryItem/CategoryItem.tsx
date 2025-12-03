// src/Components/Buyer/CategoryItem/CategoryItem.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonImage, CommonText } from '../../Common';
import { Scale } from '../../Constants';

interface CategoryItemProps {
  image: any;
  label: string;
  onPress?: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  image,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CommonImage
        source={image}
        width={Scale.SCALE_72}
        height={Scale.SCALE_72}
        resizeMode="cover"
      />
      <CommonText variant="caption" style={styles.label}>
        {label}
      </CommonText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Scale.SCALE_4,
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
