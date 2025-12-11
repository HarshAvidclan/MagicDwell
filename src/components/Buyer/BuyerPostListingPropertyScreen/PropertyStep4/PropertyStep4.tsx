import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { DocumentUpload } from '../../DocumentUpload/DocumentUpload';
import { CommonText, CommonInput } from '../../../Common';
import { Colors, Scale, Typography, Logos, Strings } from '../../../Constants';
import { tbl_Property, tbl_CommonImage } from '../../../../Services/API/Input/inputIndex';
import { FolderNames, TableNames } from '../../../../Services/API/FileUpload';

interface PropertyStep4Props {
    data: tbl_Property;
    onChange: <K extends keyof tbl_Property>(field: K, value: tbl_Property[K]) => void;
    documents?: tbl_CommonImage[];
    onDocumentsChange?: (documents: tbl_CommonImage[]) => void;
    errors?: Partial<Record<string, string>>;
}

export const PropertyStep4: React.FC<PropertyStep4Props> = ({
    data,
    onChange,
    documents,
    onDocumentsChange,
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
            <DocumentUpload
                documents={documents}
                onChange={onDocumentsChange}
                maxDocuments={5}
                folder={FolderNames.PropertyDocument}
                tableName={TableNames.Property}
                moduleName={FolderNames.PropertyDocument}
                title="Attach vehicle documents"
                subtitle="(RC, Insurance, PUC, others)"
                buttonText="Attach document (JPG, PNG, PDF)"
            />
            {errors?.DocumentPath && (
                <CommonText variant="caption" color={Colors.ERROR_500}>
                    {errors.DocumentPath}
                </CommonText>
            )}
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
});
