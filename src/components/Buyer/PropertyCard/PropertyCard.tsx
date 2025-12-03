// src/Components/Buyer/PropertyCard/PropertyCard.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonImage, CommonText } from '../../Common';
import { Scale, Colors, Logos } from '../../Constants';

interface PropertyCardProps {
  image: any;
  title: string;
  location: string;
  bhk: string;
  area: string;
  price: string;
  onPress?: () => void;
  onFavouritePress?: () => void;
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
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CommonImage source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.nameWithLocation}>
          <CommonText variant="button" numberOfLines={1}>
            {title}
          </CommonText>
          <View style={styles.locationRow}>
            <CommonText color={Colors.TERTIARY_100}>{location}</CommonText>
            <CommonImage
              source={Logos.DOT_DIVIDER}
              width={Scale.SCALE_2}
              height={Scale.SCALE_10}
              resizeMode="cover"
            />
            <CommonText color={Colors.TERTIARY_100}>{bhk}</CommonText>
            <CommonImage
              source={Logos.DOT_DIVIDER}
              width={Scale.SCALE_2}
              height={Scale.SCALE_10}
              resizeMode="cover"
            />
            <CommonText color={Colors.TERTIARY_100}>{area}</CommonText>
          </View>
        </View>
        <CommonText>{price}</CommonText>
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
    backgroundColor: Colors.PRIMARY_100,
    borderRadius: Scale.SCALE_8,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: Scale.SCALE_0, height: Scale.SCALE_4 },
    shadowOpacity: 0.05,
    shadowRadius: Scale.SCALE_8,
    elevation: 5,
  },
  image: {
    width: Scale.SCALE_300,
    height: Scale.SCALE_152,
    borderTopLeftRadius: Scale.SCALE_8,
    borderTopRightRadius: Scale.SCALE_8,
  },
  content: {
    padding: Scale.SCALE_8,
    gap: Scale.SCALE_4,
  },
  nameWithLocation: {
    gap: Scale.SCALE_4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_8,
  },
  favouriteButton: {
    position: 'absolute',
    top: Scale.SCALE_12,
    right: Scale.SCALE_12,
  },
});
