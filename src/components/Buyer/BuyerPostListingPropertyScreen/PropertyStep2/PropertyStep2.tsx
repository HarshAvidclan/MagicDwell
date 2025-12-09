import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    CommonText,
    CommonSelection,
    CommonInput,
    SelectionOption,
} from '../../../Common';
import { Colors, Scale, Strings } from '../../../Constants';
import { tbl_Property } from '../../../../Services/API/Input/inputIndex';

interface PropertyStep2Props {
    data: tbl_Property;
    propertyTypeId: number; // From Step 1 - determines residential vs commercial
    categoryOptions: SelectionOption[]; // Filtered by propertyTypeId
    bhkOptions: SelectionOption[]; // Only for residential
    buildAreaUnitOptions: SelectionOption[]; // Only for commercial
    furnishTypeOptions: SelectionOption[];
    constructionStatusOptions: SelectionOption[];
    onChange: <K extends keyof tbl_Property>(field: K, value: tbl_Property[K]) => void;
    errors?: Partial<Record<string, string>>;
}

export const PropertyStep2: React.FC<PropertyStep2Props> = ({
    data,
    propertyTypeId,
    categoryOptions,
    bhkOptions,
    buildAreaUnitOptions,
    furnishTypeOptions,
    constructionStatusOptions,
    onChange,
    errors,
}) => {
    const isResidential = propertyTypeId === 1;

    // Generate floor options based on totalFloor
    const floorOptions: SelectionOption[] = useMemo(() => {
        const options: SelectionOption[] = [{ value: 0, label: 'Ground' }];

        if (data.TotalFloor && data.TotalFloor > 0) {
            for (let i = 1; i <= data.TotalFloor; i++) {
                options.push({ value: i, label: String(i) });
            }
        }

        return options;
    }, [data.TotalFloor]);

    return (
        <View style={styles.container}>
            {/* Category/Property Type */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.CATEGORY}
                </CommonText>
                <CommonSelection
                    options={categoryOptions}
                    selectedValue={data.ChildPropertyTypeId}
                    onSelect={(value: string | number) => onChange('ChildPropertyTypeId', Number(value))}
                    containerStyle={styles.selectionWrap}
                    showCheckbox={true}
                />
                {errors?.ChildPropertyTypeId && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.ChildPropertyTypeId}
                    </CommonText>
                )}
            </View>

            {/* Building/Project/Society Name */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.BUILDING_NAME}
                </CommonText>
                <CommonInput
                    value={data.BuildingName}
                    onChangeText={(value) => onChange('BuildingName', value)}
                    placeholder="Enter building/project/society name"
                />
                {errors?.BuildingName && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.BuildingName}
                    </CommonText>
                )}
            </View>

            {/* Locality */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.LOCALITY}
                </CommonText>
                <CommonInput
                    value={data.Locality}
                    onChangeText={(value) => onChange('Locality', value)}
                    placeholder="Enter locality name"
                />
                {errors?.Locality && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.Locality}
                    </CommonText>
                )}
            </View>

            {/* Total Floors */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.TOTAL_FLOORS}
                </CommonText>
                <CommonInput
                    value={data.TotalFloor ? String(data.TotalFloor) : ''}
                    onChangeText={(value) => onChange('TotalFloor', Number(value) || 0)}
                    placeholder="Enter total floors"
                    keyboardType="number-pad"
                />
                {errors?.TotalFloor && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.TotalFloor}
                    </CommonText>
                )}
            </View>

            {/* Your Floor */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.YOUR_FLOOR}
                </CommonText>
                <CommonSelection
                    options={floorOptions}
                    selectedValue={data.FloorNo}
                    onSelect={(value: string | number) => onChange('FloorNo', Number(value))}
                    containerStyle={styles.selectionWrap}
                />
                {errors?.FloorNo && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.FloorNo}
                    </CommonText>
                )}
            </View>

            {/* BHK Type - Only for Residential */}
            {isResidential && (
                <View style={styles.fieldContainer}>
                    <CommonText semibold variant="body" color={Colors.BLACK}>
                        {Strings.PROPERTY_LISTING.BHK_TYPE}
                    </CommonText>
                    <CommonSelection
                        options={bhkOptions}
                        selectedValue={data.BHKId || 0}
                        onSelect={(value: string | number) => onChange('BHKId', Number(value))}
                        containerStyle={styles.selectionWrap}
                        showCheckbox={true}
                    />
                    {errors?.BHKId && (
                        <CommonText variant="caption" color={Colors.ERROR_500}>
                            {errors.BHKId}
                        </CommonText>
                    )}
                </View>
            )}

            {/* Built-up Area */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.BUILT_UP_AREA}
                </CommonText>
                <View style={styles.areaInputContainer}>
                    <CommonInput
                        value={data.BuildArea ? String(data.BuildArea) : ''}
                        onChangeText={(value) => onChange('BuildArea', Number(value) || 0)}
                        placeholder="Enter built up area"
                        keyboardType="number-pad"
                        containerStyle={styles.areaInput}
                    />
                    {!isResidential && buildAreaUnitOptions.length > 0 && (
                        <View style={styles.unitSelector}>
                            <CommonSelection
                                options={buildAreaUnitOptions}
                                selectedValue={data.BuildAreaId || 0}
                                onSelect={(value: string | number) => onChange('BuildAreaId', Number(value))}
                            />
                        </View>
                    )}
                </View>
                {errors?.BuildArea && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.BuildArea}
                    </CommonText>
                )}
            </View>

            {/* Furnish Type */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.FURNISH_TYPE}
                </CommonText>
                <CommonSelection
                    options={furnishTypeOptions}
                    selectedValue={data.FurnishTypeId}
                    onSelect={(value: string | number) => onChange('FurnishTypeId', Number(value))}
                    containerStyle={styles.selectionWrap}
                />
                {errors?.FurnishTypeId && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.FurnishTypeId}
                    </CommonText>
                )}
            </View>

            {/* Construction Status */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.CONSTRUCTION_STATUS}
                </CommonText>
                <CommonSelection
                    options={constructionStatusOptions}
                    selectedValue={data.ConstructionStatusId}
                    onSelect={(value: string | number) => onChange('ConstructionStatusId', Number(value))}
                    containerStyle={styles.selectionWrap}
                />
                {errors?.ConstructionStatusId && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.ConstructionStatusId}
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
    selectionWrap: {
        flexWrap: 'wrap',
    },
    areaInputContainer: {
        flexDirection: 'row',
        gap: Scale.SCALE_8,
        alignItems: 'flex-start',
    },
    areaInput: {
        flex: 1,
    },
    unitSelector: {
        minWidth: Scale.SCALE_100,
    },
});
