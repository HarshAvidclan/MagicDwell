import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { tbl_CommonImage } from '../../../Services/API/Input/Image';
import { CommonUploadRef, CommonText, CommonUpload } from '../../Common';
import { Colors, Strings, Logos, Scale } from '../../Constants';

interface ImageUploadProps {
    images?: tbl_CommonImage[];
    onChange?: (images: tbl_CommonImage[]) => void;
    maxImages?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    images = [],
    onChange,
    maxImages = 10,
}) => {
    const uploadRef = useRef<CommonUploadRef>(null);

    return (
        <View style={styles.container}>
            <CommonText semibold variant="body" color={Colors.BLACK}>
                {Strings.PROPERTY_LISTING.ADD_PHOTOS}
            </CommonText>

            {/* Upload Area */}
            <Pressable
                style={styles.uploadArea}
                onPress={() => {
                    console.log('ImageUpload: Upload area pressed');
                    console.log('ImageUpload: uploadRef.current is', uploadRef.current);
                    if (uploadRef.current) {
                        uploadRef.current.openPicker();
                    } else {
                        console.error('ImageUpload: uploadRef.current is null');
                    }
                }}
            >
                <View style={styles.uploadContent}>
                    <Image source={Logos.ADD_ICON} style={styles.addIcon} />
                    <View style={styles.textContainer}>
                        <CommonText medium variant="body" color={Colors.GRAY_600}>
                            Tap to select photos or{' '}
                            <CommonText semibold variant="body" color={Colors.PRIMARY_700}>
                                use camera
                            </CommonText>
                        </CommonText>
                        <CommonText medium variant="caption" color={Colors.GRAY_500}>
                            (Max {maxImages} photos)
                        </CommonText>
                    </View>
                </View>
            </Pressable>

            {/* CommonUpload handles the preview and modal */}
            <CommonUpload
                ref={uploadRef}
                folder="PropertyImages"
                tableName="tbl_Property"
                moduleName="Property"
                files={images}
                isMulti
                acceptImages
                acceptDocuments={false}
                maxFiles={maxImages}
                onChange={onChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: Scale.SCALE_8,
    },
    uploadArea: {
        borderWidth: Scale.SCALE_1,
        borderRadius: Scale.BORDER_RADIUS_12,
        borderColor: Colors.GRAY_200,
        borderStyle: 'dashed',
        backgroundColor: Colors.GRAY_50,
        padding: Scale.SCALE_20,
        minHeight: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadContent: {
        alignItems: 'center',
        gap: Scale.SCALE_12,
    },
    addIcon: {
        width: Scale.SCALE_40,
        height: Scale.SCALE_40,
        tintColor: Colors.PRIMARY_500,
    },
    textContainer: {
        alignItems: 'center',
        gap: Scale.SCALE_4,
    },
});
