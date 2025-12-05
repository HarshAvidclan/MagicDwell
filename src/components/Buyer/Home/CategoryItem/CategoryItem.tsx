// src/Components/Buyer/CategoryItem/CategoryItem.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonImage, CommonText } from '../../../Common';
import { Scale } from '../../../Constants';

interface CategoryItemProps {
  image?: any;
  label: string;
  onPress?: () => void;
  IsFormAPI?: boolean;
  ImageName?: string;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  image,
  label,
  onPress,
  IsFormAPI = false,
  ImageName,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CommonImage
        source={image}
        IsFormAPI={IsFormAPI}
        ImageName={ImageName}
        width={Scale.SCALE_72}
        height={Scale.SCALE_72}
        borderRadius={Scale.SCALE_36}
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
