// src/components/Buyer/DocumentUpload/DocumentUpload.tsx

import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { tbl_CommonImage } from '../../../Services/API/Input/Image';
import { CommonUploadRef, CommonText, CommonUpload } from '../../Common';
import { Colors, Strings, Logos, Scale, Typography } from '../../Constants';

interface DocumentUploadProps {
    documents?: tbl_CommonImage[];
    onChange?: (documents: tbl_CommonImage[]) => void;
    maxDocuments?: number;
    folder: string; // Required: Folder name for upload
    tableName: string; // Required: Table name for upload
    moduleName?: string; // Optional: Module name (defaults to folder if not provided)
    title?: string; // Optional: Custom title
    subtitle?: string; // Optional: Custom subtitle/description
    buttonText?: string; // Optional: Custom button text
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
    documents = [],
    onChange,
    maxDocuments = 5,
    folder,
    tableName,
    moduleName,
    title,
    subtitle,
    buttonText,
}) => {
    const uploadRef = useRef<CommonUploadRef>(null);

    return (
        <View style={styles.container}>
            <CommonText semibold variant="body" color={Colors.BLACK}>
                {title || Strings.PROPERTY_LISTING.ATTACH_DOCUMENT}{' '}
                {subtitle && (
                    <CommonText medium variant="caption" color={Colors.GRAY_500}>
                        {subtitle}
                    </CommonText>
                )}
            </CommonText>

            <Pressable
                style={styles.attachButton}
                onPress={() => uploadRef.current?.openPicker()}
            >
                <CommonText
                    medium
                    variant="body"
                    color={Colors.GRAY_600}
                    style={styles.attachText}
                >
                    {buttonText || 'Attach document (JPG, PNG, PDF)'}
                </CommonText>
                <Image source={Logos.ADD_ICON} style={styles.paperclipIcon} />
            </Pressable>

            {/* CommonUpload handles the preview and modal */}
            <CommonUpload
                ref={uploadRef}
                folder={folder}
                tableName={tableName}
                moduleName={moduleName || folder}
                files={documents}
                isMulti
                acceptImages
                acceptDocuments
                maxFiles={maxDocuments}
                onChange={onChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: Scale.SCALE_8,
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
        tintColor: Colors.PRIMARY_500,
    },
});