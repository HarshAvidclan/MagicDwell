// src/Common/CommonImage/CommonImage.tsx
import React from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';

interface CommonImageProps extends ImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const CommonImage: React.FC<CommonImageProps> = ({
  width,
  height,
  borderRadius,
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