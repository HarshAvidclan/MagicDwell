// src/Components/Buyer/CategoryTab/CategoryTab.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { CommonImage, CommonText } from '../../Common';
import { Scale, Colors } from '../../Constants';

interface CategoryTabProps {
  icon: any;
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const CategoryTab: React.FC<CategoryTabProps> = ({
  icon,
  label,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
    >
      <CommonImage
        source={icon}
        width={Scale.SCALE_24}
        height={Scale.SCALE_24}
        resizeMode="cover"
      />
      <CommonText color={isActive ? Colors.WHITE : Colors.TEXT_PRIMARY}>
        {label}
      </CommonText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_4,
    padding: Scale.SCALE_8,
    borderRadius: Scale.SCALE_8,
    backgroundColor: Colors.PRIMARY_100,
  },
  activeContainer: {
    backgroundColor: Colors.PRIMARY_500,
  },
});
