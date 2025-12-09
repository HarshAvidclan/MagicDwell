import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { CommonText } from '../../../Common';
import { Colors, Scale, Typography, Logos, Strings } from '../../../Constants';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import { AmenitiesModal } from '../AmenitiesModal/AmenitiesModal';
import { tbl_CommonImage, tbl_mstAmenities } from '../../../../Services/API/Input/inputIndex';

interface PropertyStep3Props {
    selectedAmenities: number[];
    availableAmenities: tbl_mstAmenities[];
    onAmenitiesChange: (amenityIds: number[]) => void;
    images?: tbl_CommonImage[];
    onAddImages?: () => void;
    errors?: any;
}

export const PropertyStep3: React.FC<PropertyStep3Props> = ({
    selectedAmenities,
    availableAmenities,
    onAmenitiesChange,
    images,
    onAddImages,
    errors,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAmenityToggle = (amenityId: number) => {
        if (selectedAmenities.includes(amenityId)) {
            onAmenitiesChange(selectedAmenities.filter((id) => id !== amenityId));
        } else {
            onAmenitiesChange([...selectedAmenities, amenityId]);
        }
    };

    // Render amenity card
    const renderAmenityCard = (amenity: tbl_mstAmenities) => {
        const isSelected = selectedAmenities.includes(amenity.AmenityId);
        return (
            <Pressable
                key={amenity.AmenityId}
                style={[
                    styles.amenityCard,
                    isSelected && styles.amenityCardSelected
                ]}
                onPress={() => handleAmenityToggle(amenity.AmenityId)}
            >
                <Image
                    // source={amenity.IconName ? { uri: amenity.IconName } : Logos.RESIDENTIAL_ICON} // Using IconName from interface
                    source={Logos.RESIDENTIAL_ICON}
                    style={[
                        styles.amenityIcon,
                        isSelected && { tintColor: Colors.PRIMARY_400 }
                    ]}
                    resizeMode="contain"
                />
                <CommonText
                    semibold={isSelected}
                    medium={!isSelected}
                    variant="caption"
                    color={isSelected ? Colors.PRIMARY_400 : Colors.TEXT_PRIMARY}
                    style={styles.amenityLabel}
                    numberOfLines={2}
                >
                    {amenity.AmenityName}
                </CommonText>
            </Pressable>
        );
    };

    // Show first 5 amenities from availableAmenities by default
    const defaultAmenities = availableAmenities.slice(0, 5);
    const hasMoreAmenities = availableAmenities.length > 5;

    return (
        <View style={styles.container}>
            {/* Property Amenities */}
            <View style={styles.section}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.PROPERTY_AMENITIES}
                </CommonText>

                {/* First row: 3 amenities */}
                <View style={styles.amenityRow}>
                    {defaultAmenities.slice(0, 3).map((amenity) => renderAmenityCard(amenity))}
                </View>

                {/* Second row: 2 amenities + View All button (6th position) */}
                <View style={styles.amenityRow}>
                    {defaultAmenities.slice(3, 5).map((amenity) => renderAmenityCard(amenity))}

                    {/* View All Button - only show if there are more than 5 amenities */}
                    {hasMoreAmenities && (
                        <Pressable
                            style={styles.viewAllCard}
                            onPress={() => setIsModalVisible(true)}
                        >
                            <CommonText
                                semibold
                                variant="body"
                                color={Colors.TERTIARY_700}
                                style={styles.viewAllText}
                            >
                                {Strings.PROPERTY_LISTING.VIEW_ALL}
                            </CommonText>
                            <Image
                                source={Logos.CHEVRON_DOWN_ICON}
                                style={styles.chevronIcon}
                                resizeMode="contain"
                            />
                        </Pressable>
                    )}
                </View>

                {errors?.amenities && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.amenities}
                    </CommonText>
                )}
            </View>

            {/* Add Photos */}
            <ImageUpload images={images || []} onAddImages={onAddImages} />
            {errors?.images && (
                <CommonText variant="caption" color={Colors.ERROR_500}>
                    {errors.images}
                </CommonText>
            )}

            {/* Amenities Modal */}
            <AmenitiesModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                amenities={availableAmenities}
                selectedAmenities={selectedAmenities}
                onToggleAmenity={handleAmenityToggle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: Scale.SCALE_20,
    },
    section: {
        gap: Scale.SCALE_12,
    },
    amenityRow: {
        flexDirection: 'row',
        gap: Scale.SCALE_12,
        justifyContent: 'flex-start',
    },
    amenityCard: {
        flex: 1, // Responsive width
        height: Scale.SCALE_80,
        padding: Scale.SCALE_8,
        borderRadius: Scale.BORDER_RADIUS_8,
        borderWidth: Scale.SCALE_1,
        borderStyle: 'solid',
        borderColor: Colors.GRAY_200,
        backgroundColor: Colors.WHITE,
        gap: Scale.SCALE_4,
    },
    amenityCardSelected: {
        borderColor: Colors.PRIMARY_300,
        backgroundColor: Colors.BACKGROUND_SELECTED,
    },
    amenityIcon: {
        width: Scale.SCALE_20,
        height: Scale.SCALE_20,
        tintColor: Colors.GRAY_500,
    },
    amenityLabel: {
        lineHeight: Typography.LINE_HEIGHT_16,
        flex: 1,
    },
    viewAllCard: {
        flex: 1, // Responsive width matching amenity cards
        height: Scale.SCALE_80,
        padding: Scale.SCALE_8,
        borderRadius: Scale.BORDER_RADIUS_8,
        borderWidth: Scale.SCALE_1,
        borderStyle: 'solid',
        borderColor: Colors.GRAY_200,
        backgroundColor: Colors.WHITE,
        justifyContent: 'space-between',
    },
    viewAllText: {
        textDecorationLine: 'underline',
    },
    chevronIcon: {
        width: Scale.SCALE_16,
        height: Scale.SCALE_16,
        alignSelf: 'flex-end',
    },
});
