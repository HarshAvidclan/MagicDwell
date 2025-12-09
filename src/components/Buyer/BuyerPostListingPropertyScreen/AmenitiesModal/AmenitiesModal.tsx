import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import {
    CommonText,
    CommonModal,
    CommonInput,
    CommonCheckbox,
} from '../../../Common';
import { Colors, Scale, Typography, Logos, Strings } from '../../../Constants';
import { Amenity } from '../PropertyStep3/PropertyStep3';

interface AmenitiesModalProps {
    visible: boolean;
    onClose: () => void;
    amenities: Amenity[];
    selectedAmenities: number[];
    onToggleAmenity: (amenityId: number) => void;
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
    visible,
    onClose,
    amenities,
    selectedAmenities,
    onToggleAmenity,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [customAmenity, setCustomAmenity] = useState('');

    const filteredAmenities = useMemo(() => {
        if (!searchQuery) return amenities;
        return amenities.filter((amenity) =>
            amenity.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [amenities, searchQuery]);

    return (
        <CommonModal visible={visible} onClose={onClose} showHomeIndicator={true}>
            <View style={styles.container}>
                <CommonText bold variant="heading" color={Colors.BLACK} style={styles.title}>
                    {Strings.PROPERTY_LISTING.SELECT_AMENITIES}
                </CommonText>

                {/* Search Input */}
                <View style={styles.searchContainer}>
                    <CommonInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search here..."
                    />
                </View>

                {/* Scrollable Amenities List */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredAmenities.map((amenity, index) => {
                        const isSelected = selectedAmenities.includes(amenity.id);

                        return (
                            <View key={amenity.id}>
                                <Pressable
                                    style={[
                                        styles.amenityItem,
                                        isSelected && styles.selectedAmenityItem,
                                    ]}
                                    onPress={() => onToggleAmenity(amenity.id)}
                                >
                                    <Image
                                        source={amenity.icon || Logos.RESIDENTIAL_ICON}
                                        style={styles.amenityIcon}
                                        resizeMode="contain"
                                    />
                                    <CommonText
                                        medium
                                        variant="body"
                                        color={Colors.TEXT_PRIMARY}
                                        style={styles.amenityName}
                                    >
                                        {amenity.name}
                                    </CommonText>
                                    <CommonCheckbox
                                        checked={isSelected}
                                        onToggle={() => onToggleAmenity(amenity.id)}
                                    />
                                </Pressable>
                                {index < filteredAmenities.length - 1 && (
                                    <View style={styles.divider} />
                                )}
                            </View>
                        );
                    })}

                    {/* Add Custom Amenity Section */}
                    <View style={styles.customAmenitySection}>
                        <View style={styles.divider} />
                        <View style={styles.customInputContainer}>
                            <CommonText medium variant="body" color={Colors.GRAY_600}>
                                Not in the list? Add yours
                            </CommonText>
                            <CommonInput
                                value={customAmenity}
                                onChangeText={setCustomAmenity}
                                placeholder="Kids area"
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </CommonModal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: Scale.BORDER_RADIUS_16,
        borderTopRightRadius: Scale.BORDER_RADIUS_16,
        paddingTop: Scale.SCALE_20,
        maxHeight: 600,
    },
    title: {
        paddingHorizontal: Scale.SCALE_20,
        marginBottom: Scale.SCALE_16,
    },
    searchContainer: {
        paddingHorizontal: Scale.SCALE_20,
        marginBottom: Scale.SCALE_12,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Scale.SCALE_20,
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Scale.SCALE_12,
        gap: Scale.SCALE_12,
    },
    selectedAmenityItem: {
        backgroundColor: Colors.BACKGROUND_SELECTED,
    },
    amenityIcon: {
        width: Scale.SCALE_24,
        height: Scale.SCALE_24,
    },
    amenityName: {
        flex: 1,
    },
    divider: {
        height: Scale.SCALE_1,
        backgroundColor: Colors.GRAY_100,
    },
    customAmenitySection: {
        marginTop: Scale.SCALE_20,
    },
    customInputContainer: {
        gap: Scale.SCALE_8,
        paddingTop: Scale.SCALE_16,
        paddingBottom: Scale.SCALE_20,
    },
});
