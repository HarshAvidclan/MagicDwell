// src/Screens/Buyer/BuyerPostListingVehicleScreen/VehicleStep2/VehicleStep2.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonText, CommonInput, CommonSelection, SelectionOption } from '../../../Common';
import { CommonDropdown, DropdownOption } from '../../../Common/CommonDropdown/CommonDropdown';
import { Colors, Scale, Strings } from '../../../Constants';
import { GetBrandModelByIdInput, tbl_Vehicle } from '../../../../Services/API/Input/inputIndex';
import { API } from '../../../../Services/API/Api';
import { VehicleMaster } from '../../../../Services/API/URL/URLS';
import { GetBrandModelByIdResult } from '../../../../Services/API/Result/ResultIndex';

interface VehicleStep2Props {
    data: tbl_Vehicle;
    brandOptions: DropdownOption[];
    childVehicleTypeOptions: SelectionOption[];
    fuelTypeOptions: SelectionOption[];
    ownershipOptions: SelectionOption[];
    transmissionOptions: SelectionOption[];
    onChange: <K extends keyof tbl_Vehicle>(field: K, value: tbl_Vehicle[K]) => void;
    errors?: Partial<Record<string, string>>;
}

export const VehicleStep2: React.FC<VehicleStep2Props> = ({
    data,
    brandOptions,
    childVehicleTypeOptions,
    fuelTypeOptions,
    ownershipOptions,
    transmissionOptions,
    onChange,
    errors,
}) => {
    const [brandModels, setBrandModels] = useState<DropdownOption[]>([]);
    const [loadingModels, setLoadingModels] = useState(false);

    // Fetch brand models when brand changes
    useEffect(() => {
        const fetchBrandModels = async () => {
            if (!data.BrandId || data.BrandId <= 0) {
                setBrandModels([]);
                return;
            }

            try {
                setLoadingModels(true);
                const input: GetBrandModelByIdInput = {
                    Comma_BrandId: data.BrandId.toString(),
                };
                const res = await API.POST<GetBrandModelByIdResult>(
                    VehicleMaster.GETBRANDMODELBYID,
                    input,
                );
                const models = (res.lstBrandModel || []).map((m: any) => ({
                    value: m.BrandModelId,
                    label: m.ModelName,
                }));
                setBrandModels(models);
            } catch (err) {
                console.error('Failed to load brand models', err);
                setBrandModels([]);
            } finally {
                setLoadingModels(false);
            }
        };

        fetchBrandModels();
    }, [data.BrandId]);

    const handleBrandChange = (value: string | number) => {
        onChange('BrandId', Number(value));
        onChange('BrandModelId', 0); // Reset model when brand changes
    };

    return (
        <View style={styles.container}>
            {/* Brand/Maker */}
            <CommonDropdown
                label={Strings.VEHICLE_LISTING.BRAND_MAKER}
                options={brandOptions}
                selectedValue={data.BrandId}
                onSelect={handleBrandChange}
                placeholder={Strings.VEHICLE_LISTING.SELECT_BRAND}
                error={errors?.BrandId}
            />

            {/* Model Name */}
            <CommonDropdown
                label={Strings.VEHICLE_LISTING.MODEL_NAME}
                options={brandModels}
                selectedValue={data.BrandModelId}
                onSelect={(value) => onChange('BrandModelId', Number(value))}
                placeholder={
                    loadingModels
                        ? Strings.VEHICLE_LISTING.LOADING_MODELS
                        : Strings.VEHICLE_LISTING.ENTER_MODEL_NAME
                }
                error={errors?.BrandModelId}
                disabled={!data.BrandId || loadingModels}
            />

            {/* ✅ Child Vehicle Type (Car Type, Bike Type, etc.) - Show if options exist */}
            {childVehicleTypeOptions.length > 0 && (
                <View style={styles.fieldContainer}>
                    <CommonText semibold variant="body" color={Colors.BLACK}>
                        {data.VehicleTypeId === 1
                            ? Strings.VEHICLE_LISTING.CAR_TYPE
                            : data.VehicleTypeId === 2
                                ? Strings.VEHICLE_LISTING.BIKE_TYPE
                                : Strings.VEHICLE_LISTING.VEHICLE_CATEGORY}

                    </CommonText>
                    <CommonSelection
                        options={childVehicleTypeOptions}
                        selectedValue={data.ChildVehicleTypeId || 0}
                        onSelect={(value: string | number) => onChange('ChildVehicleTypeId', Number(value))}
                        containerStyle={styles.selectionWrap}
                        showCheckbox={true}
                    />
                    {errors?.ChildVehicleTypeId && (
                        <CommonText variant="caption" color={Colors.ERROR_500}>
                            {errors.ChildVehicleTypeId}
                        </CommonText>
                    )}
                </View>
            )}

            {/* Fuel Type */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.VEHICLE_LISTING.FUEL_TYPE}
                </CommonText>
                <CommonSelection
                    options={fuelTypeOptions}
                    selectedValue={data.FuelTypeId}
                    onSelect={(value: string | number) => onChange('FuelTypeId', Number(value))}
                    containerStyle={styles.selectionWrap}
                    showCheckbox={true}
                />
                {errors?.FuelTypeId && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.FuelTypeId}
                    </CommonText>
                )}
            </View>

            {/* Ownership Hand */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.VEHICLE_LISTING.OWNERSHIP_HAND}
                </CommonText>
                <CommonSelection
                    options={ownershipOptions}
                    selectedValue={data.NoOfOwnersId}
                    onSelect={(value: string | number) => onChange('NoOfOwnersId', Number(value))}
                    containerStyle={styles.selectionWrap}
                    showCheckbox={true}
                />
                {errors?.NoOfOwnersId && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.NoOfOwnersId}
                    </CommonText>
                )}
            </View>

            {/* Transmission */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.VEHICLE_LISTING.TRANSMISSION}
                </CommonText>
                <CommonSelection
                    options={transmissionOptions}
                    selectedValue={data.TransmissionId}
                    onSelect={(value: string | number) => onChange('TransmissionId', Number(value))}
                    containerStyle={styles.selectionWrap}
                    showCheckbox={true}
                />
                {errors?.TransmissionId && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.TransmissionId}
                    </CommonText>
                )}
            </View>

            {/* Year & KM Row */}
            <View style={styles.rowContainer}>
                {/* Year of Manufacture */}
                <View style={styles.halfField}>
                    <CommonText semibold variant="body" color={Colors.BLACK}>
                        {Strings.VEHICLE_LISTING.YEAR_OF_MANUFACTURE}
                    </CommonText>
                    <CommonInput
                        value={data.YearOfMfd ? String(data.YearOfMfd) : ''}
                        onChangeText={(value) => onChange('YearOfMfd', Number(value) || 0)}
                        placeholder={Strings.VEHICLE_LISTING.SELECT_YEAR}
                        keyboardType="number-pad"
                    />
                    {errors?.YearOfMfd && (
                        <CommonText variant="caption" color={Colors.ERROR_500}>
                            {errors.YearOfMfd}
                        </CommonText>
                    )}
                </View>

                {/* Kilometers Driven */}
                <View style={styles.halfField}>
                    <CommonText semibold variant="body" color={Colors.BLACK}>
                        {Strings.VEHICLE_LISTING.KILOMETERS_DRIVEN}
                    </CommonText>
                    <CommonInput
                        value={data.DrivenKm ? String(data.DrivenKm) : ''}
                        onChangeText={(value) => onChange('DrivenKm', Number(value) || 0)}
                        placeholder={Strings.VEHICLE_LISTING.ENTER_KMS_DRIVEN}
                        keyboardType="number-pad"
                    />
                    {errors?.DrivenKm && (
                        <CommonText variant="caption" color={Colors.ERROR_500}>
                            {errors.DrivenKm}
                        </CommonText>
                    )}
                </View>
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
    selectionWrap: {
        flexWrap: 'wrap',
    },
    rowContainer: {
        flexDirection: 'row',
        gap: Scale.SCALE_16,
    },
    halfField: {
        flex: 1,
        gap: Scale.SCALE_8,
    },
});