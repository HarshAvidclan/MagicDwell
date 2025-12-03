// src/Components/Buyer/ToolCard/ToolCard.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonImage, CommonText } from '../../Common';
import { Scale, Colors } from '../../Constants';

interface ToolCardProps {
  icon: any;
  label: string;
  onPress?: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CommonImage
        source={icon}
        width={Scale.SCALE_40}
        height={Scale.SCALE_40}
        borderRadius={Scale.SCALE_100}
        resizeMode="cover"
      />
      <CommonText color={Colors.TEXT_SECONDARY} style={styles.label}>
        {label}
      </CommonText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Scale.SCALE_54,
    gap: Scale.SCALE_8,
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
