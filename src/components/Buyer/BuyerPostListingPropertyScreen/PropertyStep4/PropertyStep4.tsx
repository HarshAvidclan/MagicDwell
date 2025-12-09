import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { CommonText, CommonInput } from '../../../Common';
import { Colors, Scale, Typography, Logos, Strings } from '../../../Constants';
import { tbl_Property } from '../../../../Services/API/Input/inputIndex';

interface PropertyStep4Props {
    data: tbl_Property;
    onChange: <K extends keyof tbl_Property>(field: K, value: tbl_Property[K]) => void;
    onAttachDocument?: () => void;
    errors?: Partial<Record<string, string>>;
}

export const PropertyStep4: React.FC<PropertyStep4Props> = ({
    data,
    onChange,
    onAttachDocument,
    errors,
}) => {
    return (
        <View style={styles.container}>
            {/* Cost */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.COST}
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
                        placeholder="Add a price"
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

            {/* Age of Property */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.AGE_OF_PROPERTY}
                </CommonText>
                <CommonInput
                    value={data.AgeOfProperty ? String(data.AgeOfProperty) : ''}
                    onChangeText={(value) => onChange('AgeOfProperty', Number(value) || 0)}
                    placeholder="Enter property age"
                    keyboardType="number-pad"
                />
                {errors?.AgeOfProperty && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.AgeOfProperty}
                    </CommonText>
                )}
            </View>

            {/* Attach Document */}
            <View style={styles.fieldContainer}>
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {Strings.PROPERTY_LISTING.ATTACH_DOCUMENT}{' '}
                    <CommonText medium variant="caption" color={Colors.GRAY_500}>
                        (Aadhar, PAN, Passport, others)
                    </CommonText>
                </CommonText>
                <Pressable style={styles.attachButton} onPress={onAttachDocument}>
                    <CommonText
                        medium
                        variant="body"
                        color={Colors.GRAY_600}
                        style={styles.attachText}
                    >
                        Attach document (JPG, PNG, PDF)
                    </CommonText>
                    <Image source={Logos.ADD_ICON} style={styles.paperclipIcon} />
                </Pressable>
                {errors?.DocumentPath && (
                    <CommonText variant="caption" color={Colors.ERROR_500}>
                        {errors.DocumentPath}
                    </CommonText>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: Scale.SCALE_16,
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
    attachButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Scale.SCALE_12,
        paddingHorizontal: Scale.SCALE_20,
        borderRadius: Scale.BORDER_RADIUS_100,
        borderWidth: Scale.SCALE_1,
        borderColor: Colors.GRAY_200,
        borderStyle: 'solid',
        backgroundColor: Colors.WHITE,
        gap: Scale.SCALE_8,
        height: Scale.SCALE_48,
    },
    attachText: {
        flex: 1,
        lineHeight: Typography.LINE_HEIGHT_20,
    },
    paperclipIcon: {
        width: Scale.SCALE_20,
        height: Scale.SCALE_20,
    },
});
