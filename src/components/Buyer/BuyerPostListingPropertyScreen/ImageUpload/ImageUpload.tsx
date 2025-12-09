import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { CommonText } from '../../../Common';
import { Colors, Scale, Logos, Strings } from '../../../Constants';
import { tbl_CommonImage } from '../../../../Services/API/Input/inputIndex';

interface ImageUploadProps {
    images?: tbl_CommonImage[];
    onAddImages?: () => void;
    maxImages?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    images = [],
    onAddImages,
    maxImages = 10,
}) => {
    return (
        <View style={styles.container}>
            <CommonText semibold variant="body" color={Colors.BLACK}>
                {Strings.PROPERTY_LISTING.ADD_PHOTOS}
            </CommonText>

            {/* Upload Area */}
            <Pressable style={styles.uploadArea} onPress={onAddImages}>
                <View style={styles.uploadContent}>
                    <Image source={Logos.ADD_ICON} style={styles.addIcon} />
                    <View style={styles.textContainer}>
                        <CommonText medium variant="body" color={Colors.GRAY_600}>
                            Drag and drop your photos here, or{' '}
                            <CommonText semibold variant="body" color={Colors.PRIMARY_700}>
                                click to select files
                            </CommonText>
                        </CommonText>
                        <CommonText medium variant="caption" color={Colors.GRAY_500}>
                            (Max {maxImages} photos)
                        </CommonText>
                    </View>
                </View>
            </Pressable>

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <View style={styles.imageGrid}>
                    {images.slice(0, 4).map((img, index) => (
                        <View key={index} style={styles.imagePlaceholder}>
                            <CommonText variant="caption" color={Colors.GRAY_400}>
                                Image {index + 1}
                            </CommonText>
                        </View>
                    ))}
                </View>
            )}
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
    },
    textContainer: {
        alignItems: 'center',
        gap: Scale.SCALE_4,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Scale.SCALE_8,
    },
    imagePlaceholder: {
        width: Scale.SCALE_80,
        height: Scale.SCALE_80,
        borderRadius: Scale.BORDER_RADIUS_8,
        backgroundColor: Colors.GRAY_100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
