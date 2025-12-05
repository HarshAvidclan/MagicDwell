// src/Components/Buyer/ToolCard/ToolCard.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonImage, CommonText } from '../../../Common';
import { Scale, Colors, Typography } from '../../../Constants';

interface ToolCardProps {
  icon: any;
  label: string;
  onPress?: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <CommonImage
          source={icon}
          width={Scale.SCALE_24}
          height={Scale.SCALE_24}
          resizeMode="contain"
        />
      </View>
      <CommonText style={styles.label} numberOfLines={2}>
        {label}
      </CommonText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: Scale.SCALE_8,
  },
  iconContainer: {
    width: Scale.SCALE_40,
    height: Scale.SCALE_40,
    borderRadius: Scale.SCALE_28,
    backgroundColor: Colors.GRAY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontWeight: Typography.FONT_WEIGHT_MEDIUM_500,
    fontSize: Typography.FONT_SIZE_12,
    lineHeight: Typography.LINE_HEIGHT_16,
    color: Colors.GRAY_700,
    textAlign: 'center',
  },
});
