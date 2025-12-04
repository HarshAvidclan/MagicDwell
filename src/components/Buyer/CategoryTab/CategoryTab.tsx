// src/components/Buyer/CategoryTab/CategoryTab.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { CommonImage, CommonText } from '../../Common';
import { Scale, Colors, Typography } from '../../Constants';

interface CategoryTabProps {
  icon: any;
  label: string;
  isActive?: boolean;
  activeColor?: string;
  onPress?: () => void;
}

export const CategoryTab: React.FC<CategoryTabProps> = ({
  icon,
  label,
  isActive = false,
  activeColor = Colors.PRIMARY_500,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && { ...styles.activeContainer, backgroundColor: activeColor },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <CommonImage
        source={icon}
        width={Scale.SCALE_24}
        height={Scale.SCALE_24}
        tintColor={isActive ? Colors.WHITE : Colors.TEXT_PRIMARY}
        resizeMode="cover"
      />
      <CommonText
        size={Typography.FONT_SIZE_14}
        color={isActive ? Colors.WHITE : Colors.TEXT_PRIMARY}
      >
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
    backgroundColor: Colors.WHITE,
    height: Scale.SCALE_40,
  },
  activeContainer: {
    // Background color will be set dynamically via activeColor prop
  },
});
