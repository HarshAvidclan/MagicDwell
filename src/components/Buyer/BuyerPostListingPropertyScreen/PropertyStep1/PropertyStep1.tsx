import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import {
    CommonText,
    CommonSelection,
    CommonCitySelector,
    SelectionOption,
} from '../../../Common';
import { Colors, Scale, Typography, Logos, Strings } from '../../../Constants';
import { MapplsAutosuggestResult } from '../../../../Services/API/Result/resultIndex';
import { tbl_Property } from '../../../../Services/API/Input/inputIndex';

interface PropertyStep1Props {
    data: tbl_Property;
    propertyTypes: SelectionOption[];
    lookingToOptions: SelectionOption[];
    onChange: <K extends keyof tbl_Property>(field: K, value: tbl_Property[K]) => void;
    errors?: Partial<Record<string, string>>;
}

export const PropertyStep1: React.FC<PropertyStep1Props> = ({
    data,
    propertyTypes,
    lookingToOptions,
    onChange,
    errors,
}) => {
    const [isCitySelectorVisible, setIsCitySelectorVisible] = useState(false);

    const handleCitySelect = (
        city: MapplsAutosuggestResult.SuggestedLocation,
    ) => {
        onChange('Locality', `${city.placeName}, ${city.placeAddress}`);
        onChange('PlaceId', city.eLoc);
        setIsCitySelectorVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Property Type */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.PROPERTY_TYPE}
                </CommonText>
                <CommonSelection
                    options={propertyTypes}
                    selectedValue={data.PropertyTypeId}
                    onSelect={(value: string | number) => onChange('PropertyTypeId', Number(value))}
                />
                {errors?.PropertyTypeId && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.PropertyTypeId}
                    </CommonText>
                )}
            </View>

            {/* Looking To */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.LOOKING_TO}
                </CommonText>
                <CommonSelection
                    options={lookingToOptions}
                    selectedValue={data.LookingToId}
                    onSelect={(value: string | number) => onChange('LookingToId', Number(value))}
                />
                {errors?.LookingToId && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.LookingToId}
                    </CommonText>
                )}
            </View>

            {/* Add Location */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.ADD_LOCATION}
                </CommonText>
                <Pressable
                    style={styles.locationInput}
                    onPress={() => setIsCitySelectorVisible(true)}
                >
                    <Image source={Logos.SEARCH_ICON} style={styles.searchIcon} />
                    <CommonText
                        medium
                        variant="body"
                        color={data.Locality ? Colors.TEXT_PRIMARY : Colors.TEXT_PLACEHOLDER}
                        style={styles.locationText}
                    >
                        {data.Locality || Strings.PROPERTY_LISTING.SEARCH_LOCATION}
                    </CommonText>
                </Pressable>
                {errors?.Locality && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.Locality}
                    </CommonText>
                )}

                {/* Locate My Location */}
                <Pressable style={styles.gpsButton}>
                    <Image source={Logos.LOCATION_ICON} style={styles.gpsIcon} />
                    <CommonText semibold variant="body" color={Colors.TERTIARY_700}>
                        {Strings.PROPERTY_LISTING.LOCATE_MY_LOCATION}
                    </CommonText>
                </Pressable>
            </View>

            {/* City Selector Modal */}
            <CommonCitySelector
                visible={isCitySelectorVisible}
                onClose={() => setIsCitySelectorVisible(false)}
                onSelectCity={handleCitySelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: Scale.SCALE_20,
    },
    fieldContainer: {
        gap: Scale.SCALE_8,
    },
    locationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Scale.SCALE_12,
        paddingHorizontal: Scale.SCALE_20,
        borderRadius: Scale.BORDER_RADIUS_100,
        borderWidth: Scale.SCALE_1,
        borderColor: Colors.GRAY_300,
        borderStyle: 'solid',
        gap: Scale.SCALE_8,
        height: Scale.SCALE_48,
    },
    searchIcon: {
        width: Scale.SCALE_24,
        height: Scale.SCALE_24,
    },
    locationText: {
        flex: 1,
        lineHeight: Typography.LINE_HEIGHT_20,
    },
    gpsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Scale.SCALE_4,
    },
    gpsIcon: {
        width: Scale.SCALE_16,
        height: Scale.SCALE_16,
    },
});
