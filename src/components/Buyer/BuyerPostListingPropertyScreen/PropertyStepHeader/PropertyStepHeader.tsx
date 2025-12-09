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
                    <CommonText style={styles.resetText}>
                        Reset
                    </CommonText>
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
                    {/* Placeholder for circular progress - using text for now */}
                    <CommonText style={styles.progressText}>
                        {currentStep} of {totalSteps}
                    </CommonText>
                </View>
            </View>
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
        borderColor: Colors.BORDER_SECONDARY,
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
        // Add specific progress circle styling here if needed
    },
    progressText: {
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontSize: Typography.FONT_SIZE_14,
        lineHeight: Typography.LINE_HEIGHT_24,
        color: Colors.TEXT_PRIMARY,
    },
});
