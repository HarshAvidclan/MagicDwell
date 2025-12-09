import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { CommonText } from '../../../Common';
import { Colors, Scale, Logos, Typography } from '../../../Constants';

interface PropertyStepHeaderProps {
    currentStep: number;
    totalSteps: number;
    stepTitle: string;
    nextStepTitle: string | null;
    onBack: () => void;
    onReset?: () => void; // Added optional reset handler
}

export const PropertyStepHeader: React.FC<PropertyStepHeaderProps> = ({
    currentStep,
    totalSteps,
    stepTitle,
    nextStepTitle,
    onBack,
    onReset,
}) => {
    return (
        <View style={styles.container}>
            {/* Top Bar: Back Button, Title, Reset */}
            <View style={styles.topBar}>
                <Pressable style={styles.backButton} onPress={onBack}>
                    <Image
                        source={Logos.CHEVRON_LEFT_ICON}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                </Pressable>

                <CommonText style={styles.screenTitle}>
                    Post property
                </CommonText>

                <Pressable
                    style={styles.resetContainer}
                    onPress={onReset}
                    disabled={!onReset}
                >
                    {/* <CommonText style={styles.resetText}>
                        Reset
                    </CommonText> */}
                </Pressable>
            </View>

            {/* Bottom Bar: Step Info & Progress */}
            <View style={styles.stepInfoRow}>
                <View style={styles.stepTexts}>
                    <CommonText style={styles.stepTitle}>
                        {stepTitle}
                    </CommonText>
                    {nextStepTitle && (
                        <CommonText style={styles.nextStepTitle}>
                            Next: {nextStepTitle}
                        </CommonText>
                    )}
                </View>

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <CircularProgress
                        current={currentStep}
                        total={totalSteps}
                        size={Scale.SCALE_68}
                        strokeWidth={Scale.SCALE_6}
                        activeColor={Colors.PRIMARY_500}
                        inactiveColor={Colors.GRAY_200}
                    />
                </View>
            </View>
        </View>
    );
};

// Continuous Circular Progress using pure View (Two-Half-Circle Method)
const CircularProgress: React.FC<{
    current: number;
    total: number;
    size: number;
    strokeWidth: number;
    activeColor: string;
    inactiveColor: string;
}> = ({ current, total, size, strokeWidth, activeColor, inactiveColor }) => {
    const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

    // Right Half (0-50%): Rotates from 180 -> 360 (or -180 -> 0)
    // Left Half (50-100%): Rotates from 180 -> 360

    const rightRotation = Math.min(percentage, 50) * 3.6; // 0 to 180
    const leftRotation = Math.max(percentage - 50, 0) * 3.6; // 0 to 180

    // To hide the Right Semicircle initially: Rotate it 180deg so it is on Left.
    // As we progress 0->180, it enters the Right zone.

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            {/* Background Track */}
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: strokeWidth,
                    borderColor: inactiveColor,
                    position: 'absolute',
                }}
            />

            {/* Right Half Segment (Handles 0-50%) */}
            <View
                style={{
                    width: size / 2,
                    height: size,
                    overflow: 'hidden',
                    position: 'absolute',
                    left: size / 2, // Clip to Right Half of World
                }}
            >
                <View
                    style={{
                        width: size,
                        height: size,
                        position: 'absolute',
                        left: -size / 2, // Center the Rotator in the Half Container
                        transform: [{ rotate: `${-180 + rightRotation}deg` }], // Start at -180 (Left), rotate to 0 (Right)
                    }}
                >
                    {/* The Semicircle Object (Right Half Colored) */}
                    <View
                        style={{
                            width: size / 2,
                            height: size,
                            overflow: 'hidden',
                            position: 'absolute',
                            left: size / 2, // Right Side
                        }}
                    >
                        <View
                            style={{
                                width: size,
                                height: size,
                                borderRadius: size / 2,
                                borderWidth: strokeWidth,
                                borderColor: activeColor,
                                position: 'absolute',
                                left: -size / 2,
                            }}
                        />
                    </View>
                </View>
            </View>

            {/* Left Half Segment (Handles 50-100%) */}
            <View
                style={{
                    width: size / 2,
                    height: size,
                    overflow: 'hidden',
                    position: 'absolute',
                    left: 0, // Clip to Left Half of World
                }}
            >
                <View
                    style={{
                        width: size,
                        height: size,
                        position: 'absolute',
                        left: 0, // Center the Rotator
                        transform: [{ rotate: `${-180 + leftRotation}deg` }], // Start at -180 (Right), rotate to 0 (Left)
                    }}
                >
                    {/* The Semicircle Object (Left Half Colored) */}
                    <View
                        style={{
                            width: size / 2,
                            height: size,
                            overflow: 'hidden',
                            position: 'absolute',
                            left: 0, // Left Side
                        }}
                    >
                        <View
                            style={{
                                width: size,
                                height: size,
                                borderRadius: size / 2,
                                borderWidth: strokeWidth,
                                borderColor: activeColor,
                                position: 'absolute',
                                left: 0,
                            }}
                        />
                    </View>
                </View>
            </View>

            <CommonText bold size={Scale.SCALE_12} color={Colors.TEXT_PRIMARY}>
                {current} of {total}
            </CommonText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: Scale.SCALE_20, // Separation between top bar and step info
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Scale.SCALE_42,
    },
    backButton: {
        width: Scale.SCALE_42,
        height: Scale.SCALE_42,
        borderRadius: Scale.BORDER_RADIUS_12,
        borderWidth: Scale.SCALE_1,
        borderColor: Colors.GRAY_300,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: Scale.SCALE_24,
        height: Scale.SCALE_24,
    },
    screenTitle: {
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontSize: Typography.FONT_SIZE_20,
        lineHeight: Typography.LINE_HEIGHT_28,
        color: Colors.TEXT_PRIMARY,
        textAlign: 'center',
        flex: 1, // Takes available space
    },
    resetContainer: {
        minWidth: Scale.SCALE_42, // Ensure balance with back button
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    resetText: {
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontSize: Typography.FONT_SIZE_14,
        lineHeight: Typography.LINE_HEIGHT_20,
        color: Colors.GRAY_500,
    },
    stepInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Scale.SCALE_12,
    },
    stepTexts: {
        flex: 1,
        gap: Scale.SCALE_4,
    },
    stepTitle: {
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontSize: Typography.FONT_SIZE_18,
        lineHeight: Typography.LINE_HEIGHT_24,
        color: Colors.TEXT_PRIMARY,
    },
    nextStepTitle: {
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontSize: Typography.FONT_SIZE_16,
        lineHeight: Typography.LINE_HEIGHT_24,
        color: Colors.GRAY_500,
    },
    progressContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    // progressText style removed as it's now internal to CircularProgress
});
