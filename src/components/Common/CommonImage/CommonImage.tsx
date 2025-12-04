// src/Common/CommonImage/CommonImage.tsx
import React from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';

interface CommonImageProps extends ImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  tintColor?: string;
}

export const CommonImage: React.FC<CommonImageProps> = ({
  width,
  height,
  borderRadius,
  tintColor,
  style,
  ...props
}) => {
  return (
    <Image
      style={[
        styles.image,
        width && { width },
        height && { height },
        borderRadius && { borderRadius },
        tintColor && { tintColor },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    // Base image style
  },
});