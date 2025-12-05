import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    ModalProps,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Scale } from '../../Constants';

export interface CommonModalProps extends ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showHomeIndicator?: boolean;
    backgroundColor?: string;
    borderRadius?: number;
    closeOnBackdropPress?: boolean;
}

export const CommonModal: React.FC<CommonModalProps> = ({
    visible,
    onClose,
    children,
    showHomeIndicator = true,
    backgroundColor = Colors.WHITE,
    borderRadius = Scale.SCALE_24,
    closeOnBackdropPress = true,
    ...modalProps
}) => {
    const handleBackdropPress = () => {
        if (closeOnBackdropPress) {
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
            {...modalProps}
        >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.keyboardAvoidingView}
                        >
                            <SafeAreaView
                                edges={['bottom']}
                                style={[
                                    styles.modalContainer,
                                    {
                                        backgroundColor,
                                        borderTopLeftRadius: borderRadius,
                                        borderTopRightRadius: borderRadius,
                                    },
                                ]}
                            >
                                {showHomeIndicator && (
                                    <View style={styles.homeIndicatorContainer}>
                                        <View style={styles.homeIndicator} />
                                    </View>
                                )}
                                {children}
                            </SafeAreaView>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    keyboardAvoidingView: {
        width: '100%',
    },
    modalContainer: {
        width: '100%',
        paddingBottom: Scale.SCALE_52,
        alignItems: 'center',
        gap: Scale.SCALE_12,
    },
    homeIndicatorContainer: {
        height: Scale.SCALE_34,
        alignSelf: 'stretch',
    },
    homeIndicator: {
        width: Scale.SCALE_44,
        height: Scale.SCALE_5,
        borderRadius: Scale.SCALE_100,
        backgroundColor: Colors.GRAY_100,
        alignSelf: 'center',
        marginTop: Scale.SCALE_8,
    },
});