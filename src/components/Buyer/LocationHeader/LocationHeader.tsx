// src/Components/Buyer/LocationHeader/LocationHeader.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonText, CommonImage, CommonButton } from '../../Common';
import { Scale, Colors, Strings, Logos } from '../../Constants';

interface LocationHeaderProps {
  locationText: string;
  onLocationPress?: () => void;
  onPostListingPress?: () => void;
}

export const LocationHeader: React.FC<LocationHeaderProps> = ({
  locationText,
  onLocationPress,
  onPostListingPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLocationPress}>
        <CommonText color={Colors.TEXT_PRIMARY}>
          {Strings.HOME.CURRENT_LOCATION}
        </CommonText>
        <View style={styles.locationRow}>
          <CommonText>{locationText}</CommonText>
          <CommonImage
            source={Logos.CHEVRON_DOWN_ICON}
            width={Scale.SCALE_16}
            height={Scale.SCALE_16}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
      <CommonButton
        title=""
        variant="secondary"
        size="small"
        onPress={onPostListingPress}
      >
        <View style={styles.buttonContent}>
          <CommonImage
            source={Logos.ADD_ICON}
            width={Scale.SCALE_19}
            height={Scale.SCALE_19}
            resizeMode="cover"
          />
          <CommonText>{Strings.HOME.POST_A_LISTING}</CommonText>
        </View>
      </CommonButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Scale.SCALE_16,
    gap: Scale.SCALE_20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_2,
    marginTop: -Scale.SCALE_2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_4,
  },
});
