// src/components/Buyer/PostListingSelection/PostListingSelection.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BuyerStackNavigationProp, Routes } from '../../../Types/Navigation';
import { CommonImage, CommonText, CommonButton } from '../../Common';
import { Scale, Strings, Logos, Typography, Colors } from '../../Constants';
import { usePostListingModal } from '../../../contexts/PostListingModalContext';

type ListingType = 'property' | 'vehicle' | null;

export const PostListingSelection: React.FC = () => {
    const [selectedType, setSelectedType] = useState<ListingType>(null);
    const navigation = useNavigation<BuyerStackNavigationProp>();
    const { closeModal } = usePostListingModal();

    const handleContinue = () => {
        closeModal(); // Close modal first

        if (selectedType === 'property') {
            navigation.navigate(Routes.BUYER_POST_LISTING_PROPERTY);
        } else if (selectedType === 'vehicle') {
            navigation.navigate(Routes.BUYER_POST_LISTING_VEHICLE);
        }
    };

    const renderOption = (
        type: 'property' | 'vehicle',
        icon: any,
        label: string
    ) => {
        const isSelected = selectedType === type;

        return (
            <TouchableOpacity
                style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                ]}
                onPress={() => setSelectedType(type)}
            >
                <CommonImage
                    source={icon}
                    width={Scale.SCALE_24}
                    height={Scale.SCALE_24}
                    tintColor={isSelected ? Colors.PRIMARY_400 : Colors.BLACK}
                    resizeMode="cover"
                />
                <CommonText
                    style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                    ]}
                >
                    {label}
                </CommonText>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <CommonText style={styles.title}>
                {Strings.POST_LISTING.TITLE}
            </CommonText>

            <View style={styles.optionsContainer}>
                {renderOption('property', Logos.RESIDENTIAL_ICON, Strings.POST_LISTING.PROPERTY)}
                {renderOption('vehicle', Logos.CARS_ICON, Strings.POST_LISTING.VEHICLE)}
            </View>

            <CommonButton
                title={Strings.POST_LISTING.CONTINUE}
                onPress={handleContinue}
                disabled={!selectedType}
                buttonStyle={styles.continueButton}
                textStyle={styles.continueButtonText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Scale.SCALE_16,
        paddingVertical: 0,
        gap: Scale.SCALE_24,
        width: '100%',
    },
    title: {
        fontSize: Typography.FONT_SIZE_20,
        lineHeight: Typography.LINE_HEIGHT_28,
        textAlign: 'center',
        color: Colors.TEXT_PRIMARY,
        fontFamily: Typography.FONT_FAMILY_BOLD,
    },
    optionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Scale.SCALE_12,
    },
    optionCard: {
        gap: Scale.SCALE_4,
        paddingVertical: Scale.SCALE_20,
        paddingHorizontal: Scale.SCALE_8,
        borderStyle: 'solid',
        borderRadius: Scale.SCALE_8,
        width: Scale.SCALE_173,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.GRAY_200, // Default border color
    },
    optionCardSelected: {
        backgroundColor: Colors.BACKGROUND_SELECTED, // #E8F3FF
        borderColor: Colors.PRIMARY_300, // #547CA1
    },
    optionText: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
        fontSize: Typography.FONT_SIZE_15,
        lineHeight: Typography.LINE_HEIGHT_24,
        color: Colors.TEXT_PRIMARY,
        textAlign: 'center',
    },
    optionTextSelected: {
        color: Colors.PRIMARY_400, // #33628F
        fontFamily: Typography.FONT_FAMILY_BOLD,
    },
    continueButton: {
        height: Scale.SCALE_48,
        justifyContent: 'center',
        padding: Scale.SCALE_16,
        borderRadius: Scale.SCALE_100,
    },
    continueButtonText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        lineHeight: Typography.LINE_HEIGHT_24,
        textAlign: 'center',
    },
});