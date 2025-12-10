import React from 'react';
import { View, StyleSheet, Modal, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonText } from '../CommonText/CommonText';
import { Colors, Scale, Logos, Strings } from '../../Constants';

interface CommonUploadModalProps {
    visible: boolean;
    onClose: () => void;
    onCamera: () => void;
    onPhotos: () => void;
    onFiles: () => void;
    showCamera?: boolean;
    showPhotos?: boolean;
    showFiles?: boolean;
}

export const CommonUploadModal: React.FC<CommonUploadModalProps> = ({
    visible,
    onClose,
    onCamera,
    onPhotos,
    onFiles,
    showCamera = true,
    showPhotos = true,
    showFiles = true,
}) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
                        <View style={styles.container}>
                            {/* Handle */}
                            <View style={styles.handleContainer}>
                                <View style={styles.handle} />
                            </View>

                            {/* Title */}
                            <View style={styles.header}>
                                <CommonText bold variant="heading" color={Colors.BLACK}>
                                    {Strings.COMMON.ATTACH_DOCUMENT}
                                </CommonText>
                            </View>

                            {/* Options */}
                            <View style={styles.optionsContainer}>
                                {/* Camera */}
                                {showCamera && (
                                    <Pressable style={styles.option} onPress={onCamera}>
                                        <Image source={Logos.CAMERA_ICON} style={styles.optionIcon} />
                                        <CommonText semibold variant="body" color={Colors.TEXT_PRIMARY}>
                                            {Strings.COMMON.CAMERA}
                                        </CommonText>
                                    </Pressable>
                                )}

                                {/* Photos */}
                                {showPhotos && (
                                    <Pressable style={styles.option} onPress={onPhotos}>
                                        <Image source={Logos.GALLERY_ICON} style={styles.optionIcon} />
                                        <CommonText semibold variant="body" color={Colors.TEXT_PRIMARY}>
                                            {Strings.COMMON.PHOTOS}
                                        </CommonText>
                                    </Pressable>
                                )}

                                {/* Files */}
                                {showFiles && (
                                    <Pressable style={styles.option} onPress={onFiles}>
                                        <Image source={Logos.FILE_ICON} style={styles.optionIcon} />
                                        <CommonText semibold variant="body" color={Colors.TEXT_PRIMARY}>
                                            {Strings.COMMON.FILES}
                                        </CommonText>
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </SafeAreaView>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: Colors.BACKDROP,
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: Scale.BORDER_RADIUS_24,
        borderTopRightRadius: Scale.BORDER_RADIUS_24,
        backgroundColor: Colors.WHITE,
        overflow: 'hidden',
    },
    safeArea: {
        backgroundColor: Colors.WHITE,
    },
    container: {
        gap: Scale.SCALE_12,
    },
    handleContainer: {
        height: Scale.SCALE_34,
        justifyContent: 'center',
        alignItems: 'center',
    },
    handle: {
        width: Scale.SCALE_44,
        height: Scale.SCALE_5,
        borderRadius: Scale.BORDER_RADIUS_100,
        backgroundColor: Colors.GRAY_300,
    },
    header: {
        paddingHorizontal: Scale.SCALE_16,
        paddingBottom: Scale.SCALE_12,
    },
    optionsContainer: {
        flexDirection: 'row',
        gap: Scale.SCALE_12,
        paddingHorizontal: Scale.SCALE_16,
        paddingBottom: Scale.SCALE_20,
    },
    option: {
        flex: 1,
        borderRadius: Scale.BORDER_RADIUS_8,
        borderWidth: Scale.SCALE_1,
        borderStyle: 'solid',
        borderColor: Colors.GRAY_200,
        paddingHorizontal: Scale.SCALE_8,
        paddingVertical: Scale.SCALE_20,
        gap: Scale.SCALE_4,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
    optionIcon: {
        width: Scale.SCALE_24,
        height: Scale.SCALE_24,
        tintColor: Colors.PRIMARY_500,
    },
});
