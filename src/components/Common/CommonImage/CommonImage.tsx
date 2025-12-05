// src/Common/CommonImage/CommonImage.tsx
import React from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';
import { Colors } from '../../Constants';
import { getImageUrl } from '../../../Services/Utility/Functions';

interface CommonImageProps extends ImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  tintColor?: string;
  IsFormAPI?: boolean;
  ImageName?: string;
  // New toggle props
  isActive?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}

export const CommonImage: React.FC<CommonImageProps> = ({
  width,
  height,
  borderRadius,
  tintColor,
  IsFormAPI = false,
  ImageName,
  style,
  source,
  isActive,
  activeColor = Colors.TAB_ACTIVE || '#000000',
  inactiveColor = Colors.GRAY_500 || '#8E8E93',
  ...props
}) => {
  const imageSource = IsFormAPI && ImageName
    ? { uri: getImageUrl(ImageName) }
    : source;

  // Determine the final tint color
  const finalTintColor = isActive !== undefined
    ? (isActive ? activeColor : inactiveColor)
    : tintColor;

  return (
    <Image
      style={[
        styles.image,
        width && { width },
        height && { height },
        borderRadius && { borderRadius },
        finalTintColor && { tintColor: finalTintColor },
        style,
      ]}
      source={imageSource}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    // Base image style
  },
});