// src/Screens/Buyer/BuyerPostListingVehicleScreen/VehicleStep3/VehicleStep3.tsx

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { CommonText, CommonInput, CommonCheckbox } from '../../../Common';
import { ImageUpload } from '../../ImageUpload/ImageUpload';
import { Colors, Scale, Strings } from '../../../Constants';
import { tbl_Vehicle, tbl_CommonImage } from '../../../../Services/API/Input/inputIndex';
import { FolderNames, TableNames } from '../../../../Services/API/FileUpload';

interface VehicleStep3Props {
    data: tbl_Vehicle;
    onChange: <K extends keyof tbl_Vehicle>(field: K, value: tbl_Vehicle[K]) => void;
    images?: tbl_CommonImage[];
    onImagesChange?: (images: tbl_CommonImage[]) => void;
    errors?: Partial<Record<string, string>>;
}

export const VehicleStep3: React.FC<VehicleStep3Props> = ({
    data,
    onChange,
    images,
    onImagesChange,
    errors,
}) => {
    return (
        <View style={styles.container}>
            {/* Cost */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.VEHICLE_LISTING.COST}
                </CommonText>
                <View style={styles.priceInputContainer}>
                    <View style={styles.currencyContainer}>
                        <CommonText bold variant="heading" color={Colors.PRIMARY_700}>
                            ₹
                        </CommonText>
                    </View>
                    <View style={styles.divider} />
                    <CommonInput
                        value={data.Price ? String(data.Price) : ''}
                        onChangeText={(value) => onChange('Price', Number(value) || 0)}
                        placeholder={Strings.VEHICLE_LISTING.ADD_PRICE}
                        keyboardType="number-pad"
                        containerStyle={styles.priceInput}
                    />
                </View>
                {errors?.Price && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.Price}
                    </CommonText>
                )}
            </View>

            {/* Is Price Negotiable */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.VEHICLE_LISTING.IS_PRICE_NEGOTIABLE}
                </CommonText>
                <Pressable
                    style={styles.negotiableContainer}
                    onPress={() => onChange('IsNegotiate', !data.IsNegotiate)}
                >
                    <CommonCheckbox
                        checked={Boolean(data.IsNegotiate)}
                        onToggle={() => onChange('IsNegotiate', !data.IsNegotiate)}
                        size={Scale.SCALE_18}
                        checkedColor={Colors.TERTIARY_700}
                        uncheckedBorderColor={Colors.GRAY_400}
                    />
                    <CommonText variant="body" color={Colors.GRAY_700}>
                        {Strings.VEHICLE_LISTING.YES_OPEN_TO_NEGOTIATION}
                    </CommonText>
                </Pressable>
            </View>

            {/* Add Photos */}
            <View style={styles.fieldContainer}>
                <ImageUpload images={images || []} onChange={onImagesChange} folder={FolderNames.Vehicle}
                    tableName={TableNames.Vehicle}
                    moduleName={FolderNames.Vehicle} />
                {errors?.VehicleImages && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.VehicleImages}
                    </CommonText>
                )}
            </View>
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
    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Scale.SCALE_12,
        paddingHorizontal: Scale.SCALE_20,
        borderRadius: Scale.BORDER_RADIUS_100,
        borderWidth: Scale.SCALE_1,
        borderColor: Colors.GRAY_300,
        borderStyle: 'solid',
        backgroundColor: Colors.WHITE,
        gap: Scale.SCALE_8,
        height: Scale.SCALE_48,
    },
    currencyContainer: {
        width: Scale.SCALE_14,
        height: Scale.SCALE_20,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    divider: {
        width: Scale.SCALE_2,
        height: Scale.SCALE_20,
        backgroundColor: Colors.GRAY_400,
        borderRadius: Scale.BORDER_RADIUS_100,
    },
    priceInput: {
        flex: 1,
        borderWidth: 0,
        padding: 0,
        height: 'auto',
    },
    negotiableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Scale.SCALE_8,
    },
});