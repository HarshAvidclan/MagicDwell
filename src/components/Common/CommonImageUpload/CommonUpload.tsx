import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import { pick, types, DocumentPickerResponse } from '@react-native-documents/picker';
import { CommonText } from '../CommonText/CommonText';
import { Colors, Scale, Logos } from '../../Constants';
import { tbl_CommonImage, ImageUploadInput } from '../../../Services/API/Input/inputIndex';
import { FileUpload } from '../../../Services/API/FileUpload';
import { CommonUploadModal } from './CommonUploadModal';
import { LOCALHOSTWITHPORT } from '../../../Services/API/URL/BaseURL';

export interface CommonUploadRef {
    openPicker: () => void;
}

interface CommonUploadProps {
    folder: string;
    tableName: string;
    moduleName: string;
    files?: tbl_CommonImage[];
    isMulti?: boolean;
    isShowDelete?: boolean;
    acceptDocuments?: boolean;
    acceptImages?: boolean;
    maxFiles?: number;
    onChange?: (files: tbl_CommonImage[]) => void;
}

export const CommonUpload = forwardRef<CommonUploadRef, CommonUploadProps>(
    (
        {
            folder,
            tableName,
            moduleName,
            files: propFiles = [],
            isMulti = false,
            isShowDelete = true,
            acceptDocuments = false,
            acceptImages = true,
            maxFiles = 10,
            onChange,
        },
        ref
    ) => {
        const [files, setFiles] = useState<tbl_CommonImage[]>([]);
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            if (propFiles && propFiles.length > 0) {
                const normalized = propFiles.map((it, i) => ({ ...it, SeqNo: i + 1 }));
                setFiles(normalized);
            } else {
                setFiles(propFiles);
            }
        }, [propFiles]);

        useImperativeHandle(ref, () => ({
            openPicker: () => setIsModalVisible(true),
        }));

        const normalizeAndUpdate = (arr: tbl_CommonImage[]) => {
            const normalized = arr.map((it, idx) => ({ ...it, SeqNo: idx + 1 }));
            setFiles(normalized);
            onChange?.(normalized);
            return normalized;
        };

        const toTblCommonImage = (data: any): tbl_CommonImage => {
            return {
                ImageId: data?.ImageId || 0,
                IsActive: data?.IsActive ?? true,
                TableId: data?.TableId ?? '',
                ImagePath: data?.ImagePath ?? '',
                ImageName: data?.ImageName ?? data?.ImageUrl ?? data?.ImagePath ?? '',
                SeqNo: data?.SeqNo ?? 0,
                TableName: data?.TableName ?? tableName,
                ModuleName: data?.ModuleName ?? moduleName,
            };
        };

        const uploadFile = async (file: Asset | DocumentPickerResponse) => {
            if (!file || !file.uri) return null;

            setLoading(true);
            try {
                const fileObj: any = {
                    uri: file.uri,
                    type: file.type || 'image/jpeg',
                    name: (file as any).fileName || (file as any).name || `file_${Date.now()}.jpg`,
                };

                const input: ImageUploadInput = {
                    File: fileObj,
                    Folder: folder,
                    TableName: tableName,
                    ModuleName: moduleName,
                };

                const result = await FileUpload(input);
                if (result) {
                    const uploaded = toTblCommonImage(result);
                    setFiles((prev) => {
                        const next = isMulti ? [...prev, uploaded] : [uploaded];
                        const normalized = next.map((it, idx) => ({ ...it, SeqNo: idx + 1 }));
                        onChange?.(normalized);
                        return normalized;
                    });
                    return uploaded;
                }
            } catch (error) {
                console.error('Upload error:', error);
                Alert.alert('Error', 'Failed to upload file');
            } finally {
                setLoading(false);
            }
            return null;
        };

        const handleCamera = async () => {
            setIsModalVisible(false);

            if (!acceptImages) {
                Alert.alert('Error', 'Camera option is not available');
                return;
            }

            try {
                const result = await launchCamera({
                    mediaType: 'photo',
                    quality: 0.8,
                    includeBase64: false,
                    saveToPhotos: false,
                });

                if (result.didCancel) {
                    return;
                }

                if (result.errorCode) {
                    Alert.alert('Error', result.errorMessage || 'Camera error');
                    return;
                }

                if (result.assets && result.assets.length > 0) {
                    await uploadFile(result.assets[0]);
                }
            } catch (error) {
                console.error('Camera error:', error);
                Alert.alert('Error', 'Failed to open camera');
            }
        };

        const handlePhotos = async () => {
            setIsModalVisible(false);

            if (!acceptImages) {
                Alert.alert('Error', 'Photo selection is not available');
                return;
            }

            try {
                const result = await launchImageLibrary({
                    mediaType: 'photo',
                    quality: 0.8,
                    selectionLimit: isMulti ? maxFiles : 1,
                    includeBase64: false,
                });

                if (result.didCancel) {
                    return;
                }

                if (result.errorCode) {
                    Alert.alert('Error', result.errorMessage || 'Photo picker error');
                    return;
                }

                if (result.assets && result.assets.length > 0) {
                    if (isMulti) {
                        for (const asset of result.assets) {
                            await uploadFile(asset);
                        }
                    } else {
                        await uploadFile(result.assets[0]);
                    }
                }
            } catch (error) {
                console.error('Photo picker error:', error);
                Alert.alert('Error', 'Failed to select photos');
            }
        };

        const handleFiles = async () => {
            setIsModalVisible(false);

            if (!acceptDocuments) {
                Alert.alert('Error', 'File selection is not available');
                return;
            }

            try {
                const results = await pick({
                    type: [
                        types.pdf,
                        types.images,
                        types.doc,
                        types.docx,
                    ],
                    allowMultiSelection: isMulti,
                });

                if (results && results.length > 0) {
                    if (isMulti) {
                        for (const doc of results) {
                            await uploadFile(doc);
                        }
                    } else {
                        await uploadFile(results[0]);
                    }
                }
            } catch (error) {
                // if (isCancel(error)) {
                //     return;
                // }
                // console.error('Document picker error:', error);
                Alert.alert('Error', 'Failed to select files');
            }
        };

        const handleRemove = (index: number) => {
            Alert.alert(
                'Delete File',
                'Are you sure you want to delete this file?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                            setFiles((prev) => {
                                const next = prev.filter((_, i) => i !== index);
                                const normalized = next.map((it, idx) => ({ ...it, SeqNo: idx + 1 }));
                                onChange?.(normalized);
                                return normalized;
                            });
                        },
                    },
                ]
            );
        };

        const getFileExtension = (path: string): string => {
            if (!path) return '';
            const parts = path.split('.');
            return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
        };

        const isImageFile = (path: string): boolean => {
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
            const ext = getFileExtension(path);
            return imageExtensions.includes(ext);
        };

        const renderFileItem = (file: tbl_CommonImage, index: number) => {
            const isImage = isImageFile(file.ImagePath || '');

            return (
                <View key={file.ImageId || `${file.ImageName}-${index}`} style={styles.fileItem}>
                    {isImage ? (
                        <Image
                            source={{ uri: `${LOCALHOSTWITHPORT}${file.ImagePath}` }}
                            style={styles.imagePreview}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.documentPreview}>
                            <Image source={Logos.DOCUMENT_ICON} style={styles.documentIcon} />
                            <CommonText
                                variant="caption"
                                color={Colors.GRAY_600}
                                numberOfLines={2}
                                style={styles.fileName}
                            >
                                {file.ImageName || 'Document'}
                            </CommonText>
                        </View>
                    )}

                    {isShowDelete && (
                        <Pressable
                            style={styles.deleteButton}
                            onPress={() => handleRemove(index)}
                        >
                            <Image source={Logos.DELETE_ICON} style={styles.deleteIcon} />
                        </Pressable>
                    )}
                </View>
            );
        };

        return (
            <View style={styles.container}>
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={Colors.PRIMARY_500} />
                        <CommonText variant="body" color={Colors.GRAY_600}>
                            Uploading...
                        </CommonText>
                    </View>
                )}

                {files.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filesContainer}
                    >
                        {files.map((file, idx) => renderFileItem(file, idx))}
                    </ScrollView>
                )}

                <CommonUploadModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onCamera={handleCamera}
                    onPhotos={handlePhotos}
                    onFiles={handleFiles}
                    showCamera={acceptImages}
                    showPhotos={acceptImages}
                    showFiles={acceptDocuments}
                />
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        gap: Scale.SCALE_12,
    },
    loadingContainer: {
        alignItems: 'center',
        gap: Scale.SCALE_8,
        paddingVertical: Scale.SCALE_12,
    },
    filesContainer: {
        gap: Scale.SCALE_12,
        paddingVertical: Scale.SCALE_4,
    },
    fileItem: {
        width: Scale.SCALE_150,
        height: Scale.SCALE_150,
        borderRadius: Scale.BORDER_RADIUS_8,
        borderWidth: Scale.SCALE_1,
        borderColor: Colors.GRAY_200,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: Colors.WHITE,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    documentPreview: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.GRAY_50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Scale.SCALE_12,
        gap: Scale.SCALE_8,
    },
    documentIcon: {
        width: Scale.SCALE_40,
        height: Scale.SCALE_40,
        tintColor: Colors.PRIMARY_500,
    },
    fileName: {
        textAlign: 'center',
    },
    deleteButton: {
        position: 'absolute',
        top: Scale.SCALE_8,
        right: Scale.SCALE_8,
        backgroundColor: Colors.WHITE,
        borderRadius: Scale.BORDER_RADIUS_100,
        padding: Scale.SCALE_4,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    deleteIcon: {
        width: Scale.SCALE_16,
        height: Scale.SCALE_16,
        tintColor: Colors.ERROR_500,
    },
});
