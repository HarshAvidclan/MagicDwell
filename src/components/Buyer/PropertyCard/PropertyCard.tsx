// src/Components/Buyer/PropertyCard/PropertyCard.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonImage, CommonText } from '../../Common';
import { Scale, Colors, Logos, Typography } from '../../Constants';

interface PropertyCardProps {
  image?: any;
  title: string;
  location: string;
  bhk: string;
  area: string;
  price: string;
  onPress?: () => void;
  onFavouritePress?: () => void;
  IsFormAPI?: boolean;
  ImageName?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  title,
  location,
  bhk,
  area,
  price,
  onPress,
  onFavouritePress,
  IsFormAPI = false,
  ImageName,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CommonImage
        source={image}
        IsFormAPI={IsFormAPI}
        ImageName={ImageName}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.mainBriefOfCard}>
        <View style={styles.nameWithLocation}>
          <CommonText
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </CommonText>
          <View style={styles.locationRow}>
            <CommonText style={styles.locationText}>{location}</CommonText>
            <CommonImage
              source={Logos.DOT_DIVIDER}
              width={Scale.SCALE_2}
              height={Scale.SCALE_10}
              resizeMode="cover"
            />
            <CommonText style={styles.locationText}>{bhk}</CommonText>
            <CommonImage
              source={Logos.DOT_DIVIDER}
              width={Scale.SCALE_2}
              height={Scale.SCALE_10}
              resizeMode="cover"
            />
            <CommonText style={styles.locationText}>{area}</CommonText>
          </View>
        </View>
        <View style={styles.priceRow}>
          <CommonText style={styles.price}>{price}</CommonText>
        </View>
      </View>
      <TouchableOpacity
        style={styles.favouriteButton}
        onPress={onFavouritePress}
      >
        <CommonImage
          source={Logos.FAVOURITE_ICON}
          width={Scale.SCALE_36}
          height={Scale.SCALE_36}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Scale.SCALE_300,
    backgroundColor: Colors.WHITE,
    borderRadius: Scale.SCALE_8,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: Scale.SCALE_0, height: Scale.SCALE_3 },
    shadowOpacity: 0.05,
    shadowRadius: Scale.SCALE_5,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: Scale.SCALE_300,
    height: Scale.SCALE_152,
    borderTopLeftRadius: Scale.SCALE_8,
    borderTopRightRadius: Scale.SCALE_8,
  },
  mainBriefOfCard: {
    paddingHorizontal: Scale.SCALE_8,
    paddingBottom: Scale.SCALE_8,
    gap: Scale.SCALE_4,
    alignSelf: 'stretch',
  },
  nameWithLocation: {
    alignSelf: 'stretch',
    gap: Scale.SCALE_4,
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontWeight: Typography.FONT_WEIGHT_BOLD_700,
    fontSize: Typography.FONT_SIZE_20,
    lineHeight: Typography.LINE_HEIGHT_28,
    color: Colors.GRAY_800,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_8,
    alignSelf: 'stretch',
  },
  locationText: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontWeight: Typography.FONT_WEIGHT_MEDIUM_500,
    fontSize: Typography.FONT_SIZE_12,
    lineHeight: Typography.LINE_HEIGHT_20,
    color: Colors.GRAY_600,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  price: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontWeight: Typography.FONT_WEIGHT_BOLD_700,
    fontSize: Typography.FONT_SIZE_20,
    lineHeight: Typography.LINE_HEIGHT_28,
    color: Colors.GRAY_800,
    flex: 1,
  },
  favouriteButton: {
    position: 'absolute',
    top: Scale.SCALE_12,
    right: Scale.SCALE_12,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: Scale.SCALE_1, height: Scale.SCALE_2 },
    shadowOpacity: 0.04,
    shadowRadius: Scale.SCALE_16,
    borderRadius: Scale.SCALE_24,
  },
});
