// src/Common/CommonImage/CommonImage.tsx
import React from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';
import { getImageUrl } from '../../../Services/Utility/Functions';

interface CommonImageProps extends ImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  tintColor?: string;
  IsFormAPI?: boolean;
  ImageName?: string;
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
  ...props
}) => {
  const imageSource = IsFormAPI && ImageName
    ? { uri: getImageUrl(ImageName) }
    : source;

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