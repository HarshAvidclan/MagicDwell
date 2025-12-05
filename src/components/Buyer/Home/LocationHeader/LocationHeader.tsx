// src/components/Buyer/LocationHeader/LocationHeader.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonText, CommonImage, CommonButton } from '../../../Common';
import { Scale, Colors, Strings, Logos, Typography } from '../../../Constants';
import { usePostListingModal } from '../../../../contexts/PostListingModalContext';

export interface LocationHeaderProps {
  locationText: string;
  onLocationPress?: () => void;
}

export const LocationHeader: React.FC<LocationHeaderProps> = ({
  locationText,
  onLocationPress,
}) => {
  const { openModal } = usePostListingModal();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLocationPress}>
        <CommonText size={Typography.FONT_SIZE_13} color={Colors.TEXT_PRIMARY}>
          {Strings.HOME.CURRENT_LOCATION}
        </CommonText>
        <View style={styles.locationRow}>
          <CommonText
            semibold
            size={Typography.FONT_SIZE_16}
            color={Colors.TEXT_PRIMARY}
          >
            {locationText}
          </CommonText>
          <CommonImage
            source={Logos.CHEVRON_DOWN_ICON}
            width={Scale.SCALE_16}
            height={Scale.SCALE_16}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
      <CommonButton
        buttonStyle={styles.postListingBtn}
        title={Strings.HOME.POST_A_LISTING}
        variant="secondary"
        size="small"
        onPress={openModal}
        leftIcon={Logos.ADD_ICON}
        fullWidth={false}
        borderRadius={Scale.SCALE_100}
      />
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
  postListingBtn: {
    // Additional custom styles if needed
  },
});